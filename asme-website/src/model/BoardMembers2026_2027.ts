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
      { name: "Jocelyn Le", role: "President", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/jocelyn-le/" },
      { name: "Tristan Dela Cruz", role: "Vice President", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/tristandelacruz/" },
      { name: "Atharva Vaidya", role: "Secretary", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/atharvavaidyauci/" },
    ],
  },
  {
    title: "Externals",
    members: [
      { name: "Nicholas DiDonato", role: "External Affairs Director", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/nicholasddidonato/" },
      { name: "Brian Van", role: "Industry Relations Chair", image: placeholderHeadshot, linkedin: placeholderLinkedin },
      { name: "Meera Sambhwani", role: "Networking Events Chair", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/meera-sambhwani-a95bb0256/" },
      { name: "Abhinaav Balaji", role: "Committee Member", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/abhinaav-balaji/" },
      { name: "Brian Truong", role: "Committee Member", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/brian-truong-7036a3324/" },
   
    ],
  },
  {
    title: "Internal",
    members: [
      { name: "Aashika Ansu", role: "Internal Affairs Co-Director", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/aashika-ansu/" },
      { name: "Ananya Ganti", role: "Internal Affairs Co-Director", image: placeholderHeadshot, linkedin: "www.linkedin.com/in/ananya-ganti1" },
      { name: "Abigail Baldwin", role: "General Events Chair", image: placeholderHeadshot, linkedin: "www.linkedin.com/in/baldwin-abigail" },
      { name: "Caidon Purificacion", role: "Campus Events Chair", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/caidon-purificacion-2b2385279" },
      { name: "Madison Bui", role: "Committee Member", image: placeholderHeadshot, linkedin: "linkedin.com/in/madison-bui-5a2906349"},
    ],
  },
  {
    title: "Communications",
    members: [
      { name: "Vayuna Pradhan", role: "Communications Director", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/vayunapradhan" },
      { name: "Matt Shanahan", role: "Platform Manager Chair", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/matthew-p-shanahan-95448137b/" },
      { name: "Alice Wu", role: "Committee Member", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/alice-wu-8a748a3a7/" },
      { name: "Bronton Dieu", role: "Webmaster", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/bronton-dieu/" },
      { name: "Tei Park", role: "Historian", image: placeholderHeadshot, linkedin: "www.linkedin.com/in/tei-park-bb9174389" },
      { name: "Angelina Xie", role: "Social Media Engagement Chair", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/angelina-xie/" },
      { name: "Travis Le", role: "Film Media Chair", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/travis-le-uci/" },
      { name: "Joseph Gutierrez", role: "Committee Member", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/josephagutierrez" },
    ],
  },

  {
    title: "Finance",
    members: [
      { name: "Ashley Huynh", role: "Finance Director", image: placeholderHeadshot, linkedin: " https://www.linkedin.com/in/ahuynh07/" },
      { name: "Troy Komura", role: "Sponsorship Chair", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/troy-komura-6974b6377" },
      { name: "Kevin Phan", role: "Fundraising Chair", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/kevin-phan-009039380/" },
    ],
  },
  {
    title: "Student Outreach",
    members: [
      { name: "Colin Tang Khoang", role: "Committee Member", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/colin-khoang-10b933366/" },
      { name: "Sarah McClelland", role: "Committee Member", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/sarahrmcclelland/" },
    ],
  },
  {
    title: "Peterworks",
    members: [
      { name: "Sarah McClelland", role: "Peterworks TA", image: placeholderHeadshot, linkedin: "https://www.linkedin.com/in/sarahrmcclelland/" },
    ],
  },
];

export default boardCommittees2026_2027;
