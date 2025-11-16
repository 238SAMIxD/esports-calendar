import type { Tournament, Participant } from './types';
import { PlaceHolderImages } from './placeholder-images';

const participants: Participant[] = [
  { id: 'p1', name: 'Górnicy', inGameId: 'Gornicy_Gracz1', email: 'gornicy@example.com' },
  { id: 'p2', name: 'Smoki', inGameId: 'Smoki_Gracz1', email: 'smoki@example.com' },
  { id: 'p3', name: 'Orły', inGameId: 'Orly_Gracz1', email: 'orly@example.com' },
  { id: 'p4', name: 'Lwy', inGameId: 'Lwy_Gracz1', email: 'lwy@example.com' },
  { id: 'p5', name: 'Tytani', inGameId: 'Tytani_Gracz1', email: 'tytani@example.com' },
  { id: 'p6', name: 'Wilki', inGameId: 'Wilki_Gracz1', email: 'wilki@example.com' },
  { id: 'p7', name: 'Grom', inGameId: 'Grom_Gracz1', email: 'grom@example.com' },
  { id: 'p8', name: 'Błyskawica', inGameId: 'Blyskawica_Gracz1', email: 'blyskawica@example.com' },
];

export const tournaments: Tournament[] = [
  {
    id: '1',
    name: 'Valorant Champions Tour: Masters Polska',
    game: 'Valorant',
    format: 'Podwójna eliminacja',
    prizePool: 200000,
    startDate: '2024-08-01',
    endDate: '2024-08-15',
    location: 'Online',
    status: 'Nadchodzący',
    participants: participants.slice(0, 8),
    description: 'Najlepsze polskie drużyny Valorant rywalizują o tytuł mistrza Masters. Podwójna eliminacja gwarantuje intensywną akcję.',
    image: PlaceHolderImages.find(img => img.id === 'valorant-esports')!,
  },
  {
    id: '2',
    name: 'Mistrzostwa Polski w League of Legends',
    game: 'League of Legends',
    format: 'Każdy z każdym',
    prizePool: 1000000,
    startDate: '2024-09-10',
    endDate: '2024-10-25',
    location: 'Katowice',
    status: 'Nadchodzący',
    participants: participants.slice(0, 6),
    description: 'Szczyt polskiego e-sportu w League of Legends. Drużyny z całego kraju walczą w fazie grupowej, a następnie w drabince pucharowej.',
    image: PlaceHolderImages.find(img => img.id === 'league-of-legends-esports')!,
  },
  {
    id: '3',
    name: 'CS:GO Major: Kraków',
    game: 'Counter-Strike: GO',
    format: 'Pojedyncza eliminacja',
    prizePool: 500000,
    startDate: '2024-07-20',
    endDate: '2024-07-30',
    location: 'Kraków',
    status: 'W trakcie',
    participants: participants.slice(2, 6),
    description: 'Legendarny turniej CS:GO, gdzie rodzą się legendy. Brutalny format pojedynczej eliminacji oznacza, że każdy mecz ma znaczenie.',
    image: PlaceHolderImages.find(img => img.id === 'csgo-esports')!,
  },
  {
    id: '4',
    name: 'The International - Puchar Polski Dota 2',
    game: 'Dota 2',
    format: 'Podwójna eliminacja',
    prizePool: 1500000,
    startDate: '2024-10-05',
    endDate: '2024-10-15',
    location: 'Gdańsk',
    status: 'Nadchodzący',
    participants: participants.slice(0, 8),
    description: 'Największa pula nagród w historii polskiego e-sportu. The International to ostateczny test umiejętności, strategii i pracy zespołowej w Dota 2.',
    image: PlaceHolderImages.find(img => img.id === 'dota2-esports')!,
  },
  {
    id: '5',
    name: 'Overwatch Champions Series - Polska',
    game: 'Overwatch 2',
    format: 'Każdy z każdym',
    prizePool: 150000,
    startDate: '2024-06-15',
    endDate: '2024-07-01',
    location: 'Online',
    status: 'Zakończony',
    participants: participants.slice(4, 8),
    description: 'Nowa era e-sportu w Overwatch. Drużyny walczą w wyczerpującej fazie każdy z każdym, aby zapewnić sobie miejsce w finale.',
    image: PlaceHolderImages.find(img => img.id === 'overwatch-esports')!,
  },
  {
    id: '6',
    name: 'Mistrzostwa Polski w Rocket League',
    game: 'Rocket League',
    format: 'Pojedyncza eliminacja',
    prizePool: 100000,
    startDate: '2024-08-25',
    endDate: '2024-08-28',
    location: 'Online',
    status: 'Nadchodzący',
    participants: participants.slice(0, 4),
    description: 'Wysokooktanowa piłka nożna na kołach w najlepszym wydaniu. Drużyny zmierzą się w szybkiej drabince pojedynczej eliminacji, w której tylko jedna może zostać mistrzem.',
    image: PlaceHolderImages.find(img => img.id === 'rocket-league-esports')!,
  },
];

export function getTournaments(): Promise<Tournament[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tournaments);
    }, 500);
  });
}

export function getTournamentById(id: string): Promise<Tournament | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tournaments.find(t => t.id === id));
    }, 300);
  });
}
