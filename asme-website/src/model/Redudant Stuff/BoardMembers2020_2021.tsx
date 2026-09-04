
interface Member {
  name: string;
  role: string;
  linkedin?: string;
  image: string;
}

interface BoardCommittee {
  title: string;
  members: Member[];
}

const portraitModules = import.meta.glob(
  "../assets/board-photos/20-21_Portraits/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
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

// 2020-2021

const placeholderHeadshot =
  "https://media.licdn.com/dms/image/v2/D5603AQHbvfaCnSEdrg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720490616014?e=1773273600&v=beta&t=jBcA50gdLX80hYrEwIztjr3zuf50Cl-A_iiKG3xO4-g";

const boardCommitte: BoardCommittee[] = [
  {
    title: "Officer",
    members: [
      { name: "Quan Nguyen", role: "President", image: placeholderHeadshot },
      { name: "Anthony Chin", role: "Vice President", image: placeholderHeadshot },
      { name: "Noelle Camanyag", role: "External Affairs Director", image: placeholderHeadshot },
      { name: "Sophia Shannon", role: "Internal Affairs Director", image: placeholderHeadshot },
      { name: "Timothy Young", role: "Treasurer", image: placeholderHeadshot },
      { name: "Brion Song", role: "Secretary", image: placeholderHeadshot },
      { name: "Benjamen Bielecki", role: "Nedia Director", image: placeholderHeadshot },

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
