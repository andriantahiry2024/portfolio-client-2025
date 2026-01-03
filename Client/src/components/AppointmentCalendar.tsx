'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, addDays, setHours, setMinutes, isBefore, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface TimeSlot {
  time: string;
  available: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof formSchema>;

export function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Désactiver les dates passées et les week-ends
  const disabledDays = React.useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    return isBefore(date, today) || day === 0 || day === 6;
  }, []);

  const onSubmit = async (data: AppointmentFormValues) => {
    if (!selectedDate || !selectedTime) {
      setErrorMessage("Veuillez sélectionner une date et une heure.");
      setSubmitStatus('error');
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const appointmentDate = format(selectedDate, 'dd/MM/yyyy');
    const appointmentDatetime = `${appointmentDate} ${selectedTime}`;

    try {
      // Configuration Telegram
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      const text = `📅 Nouveau Rendez-vous !\n\n👤 Nom: ${data.name}\n📧 Email: ${data.email}\n📅 Date: ${appointmentDate}\n⏰ Heure: ${selectedTime}\n📝 Message: ${data.message || 'Aucun message'}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      // On considère l'envoi comme réussi (Pabbly reçoit bien la requête).
      setSubmitStatus('success');
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      form.reset();
    } catch (error: any) {
      console.error('Erreur lors de la prise de rendez-vous:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error.message ||
        "Une erreur est survenue lors de l'envoi du rendez-vous. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card text-card-foreground border-border shadow-none">
      <h1 className='text-center mt-10 text-2xl font-black text-foreground uppercase tracking-widest'>Audit IA & Automation</h1>
      <CardHeader>
        <CardTitle className="text-center">Réserver votre session (15 min)</CardTitle>
        <CardDescription className="text-center">
          Identifions ensemble comment libérer du temps et optimiser vos revenus grâce aux dernières technologies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={disabledDays}
                  locale={fr}
                  className="rounded-md border"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label>Créneaux disponibles</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <AnimatePresence>
                      {timeSlots.map((slot) => (
                        <motion.div
                          key={slot.time}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            type="button"
                            variant={selectedTime === slot.time ? 'default' : 'outline'}
                            className={cn(
                              'w-full',
                              !slot.available && 'opacity-50 cursor-not-allowed'
                            )}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                          >
                            {slot.time}
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complet</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="votre@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Détails supplémentaires..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!selectedDate || !selectedTime || isLoading}
                className="w-full md:w-auto bg-foreground text-background hover:opacity-90 font-bold shadow-none transition-all rounded-md"
              >
                {isLoading ? 'Envoi en cours...' : 'Confirmer mon Audit Gratuit'}
              </Button>
            </div>
            {/* Affichage des messages de statut */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-green-600 dark:text-green-400 text-center"
                >
                  Rendez-vous confirmé avec succès !
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-red-600 dark:text-red-400 text-center"
                >
                  Erreur : {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Les rendez-vous sont disponibles du lundi au vendredi, de 9h à 17h.
      </CardFooter>
    </Card>
  );
}

export default AppointmentCalendar; 