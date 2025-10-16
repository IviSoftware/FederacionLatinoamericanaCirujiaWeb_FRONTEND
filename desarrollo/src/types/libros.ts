// Tipo de la API del CMS
export interface LibroAPIResponse {
  portada: {
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
  title: string;
  toLink: string;
  _state: number;
  _modified: number;
  _mby: string;
  _created: number;
  _cby: string;
  _id: string;
}

// Tipo mapeado para usar en nuestra app
export interface Libro {
  id: string;
  portadaPath: string;
  title: string;
  toLink: string;
  modified: number;
}

// Función mapper para extraer solo los datos que necesitamos
export function mapLibroFromAPI(apiData: LibroAPIResponse): Libro {
  return {
    id: apiData._id,
    portadaPath: apiData.portada.path,
    title: apiData.title,
    toLink: apiData.toLink,
    modified: apiData._modified,
  };
}

// Función para mapear un array completo y ordenar por fecha de modificación (más reciente primero)
export function mapLibrosFromAPI(apiDataArray: LibroAPIResponse[]): Libro[] {
  return apiDataArray
    .map(mapLibroFromAPI)
    .sort((a, b) => b.modified - a.modified);
}
