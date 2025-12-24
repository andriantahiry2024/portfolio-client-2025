import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background py-20 px-4 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto">
                <Link to="/">
                    <Button variant="ghost" className="mb-8 group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Retour à l'accueil
                    </Button>
                </Link>

                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-3 rounded-xl">
                        <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Politique de Confidentialité</h1>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                        <p>
                            Bienvenue sur le portfolio de <strong>Teckforgeek</strong>. Nous accordons une grande importance à la protection de vos données personnelles. Cette politique détaille comment nous collectons et utilisons vos informations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Données Collectées</h2>
                        <p>
                            Nous collectons uniquement les informations que vous nous transmettez volontairement via nos formulaires :
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Nom et prénom</li>
                            <li>Adresse e-mail</li>
                            <li>Sujet et contenu de votre message</li>
                            <li>Date et heure de rendez-vous (via le calendrier)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">3. Utilisation des Données</h2>
                        <p>
                            Les données collectées sont utilisées exclusivement pour :
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Répondre à vos demandes de contact</li>
                            <li>Gérer vos prises de rendez-vous</li>
                            <li>Améliorer l'expérience utilisateur sur le site</li>
                        </ul>
                        <p className="mt-4 italic">
                            Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Stockage et Sécurité</h2>
                        <p>
                            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, altération ou divulgation. Les formulaires sont transmis via des protocoles sécurisés (HTTPS).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">5. Vos Droits</h2>
                        <p>
                            Conformément à la réglementation sur la protection des données, vous disposez des droits suivants :
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Droit d'accès à vos données</li>
                            <li>Droit de rectification en cas d'erreur</li>
                            <li>Droit à l'effacement ("droit à l'oubli")</li>
                            <li>Droit d'opposition au traitement</li>
                        </ul>
                        <p className="mt-4">
                            Pour exercer ces droits, contactez-nous à : <a href="mailto:andriantahirynomena@gmail.com" className="text-primary hover:underline">andriantahirynomena@gmail.com</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies</h2>
                        <p>
                            Ce site peut utiliser des cookies techniques essentiels au bon fonctionnement (préférences de thème, navigation). Aucun cookie de traçage publicitaire n'est utilisé.
                        </p>
                    </section>

                    <div className="pt-8 border-t text-sm">
                        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
