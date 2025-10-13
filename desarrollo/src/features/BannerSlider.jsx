import { useEffect } from 'react';

export const BannerSlider = () => {
  useEffect(() => {
    // Cargar Swiper CSS y JS dinámicamente
    const loadSwiper = async () => {
      // Cargar CSS
      if (!document.querySelector('link[href*="swiper-bundle"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
        document.head.appendChild(link);
      }

      // Cargar JS
      if (!window.Swiper) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        script.onload = () => {
          initializeSwiper();
        };
        document.head.appendChild(script);
      } else {
        initializeSwiper();
      }
    };

    const initializeSwiper = () => {
      // Inicializar Swiper
      const swiper = new window.Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    };

    loadSwiper();
  }, []);

  const slides = [
    {
      image: '/img/home/bannerSample.png',
      alt: 'Banner FELAC',
      title: 'Federación Latinoamericana de Cirugía',
      subtitle: 'Uniendo la excelencia quirúrgica en América Latina',
      buttonText: 'Conoce más'
    },
    {
      image: '/img/home/bannerSample.png',
      alt: 'Eventos FELAC',
      title: 'Eventos y Congresos',
      subtitle: 'Participa en los mejores eventos de cirugía',
      buttonText: 'Ver eventos'
    },
    {
      image: '/img/home/bannerSample.png',
      alt: 'Educación FELAC',
      title: 'Educación Continua',
      subtitle: 'Formación de excelencia para cirujanos',
      buttonText: 'Cursos disponibles'
    }
  ];

  return (
    <>
      <div className="banner-container relative">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            {slides.map((slide, index) => (
              <div key={index} className="swiper-slide">
                <div className="relative w-full">
                  <img 
                    src={slide.image} 
                    alt={slide.alt} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>

      <style jsx>{`
        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        :global(.swiper-pagination-bullet) {
          background: white;
          opacity: 0.5;
        }

        :global(.swiper-pagination-bullet-active) {
          opacity: 1;
        }

        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: white;
        }

        :global(.swiper-button-next:after),
        :global(.swiper-button-prev:after) {
          font-size: 20px;
        }
      `}</style>
    </>
  );
};