// Tipo de la API del CMS
export interface DirectivaAPIResponse {
  photo: {
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
  username: string;
  position: string;
  company: string | null;
  country: string;
  _state: number;
  _modified: number;
  _mby: string;
  _created: number;
  _cby: string;
  _id: string;
  directivaTipo: string;
}

// Tipo mapeado para usar en nuestra app
export interface Directiva {
  id: string;
  photoPath: string;
  username: string;
  position: string;
  company: string | null;
  country: string;
  directivaTipo: string;
  created: number;
}

// Tipo para directivas agrupadas por tipo
export interface DirectivasAgrupadas {
  [directivaTipo: string]: Directiva[];
}

// Función mapper para extraer solo los datos que necesitamos
export function mapDirectivaFromAPI(apiData: DirectivaAPIResponse): Directiva {
  return {
    id: apiData._id,
    photoPath: apiData.photo.path,
    username: apiData.username,
    position: apiData.position,
    company: apiData.company,
    country: apiData.country,
    directivaTipo: apiData.directivaTipo,
    created: apiData._created,
  };
}

// Función para mapear y agrupar directivas por directivaTipo
export function mapAndGroupDirectivas(apiDataArray: DirectivaAPIResponse[]): DirectivasAgrupadas {
  const directivasMapeadas = apiDataArray.map(mapDirectivaFromAPI);

  // Agrupar por directivaTipo
  const agrupadas: DirectivasAgrupadas = {};

  directivasMapeadas.forEach((directiva) => {
    if (!agrupadas[directiva.directivaTipo]) {
      agrupadas[directiva.directivaTipo] = [];
    }
    agrupadas[directiva.directivaTipo].push(directiva);
  });

  return agrupadas;
}
