function Footer() {
  return (
    <div>
      <footer className="font-helvetica w-full mx-auto rounded-2xl flex flex-col gap-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-light text-md">
          <div className="order-2 md:order-1">
            <p>
              &copy; ASME 2026. All rights reserved.
            </p>
          </div>
          <div className="flex flex-row gap-x-8 order-1 md:order-2">
            <a
              href="https://www.instagram.com/asmeatuci/"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wide transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/asme-uci/"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wide transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://discord.gg/vDNnTcwTt6"
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-wide transition-colors duration-200"
            >
              Discord
            </a>
          </div>

        </div>

        <div className="flex justify-center md:justify-end">
            <p className="text-zinc-400">
              Made with ❤️
            </p>
        </div>

      </footer>
    </div>
  );
}

export default Footer;
