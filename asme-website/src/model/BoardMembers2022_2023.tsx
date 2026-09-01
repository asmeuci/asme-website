
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
  "../assets/board-photos/22-23_Portraits/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
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

// 2022-2023

const boardCommitte: BoardCommittee[] = [
  {
    title: "Officers",
    members: [
      { name: "Anthony Chin", role: "President", image: placeholderHeadshot},
      { name: "Alex Avila", role: "Internal Affairs Director", image: placeholderHeadshot},
      { name: "Rashed Eisa", role: "External Affairs Director", image: placeholderHeadshot},
      { name: "Noelle Camanyag", role: "Communications Director", image: placeholderHeadshot},
      { name: "Anisha Jayasekara", role: "Projects Director", image: placeholderHeadshot},
      { name: "Shakeel Riyaj", role: "Public Relations Coordinator", image: placeholderHeadshot},
      { name: "Ryan Mawlawi", role: "Finance Director", image: placeholderHeadshot},
      { name: "Andrew Kim", role: "Secretary", image: placeholderHeadshot},
      { name: "Quan Nguyen", role: "Advisor", image: placeholderHeadshot},
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
