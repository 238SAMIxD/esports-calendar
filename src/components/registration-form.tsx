'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { registerForTournament } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

const registrationFormSchema = z.object({
  teamName: z.string().min(2, {
    message: 'Nazwa drużyny musi mieć co najmniej 2 znaki.',
  }),
  inGameId: z.string().min(3, {
    message: 'ID w grze musi mieć co najmniej 3 znaki.',
  }),
  email: z.string().email({
    message: 'Proszę podać prawidłowy adres e-mail.',
  }),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export function RegistrationForm({ tournamentId }: { tournamentId: string }) {
  const { toast } = useToast();
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
  });

  async function onSubmit(data: RegistrationFormValues) {
    try {
      await registerForTournament({ ...data, tournamentId });
      toast({
        title: 'Rejestracja udana!',
        description: `Twoja drużyna "${data.teamName}" została zarejestrowana.`,
      });
      form.reset({ teamName: '', inGameId: '', email: '' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Rejestracja nie powiodła się',
        description: 'Wystąpił problem z Twoim żądaniem. Proszę spróbować ponownie.',
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zarejestruj się na turniej</CardTitle>
        <CardDescription>
          Zgłoś swoją drużynę do rywalizacji. Rejestracja jest obecnie otwarta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa gracza/drużyny</FormLabel>
                  <FormControl>
                    <Input placeholder="Wpisz nazwę swojej drużyny" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inGameId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID w grze</FormLabel>
                  <FormControl>
                    <Input placeholder="np. Gracz#1234" {...field} />
                  </FormControl>
                  <FormDescription>
                    To jest Twój główny identyfikator w grze.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres e-mail do kontaktu</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ty@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj drużynę'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
