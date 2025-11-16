'use client';

import { useState, useMemo } from 'react';
import { TournamentCard } from '@/components/tournament-card';
import { tournaments as allTournaments } from '@/lib/placeholder-data';
import type { Tournament } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Gamepad2, Search } from 'lucide-react';

const games = Array.from(new Set(allTournaments.map((t) => t.game)));
const formats = Array.from(new Set(allTournaments.map((t) => t.format)));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');

  const filteredTournaments = useMemo(() => {
    return allTournaments.filter((tournament: Tournament) => {
      const matchesSearch = tournament.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGame =
        selectedGame === 'all' || tournament.game === selectedGame;
      const matchesFormat =
        selectedFormat === 'all' || tournament.format === selectedFormat;
      return matchesSearch && matchesGame && matchesFormat;
    });
  }, [searchTerm, selectedGame, selectedFormat]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Znajdź swoje następne wyzwanie
        </h1>
        <p className="mt-3 text-lg text-muted-foreground md:text-xl">
          Przeglądaj nadchodzące i trwające turnieje e-sportowe.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Szukaj po nazwie turnieju..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Select
            value={selectedGame}
            onValueChange={setSelectedGame}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtruj po grze" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie gry</SelectItem>
              {games.map((game) => (
                <SelectItem key={game} value={game}>
                  {game}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedFormat}
            onValueChange={setSelectedFormat}
          >
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Filtruj po formacie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie formaty</SelectItem>
              {formats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Gamepad2 className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Nie znaleziono turniejów</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Spróbuj dostosować kryteria wyszukiwania lub filtrowania.
          </p>
        </div>
      )}
    </div>
  );
}
