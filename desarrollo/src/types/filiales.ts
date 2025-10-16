// Tipo de la API del CMS
export interface FilialAPIResponse {
  logo: {
    path: string;
    title: string;
    mime: string;
    type: string;
    description: string;
    tags: string[];
    size: number;
    colors: string[];
    width: number;
    height: number;
    _hash: string;
    _created: number;
    _modified: number;
    _cby: string;
    altText: string;
    thumbhash: string;
    folder: string;
    _id: string;
  };
  titulo: string;
  email: string;
  secondEmail: string | null;
  _state: number;
  _modified: number;
  _mby: string;
  _created: number;
  _cby: string;
  _id: string;
}

// Tipo mapeado para usar en nuestra app
export interface Filial {
  id: string;
  logoPath: string;
  titulo: string;
  email: string;
  secondEmail: string | null;
  modified: number;
}

// Función mapper para extraer solo los datos que necesitamos
export function mapFilialFromAPI(apiData: FilialAPIResponse): Filial {
  return {
    id: apiData._id,
    logoPath: apiData.logo.path,
    titulo: apiData.titulo,
    email: apiData.email,
    secondEmail: apiData.secondEmail,
    modified: apiData._modified,
  };
}

// Función para mapear un array completo y ordenar por fecha de modificación
export function mapFilialesFromAPI(apiDataArray: FilialAPIResponse[]): Filial[] {
  return apiDataArray
    .map(mapFilialFromAPI)
    .sort((a, b) => b.modified - a.modified); // Más reciente primero
}
