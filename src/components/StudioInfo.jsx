import React, { useState } from "react";
import studio1 from "../assets/Studio1/Studio (1).jpeg";
import studio2 from "../assets/Studio1/Studio (2).jpeg";
import studio3 from "../assets/Studio1/Studio (3).png";
import studio4 from "../assets/Studio1/Studio (4).png";
import studio5 from "../assets/Studio1/Studio (5).png";
import studio6 from "../assets/Studio1/Studio (6).png";
import studio7 from "../assets/Studio1/Studio (7).png"; // Podcast image
import studio8 from "../assets/Studio1/Studio (8).png";
import studio9 from "../assets/Studio1/Studio (9).png";
import studio10 from "../assets/Studio1/Studio (10).png";
import studio11 from "../assets/Studio1/Studio (11).png";
import studio12 from "../assets/Studio1/Studio (12).png";
import studio13 from "../assets/Studio1/Studio (13).png";
import studio14 from "../assets/Studio1/Studio (14).png";
import studio15 from "../assets/Studio1/Studio (15).png";
import studio16 from "../assets/Studio1/Studio (16).png";
import studio17 from "../assets/Studio1/Studio (17).png";
import studio18 from "../assets/Studio1/Studio (18).png";

const StudioInfo = () => {
  const [modalImage, setModalImage] = useState(null);

  const podcastRooms = [
    { src: studio7, label: "Podcast Room 1" },
    { src: studio6, label: "Podcast Room 2" },
    { src: studio8, label: "Podcast Room 3" },
  ];

  const roomImages = [
    { src: studio1, label: "Room 1" },
    { src: studio2, label: "Room 2" },
    { src: studio3, label: "Room 3" },
    { src: studio4, label: "Room 4" },
    { src: studio5, label: "Room 5" },
    { src: studio9, label: "Room 6" },
    { src: studio10, label: "Room 7" },
    { src: studio11, label: "Room 8" },
    { src: studio12, label: "Room 9" },
    { src: studio13, label: "Room 10" },
    { src: studio14, label: "Room 11" },
    { src: studio15, label: "Room 12" },
    { src: studio16, label: "Room 13" },
    { src: studio17, label: "Room 14" },
  ];

  const renderGallerySection = (title, items) => (
    <div className="mb-5">
      <h3 className="fw-bold mb-4 text-uppercase border-start border-4 ps-3 border-primary">
        {title}
      </h3>
      <div className="row g-4">
        {items.map((item, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div
              className="gallery-card position-relative overflow-hidden rounded-4 shadow-sm"
              onClick={() => setModalImage(item.src)}
              style={{
                cursor: "zoom-in",
              }}
            >
              <img
                src={item.src}
                alt={item.label}
                className="img-fluid w-100 gallery-image"
                style={{
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
              />
              <div className="gallery-label position-absolute bottom-0 w-100 text-center text-white bg-dark bg-opacity-50 py-2">
                <strong>{item.label}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="col-lg-8 order-lg-2 order-1">
      <div className="w-100">
        <h3 className="fw-bold mb-4 text-uppercase border-start border-4 ps-3 border-primary">
          Recording Studio
        </h3>
      </div>

      {/* Studio Banner */}
      <div className="card border-0 shadow rounded-3 mb-3 position-relative overflow-hidden">
        <img
          src={studio18}
          alt="Recording Studio"
          className="w-100"
          style={{
            height: "auto",
            objectFit: "fill",
            borderRadius: "1rem",
          }}
        />
      </div>

      {/* Gallery Sections */}
      {renderGallerySection("Podcast Rooms", podcastRooms)}
      {renderGallerySection("Rooms", roomImages)}

      {/* Modal */}
      {modalImage && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
          }}
          onClick={() => setModalImage(null)}
        >
          <div className="d-flex justify-content-center align-items-center vh-100">
            <img
              src={modalImage}
              alt="Zoomed"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: "90vh", maxWidth: "90vw" }}
            />
          </div>
        </div>
      )}

      {/* Hover Zoom Effect */}
      <style>
        {`
          .gallery-card:hover .gallery-image {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
};

export default StudioInfo;
