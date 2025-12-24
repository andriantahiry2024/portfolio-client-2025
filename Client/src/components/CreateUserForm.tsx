// Client/src/components/CreateUserForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from 'lucide-react'; // Pour l'indicateur de chargement

// Définir le type pour les valeurs du formulaire
interface CreateUserFormValues {
  email: string;
  password?: string; // Ajouté, sera rendu obligatoire par la validation
  firstName?: string;
  lastName?: string; // Renommé depuis name
}

const CreateUserForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialiser react-hook-form
  const form = useForm<CreateUserFormValues>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    // Ajouter une validation avec Zod si nécessaire (non inclus ici pour la simplicité)
    // resolver: zodResolver(yourSchema),
  });

  const onSubmit = async (values: CreateUserFormValues) => {
    setMessage('');
    setError('');
    setIsLoading(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    const apiUrl = `${backendUrl}/api/users`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Utiliser les valeurs du formulaire
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setMessage(`Utilisateur créé avec succès ! ID: ${data.id}`);
      form.reset(); // Réinitialiser le formulaire via react-hook-form
    } catch (err: any) {
      console.error("Erreur lors de la création de l'utilisateur:", err);
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-card text-card-foreground rounded-lg shadow-md border border-border">
      <h2 className="text-2xl font-semibold mb-6">Créer un nouvel utilisateur</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            rules={{ required: 'Email est requis' }} // Validation simple
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="nom@exemple.com" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom de famille" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{ required: 'Mot de passe est requis' }} // Validation
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Création...' : 'Créer Utilisateur'}
          </Button>
        </form>
      </Form>
      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-600">Erreur: {error}</p>}
    </div>
  );
};

export default CreateUserForm;