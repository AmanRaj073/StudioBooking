import React from "react";
import { MapPin, Camera, Calendar, Clock } from "lucide-react";
import icon4 from "../assets/icons/ChevronRight.svg";
import studio1 from "../assets/studio1.jpg";
import studio2 from "../assets/studio2.jpg";
import studio3 from "../assets/studio3.jpg";
import studio4 from "../assets/studio4.jpg";
import studio5 from "../assets/studio5.jpg";
import studio6 from "../assets/studio6.jpg";

const StudioBooking = () => {
  return (
    <div className="container-fluid px-3 px-md-5 py-3">
      {/* Header with back button */}
      <div className="d-flex align-items-center mb-3">
        <button className="btn btn-link p-0 me-2">
          <img
            src={icon4}
            alt="Back"
            width="24"
            style={{ opacity: 1, transform: "rotate(-180deg)" }}
          />
        </button>
        <h3 className="mb-0">Information Page</h3>
      </div>

      <div className="row">
        {/* Left Column - Booking Form */}
        <div className="col-lg-4 order-lg-1 order-2 mt-4 mt-lg-0">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="mb-4">Booking Details</h4>

              {/* Date Input */}
              <div className="mb-3">
                <label htmlFor="date" className="form-label fw-medium">
                  Date
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="date"
                    placeholder="dd-mm-yyyy"
                  />
                  <span className="input-group-text">
                    <Calendar size={20} />
                  </span>
                </div>
              </div>

              {/* Time Input */}
              <div className="mb-3">
                <label htmlFor="time" className="form-label fw-medium">
                  Time
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="time"
                    placeholder="--:--"
                  />
                  <span className="input-group-text">
                    <Clock size={20} />
                  </span>
                </div>
              </div>

              {/* Shooting Days */}
              <div className="mb-3">
                <label htmlFor="shootingDays" className="form-label fw-medium">
                  Shooting days
                </label>
                <select className="form-select" id="shootingDays">
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                </select>
              </div>

              {/* Pre Setup Days */}
              <div className="mb-3">
                <label htmlFor="preSetupDays" className="form-label fw-medium">
                  Pre setup days
                </label>
                <select className="form-select" id="preSetupDays">
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                </select>
              </div>

              {/* Dismantle Days */}
              <div className="mb-3">
                <label htmlFor="dismantalDays" className="form-label fw-medium">
                  Dismantle days
                </label>
                <select className="form-select" id="dismantalDays">
                  <option value="00">00</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                </select>
              </div>

              {/* Additional Note */}
              <div className="mb-4">
                <label htmlFor="additionalNote" className="form-label fw-medium">
                  Additional note
                </label>
                <textarea
                  className="form-control"
                  id="additionalNote"
                  rows="2"
                  placeholder="write something"
                ></textarea>
              </div>

              {/* Personal Information Section */}
              <h2 className="fw-bold mb-3">Your Information</h2>

              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label fw-medium">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                />
              </div>

              {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label fw-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label fw-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="9999999999"
                />
              </div>

              {/* Email Address */}
              <div className="mb-3">
                <label htmlFor="emailAddress" className="form-label fw-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  placeholder="example@gmail.com"
                />
              </div>

              {/* GST Number */}
              <div className="mb-3">
                <label htmlFor="gst" className="form-label fw-medium">
                  GST Number
                </label>
                <input type="text" className="form-control" id="gst" />
              </div>

              {/* GST Upload */}
              <div className="mb-3">
                <label htmlFor="gstUpload" className="form-label fw-medium">
                  Upload GST Certificate
                </label>
                <div className="input-group">
                  <input type="file" className="form-control" id="gstUpload" />
                </div>
              </div>

              {/* Gov ID Number */}
              <div className="mb-3">
                <label htmlFor="govId" className="form-label fw-medium">
                  Gov ID Number
                </label>
                <input type="text" className="form-control" id="govId" />
              </div>

              {/* Gov ID Upload */}
              <div className="mb-3">
                <label htmlFor="govIdUpload" className="form-label fw-medium">
                  Upload Govt ID
                </label>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="govIdUpload"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row justify-content-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-primary rounded-pill px-4 py-2 flex-grow-1 flex-sm-grow-0"
                  style={{
                    fontSize: "clamp(1rem, 3vw, 1.25rem)",
                    minWidth: "150px",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill px-4 py-2 flex-grow-1 flex-sm-grow-0"
                  style={{
                    fontSize: "clamp(1rem, 3vw, 1.25rem)",
                    minWidth: "150px",
                  }}
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Studio Info and Photos */}
        <div className="col-lg-8 order-lg-2 order-1">
          {/* Studio Image and Info */}
          <div
            className="card position-relative overflow-hidden mb-4 mb-lg-5"
            style={{ maxHeight: "500px" }}
          >
            {/* Image */}
            <img
              src={studio1}
              alt="Recording Studio"
              className="w-100 h-100 object-fit-cover"
              style={{ maxHeight: "300px", minHeight: "200px" }}
            />

            {/* Title Overlay */}
            <div
              className="position-absolute text-white text-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
              }}
            >
              <h1 className="display-4 fw-bold mb-0 mb-md-2">Recording</h1>
              <h1 className="display-4 fw-bold">Studio</h1>
            </div>

            {/* Booking Info Panel */}
            <div
              className="position-absolute bg-white rounded-4 shadow p-1 p-md-2 d-flex flex-wrap justify-content-center align-items-center"
              style={{
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90%",
                maxWidth: "max-content",
                gap: "8px 5px",
              }}
            >
              <div className="px-2 px-md-3 py-1 py-md-2 border rounded-3 d-flex align-items-center gap-2">
                <span className=" fs-6  border-end pe-2">8,000</span>
                <span className="text-muted">₹</span>
              </div>

              <div className="px-2 px-md-3 py-1 py-md-2 border rounded-3 d-flex align-items-center gap-2">
                <span className="fs-6 border-end pe-2">120 m²</span>
                <Camera size={18} />
              </div>

              <div className="px-2 px-md-3 py-1 py-md-2 border rounded-3 d-flex align-items-center gap-2">
                <span className="fs-6 border-end pe-2">Mumbai, MH</span>
                <MapPin size={18} />
              </div>

              <div className="px-2 px-md-3 py-1 py-md-2 border rounded-3 d-flex align-items-center gap-2">
                <span className="fs-6 border-end pe-2">Setup 2</span>
                <Camera size={18} />
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <h2 className="fw-bold mb-3 mb-md-4">Photo Gallery</h2>

          <div className="row g-2 g-md-3">
            <div className="col-md-6">
              <img
                src={studio2}
                alt="Studio Space"
                className="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
                style={{ minHeight: "200px" }}
              />
            </div>
            <div className="col-md-6">
              <img
                src={studio3}
                alt="Film Set"
                className="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
                style={{ minHeight: "200px" }}
              />
            </div>
            <div className="col-md-4">
              <img
                src={studio4}
                alt="Studio Equipment"
                className="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
                style={{ minHeight: "150px" }}
              />
            </div>
            <div className="col-md-4">
              <img
                src={studio5}
                alt="Sound Booth"
                className="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
                style={{ minHeight: "150px" }}
              />
            </div>
            <div className="col-md-4">
              <img
                src={studio6}
                alt="Control Room"
                className="img-fluid rounded shadow-sm w-100 h-100 object-fit-cover"
                style={{ minHeight: "150px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioBooking;