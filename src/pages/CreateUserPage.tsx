// Client/src/pages/CreateUserPage.tsx
import React from 'react';
import Navbar from '../components/Navbar'; // Importer Navbar
import Footer from '../components/Footer'; // Importer Footer
import CreateUserForm from '../components/CreateUserForm'; // Importer le formulaire

const CreateUserPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen"> {/* Ajouter un padding-top pour éviter le chevauchement avec la navbar fixe et assurer une hauteur minimale */}
        <div className="container mx-auto px-4 py-8"> {/* Ajouter un conteneur pour centrer le contenu */}
          {/* Le titre peut être optionnel si la navbar l'indique déjà */}
          {/* <h1 className="text-3xl font-bold text-center mb-8">Page de Création d'Utilisateur</h1> */}
          <CreateUserForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateUserPage;