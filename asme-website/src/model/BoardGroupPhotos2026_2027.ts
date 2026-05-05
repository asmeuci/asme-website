import exec from "../assets/board-group-photos/26-27_Group_Photos/Exec.jpeg";
import externals from "../assets/board-group-photos/26-27_Group_Photos/Externals.jpeg";
import internals from "../assets/board-group-photos/26-27_Group_Photos/Internals.jpeg";
import comms from "../assets/board-group-photos/26-27_Group_Photos/Communications.jpeg";
import finance from "../assets/board-group-photos/26-27_Group_Photos/Finance.jpeg";
import outreach from "../assets/board-group-photos/26-27_Group_Photos/Student Outreach.jpeg";

interface BoardGroupPhoto {
  title: string;
  photoURL: string;
}

const boardGroupPhotos2026_2027: BoardGroupPhoto[] = [
  { title: "Executive", photoURL: exec },
  { title: "Externals", photoURL: externals },
  { title: "Internals", photoURL: internals },
  { title: "Communications", photoURL: comms },
  { title: "Finance", photoURL: finance },
  { title: "Student Outreach", photoURL: outreach },
  { title: "Peterworks", photoURL: "" },
];

export default boardGroupPhotos2026_2027;
