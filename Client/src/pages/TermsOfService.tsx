import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
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
                        <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Conditions d'Utilisation</h1>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Objet</h2>
                        <p>
                            Les présentes Conditions Générales d'Utilisation (CGU) encadrent l'accès et l'utilisation du site portfolio de <strong>Teckforgeek</strong>. En naviguant sur ce site, vous acceptez sans réserve ces conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Propriété Intellectuelle</h2>
                        <p>
                            L'ensemble du contenu présent sur ce site (textes, images, logos, code source, designs, animations 3D) est la propriété exclusive de <strong>Teckforgeek</strong>, sauf mention contraire.
                        </p>
                        <p className="mt-2 text-destructive font-medium">
                            Toute reproduction, représentation, modification ou adaptation totale ou partielle de ces éléments est strictement interdite sans autorisation écrite préalable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">3. Responsabilité</h2>
                        <p>
                            L'auteur s'efforce de fournir des informations précises et à jour sur ce portfolio. Toutefois :
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>L'utilisation des informations et outils fournis se fait sous l'entière responsabilité de l'utilisateur.</li>
                            <li>L'auteur ne peut être tenu responsable des bugs, interruptions de service ou dommages liés à l'utilisation du site.</li>
                            <li>Les liens externes pointant vers d'autres sites n'engagent pas la responsabilité de Teckforgeek quant à leur contenu.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Services de Contact et Prise de RDV</h2>
                        <p>
                            L'utilisateur s'engage à utiliser le formulaire de contact et le calendrier de rendez-vous de manière licite. Tout comportement abusif (spam, messages injurieux, fausses réservations) pourra entraîner un blocage de l'accès aux services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">5. Modification des Conditions</h2>
                        <p>
                            Teckforgeek se réserve le droit de modifier les présentes conditions à tout moment pour les adapter aux évolutions du site ou de la législation. Il est conseillé de les consulter régulièrement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">6. Droit Applicable</h2>
                        <p>
                            Le présent site est régi par le droit en vigueur à Madagascar. En cas de litige, et après échec de toute tentative de solution amiable, les tribunaux d'Antananarivo seront seuls compétents.
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

export default TermsOfService;
