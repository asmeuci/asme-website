import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import eventRnn from "@/assets/home/event-rnn.jpg";
import eventSdnn from "@/assets/home/event-sdnn.jpg";
import eventNetwork from "@/assets/home/event-network.jpg";
import projectHpvc from "@/assets/home/project-hpvc.jpg";
import projectPeterworks from "@/assets/home/project-peterworks.jpg";
import bentoMain from "@/assets/home/bento-main.jpg";
import bentoMid from "@/assets/home/bento-mid.jpg";
import bentoMidRight from "@/assets/home/bento-mid-right.jpg";
import bentoTopRight from "@/assets/home/bento-top-right.jpg";
import bentoBottomWide from "@/assets/home/bento-bottom-wide.jpg";
import bentoAccent from "@/assets/home/bento-accent.jpg";

type FolderTone = "accent" | "light" | "dark";
type PreviewAlign = "left" | "center" | "right";

type FolderConfig = {
  id: string;
  slug: string;
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
      slug: "professional",
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
      slug: "social",
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
      slug: "networking",
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
      slug: "boothing",
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
      slug: "flagship",
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
      slug: "misc",
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

const mobileFolders = rows.flat();

const folderPreviewPhotos: Record<string, string[]> = {
  "01": [eventRnn, projectHpvc, bentoMain],
  "02": [eventSdnn, bentoTopRight, bentoMid],
  "03": [eventNetwork, bentoAccent, bentoMidRight],
  "04": [projectPeterworks, eventRnn, bentoBottomWide],
  "05": [projectHpvc, eventSdnn, bentoTopRight],
  "06": [bentoMain, eventNetwork, bentoMid],
};

function FolderStrip({
  folder,
  hovered,
  activeId,
  setHovered,
  className,
}: {
  folder: FolderConfig;
  hovered: string | null;
  activeId: string | null;
  setHovered: (id: string | null) => void;
  className?: string;
}) {
  const focusedId = hovered ?? activeId;
  const isHovered = focusedId === folder.id;
  const shouldFade = focusedId !== null && focusedId !== folder.id;
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
  const previewPhotos = folderPreviewPhotos[folder.id] ?? folderPreviewPhotos["01"];

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
            {previewPhotos.map((photo, cardIndex) => (
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
                  src={photo}
                  alt={`${folder.title} preview ${cardIndex + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* top angled folder tab */}
      <div
        className={`relative z-10 h-[32px] md:h-[42px] ${tones[folder.tone].bg} ${folder.tabClass ?? ""}`}
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
        <span className={`absolute left-4 top-2 text-[12px] leading-none tracking-[0.16em] md:left-6 md:top-3 md:text-[15px] md:tracking-[0.18em] ${tones[folder.tone].number}`}>
          {folder.number}
        </span>
      </div>

      {/* main folder body */}
      <div className={`relative -mt-px h-[84px] md:h-[112px] ${bodyBorderClass} shadow-[0_8px_18px_rgba(7,24,54,0.16)] ${tones[folder.tone].bg} ${folder.bodyClass ?? ""}`}>
        <h3 className={`font-serif font-light px-4 pt-1 text-[24px] leading-none tracking-[-0.01em] lowercase min-[420px]:text-[27px] md:px-6 md:text-[44px] max-[1400px]:md:text-[40px] max-[1100px]:md:text-[36px] ${tones[folder.tone].title}`}>
          {folder.title}
        </h3>
      </div>
    </motion.article>
  );
}

function AnimatedFolderSlot({
  delay,
  children,
}: {
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 86, scale: 0.965 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.56,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function MobileYearbookCard({
  folder,
  delay,
}: {
  folder: FolderConfig;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/yearbook/${folder.slug}`}
        className={`block rounded-xl border border-white/80 px-4 py-3 shadow-[0_8px_18px_rgba(7,24,54,0.16)] ${tones[folder.tone].bg}`}
      >
        <span
          className={`font-helvetica text-[12px] leading-none tracking-[0.16em] ${tones[folder.tone].number}`}
        >
          {folder.number}
        </span>
        <h3
          className={`mt-2 font-serif text-[30px] leading-none tracking-[-0.01em] lowercase ${tones[folder.tone].title}`}
        >
          {folder.title}
        </h3>
      </Link>
    </motion.div>
  );
}

function Yearbook() {
  const [hovered, setHovered] = useState<string | null>(null);
  const activeId: string | null = null;

  return (
    <Layout>
      <section className="relative bg-[#ececec]">
        <div className="min-h-[calc(100dvh-64px)] px-4 pb-6 pt-20 md:hidden">
          <div className="space-y-3">
            {mobileFolders.map((folder, index) => (
              <MobileYearbookCard
                key={`mobile-${folder.id}`}
                folder={folder}
                delay={index * 0.06}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:flex md:h-[100dvh] md:min-h-[100dvh] md:flex-col md:justify-end">
          <div className="inset-x-0 z-30 overflow-visible">
            <div className="w-full overflow-visible">
              <div className="relative z-10 grid grid-cols-[1fr_1fr] overflow-visible">
                <AnimatedFolderSlot delay={0.32}>
                  <Link to={`/yearbook/${rows[0][0].slug}`} className="block">
                    <FolderStrip folder={rows[0][0]} hovered={hovered} activeId={activeId} setHovered={setHovered} />
                  </Link>
                </AnimatedFolderSlot>
                <AnimatedFolderSlot delay={0.4}>
                  <Link to={`/yearbook/${rows[0][1].slug}`} className="block">
                    <FolderStrip folder={rows[0][1]} hovered={hovered} activeId={activeId} setHovered={setHovered} />
                  </Link>
                </AnimatedFolderSlot>
              </div>

              <div className="relative z-20 -mt-[32px] grid grid-cols-[0.82fr_1.18fr] overflow-visible md:-mt-[42px] md:grid-cols-[0.78fr_1.22fr]">
                <AnimatedFolderSlot delay={0.16}>
                  <Link to={`/yearbook/${rows[1][0].slug}`} className="block">
                    <FolderStrip folder={rows[1][0]} hovered={hovered} activeId={activeId} setHovered={setHovered} />
                  </Link>
                </AnimatedFolderSlot>
                <AnimatedFolderSlot delay={0.24}>
                  <Link to={`/yearbook/${rows[1][1].slug}`} className="block">
                    <FolderStrip folder={rows[1][1]} hovered={hovered} activeId={activeId} setHovered={setHovered} />
                  </Link>
                </AnimatedFolderSlot>
              </div>

              <div className="relative z-30 -mt-[32px] grid grid-cols-[1fr_1fr] overflow-visible md:-mt-[42px] md:grid-cols-[1fr_1fr]">
                <AnimatedFolderSlot delay={0}>
                  <Link to={`/yearbook/${rows[2][0].slug}`} className="block">
                    <FolderStrip folder={rows[2][0]} hovered={hovered} activeId={activeId} setHovered={setHovered} />
                  </Link>
                </AnimatedFolderSlot>
                <AnimatedFolderSlot delay={0.08}>
                  <Link to={`/yearbook/${rows[2][1].slug}`} className="block">
                    <FolderStrip folder={rows[2][1]} hovered={hovered} activeId={activeId} setHovered={setHovered} />
                  </Link>
                </AnimatedFolderSlot>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Yearbook;
