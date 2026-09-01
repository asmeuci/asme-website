
interface Member {
  name: string;
  role: string;
  image: string;
}

interface BoardCommittee {  
  title: string;
  members: Member[];
}

const portraitModules = import.meta.glob(
  "../assets/board-photos/21-22_Portraits/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
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

const placeholderHeadshot =
  "https://media.licdn.com/dms/image/v2/D5603AQHbvfaCnSEdrg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720490616014?e=1773273600&v=beta&t=jBcA50gdLX80hYrEwIztjr3zuf50Cl-A_iiKG3xO4-g";

// 2021-2022

const boardCommitte: BoardCommittee[] = [
  {
    title: "Board of Directors",
    members: [
      { name: "Quan Nguyen", role: "President", image: placeholderHeadshot},
      { name: "Noelle Camanyag", role: "Communications Director", image: placeholderHeadshot},
      { name: "Sophia Shannon", role: "Internal Affairs Director", image: placeholderHeadshot},
      { name: "Anthony Chin", role: "External Affairs Director", image: placeholderHeadshot},
      { name: "Anisha Jayasekara", role: "Projects Manager", image: placeholderHeadshot},
    ],
  },
  {
    title: "Communications",
    members: [
      { name: "Shakeel Riyaj", role: "P.R Coordinator", image: placeholderHeadshot},
    ],
  },
  {
    title: "Projects",
    members: [
      { name: "Adrian Ornelas", role: "Projects Director", image: placeholderHeadshot},
      { name: "Crew Parker", role: "Projects Director", image: placeholderHeadshot},
    ],
  },
  {
    title: "Other Members",
    members: [
      { name: "Timothy Young", role: "Finance Director", image: placeholderHeadshot},
      { name: "Brion Song", role: "Historian", image: placeholderHeadshot},
      { name: "Benjamen Bielecki", role: "Webmaster", image: placeholderHeadshot},
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
