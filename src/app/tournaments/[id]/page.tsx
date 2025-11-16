import { getTournamentById } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Gamepad2,
  MapPin,
  Trophy,
  Users,
  Swords,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Image from 'next/image';
import { RegistrationForm } from '@/components/registration-form';
import BracketGenerator from '@/components/bracket-generator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export default async function TournamentPage({
  params,
}: {
  params: { id: string };
}) {
  const tournament = await getTournamentById(params.id);

  if (!tournament) {
    notFound();
  }
  
  const statusColors = {
    Nadchodzący: 'bg-blue-500',
    'W trakcie': 'bg-green-500',
    Zakończony: 'bg-gray-500',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg shadow-xl">
        <Image
          src={tournament.image.imageUrl}
          alt={tournament.name}
          fill
          className="object-cover"
          data-ai-hint={tournament.image.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <Badge className={`mb-2 text-white ${statusColors[tournament.status]}`}>
            {tournament.status}
          </Badge>
          <h1 className="text-4xl font-bold text-white shadow-black [text-shadow:0_2px_4px_var(--tw-shadow-color)] font-headline">
            {tournament.name}
          </h1>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Szczegóły</TabsTrigger>
          <TabsTrigger value="bracket">Drabinka i harmonogram</TabsTrigger>
          <TabsTrigger value="register">Zarejestruj się</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Szczegóły turnieju</CardTitle>
              <CardDescription>{tournament.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <Gamepad2 className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Gra</h3>
                  <p className="text-muted-foreground">{tournament.game}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Swords className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Format</h3>
                  <p className="text-muted-foreground">{tournament.format}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CalendarDays className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Daty</h3>
                  <p className="text-muted-foreground">
                    {format(new Date(tournament.startDate), 'PPP', { locale: pl })} - {format(new Date(tournament.endDate), 'PPP', { locale: pl })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Trophy className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Pula nagród</h3>
                  <p className="text-muted-foreground">
                    {tournament.prizePool.toLocaleString()} PLN
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Lokalizacja</h3>
                  <p className="text-muted-foreground">{tournament.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Uczestnicy</h3>
                  <p className="text-muted-foreground">
                    {tournament.participants.length} Zarejestrowanych
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Uczestnicy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tournament.participants.map(p => (
                  <div key={p.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${p.name}.png`} />
                      <AvatarFallback>{p.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.inGameId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </TabsContent>
        <TabsContent value="bracket">
          <BracketGenerator tournament={tournament} />
        </TabsContent>
        <TabsContent value="register">
          <RegistrationForm tournamentId={tournament.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
