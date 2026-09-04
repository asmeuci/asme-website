
interface Member {
  name: string;
  role: string;
  linkedin : string;
  image: string;
}

interface BoardCommittee {
  title: string;
  members: Member[];
}

const portraitModules = import.meta.glob(
  "../assets/board-photos/24-25_Portraits/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  { eager: true, import: "default" }
) as Record<string, string>;

const normalizeMemberKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const portraitsByName = Object.entries(portraitModules).reduce<Record<string, string>>((acc, [path, imageUrl]) => {
  const filename = path.split("/").pop() ?? "";
  const basename = filename.replace(/\.[^.]+$/, "");
  acc[normalizeMemberKey(basename)] = imageUrl;
  return acc;
}, {});

const resolvePortrait = (memberName: string, fallbackImage: string) => {
  const normalizedName = normalizeMemberKey(memberName);
  return portraitsByName[normalizedName] ?? fallbackImage;
};

const zzzzz =
  "/src/assets/board-photos/22-23_Portraits/Brion_Song.jpg";


// 2024-2025

const boardCommitte: BoardCommittee[] = [
  {
    title: "Executive",
    members: [
      { name: "Kaydi Nomura", role: "President", image: zzzzz, linkedin : "https://www.linkedin.com/in/kaydinomura/"},
      { name: "KaitIyn Nguyen", role: "Vice President", image: zzzzz, linkedin : "https://www.linkedin.com/in/kaitlynknguyen/"},
      { name: "Brian Van", role: "Secretary", image: zzzzz , linkedin : "https://www.linkedin.com/in/brian-van-/" },
    ],
  },
  {
    title: "Externals",
    members: [
      { name: "Kyle Fernan", role: "External Affairs Director", image: zzzzz, linkedin : "https://www.linkedin.com/in/kyle-fernan/"},
      { name: "Sophia Sweeney", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/sophiaysweeney/"},
      { name: "Pedro Betto", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/pbetto/"},
      { name: "Rogel Aguilar", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/rogelagui/"},
    ],
  },
  {
    title: "Internals",
    members: [
      { name: "Rebecca Hong", role: "Internal Affiars Director", image: zzzzz, linkedin : "https://www.linkedin.com/in/rebeccamnhong/"},
      { name: "Rina Mangalampalli", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/rina-mangalampalli/"},
      { name: "Erin Lee", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/-erinlee/"},
      { name: "Yvonne Hue Yu", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/yvonne-yu-36131b203/"},
    ],
  },
  {
    title: "Communications",
    members: [
      { name: "Athena Wong", role: "Communications Director", image: zzzzz, linkedin : "https://www.linkedin.com/in/athena-wong-100percent/"},
      { name: "Vanessa Shimizu", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/vanessa-shimizu-9783ab242/"},
      { name: "Marco Cheng", role: "Committee Member", image: zzzzz , linkedin : "https://www.linkedin.com/in/marcocheng485/" },
      { name: "Mason Brown", role: "Webmaster", image: zzzzz , linkedin : "https://www.linkedin.com/in/masonalexbrown/" }
    ],
  },
    {
    title: "Finance",
    members: [
      { name: "Gavin Fujimoto", role: "Finance Director", image: zzzzz, linkedin : "https://www.linkedin.com/in/gavin-fujimoto/"},
      { name: "Kaitlyn Nguyen", role: "Sponsorship Chair", image: zzzzz, linkedin : "https://www.linkedin.com/in/kaitlyntn/"},
      { name: "Brandon Liu", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/brandon-liu-eng/"},
    ],
  },
  {
    title: "Mech In Training",
    members: [
      { name: "Nolan Haugh", role: "Mech in Training Director", image: zzzzz, linkedin : ""},
      { name: "Gianluca Molina", role: "Mech in Training Director", image: zzzzz, linkedin : "https://www.linkedin.com/in/gianluca-molina-b27234331/"},
      { name: "Karnig Boyadjian", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/karnigboyadjian/"},
    ],
  },
    {
    title: "Peterworks",
    members: [
      { name: "Hannah Hjelm", role: "Peterworks Director", image: zzzzz, linkedin : "https://www.linkedin.com/in/hannah-hjelm-986570218/"},
      { name: "Edison Ta", role: "Peterworks TA", image: zzzzz, linkedin : "https://www.linkedin.com/in/edison-ta/"},
      { name: "Warner Wu", role: "Peterworks TA", image: zzzzz, linkedin : "https://www.linkedin.com/in/warner-wu/"},
      { name: "Yuvraj Chera", role: "Peterworks TA", image: zzzzz, linkedin : "https://www.linkedin.com/in/yuvraj-chera-99526a298/"},
    ],
  },
];


const boardCommitteeWithPortraits: BoardCommittee[] = boardCommitte.map((committee) => ({
  ...committee,
  members: committee.members.map((member) => ({
    ...member,
    image: resolvePortrait(member.name, member.image),
  })),
}));

export default boardCommitteeWithPortraits;
