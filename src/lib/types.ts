export interface Creator {
  id: string;
  slug: string;
  name: string;
  handle: string;
  role: 'Kapten' | 'Wakil Kapten' | 'Kreator';
  image: string;
  externalUrl?: string | null;
}

export interface TeamMember {
  creatorId: string;
  creditedName: string;
  position: number;
  captain: boolean;
  creator: Creator;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  code: string;
  color: string;
  image: string;
  members?: TeamMember[];
}

export interface Match {
  id: string;
  label: string; // e.g. "Upper · Ronde 1", "Grand Final"
  teamOne: Team;
  teamTwo: Team;
  scoreOne: number;
  scoreTwo: number;
  bestOf: number;
  winnerTeamId: string;
}

export interface Standing {
  place: string;
  team: Team;
  captainName: string;
}