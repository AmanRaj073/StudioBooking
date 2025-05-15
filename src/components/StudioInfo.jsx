import React from "react";
import studio1 from "../assets/Studio1/Studio (1).jpeg";
import studio2 from "../assets/Studio1/Studio (2).jpeg";
import studio3 from "../assets/Studio1/Studio (3).png";
import studio4 from "../assets/Studio1/Studio (4).png";
import studio5 from "../assets/Studio1/Studio (5).png";
import studio6 from "../assets/Studio1/Studio (6).png";
import studio7 from "../assets/Studio1/Studio (7).png";
import studio8 from "../assets/Studio1/Studio (8).png";
import studio18 from "../assets/Studio1/Studio (18).png";

import { MapPin, Camera } from "lucide-react";

const StudioInfo = () => {
  const livingRoom = [
    { src: studio2, label: "Room 1 View" },
    { src: studio3, label: "Room 2 View" },
  ];

  const room = [
    { src: studio4, label: "Room 3 View" },
    { src: studio5, label: "Room 4 View" },
    { src: studio6, label: "Room 5 View" },
    { src: studio7, label: "Room 6 View" },
    { src: studio8, label: "Room 7 View" },
  ];

  const renderGallerySection = (title, items) => (
    <div className="mb-5">
      <h3 className="fw-bold mb-4 text-uppercase border-start border-4 ps-3 border-primary">
        {title}
      </h3>
      <div className="row g-4">
        {items.map((item, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div className="gallery-card position-relative overflow-hidden rounded-4 shadow-sm">
              <img
                src={item.src}
                alt={item.label}
                className="img-fluid w-100"
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
      {/* Studio Banner */}
      <div className="card border-0 shadow rounded-3 mb-5 position-relative overflow-hidden">
        <img
          src={studio18}
          alt="Recording Studio"
          className="w-100"
          style={{
            height: "320px",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
        />
        <div
          className="position-absolute w-100 text-center text-white"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1 className="display-5 fw-bold bg-dark bg-opacity-50 px-4 py-2 rounded-3 d-inline-block text-shadow">
            Recording Studio
          </h1>
        </div>

        {/* Booking Info */}
        <div className="bg-white shadow rounded-4 px-4 py-3 d-flex flex-wrap justify-content-center align-items-center gap-3 mt-3">
          {[
            { label: "₹ 8,000" },
            { label: "120 m²", icon: <Camera size={16} /> },
            { label: "Mumbai, MH", icon: <MapPin size={16} /> },
            { label: "Setup 2", icon: <Camera size={16} /> },
          ].map((item, index) => (
            <div
              key={index}
              className="d-flex align-items-center border rounded-pill px-3 py-1 bg-light"
            >
              <span className="me-2 small fw-medium">{item.label}</span>
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Classy Gallery */}
      {renderGallerySection("Living Room", livingRoom)}
      {renderGallerySection("Rooms", room)}
    </div>
  );
};

export default StudioInfo;
