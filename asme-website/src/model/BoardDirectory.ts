import boardHero from "@/assets/site/board-hero.jpg";
import boardCommittees from "@/model/BoardMembers";
import boardGroupPhotos from "@/model/BoardGroupPhotos";
import boardCommittees2026_2027 from "@/model/BoardMembers2026_2027";
import boardGroupPhotos2026_2027 from "@/model/BoardGroupPhotos2026_2027";

export interface BoardCommitteeMember {
  name: string;
  role: string;
  linkedin: string;
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
  heroImage: string;
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
    id: "2025-2026",
    label: "2025-2026",
    heroImage: boardHero,
    committees: buildCommitteesWithPhotos(boardCommittees, boardGroupPhotos),
  },
  {
    id: "2026-2027",
    label: "2026-2027",
    heroImage: boardHero,
    committees: buildCommitteesWithPhotos(boardCommittees2026_2027, boardGroupPhotos2026_2027),
  },
];

export const defaultBoardYearId =
  boardYears.find((boardYear) => boardYear.id === "2026-2027")?.id ?? boardYears[0]?.id ?? "";
