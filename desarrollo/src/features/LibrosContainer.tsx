import { useEffect, useState } from 'react';
import type { LibroAPIResponse, Libro } from '../types/libros';
import { mapLibrosFromAPI } from '../types/libros';

const API_URL = `${import.meta.env.PUBLIC_CMS_API_BASE_URL}/libros`;
const CMS_BASE_URL = import.meta.env.PUBLIC_CMS_STORAGE_BASE_URL;

export const LibrosContainer = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          method: 'GET',
          redirect: 'follow',
        });

        if (!response.ok) {
          throw new Error(`Error al cargar los libros: ${response.status}`);
        }

        const data: LibroAPIResponse[] = await response.json();

        // Mapear los libros
        const librosMapeados = mapLibrosFromAPI(data);

        setLibros(librosMapeados);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching libros:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLibros();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryEvent"></div>
        <p className="ml-4 text-gray-600">Cargando libros...</p>
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

  if (libros.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No se encontraron libros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {libros.map((libro) => {
        const imageUrl = libro.portadaPath.startsWith('http')
          ? libro.portadaPath
          : `${CMS_BASE_URL}${libro.portadaPath}`;

        return (
          <a
            key={libro.id}
            href={libro.toLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative overflow-hidden bg-gray-200">
              <img
                src={imageUrl}
                alt={libro.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {libro.title}
              </h3>
            </div>
          </a>
        );
      })}
    </div>
  );
};
