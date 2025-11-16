'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateTournamentBracket } from '@/ai/flows/generate-tournament-bracket.ts';
import type { GenerateTournamentBracketOutput } from '@/ai/flows/generate-tournament-bracket.ts';
import type { Tournament } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const bracketFormSchema = z.object({
  constraints: z.string().optional(),
});

type BracketFormValues = z.infer<typeof bracketFormSchema>;

export default function BracketGenerator({ tournament }: { tournament: Tournament }) {
  const { toast } = useToast();
  const [bracketData, setBracketData] = useState<GenerateTournamentBracketOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BracketFormValues>({
    resolver: zodResolver(bracketFormSchema),
  });

  async function onSubmit(data: BracketFormValues) {
    setIsLoading(true);
    setBracketData(null);
    try {
      const participantsList = tournament.participants.map(p => p.name).join(', ');
      
      if (tournament.participants.length < 2) {
        toast({
          variant: 'destructive',
          title: 'Niewystarczająca liczba uczestników',
          description: 'Do wygenerowania drabinki potrzebnych jest co najmniej 2 uczestników.',
        });
        setIsLoading(false);
        return;
      }
      
      const result = await generateTournamentBracket({
        tournamentFormat: tournament.format,
        registeredParticipants: participantsList,
        constraints: data.constraints,
      });

      setBracketData(result);
      toast({
        title: 'Drabinka wygenerowana!',
        description: 'Drabinka turniejowa i harmonogram zostały utworzone.',
      });
    } catch (error) {
      console.error('Błąd generowania drabinki:', error);
      toast({
        variant: 'destructive',
        title: 'Generowanie nie powiodło się',
        description: 'Nie można wygenerować drabinki. Proszę spróbować ponownie.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generuj drabinkę</CardTitle>
          <CardDescription>
            Użyj AI, aby automatycznie wygenerować drabinkę turniejową i harmonogram meczów na podstawie zarejestrowanych uczestników.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <h4 className="font-medium">Zarejestrowani uczestnicy ({tournament.participants.length})</h4>
                <p className="text-sm text-muted-foreground">
                  {tournament.participants.map(p => p.name).join(', ') || 'Brak zarejestrowanych uczestników.'}
                </p>
              </div>
               <div>
                <h4 className="font-medium">Format turnieju</h4>
                <p className="text-sm text-muted-foreground">
                  {tournament.format}
                </p>
              </div>
              <FormField
                control={form.control}
                name="constraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specjalne ograniczenia (opcjonalnie)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="np. 'Team Solomid i Cloud9 nie mogą grać w pierwszej rundzie.'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading || tournament.participants.length < 2}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Generowanie...' : 'Generuj z AI'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Wygenerowany wynik</CardTitle>
          <CardDescription>Wygenerowana drabinka i harmonogram pojawią się tutaj.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {bracketData ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Drabinka</h4>
                <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">{bracketData.bracket}</pre>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Harmonogram meczów</h4>
                <pre className="text-sm bg-muted p-4 rounded-md overflow-x-auto">{bracketData.matchSchedule}</pre>
              </div>
            </div>
          ) : (
            !isLoading && (
              <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Wygenerowana treść zostanie wyświetlona tutaj.</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
