import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import type { FilialAPIResponse, Filial } from '../types/filiales';
import { mapFilialesFromAPI } from '../types/filiales';

const API_URL = `${import.meta.env.PUBLIC_CMS_API_BASE_URL}/filiales`;
const CMS_BASE_URL = import.meta.env.PUBLIC_CMS_STORAGE_BASE_URL;

export const FilialesContainer = () => {
  const [filiales, setFiliales] = useState<Filial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiliales = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          method: 'GET',
          redirect: 'follow',
        });

        if (!response.ok) {
          throw new Error(`Error al cargar las filiales: ${response.status}`);
        }

        const data: FilialAPIResponse[] = await response.json();

        // Mapear las filiales
        const filialesMapeadas = mapFilialesFromAPI(data);

        setFiliales(filialesMapeadas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching filiales:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiliales();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryEvent"></div>
        <p className="ml-4 text-gray-600">Cargando filiales...</p>
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

  if (filiales.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No se encontraron filiales.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
      {filiales.map((filial) => {
        const imageUrl = filial.logoPath.startsWith('http')
          ? filial.logoPath
          : `${CMS_BASE_URL}${filial.logoPath}`;

        return (
          <Card
            key={filial.id}
            image={imageUrl}
            title={filial.titulo}
            imgWidth="w-[100px]"
            imgHeight="h-auto"
            alt={filial.titulo}
          >
            <p className="text-center">{filial.email}</p>
            {filial.secondEmail && (
              <p className="text-center">{filial.secondEmail}</p>
            )}
          </Card>
        );
      })}
    </div>
  );
};
