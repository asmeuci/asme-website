interface Member {
  name: string;
  role: string;
  linkedin: string;
  image: string;
}

interface BoardCommittee {
  title: string;
  members: Member[];
}

const placeholderHeadshot =
  "https://media.licdn.com/dms/image/v2/D5603AQHbvfaCnSEdrg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1720490616014?e=1773273600&v=beta&t=jBcA50gdLX80hYrEwIztjr3zuf50Cl-A_iiKG3xO4-g";
const placeholderLinkedin = "https://www.linkedin.com/school/university-of-california-irvine/";

const boardCommittees2026_2027: BoardCommittee[] = [
  {
    title: "Executive",
    members: [
      { name: "Brian Van", role: "President", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Vice President", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Secretary", image: placeholderHeadshot, linkedin: placeholderLinkedin },
    ],
  },
  {
    title: "Externals",
    members: [
      { name: "Brian Van", role: "External Affairs Director", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Industry Relations Chair", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Networking Events Chair", image: placeholderHeadshot, linkedin: placeholderLinkedin },
    ],
  },
  {
    title: "Internal",
    members: [
      { name: "Brian Van", role: "Internal Affairs Director", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "General Events Chair", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Campus Events Chair", image: placeholderHeadshot, linkedin: placeholderLinkedin },
    ],
  },
  {
    title: "Communications",
    members: [
      { name: "Brian Van", role: "Communications Director", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Social Media Engagement Chair", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Webmaster", image: placeholderHeadshot, linkedin: placeholderLinkedin },
    ],
  },
  {
    title: "Finance",
    members: [
      { name: "Brian Van", role: "Finance Director", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Sponsorship Chair", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Fundraising Chair", image: placeholderHeadshot, linkedin: placeholderLinkedin },
    ],
  },
  {
    title: "Student Outreach",
    members: [
      { name: "Brian Van", role: "Mech In Training Director", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Committee Member", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Committee Member", image: placeholderHeadshot, linkedin: placeholderLinkedin },
    ],
  },
  {
    title: "Peterworks",
    members: [
      { name: "Brian Van", role: "Peterworks Director", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Peterworks TA", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Brian Van", role: "Peterworks TA", image: placeholderHeadshot, linkedin: placeholderLinkedin },
    ],
  },
];

export default boardCommittees2026_2027;
