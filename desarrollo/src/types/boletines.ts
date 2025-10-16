// Tipo de la API del CMS
export interface BoletinAPIResponse {
  boletinPreview: {
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
  toLink: string;
  _state: number;
  _modified: number;
  _mby: string;
  _created: number;
  _cby: string;
  _id: string;
}

// Tipo mapeado para usar en nuestra app
export interface Boletin {
  id: string;
  previewPath: string;
  toLink: string;
  modified: number;
}

// Función mapper para extraer solo los datos que necesitamos
export function mapBoletinFromAPI(apiData: BoletinAPIResponse): Boletin {
  return {
    id: apiData._id,
    previewPath: apiData.boletinPreview.path,
    toLink: apiData.toLink,
    modified: apiData._modified,
  };
}

// Función para mapear un array completo y ordenar por fecha de modificación (más reciente primero)
export function mapBoletinesFromAPI(apiDataArray: BoletinAPIResponse[]): Boletin[] {
  return apiDataArray
    .map(mapBoletinFromAPI)
    .sort((a, b) => b.modified - a.modified);
}
