import type { ImagePlaceholder } from './placeholder-images';

export type Tournament = {
  id: string;
  name: string;
  game: string;
  format: 'Pojedyncza eliminacja' | 'Podwójna eliminacja' | 'Każdy z każdym';
  prizePool: number;
  startDate: string;
  endDate: string;
  location: string;
  status: 'Nadchodzący' | 'W trakcie' | 'Zakończony';
  participants: Participant[];
  description: string;
  image: ImagePlaceholder;
  bracket?: string;
  schedule?: string;
};

export type Participant = {
  id: string;
  name: string;
  inGameId: string;
  email: string;
};

export type Match = {
  id: string;
  round: number;
  participant1: string;
  participant2: string;
  score1?: number;
  score2?: number;
  winner?: string;
};
