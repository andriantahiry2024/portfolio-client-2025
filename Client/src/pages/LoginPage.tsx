// Client/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom'; // Pour la redirection et le lien
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
import { Loader2 } from 'lucide-react';
// Importer Navbar et Footer si nécessaire pour la mise en page
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Importer un contexte ou un store pour gérer l'état d'authentification (Exemple simple)
// import { useAuth } from '../context/AuthContext'; // Supposons qu'un tel contexte existe

interface LoginFormValues {
  email: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const { login } = useAuth(); // Utiliser la fonction de connexion du contexte

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError('');
    setIsLoading(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    const apiUrl = `${backendUrl}/api/login`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      // --- Gestion de l'authentification côté client ---
      // 1. Stocker le token (localStorage, sessionStorage, ou mieux: contexte/store)
      localStorage.setItem('authToken', data.token); // Exemple simple avec localStorage
      localStorage.setItem('userData', JSON.stringify(data.user)); // Stocker les infos utilisateur

      // 2. Mettre à jour l'état global d'authentification (via contexte/store)
      // login(data.user, data.token); // Appeler la fonction du contexte

      // 3. Rediriger l'utilisateur
      // Rediriger vers le dashboard admin si l'utilisateur est ADMIN ou SUPERADMIN
      if (data.user.role === 'ADMIN' || data.user.role === 'SUPERADMIN') {
        navigate('/admin');
      } else {
        navigate('/'); // Rediriger vers l'accueil pour les autres rôles
      }

    } catch (err: any) {
      console.error("Erreur lors de la connexion:", err);
      setError(err.message || 'Une erreur est survenue.');
      localStorage.removeItem('authToken'); // Nettoyer en cas d'erreur
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6 bg-card text-card-foreground rounded-lg shadow-md border border-border">
          <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                rules={{ required: 'Email est requis' }}
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
                name="password"
                rules={{ required: 'Mot de passe est requis' }}
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
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Connexion...' : 'Se Connecter'}
              </Button>
            </form>
          </Form>
          {/* Optionnel: Lien vers la page d'inscription */}
          <p className="mt-4 text-center text-sm">
            Pas encore de compte ? <Link to="/create-user" className="text-indigo-600 hover:underline">Inscrivez-vous</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;