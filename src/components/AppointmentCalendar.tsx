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

export function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  // Désactiver les dates passées et les week-ends
  const disabledDays = React.useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    return isBefore(date, today) || day === 0 || day === 6;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !name || !email) return;

    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const appointmentData = {
      date: format(selectedDate, 'dd/MM/yyyy'), // Format attendu par le backend
      time: selectedTime,
      name,
      email,
      message,
    };

    try {
      // Remplacer par l'URL de votre API backend
      const response = await fetch('http://localhost:3001/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Succès
      setSubmitStatus('success');
      // Optionnel: Réinitialiser le formulaire ou afficher un message de succès
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setName('');
      setEmail('');
      setMessage('');

    } catch (error: any) {
      console.error('Erreur lors de la prise de rendez-vous:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white"> 
      <h1 className='text-center mt-10 text-2xl font-bold'>Prendre un rendez-vous</h1>
      <CardHeader>
        <CardTitle>Prendre un rendez-vous</CardTitle>
        <CardDescription>
          Choisissez une date et un créneau horaire pour planifier notre rencontre.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optionnel)</Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Détails supplémentaires..."
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!selectedDate || !selectedTime || !name || !email || isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? 'Envoi en cours...' : 'Confirmer le rendez-vous'}
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
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Les rendez-vous sont disponibles du lundi au vendredi, de 9h à 17h.
      </CardFooter>
    </Card>
  );
}

export default AppointmentCalendar; 