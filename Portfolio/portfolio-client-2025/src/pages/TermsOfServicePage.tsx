'use client'

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfServicePage = () => {
  useEffect(() => {
    document.title = "Conditions d'Utilisation | Portfolio Andriantahiry Nomenahasina";
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-black dark:text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions d'Utilisation</h1>

          <p className="text-muted-foreground mb-6">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
            <p>
              En accédant et en utilisant ce site web (portfolio.teckforgeek.com), vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser ce site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Propriété intellectuelle</h2>
            <p>
              Ce site et tout son contenu, fonctionnalités et design sont la propriété d'Andriantahiry Nomenahasina et sont protégés par les lois nationales et internationales sur le droit d'auteur, les marques et autres droits de propriété intellectuelle.
            </p>
            <p>
              Vous pouvez consulter et télécharger le contenu de ce site uniquement pour votre usage personnel et non commercial. Vous ne devez pas reproduire, distribuer, modifier, créer des œuvres dérivées, publier, afficher publiquement ou exploiter de quelque manière que ce soit le contenu de ce site sans autorisation écrite préalable.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Utilisation du site</h2>
            <p>En utilisant ce site, vous vous engagez à :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Ne pas utiliser le site d'une manière qui pourrait endommager, désactiver, surcharger ou altérer le site</li>
              <li>Ne pas utiliser de robot, spider ou autre dispositif automatique pour accéder au site</li>
              <li>Ne pas introduire de virus, chevaux de Troie ou autres éléments nuisibles</li>
              <li>Ne pas tenter d'accéder sans autorisation à des parties sécurisées du site</li>
              <li>Respecter toutes les lois applicables lors de l'utilisation du site</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Formulaires et rendez-vous</h2>
            <p>
              Ce site propose des formulaires de contact et de prise de rendez-vous. En utilisant ces formulaires, vous acceptez de fournir des informations exactes et complètes. Je me réserve le droit de refuser ou d'annuler toute demande si je soupçonne que les informations fournies sont fausses ou incomplètes.
            </p>
            <p>
              Les rendez-vous pris via le site sont soumis à confirmation. Je me réserve le droit d'annuler ou de reporter un rendez-vous si nécessaire, en vous informant dans les meilleurs délais.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Liens vers d'autres sites</h2>
            <p>
              Ce site peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement pour votre commodité. Je n'ai aucun contrôle sur le contenu de ces sites et n'assume aucune responsabilité pour le contenu, les politiques de confidentialité ou les pratiques des sites tiers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Limitation de responsabilité</h2>
            <p>
              Dans toute la mesure permise par la loi applicable, je ne serai pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser ce site.
            </p>
            <p>
              Le site est fourni "tel quel" et "tel que disponible", sans garantie d'aucune sorte, expresse ou implicite, y compris, mais sans s'y limiter, les garanties implicites de qualité marchande, d'adéquation à un usage particulier et de non-violation.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Politique de confidentialité</h2>
            <p>
              L'utilisation de ce site est également soumise à notre <a href="/privacy-policy" className="text-primary hover:underline">Politique de Confidentialité</a>, qui décrit comment je collecte, utilise et protège vos données personnelles.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer votre expérience. En utilisant ce site, vous consentez à l'utilisation de cookies conformément à notre <a href="/privacy-policy" className="text-primary hover:underline">Politique de Confidentialité</a>.
            </p>
            <p>
              Vous pouvez gérer vos préférences concernant les cookies via la bannière de cookies présente sur le site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">9. Modifications des conditions</h2>
            <p>
              Je me réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications prendront effet dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement ces conditions pour prendre connaissance des éventuelles modifications.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">10. Droit applicable</h2>
            <p>
              Ces conditions d'utilisation sont régies et interprétées conformément aux lois de Madagascar, sans égard aux principes de conflits de lois.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
            <p>
              Si vous avez des questions concernant ces conditions d'utilisation, veuillez me contacter à :
            </p>
            <p className="font-medium">
              Email : andriantahirynomena@gmail.com<br />
              Téléphone : +261 34 96 712 22
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
