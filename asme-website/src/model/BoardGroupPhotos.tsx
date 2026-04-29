import exec from "../assets/board-group-photos/25-26_Group_Photos/exec.png"
import externals from "../assets/board-group-photos/25-26_Group_Photos/externals.jpg"
import internals from "../assets/board-group-photos/25-26_Group_Photos/internals.jpg"
import communications from "../assets/board-group-photos/25-26_Group_Photos/communications.jpg"
import finance from "../assets/board-group-photos/25-26_Group_Photos/finance.jpg"
import outreach from "../assets/board-group-photos/25-26_Group_Photos/student-outreach.png"



interface BoardCommittee {
  title: string;
  photoURL: string;
}


const boardGroupPhotos: BoardCommittee[] = [
    {
        title : "Executive",
        photoURL : exec
    },
    {
        title : "Externals",
        photoURL : externals
    },
    {
        title : "Internal",
        photoURL : internals
    },
    {
        title : "Communications",
        photoURL : communications
    },
    {
        title : "Finance",
        photoURL : finance
    },
    {
        title: "Student Outreach",
        photoURL : outreach
    },
    {
        title : "PeterWorks",
        photoURL : ""
    }
];

export default boardGroupPhotos;
