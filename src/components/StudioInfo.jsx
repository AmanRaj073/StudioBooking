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
  const [activeTab, setActiveTab] = useState("overview");

  const podcastRooms = [
    {
      src: studio7,
      label: "Podcast Room 1",
      description: "Professional podcast recording with advanced acoustics",
      capacity: "2-4 people",
      equipment: "Professional microphones, Audio interface, Mixing console",
    },
    {
      src: studio6,
      label: "Podcast Room 2",
      description: "Intimate setting perfect for interviews and discussions",
      capacity: "2-3 people",
      equipment:
        "High-quality microphones, Digital recorder, Headphone monitoring",
    },
    {
      src: studio8,
      label: "Podcast Room 3",
      description: "Multi-purpose studio with video recording capability",
      capacity: "3-6 people",
      equipment: "Multi-camera setup, Professional lighting, Audio mixing",
    },
  ];

  const recordingRooms = [
    {
      src: studio1,
      label: "Room 1",
      description: "Full-service recording studio with isolation booth",
      capacity: "5-8 people",
      equipment: "Pro Tools, Professional microphones, Mixing console",
    },
    {
      src: studio2,
      label: "Room 2",
      description: "Compact studio ideal for vocals and overdubs",
      capacity: "2-4 people",
      equipment:
        "Digital audio workstation, Studio microphones, Audio interface",
    },
    {
      src: studio3,
      label: "Room 3",
      description: "Spacious room perfect for band recordings",
      capacity: "8-12 people",
      equipment: "Multi-track recording, Instrument amplifiers, Drum kit",
    },
    {
      src: studio4,
      label: "Room 4",
      description: "Modern digital studio with cutting-edge technology",
      capacity: "4-6 people",
      equipment: "Latest DAW software, Plugin suite, Universal audio interface",
    },
    {
      src: studio5,
      label: "Room 5",
      description: "Acoustic treatment optimized for string recordings",
      capacity: "6-10 people",
      equipment: "Condenser microphones, Tube preamps, Mastering suite",
    },
    {
      src: studio9,
      label: "Room 6",
      description: "Versatile space for music production and mixing",
      capacity: "3-5 people",
      equipment: "Production software, MIDI controllers, Monitor speakers",
    },
    {
      src: studio10,
      label: "Room 7",
      description: "Professional recording environment with premium acoustics",
      capacity: "4-7 people",
      equipment: "High-end preamps, Vintage microphones, Analog console",
    },
    {
      src: studio11,
      label: "Room 8",
      description: "Creative space designed for songwriting and production",
      capacity: "2-5 people",
      equipment: "Keyboard workstation, Guitar amps, Recording software",
    },
    {
      src: studio12,
      label: "Room 9",
      description: "Isolation booth perfect for vocal recordings",
      capacity: "1-3 people",
      equipment: "Vocal microphones, Pop filters, Headphone distribution",
    },
    {
      src: studio13,
      label: "Room 10",
      description: "Multi-purpose room for various recording needs",
      capacity: "3-6 people",
      equipment: "Flexible setup, Portable equipment, Quick turnaround",
    },
    {
      src: studio14,
      label: "Room 11",
      description: "Professional mixing and mastering suite",
      capacity: "2-4 people",
      equipment: "Reference monitors, Mastering plugins, Acoustic treatment",
    },
    {
      src: studio15,
      label: "Room 12",
      description: "Large ensemble recording space",
      capacity: "10-15 people",
      equipment:
        "Multiple microphone channels, Large format console, Live room",
    },
    {
      src: studio16,
      label: "Room 13",
      description: "Compact production studio for electronic music",
      capacity: "2-3 people",
      equipment: "Synthesizers, Drum machines, Electronic production suite",
    },
    {
      src: studio17,
      label: "Room 14",
      description: "Rehearsal and pre-production room",
      capacity: "4-8 people",
      equipment: "Practice amplifiers, Drum kit, PA system",
    },
  ];

  const studioFeatures = [
    {
      icon: "🎙️",
      title: "Professional Equipment",
      description: "Industry-standard microphones and recording gear",
    },
    {
      icon: "🔊",
      title: "Acoustic Treatment",
      description: "Professionally treated rooms for optimal sound quality",
    },
    {
      icon: "🎛️",
      title: "Mixing Consoles",
      description: "High-end analog and digital mixing capabilities",
    },
    {
      icon: "💻",
      title: "Digital Workstations",
      description: "Latest DAW software and plugins available",
    },
    {
      icon: "🎧",
      title: "Monitoring Systems",
      description: "Reference-quality speakers and headphones",
    },
    {
      icon: "⚡",
      title: "Fast Turnaround",
      description: "Quick project completion with professional results",
    },
  ];

  const renderProfessionalCard = (item, idx) => (
    <div className="col-12 col-md-6 col-xl-4 mb-4" key={idx}>
      <div className="card h-100 border-0 shadow-sm studio-card">
        <div className="position-relative overflow-hidden">
          <img
            src={item.src}
            alt={item.label}
            className="card-img-top studio-image"
            style={{
              height: "200px",
              objectFit: "cover",
              cursor: "zoom-in",
              transition: "all 0.4s ease",
            }}
            onClick={() => setModalImage(item.src)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="col-lg-8 order-lg-2 order-1">
      {/* Hero Banner */}
      <div className="card border-0 shadow-sm rounded-4 mb-5 overflow-hidden">
        <div className="position-relative">
          <div
            className="bottom-0 start-0 w-100 bg-gradient"
            style={{
              background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              height: "120px",
            }}
          >
            <div className="position-absolute bottom-0 start-0 p-4 text-white">
              <h3 className="fw-bold mb-2">Premium Recording Experience</h3>
              <p className="mb-0 opacity-75">
                Where creativity meets professional excellence
              </p>
            </div>
            <div className="position-absolute bottom-0 end-0 p-4 d-none d-md-block">
              <span
                className="badge fs-6 px-4 py-2 text-white"
                style={{
                  backgroundColor: "#28a745", // Bright red-pink
                  borderRadius: "30px",
                  fontWeight: "500",
                  fontSize: "1rem",
                }}
              >
                Available Now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <ul className="nav nav-pills nav-fill mb-4 bg-light rounded-3 p-2">
        <li className="nav-item">
          <button
            className={`nav-link rounded-2 fw-semibold ${
              activeTab === "recording" ? "active" : "text-muted"
            }`}
            onClick={() => setActiveTab("recording")}
          >
            Recording Rooms
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link rounded-2 fw-semibold ${
              activeTab === "podcast" ? "active" : "text-muted"
            }`}
            onClick={() => setActiveTab("podcast")}
          >
            Podcast Studios
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="tab-pane fade show active">
            <div className="row g-4 mb-5">
              {studioFeatures.map((feature, idx) => (
                <div className="col-md-6 col-lg-4" key={idx}>
                  <div className="d-flex align-items-start p-3 bg-light rounded-3 h-100">
                    <div className="fs-1 me-3">{feature.icon}</div>
                    <div>
                      <h6 className="fw-bold mb-2">{feature.title}</h6>
                      <p className="small text-muted mb-0">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="alert alert-primary border-0 rounded-3"
              role="alert"
            >
              <div className="d-flex align-items-center">
                <div className="fs-4 me-3">📞</div>
                <div>
                  <h6 className="alert-heading fw-bold mb-1">Ready to Book?</h6>
                  <p className="mb-0">
                    Contact us today to schedule your recording session or
                    studio tour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "podcast" && (
          <div className="tab-pane fade show active">
            <div className="mb-4">
              <h4 className="fw-bold text-dark mb-2">Podcast Studios</h4>
              <p className="text-muted">
                Professional podcast recording facilities with optimal acoustics
                and equipment
              </p>
            </div>
            <div className="row">
              {podcastRooms.map((room, idx) =>
                renderProfessionalCard(room, idx)
              )}
            </div>
          </div>
        )}

        {activeTab === "recording" && (
          <div className="tab-pane fade show active">
            <div className="mb-4">
              <h4 className="fw-bold text-dark mb-2">Recording Rooms</h4>
              <p className="text-muted">
                Full-service recording studios equipped for music production and
                audio engineering
              </p>
            </div>
            <div className="row">
              {recordingRooms.map((room, idx) =>
                renderProfessionalCard(room, idx)
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 9999,
          }}
          onClick={() => setModalImage(null)}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <button
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-index-high"
                style={{ zIndex: 10000 }}
                onClick={() => setModalImage(null)}
              ></button>
              <img
                src={modalImage}
                alt="Studio View"
                className="img-fluid rounded-4"
                style={{
                  maxHeight: "90vh",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>
        {`
          .studio-card {
            transition: all 0.3s ease;
            border-radius: 1rem !important;
          }
          
          .studio-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
          }
          
          .studio-image:hover {
            transform: scale(1.05);
          }
          
          .nav-pills .nav-link.active {
            background-color: #0d6efd !important;
            color: white !important;
          }
          
          .nav-pills .nav-link {
            transition: all 0.3s ease;
          }
          
          .nav-pills .nav-link:hover:not(.active) {
            background-color: #e9ecef;
            color: #495057 !important;
          }
          
          .bg-gradient {
            background: linear-gradient(45deg, #0d6efd, #6f42c1) !important;
          }
          
          .z-index-high {
            z-index: 10000;
          }
          
          .alert-primary {
            background: linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%);
            border-left: 4px solid #0d6efd;
          }
        `}
      </style>
    </div>
  );
};

export default StudioInfo;
