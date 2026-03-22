import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/Layout";
import reactLogo from "@/assets/react.svg";

type FolderTone = "accent" | "light" | "dark";
type PreviewAlign = "left" | "center" | "right";

type FolderConfig = {
  id: string;
  number: string;
  title: string;
  tone: FolderTone;
  side: "left" | "right";
  notchStart: number;
  notchEnd: number;
  previewAlign: PreviewAlign;
  tabClass?: string;
  bodyClass?: string;
};

const tones: Record<FolderTone, { bg: string; number: string; title: string }> = {
  accent: {
    bg: "bg-[#2e5db2]",
    number: "text-white",
    title: "text-white",
  },
  light: {
    bg: "bg-[#9ab5db]",
    number: "text-white",
    title: "text-white",
  },
  dark: {
    bg: "bg-[#2e5db2]",
    number: "text-white",
    title: "text-white",
  },
};

const rows: FolderConfig[][] = [
  [
    {
      id: "01",
      number: "01",
      title: "Professional",
      tone: "accent",
      side: "left",
      notchStart: 48,
      notchEnd: 50.6,
      previewAlign: "left",
      tabClass: "rounded-tl-[14px]",
    },
    {
      id: "02",
      number: "02",
      title: "Social",
      tone: "light",
      side: "right",
      notchStart: 48.4,
      notchEnd: 51.2,
      previewAlign: "right",
      tabClass: "rounded-tr-[14px]",
    },
  ],
  [
    {
      id: "03",
      number: "03",
      title: "Networking",
      tone: "light",
      side: "left",
      notchStart: 48.2,
      notchEnd: 50.9,
      previewAlign: "left",
      tabClass: "rounded-tl-[14px]",
    },
    {
      id: "04",
      number: "04",
      title: "Boothing",
      tone: "dark",
      side: "right",
      notchStart: 48.3,
      notchEnd: 51,
      previewAlign: "center",
      tabClass: "rounded-tr-[14px]",
    },
  ],
  [
    {
      id: "05",
      number: "05",
      title: "Flagship",
      tone: "accent",
      side: "left",
      notchStart: 48,
      notchEnd: 50.7,
      previewAlign: "left",
      tabClass: "rounded-tl-[14px]",
      bodyClass: "rounded-bl-[14px]",
    },
    {
      id: "06",
      number: "06",
      title: "misc",
      tone: "light",
      side: "right",
      notchStart: 48.4,
      notchEnd: 51.1,
      previewAlign: "right",
      tabClass: "rounded-tr-[14px]",
      bodyClass: "rounded-br-[14px]",
    },
  ],
];

function FolderStrip({
  folder,
  hovered,
  setHovered,
  className,
}: {
  folder: FolderConfig;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  className?: string;
}) {
  const isHovered = hovered === folder.id;
  const shouldFade = hovered !== null && hovered !== folder.id;
  const bodyBorderClass =
    folder.side === "left"
      ? "border border-white/80 md:border-r-0"
      : "border border-white/80";

  // the top angled piece for the folder piece 
  const tabClipPath = useMemo(
    () =>
      `polygon(0 0, ${folder.notchStart}% 0, ${folder.notchEnd}% 100%, 0 100%)`,
    [folder.notchEnd, folder.notchStart]
  );

  const previewAnchorClass =
    folder.previewAlign === "right"
      ? "right-8"
      : folder.previewAlign === "center"
      ? "left-1/2 -translate-x-1/2"
      : "left-8";

  const cardX = [0, 118, 236];
  const cardRotate = [-7, -1.5, 5.5];

  return (
    <motion.article
      className={`relative overflow-visible ${className ?? ""}`}
      onHoverStart={() => setHovered(folder.id)}
      onHoverEnd={() => setHovered(null)}
      onFocus={() => setHovered(folder.id)}
      onBlur={() => setHovered(null)}
      animate={{
        opacity: shouldFade ? 0.3 : 1,
        filter: isHovered ? "brightness(1.04)" : "brightness(1)",
      }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence>
        {isHovered ? (
          <motion.div
            className={`pointer-events-none absolute -top-[170px] hidden h-[170px] w-[390px] md:block ${previewAnchorClass}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {[0, 1, 2].map((cardIndex) => (
              <motion.div
                key={`${folder.id}-${cardIndex}`}
                className="absolute top-0 h-[170px] w-[140px] overflow-hidden rounded-[10px] border border-black/15 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
                style={{ left: cardX[cardIndex], zIndex: 20 - cardIndex }}
                initial={{ opacity: 0, y: 20, rotate: cardRotate[cardIndex], scale: 0.96 }}
                animate={{ opacity: 1, y: cardIndex * 8, rotate: cardRotate[cardIndex], scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.96 }}
                transition={{ duration: 0.28, delay: cardIndex * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={reactLogo}
                  alt="React icon preview"
                  className="h-full w-full object-contain p-5"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* top angled folder tab */}
      <div
        className={`relative z-10 h-[42px] ${tones[folder.tone].bg} ${folder.tabClass ?? ""}`}
        style={{ clipPath: tabClipPath }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            points={`0,0 ${folder.notchStart},0 ${folder.notchEnd},100 0,100`}
            fill="none"
            stroke="rgba(255,255,255,0.82)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className={`absolute left-6 top-3 text-[15px] leading-none tracking-[0.18em] ${tones[folder.tone].number}`}>
          {folder.number}
        </span>
      </div>

      {/* main folder body */}
      <div className={`relative -mt-px h-[112px] ${bodyBorderClass} shadow-[0_8px_18px_rgba(7,24,54,0.16)] ${tones[folder.tone].bg} ${folder.bodyClass ?? ""}`}>
        <h3 className={`font-serif font-light px-6 pt-1 text-[44px] leading-none tracking-[-0.01em] lowercase max-[1400px]:text-[40px] max-[1100px]:text-[36px] max-md:text-[32px] ${tones[folder.tone].title}`}>
          {folder.title}
        </h3>
      </div>
    </motion.article>
  );
}

function Yearbook() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Layout>
      <section className="relative flex min-h-[calc(100vh-8rem)] flex-col justify-end bg-[#ececec]">
        <div className="inset-x-0 z-30 overflow-visible">
          <div className="w-full overflow-visible">
            <div className="relative z-10 grid grid-cols-1 overflow-visible md:grid-cols-[1fr_1fr]">
              <FolderStrip folder={rows[0][0]} hovered={hovered} setHovered={setHovered} />
              <FolderStrip folder={rows[0][1]} hovered={hovered} setHovered={setHovered} />
            </div>

            <div className="relative z-20 -mt-[42px] grid grid-cols-1 overflow-visible md:grid-cols-[0.78fr_1.22fr]">
              <FolderStrip folder={rows[1][0]} hovered={hovered} setHovered={setHovered} />
              <FolderStrip folder={rows[1][1]} hovered={hovered} setHovered={setHovered} />
            </div>

            <div className="relative z-30 -mt-[42px] grid grid-cols-1 overflow-visible md:grid-cols-[1fr_1fr]">
              <FolderStrip folder={rows[2][0]} hovered={hovered} setHovered={setHovered} />
              <FolderStrip folder={rows[2][1]} hovered={hovered} setHovered={setHovered} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Yearbook;
