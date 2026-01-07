import './homecarousel.css';

export default function HomeCarousel() {
  // Define logos with proper alt text - UPDATE THESE with your actual brand names
  const logos = [
    { src: '/images/logos/CarouselLogo_png-09.png', alt: 'Tom Ford Beauty Logo' },
    { src: '/images/logos/CarouselLogo_png-10.png', alt: 'Estee Lauder Logo' },
    { src: '/images/logos/CarouselLogo_png-11.png', alt: 'David Yurman Logo' },
    { src: '/images/logos/CarouselLogo_png-12.png', alt: 'Don Julio Logo' },
    { src: '/images/logos/CarouselLogo_png-13.png', alt: 'Evian Logo' },
    { src: '/images/logos/CarouselLogo_png-14.png', alt: 'Johnnie Walker Logo' },
    { src: '/images/logos/CarouselLogo_png-15.png', alt: 'DoorDash logo' },
    { src: '/images/logos/CarouselLogo_png-16.png', alt: 'Jean Paul Gaultier logo' },
    { src: '/images/logos/CarouselLogo_png-17.png', alt: 'Aerie Logo' },
    { src: '/images/logos/CarouselLogo_png-18.png', alt: 'America Eagle Logo' },
    { src: '/images/logos/CarouselLogo_png-19.png', alt: "Hardee's logo" },
    { src: '/images/logos/CarouselLogo_png-20.png', alt: 'Paris Hilton Fragrances Logo' },
    { src: '/images/logos/CarouselLogo_png-21.png', alt: 'DKNY Logo' },
  ];

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-title">
          <h3><span className='font-bold'>Who we&apos;ve worked with</span></h3>
        </div>

        <div className="carousel-controller">
          {/* Optional fade masks */}
          <div className="fade-wrapper">
            <div className="left-fade"></div>
            <div className="right-fade"></div>
          </div>

          {/* Repeating logo track */}
          <div className="carousel-track">
            <div className="carousel-images">
              {[...Array(2)].map((_, i) => (
                <div className="carousel-set" key={i}>
                  {logos.map((logo, idx) => (
                    <img
                      key={`${i}-${idx}`}
                      src={logo.src}
                      alt={logo.alt}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
