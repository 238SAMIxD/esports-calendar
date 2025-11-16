'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const tournamentFormSchema = z.object({
  name: z.string(),
  game: z.string(),
  format: z.enum(['Pojedyncza eliminacja', 'Podwójna eliminacja', 'Każdy z każdym']),
  prizePool: z.coerce.number(),
  startDate: z.date(),
  location: z.enum(['Online', 'Offline']),
});

const registrationFormSchema = z.object({
  tournamentId: z.string(),
  teamName: z.string(),
  inGameId: z.string(),
  email: z.string().email(),
});

// This is a mock action. In a real app, you'd save this to a database.
export async function createTournament(data: unknown) {
  const parsedData = tournamentFormSchema.parse(data);
  console.log('Creating tournament with data:', parsedData);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, you would revalidate the path to the tournaments list
  // to show the newly created one.
  revalidatePath('/');
  
  return { success: true, data: parsedData };
}

// This is a mock action. In a real app, you'd save this to a database.
export async function registerForTournament(data: unknown) {
  const parsedData = registrationFormSchema.parse(data);
  console.log('Registering team with data:', parsedData);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you would revalidate the path of the specific tournament
  // to update the participant list.
  revalidatePath(`/tournaments/${parsedData.tournamentId}`);
  
  return { success: true, data: parsedData };
}
