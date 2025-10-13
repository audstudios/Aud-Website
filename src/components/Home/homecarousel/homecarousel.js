import './homecarousel.css';

export default function HomeCarousel() {
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
                  {/* Repeat logos twice for smooth looping */}
                  <img src="/images/logos/CarouselLogo_png-09.png" />
                  <img src="/images/logos/CarouselLogo_png-10.png" />
                  <img src="/images/logos/CarouselLogo_png-11.png" />
                  <img src="/images/logos/CarouselLogo_png-12.png" />
                  <img src="/images/logos/CarouselLogo_png-13.png" />
                  <img src="/images/logos/CarouselLogo_png-14.png" />
                  <img src="/images/logos/CarouselLogo_png-15.png" />
                  <img src="/images/logos/CarouselLogo_png-16.png" />
                  <img src="/images/logos/CarouselLogo_png-17.png" />
                  <img src="/images/logos/CarouselLogo_png-18.png" />
                  <img src="/images/logos/CarouselLogo_png-19.png" />
                  <img src="/images/logos/CarouselLogo_png-20.png" />
                  <img src="/images/logos/CarouselLogo_png-21.png" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
