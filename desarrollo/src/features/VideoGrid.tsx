import { useState } from 'react';
import videosData from '../data/videos.json';

interface Video {
  id: number;
  title: string;
  description: string;
  tematica: string;
  type: 'youtube' | 'vimeo' | 'video';
  url: string;
  thumbnail: string;
  duration: string;
  speaker: string;
}

interface VideosData {
  tematicas: string[];
  videos: Video[];
}

// Función para validar que el tipo de video es válido
const isValidVideoType = (type: string): type is Video['type'] => {
  return ['youtube', 'vimeo', 'video'].includes(type);
};

// Función para transformar los datos del JSON a nuestros tipos
const transformVideosData = (data: typeof videosData): VideosData => {
  return {
    tematicas: data.tematicas,
    videos: data.videos.map(video => ({
      ...video,
      type: isValidVideoType(video.type) ? video.type : 'youtube' // fallback por defecto
    }))
  };
};

const typedVideosData = transformVideosData(videosData);

export const VideoGrid = () => {
  const [selectedTematica, setSelectedTematica] = useState<string>('Todas');

  const filteredVideos = selectedTematica === 'Todas'
    ? typedVideosData.videos
    : typedVideosData.videos.filter((video) => video.tematica === selectedTematica);

  return (
    <div className="w-full">
      {/* Selector de Temáticas */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtrar por Temática:</h3>
        <div className="flex flex-wrap gap-3">
          {typedVideosData.tematicas.map((tematica: string) => (
            <button
              key={tematica}
              onClick={() => setSelectedTematica(tematica)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedTematica === tematica
                  ? 'bg-primaryEvent text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tematica}
            </button>
          ))}
        </div>
      </div>

      {/* Contador de Videos */}
      <div className="mb-4 text-gray-600">
        Mostrando <span className="font-bold">{filteredVideos.length}</span> video{filteredVideos.length !== 1 ? 's' : ''}
        {selectedTematica !== 'Todas' && (
          <span> de <span className="font-bold text-primaryEvent">{selectedTematica}</span></span>
        )}
      </div>

      {/* Grid de Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="video-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative aspect-video bg-gray-200">
              {video.type === 'youtube' && (
                <iframe
                  className="w-full h-full"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}

              {video.type === 'vimeo' && (
                <iframe
                  className="w-full h-full"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}

              {video.type === 'video' && (
                <video
                  className="w-full h-full"
                  controls
                  preload="metadata"
                  poster={video.thumbnail}
                >
                  <source src={video.url} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              )}

              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="mb-2">
                <span className="inline-block bg-opacity-10 text-primaryEvent text-xs px-2 py-1 rounded">
                  {video.tematica}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">{video.title}</h3>

              {video.speaker && (
                <p className="text-sm text-primaryEvent font-semibold mb-2">
                  {video.speaker}
                </p>
              )}

              {video.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No se encontraron videos para esta temática.</p>
        </div>
      )}
    </div>
  );
};
