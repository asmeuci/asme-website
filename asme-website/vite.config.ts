import fs from "fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite"

const repoRoot = path.resolve(__dirname, "..")
const apiDir = path.join(repoRoot, "api")

/*
Dev-only: `vite` doesn't know about the /api serverless functions, so without
this you'd need `vercel dev` to exercise checkout locally. This mounts the same
handler files behind the same URLs and fakes the few Vercel-specific bits they
rely on (req.body, req.query, res.status().json()). Production is unaffected —
there, Vercel runs these files for real.
*/
function vercelApiDevServer(): Plugin {
  return {
    name: "vercel-api-dev-server",
    apply: "serve",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost")
        if (!url.pathname.startsWith("/api/")) return next()

        const name = url.pathname.slice("/api/".length)
        if (!/^[a-z0-9-]+$/i.test(name)) return next()

        const handlerPath = path.join(apiDir, `${name}.ts`)
        if (!fs.existsSync(handlerPath)) return next()

        // read the JSON body the way Vercel would have already done for us
        let body: unknown = undefined
        if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const raw = Buffer.concat(chunks).toString("utf8")
          if (raw) {
            try {
              body = JSON.parse(raw)
            } catch {
              res.statusCode = 400
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ error: "Invalid JSON body." }))
              return
            }
          }
        }

        const vercelReq = Object.assign(req, {
          body,
          query: Object.fromEntries(url.searchParams),
          cookies: {},
        })

        const vercelRes = Object.assign(res, {
          status(code: number) {
            res.statusCode = code
            return vercelRes
          },
          json(payload: unknown) {
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(payload))
            return vercelRes
          },
          send(payload: string) {
            res.end(payload)
            return vercelRes
          },
        })

        try {
          const module = await server.ssrLoadModule(handlerPath)
          await module.default(vercelReq, vercelRes)
        } catch (error) {
          server.config.logger.error(`[api] ${name} failed: ${String(error)}`)
          if (!res.writableEnded) {
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "Handler crashed. See terminal." }))
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // the API keys live in .env.local at the repo root, a level above this app
  Object.assign(process.env, loadEnv(mode, repoRoot, ""))

  return {
    plugins: [react(), tailwindcss(), vercelApiDevServer()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      fs: {
        // so ssrLoadModule can reach ../api
        allow: [repoRoot],
      },
    },
  }
})
