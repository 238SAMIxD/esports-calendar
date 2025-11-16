import { TournamentForm } from '@/components/tournament-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CreateTournamentPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary font-headline">Utwórz nowy turniej</CardTitle>
          <CardDescription>Wypełnij poniższe szczegóły, aby zorganizować kolejne wydarzenie e-sportowe.</CardDescription>
        </CardHeader>
        <CardContent>
          <TournamentForm />
        </CardContent>
      </Card>
    </div>
  );
}
