
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
  "/src/assets/board-photos/24-25_Portraits/Kaitiyn_Nguyen.jpg";


// 2024-2025

const boardCommitte: BoardCommittee[] = [
  {
    title: "Executive",
    members: [
      { name: "Kaydi Nomura", role: "President", image: zzzzz, linkedin : ""},
      { name: "KaitIyn Nguyen", role: "Vice President", image: zzzzz, linkedin : ""},
      { name: "Brian Van", role: "Secretary", image: zzzzz , linkedin : "" },
    ],
  },
  {
    title: "Externals",
    members: [
      { name: "Kyle Fernan", role: "External Affairs Director", image: zzzzz, linkedin : ""},
      { name: "Sophia Sweeney", role: "Committee Member", image: zzzzz, linkedin : ""},
      { name: "Pedro Betto", role: "Committee Member", image: zzzzz, linkedin : ""},
      { name: "Rogel Aguilar", role: "Committee Member", image: zzzzz, linkedin : ""},
    ],
  },
  {
    title: "Internals",
    members: [
      { name: "Rebecca Hong", role: "Internal Affiars Director", image: zzzzz, linkedin : ""},
      { name: "Rina Mangalampalli", role: "Committee Member", image: zzzzz, linkedin : ""},
      { name: "Erin Lee", role: "Committee Member", image: zzzzz, linkedin : ""},
      { name: "Yvonne Hue Yu", role: "Committee Member", image: zzzzz, linkedin : ""},
    ],
  },
  {
    title: "Communications",
    members: [
      { name: "Athena Wong", role: "Communications Director", image: zzzzz, linkedin : ""},
      { name: "Vanessa Shimizu", role: "Committee Member", image: zzzzz, linkedin : ""},
      { name: "Marco Cheng", role: "Committee Member", image: zzzzz , linkedin : "" },
      { name: "Mason Brown", role: "Webmaster", image: zzzzz , linkedin : "" }
    ],
  },
    {
    title: "Finance",
    members: [
      { name: "Gavin Fujimoto", role: "Finance Director", image: zzzzz, linkedin : ""},
      { name: "Brandon Liu", role: "Committee Member", image: zzzzz, linkedin : ""},
      { name: "Kaitlyn Nguyen", role: "Committee Member", image: zzzzz, linkedin : ""},
    ],
  },
  {
    title: "Mech In Training",
    members: [
      { name: "Nolan Haugh", role: "Mech in Training Director", image: zzzzz, linkedin : ""},
      { name: "Gianluca Molina", role: "Mech in Training Director", image: zzzzz, linkedin : ""},
      { name: "Karnig Boyadjian", role: "Committee Member", image: zzzzz, linkedin : ""},
    ],
  },
    {
    title: "Peterworks",
    members: [
      { name: "Hannah Hjelm", role: "Peterworks Director", image: zzzzz, linkedin : ""},
      { name: "Edison Ta", role: "Peterworks TA", image: zzzzz, linkedin : ""},
      { name: "Warner Wu", role: "Peterworks TA", image: zzzzz, linkedin : ""},
      { name: "Yuvraj Chera", role: "Peterworks TA", image: zzzzz, linkedin : ""},
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
