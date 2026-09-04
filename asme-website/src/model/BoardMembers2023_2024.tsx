
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
  "../assets/board-photos/23-24_Portraits/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
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


// 2023-2024

const boardCommitte: BoardCommittee[] = [
  {
    title: "Executive",
    members: [
      { name: "Ailsa Watt", role: "President", image: zzzzz, linkedin : "https://www.linkedin.com/in/ailsa-watt/"},
      { name: "Ryan Mawlawi", role: "Vice President", image: zzzzz, linkedin : "https://www.linkedin.com/in/ryanmawlawi/"},
      { name: "KaitIyn Nguyen", role: "Secretary", image: zzzzz , linkedin : "https://www.linkedin.com/in/kaitlynknguyen/" },
    ],
  },
  {
    title: "Board of Directors",
    members: [
      { name: "Brandon Liu", role: "Finance Director", image: zzzzz, linkedin : "https://www.linkedin.com/in/brandon-liu-eng/"},
      { name: "Kaydi Nomura", role: "External Affairs Director", image: zzzzz, linkedin : "https://www.linkedin.com/in/kaydinomura/"},
      { name: "Rebecca Hong", role: "Internal Affairs Director", image: zzzzz , linkedin : "https://www.linkedin.com/in/rebeccamnhong/" },
      { name: "Allen Luo", role: "Communications Director", image: zzzzz , linkedin : "https://www.linkedin.com/in/allen-y-luo/" },
      { name: "Karnig Boyadjian", role: "Mech-in-Training Director", image: zzzzz , linkedin : "https://www.linkedin.com/in/karnigboyadjian/" },
      { name: "Angelina Licos", role: "Peterworks Director", image: zzzzz , linkedin : "https://www.linkedin.com/in/angelina-licos/" },
      { name: "Brian Chau", role: "Webmaster", image: zzzzz , linkedin : "https://www.linkedin.com/in/brianchau1/" },
    ],
  },
  {
    title: "Finance",
    members: [
      { name: "Kaitlyn Nguyen", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/kaitlyntn/"},
      { name: "Gavin Fujimoto", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/gavin-fujimoto/"},
    ],
  },
  {
    title: "Externals",
    members: [
      { name: "Jacob Pham", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/jacob-pham-uci/"},
    ],
  },
  {
    title: "Internals",
    members: [
      { name: "Nolan Haugh", role: "Committee Member", image: zzzzz, linkedin : ""},
      { name: "Erin Lee", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/-erinlee/"},
      { name: "Rina Mangalampalli", role: "Committee Member", image: zzzzz , linkedin : "https://www.linkedin.com/in/rina-mangalampalli/" },
      { name: "Saheed Oladunjuye", role: "Committee Member", image: zzzzz , linkedin : "https://www.linkedin.com/in/saheed-oladunjoye-6959151a9/" }
    ],
  },
    {
    title: "Communications",
    members: [
      { name: "Marco Cheng", role: "Committee Member", image: zzzzz, linkedin : "https://www.linkedin.com/in/marcocheng485/"},
    ],
  },
  {
    title: "Peterworks",
    members: [
      { name: "Hannah Hjelm", role: "Peterworks TA", image: zzzzz, linkedin : "https://www.linkedin.com/in/hannah-hjelm-986570218/"},
      { name: "Gabriel Sackinger", role: "Peterworks TA", image: zzzzz, linkedin : "https://www.linkedin.com/in/gabrielsackinger/"},
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
