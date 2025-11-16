import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Tournament } from '@/lib/types';
import { Calendar, Gamepad2, Trophy, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

type TournamentCardProps = {
  tournament: Tournament;
};

export function TournamentCard({ tournament }: TournamentCardProps) {
  const statusColors: { [key: string]: string } = {
    Nadchodzący: 'border-blue-500/50 text-blue-500',
    'W trakcie': 'border-green-500/50 text-green-500',
    Zakończony: 'border-gray-500/50 text-gray-500',
  };

  return (
    <Link href={`/tournaments/${tournament.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:shadow-primary/20 group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader className="relative h-48 w-full p-0">
          <Image
            src={tournament.image.imageUrl}
            alt={tournament.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={tournament.image.imageHint}
          />
          <div className="absolute right-3 top-3">
            <Badge variant="outline" className={`bg-card/80 backdrop-blur-sm ${statusColors[tournament.status]}`}>
              {tournament.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-3 pt-6">
          <h3 className="text-xl font-bold font-headline">{tournament.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gamepad2 className="h-4 w-4" />
            <span>{tournament.game}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(tournament.startDate), 'd MMM yyyy', { locale: pl })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="h-4 w-4" />
            <span>{tournament.prizePool.toLocaleString()} PLN</span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-3">
          <span className="text-sm font-semibold text-primary">Zobacz turniej</span>
          <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </CardFooter>
      </Card>
    </Link>
  );
}
