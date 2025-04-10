import { useState, useEffect } from 'react';

interface ApiResponse {
  message: string;
  status: string;
  endpoints: string[];
}

export default function ApiTest() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [requestInfo, setRequestInfo] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRequestInfo('Tentative de connexion à http://localhost:3001/...');

        // Utiliser le proxy configuré dans vite.config.ts
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onload = function() {
          setRequestInfo(prev => prev + `\nRéponse reçue avec statut: ${xhr.status}`);

          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const result = JSON.parse(xhr.responseText);
              setRequestInfo(prev => prev + '\nDonnées JSON reçues avec succès');
              setData(result);
              setLoading(false);
            } catch (parseError) {
              setRequestInfo(prev => prev + `\nErreur de parsing JSON: ${parseError}`);
              setError('Erreur lors du parsing de la réponse JSON');
              setLoading(false);
            }
          } else {
            setRequestInfo(prev => prev + `\nErreur HTTP: ${xhr.status}`);
            setError(`Erreur HTTP: ${xhr.status}`);
            setLoading(false);
          }
        };

        xhr.onerror = function() {
          setRequestInfo(prev => prev + '\nErreur de connexion réseau');
          setError('Erreur de connexion réseau. Vérifiez que le serveur backend est en cours d\'exécution.');
          setLoading(false);
        };

        xhr.send();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue';
        setRequestInfo(prev => prev + `\nErreur: ${errorMessage}`);
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const retryConnection = () => {
    setLoading(true);
    setError(null);
    setRequestInfo('');
    setData(null);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Test de l'API Backend</h2>

      <div className="mb-4 p-2 bg-gray-100 rounded text-sm font-mono whitespace-pre-wrap">
        {requestInfo || 'Aucune information de requête disponible'}
      </div>

      {loading && <div className="p-2 bg-blue-100 rounded">Chargement...</div>}

      {error && (
        <div className="p-2 bg-red-100 rounded mb-4">
          <p className="text-red-600 font-semibold">Erreur: {error}</p>
          <button
            onClick={retryConnection}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Réessayer
          </button>
        </div>
      )}

      {data && (
        <div className="p-2 bg-green-100 rounded">
          <p><span className="font-semibold">Message:</span> {data.message}</p>
          <p><span className="font-semibold">Status:</span> {data.status}</p>
          <div className="mt-2">
            <p className="font-semibold">Endpoints disponibles:</p>
            <ul className="list-disc pl-5">
              {data.endpoints.map((endpoint, index) => (
                <li key={index}>{endpoint}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
