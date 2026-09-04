import BoardGroupPhotosOld from "@/model/BoardGroupPhotos_None"
import boardCommittees2022_2023 from "@/model/BoardMembers2022_2023";
import boardCommittees2023_2024 from "@/model/BoardMembers2023_2024";
import boardCommittees2024_2025 from "@/model/BoardMembers2024_2025";

import OGboardhero from "@/assets/site/OGBoard.jpg";
import boardHero2023_2024 from "@/assets/board-group-photos/23-24_Group_Photos/board.webp";
import boardHero2024_2025 from "@/assets/board-group-photos/24-25_Group_Photos/board.jpg";
import boardHero from "@/assets/site/board-hero.jpg";
import boardHero2026_2027 from "@/assets/board-group-photos/26-27_Group_Photos/Board.jpeg";

import boardCommittees from "@/model/BoardMembers"; 
import boardGroupPhotos from "@/model/BoardGroupPhotos";
import boardCommittees2026_2027 from "@/model/BoardMembers2026_2027";
import boardGroupPhotos2026_2027 from "@/model/BoardGroupPhotos2026_2027";

export interface BoardCommitteeMember {
  name: string;
  role: string;
  linkedin?: string;
  image: string;
}

export interface BoardCommittee {
  title: string;
  members: BoardCommitteeMember[];
}

interface BoardGroupPhoto { 
  title: string;
  photoURL: string;
}

export interface BoardCommitteeWithPhoto extends BoardCommittee {
  photoURL: string;
}

export interface BoardYear {
  id: string;
  label: string;
  heroImage?: string | null;
  committees: BoardCommitteeWithPhoto[];
}

const normalizeTitle = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, "");

const buildCommitteesWithPhotos = (
  committees: BoardCommittee[],
  groupPhotos: BoardGroupPhoto[]
): BoardCommitteeWithPhoto[] => {
  const photosByTitle = new Map(
    groupPhotos.map((groupPhoto) => [normalizeTitle(groupPhoto.title), groupPhoto.photoURL])
  );

  return committees.map((committee) => ({
    ...committee,
    photoURL: photosByTitle.get(normalizeTitle(committee.title)) ?? "",
  }));
};



// Add new board years here by swapping in year-specific committee/photo data.
export const boardYears: BoardYear[] = [
  
  {
    id: "2022-2023",
    label: "Founding Fathers",
    heroImage: OGboardhero,
    committees: buildCommitteesWithPhotos(boardCommittees2022_2023, BoardGroupPhotosOld),
  },
  {
    id: "2023-2024",
    label: "2023-2024",
    heroImage: boardHero2023_2024,
    committees: buildCommitteesWithPhotos(boardCommittees2023_2024, BoardGroupPhotosOld),
  },
  {
    id: "2024-2025",
    label: "2024-2025",
    heroImage: boardHero2024_2025,
    committees: buildCommitteesWithPhotos(boardCommittees2024_2025, BoardGroupPhotosOld),
  },
  {
    id: "2025-2026",
    label: "2025-2026",
    heroImage: boardHero,
    committees: buildCommitteesWithPhotos(boardCommittees, boardGroupPhotos),
  },
  {
    id: "2026-2027",
    label: "2026-2027",
    heroImage: boardHero2026_2027,
    committees: buildCommitteesWithPhotos(boardCommittees2026_2027, boardGroupPhotos2026_2027),
  },
];

export const defaultBoardYearId =
  boardYears.find((boardYear) => boardYear.id === "2026-2027")?.id ?? boardYears[0]?.id ?? "";
