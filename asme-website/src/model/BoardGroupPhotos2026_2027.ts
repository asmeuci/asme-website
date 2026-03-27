import exec from "../assets/board-group-photos/exec.png";
import externals from "../assets/board-group-photos/externals.jpg";
import internals from "../assets/board-group-photos/internals.jpg";
import comms from "../assets/board-group-photos/communications.jpg";
import finance from "../assets/board-group-photos/finance.jpg";
import outreach from "../assets/board-group-photos/student-outreach.png";

interface BoardGroupPhoto {
  title: string;
  photoURL: string;
}

const boardGroupPhotos2026_2027: BoardGroupPhoto[] = [
  { title: "Executive", photoURL: exec },
  { title: "Externals", photoURL: externals },
  { title: "Internal", photoURL: internals },
  { title: "Communications", photoURL: comms },
  { title: "Finance", photoURL: finance },
  { title: "Student Outreach", photoURL: outreach },
  { title: "Peterworks", photoURL: "" },
];

export default boardGroupPhotos2026_2027;
