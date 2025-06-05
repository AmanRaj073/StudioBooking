import React from "react";
import slider1 from "../assets/carousels/Slider1.jpg";
import { Link } from "react-router-dom";

const Carousels = () => {
  const sliderData = [
    {
      image: slider1,
      heading: "Book Your Perfect Studio in Minutes",
      subHeading: "Fully-equipped photography, video, and recording studios available at flexible rates.",
      buttonText: "Book Now"
    },
    {
      image: slider1,
      heading: "Premium Studio Spaces",
      subHeading: "Professional environments designed for creative excellence.",
      buttonText: "View Studios"
    },
    {
      image: slider1,
      heading: "Flexible Booking Options",
      subHeading: "Hourly, daily, and weekly rentals to suit your needs.",
      buttonText: "Check Availability"
    },
  ];

  return (
    <div className="carousel-wrapper">
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-indicators">
          {sliderData.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
              style={{ backgroundColor: "white" }}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {sliderData.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval={index === 0 ? 10000 : 2000}
            >
              <img
                src={slide.image}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{ 
                  minHeight: "70vh", 
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                <div className="content-wrapper">
                  <h2
                    className="fw-bold mb-3 text-center heading-text"
                    style={{
                      fontSize: "clamp(1.75rem, 6vw, 3rem)",
                      lineHeight: "1.2",
                      textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
                    }}
                  >
                    {slide.heading}
                  </h2>
                  <p
                    className="text-center mb-4 subheading-text"
                    style={{
                      fontSize: "clamp(1rem, 3vw, 1.25rem)",
                      lineHeight: "1.4",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
                    }}
                  >
                    {slide.subHeading}
                  </p>
                  <div className="text-center">
                    <Link to={'/booking'}>
                    <button
                      type="button"
                      className="btn btn-primary rounded-pill px-4 py-2"
                      style={{
                        fontSize: "clamp(1rem, 3vw, 1.25rem)",
                        minWidth: "150px",
                        whiteSpace: "nowrap",
                        background:"#7c3aed",
                        border:"#7c3aed",
                      }}
                    >
                      {slide.buttonText}
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .carousel-wrapper {
          position: relative;
        }
        .carousel-caption {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          color: white;
          padding: 20px;
        }
        @media (max-width: 768px) {
          .carousel-caption {
            padding: 15px;
          }
          .btn {
            padding: 0.5rem 1.25rem !important;
          }
          .heading-text{
          font-size:px !important
          }
        }
      `}</style>
    </div>
  );
};

export default Carousels;