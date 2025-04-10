'use client'

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.title = "Politique de Confidentialité | Portfolio Andriantahiry Nomenahasina";
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Politique de Confidentialité</h1>

          <p className="text-muted-foreground mb-6">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Bienvenue sur le portfolio d'Andriantahiry Nomenahasina. Je m'engage à protéger votre vie privée et vos données personnelles.
              Cette politique de confidentialité explique comment je collecte, utilise et protège vos informations lorsque vous visitez mon site web.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Collecte des données</h2>
            <p>Je collecte les informations suivantes lorsque vous interagissez avec mon site :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Informations que vous fournissez volontairement (nom, adresse e-mail, message) lorsque vous utilisez le formulaire de contact ou prenez rendez-vous</li>
              <li>Informations collectées automatiquement (adresse IP, type de navigateur, pages visitées, date et heure de visite)</li>
              <li>Cookies et technologies similaires pour améliorer votre expérience sur le site</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Utilisation des données</h2>
            <p>J'utilise vos données personnelles pour :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Répondre à vos demandes et messages</li>
              <li>Gérer les rendez-vous que vous prenez via le site</li>
              <li>Améliorer mon site web et votre expérience utilisateur</li>
              <li>Analyser l'utilisation du site et établir des statistiques anonymes</li>
              <li>Me conformer aux obligations légales</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Cookies et technologies similaires</h2>
            <p>
              Mon site utilise des cookies et technologies similaires pour améliorer votre expérience.
              Les cookies sont de petits fichiers texte stockés sur votre appareil qui me permettent de :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Mémoriser vos préférences (comme le mode sombre/clair)</li>
              <li>Comprendre comment vous utilisez le site</li>
              <li>Personnaliser votre expérience</li>
              <li>Améliorer la sécurité du site</li>
            </ul>
            <p>
              Vous pouvez gérer vos préférences concernant les cookies via la bannière de cookies présente sur le site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Partage des données</h2>
            <p>
              Je ne vends ni ne loue vos données personnelles à des tiers. Vos informations peuvent être partagées uniquement dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Avec des prestataires de services qui m'aident à gérer le site (hébergement, analyse, etc.)</li>
              <li>Si la loi m'y oblige</li>
              <li>Pour protéger mes droits, ma propriété ou ma sécurité</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Intégrations tierces</h2>
            <p>
              Ce site utilise certains services tiers qui peuvent collecter des données :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Google Analytics pour analyser l'utilisation du site</li>
              <li>Google Calendar pour la gestion des rendez-vous</li>
              <li>Facebook Business pour les fonctionnalités sociales et publicitaires</li>
              <li>n8n pour l'automatisation des notifications</li>
            </ul>
            <p>
              Chacun de ces services dispose de sa propre politique de confidentialité que je vous invite à consulter.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
            <p>
              Pour exercer ces droits, veuillez me contacter à l'adresse email : andriantahirynomena@gmail.com
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Sécurité des données</h2>
            <p>
              Je prends la sécurité de vos données très au sérieux et j'utilise des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Modifications de la politique de confidentialité</h2>
            <p>
              Je peux mettre à jour cette politique de confidentialité de temps à autre. La version la plus récente sera toujours disponible sur cette page avec la date de dernière mise à jour.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité ou la manière dont je traite vos données personnelles, veuillez me contacter à :
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

export default PrivacyPolicyPage;
