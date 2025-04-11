import React, { useState } from "react"; // Importer useState
import { fetchApi } from '../lib/apiConfig';
import { useForm } from "react-hook-form";
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react"; // Importer des icônes supplémentaires
import { useToast } from "@/components/ui/use-toast";
// import { trackFacebookEvent } from '@/lib/facebook'; // Temporairement commenté

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = ({ id = "contact" }: { id?: string }) => {
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    console.log('Envoi du formulaire de contact:', data);

    try {
      // Utiliser la fonction fetchApi du fichier apiConfig.ts
      const response = await fetchApi('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('Réponse du serveur:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Succès
      setSubmitStatus('success');
      form.reset(); // Réinitialiser le formulaire
// // Suivre l'événement avec Facebook - Temporairement commenté
// trackFacebookEvent('ContactFormSubmitted', {
//   subject: data.subject || 'Sans sujet'
// });


      // Afficher un toast de succès
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
        variant: "success",
      });

    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du message:', error);
      console.error('Détails de l\'erreur:', error.message, error.stack);
      setSubmitStatus('error');
      const errorMsg = error.message || 'Une erreur est survenue.';
      setErrorMessage(errorMsg);

      // Afficher un toast d'erreur
      toast({
        title: "Erreur",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id={id}
      className="py-20 px-4 md:px-8 lg:px-12 w-full min-h-screen flex items-center" style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Me Contacter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            N'hésitez pas à me contacter si vous avez des questions ou si vous souhaitez
            collaborer. Je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">Restons en Contact</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">andriantahirynomena@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Téléphone</h4>
                  <p className="text-muted-foreground">+261 34 96 712 22</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Localisation</h4>
                  <p className="text-muted-foreground">Antananarivo, Madagascar</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-2xl font-semibold mb-4">Suivez-moi</h3>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-2xl font-semibold mb-6">Envoyez-moi un Message</h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
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
                        <Input placeholder="Votre email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet</FormLabel>
                      <FormControl>
                        <Input placeholder="Sujet de votre message" {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Votre message"
                          className="min-h-32 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}> {/* Rely on default variant */}
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer le Message
                    </>
                  )}
                </Button>
                {/* Affichage des messages de statut */}
                <div className="mt-4 text-center">
                   {submitStatus === 'success' && (
                    <p className="text-green-600 dark:text-green-400 flex items-center justify-center">
                      <CheckCircle className="mr-2 h-5 w-5" /> Message envoyé avec succès !
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-600 dark:text-red-400 flex items-center justify-center">
                       <AlertCircle className="mr-2 h-5 w-5" /> Erreur : {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
