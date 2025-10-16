import { useEffect, useState } from 'react';
import type { BoletinAPIResponse, Boletin } from '../types/boletines';
import { mapBoletinesFromAPI } from '../types/boletines';

const API_URL = `${import.meta.env.PUBLIC_CMS_API_BASE_URL}/boletines`;
const CMS_BASE_URL = import.meta.env.PUBLIC_CMS_STORAGE_BASE_URL;

export const BoletinesContainer = () => {
  const [boletines, setBoletines] = useState<Boletin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoletines = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          method: 'GET',
          redirect: 'follow',
        });

        if (!response.ok) {
          throw new Error(`Error al cargar los boletines: ${response.status}`);
        }

        const data: BoletinAPIResponse[] = await response.json();

        // Mapear los boletines
        const boletinesMapeados = mapBoletinesFromAPI(data);

        setBoletines(boletinesMapeados);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching boletines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoletines();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryEvent"></div>
        <p className="ml-4 text-gray-600">Cargando boletines...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (boletines.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No se encontraron boletines.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {boletines.map((boletin) => {
        const imageUrl = boletin.previewPath.startsWith('http')
          ? boletin.previewPath
          : `${CMS_BASE_URL}${boletin.previewPath}`;

        return (
          <a
            key={boletin.id}
            href={boletin.toLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative overflow-hidden bg-gray-200">
              <img
                src={imageUrl}
                alt="Boletín FELAC"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </a>
        );
      })}
    </div>
  );
};
