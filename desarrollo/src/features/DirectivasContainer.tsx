import { useEffect, useState } from 'react';
import { Toggle } from './Toggle';
import { CardDirectiva } from '../components/CardDirectiva';
import type {
  DirectivaAPIResponse,
  DirectivasAgrupadas,
} from '../types/directivas';
import { mapAndGroupDirectivas } from '../types/directivas';

const API_URL =
  'https://cms.app.cautiva.com.mx/CMS_FELAC/cockpit-core/api/content/items/directivas';

export const DirectivasContainer = () => {
  const [directivasAgrupadas, setDirectivasAgrupadas] = useState<DirectivasAgrupadas>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirectivas = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          method: 'GET',
          redirect: 'follow',
        });

        if (!response.ok) {
          throw new Error(`Error al cargar las directivas: ${response.status}`);
        }

        const data: DirectivaAPIResponse[] = await response.json();

        // Mapear y agrupar las directivas por directivaTipo
        const agrupadas = mapAndGroupDirectivas(data);

        setDirectivasAgrupadas(agrupadas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching directivas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectivas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryEvent"></div>
        <p className="ml-4 text-gray-600">Cargando directivas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  // Obtener las claves de los grupos ordenadas por fecha de creación (más viejo primero)
  const grupos = Object.keys(directivasAgrupadas).sort((a, b) => {
    // Obtener la fecha de creación más antigua de cada grupo
    const fechaGrupoA = Math.min(...directivasAgrupadas[a].map(d => d.created));
    const fechaGrupoB = Math.min(...directivasAgrupadas[b].map(d => d.created));

    // Ordenar de más viejo a más nuevo (ascendente)
    return fechaGrupoA - fechaGrupoB;
  });

  if (grupos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No se encontraron directivas.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {grupos.map((grupo, index) => (
        <Toggle
          key={grupo}
          title={grupo}
          style="bg-blue-100"
          defaultOpen={index === 0} // El primer grupo abierto por defecto
        >
          <div className="w-full flex gap-4 flex-wrap justify-center">
            {directivasAgrupadas[grupo].map((directiva) => (
              <CardDirectiva
                key={directiva.id}
                image={directiva.photoPath}
                position={directiva.position}
                name={directiva.username}
                enterprise={directiva.company || ''}
                country={directiva.country}
              />
            ))}
          </div>
        </Toggle>
      ))}
    </div>
  );
};
