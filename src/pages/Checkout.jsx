import React from "react";
import studio1 from "../assets/studio1.jpg";
import paymentgateway from "../assets/paymentGateway.png";
const Checkout = () => {
  return (
    <div className="container py-4">
      {/* Heading */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-3">
          <button className="btn btn-link p-0 me-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <h3 className="mb-0">Your Booking</h3>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Section - Studio Details */}
        <div className="col-md-8">
          <div className="card border-0 shadow">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={studio1}
                  alt="Recording Studio"
                  className="img-fluid p-3  rounded shadow h-100 object-fit-cover"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="badge bg-success mb-2">Best seller</span>
                      <h5 className="card-title">Recording Studio</h5>
                      <p className="card-text text-muted mb-2">
                        123 Creative Lane, Studio District, Mumbai, Maharashtra
                        400050, India
                      </p>
                      <h4 className="mb-3">₹8,000</h4>

                      <div className="d-flex align-items-center mb-2">
                        <div className="text-warning me-2">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                        </div>
                        <span className="fw-bold me-2">4.0</span>
                        <span className="text-muted small">204 review</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap mt-3">
                    <div className="me-4 mb-3 text-center">
                      <i className="bi bi-camera2 fs-6 d-block mb-1"></i>
                      <div className="text-muted small">Setup</div>
                      <div className="fw-bold text-primary">2</div>
                    </div>
                    <div className="me-4 mb-3 text-center">
                      <i className="bi bi-arrows-fullscreen fs-6 d-block mb-1"></i>
                      <div className="text-muted small">Area</div>
                      <div className="fw-bold text-primary">120 m²</div>
                    </div>
                    <div className="me-4 mb-3 text-center">
                      <i className="bi bi-people fs-6 d-block mb-1"></i>
                      <div className="text-muted small">Capacity</div>
                      <div className="fw-bold  text-primary">15 people</div>
                    </div>
                    <div className="me-4 mb-3 text-center">
                      <i className="bi bi-person-fill fs-6 d-block mb-1"></i>
                      <div className="text-muted small">Restrooms</div>
                      <div className="fw-bold text-primary">2</div>
                    </div>
                    <div className="mb-3 text-center">
                      <i className="bi bi-sliders fs-6 d-block mb-1"></i>
                      <div className="text-muted small">Soundproof</div>
                      <div className="fw-bold text-success">Yes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="card border-0 mt-5 shadow">
            <div className="card-body">
              <h5 className="card-title mb-3">Booking Summary</h5>
              <div>
                <p className="fw-bold mb-1">Recording studio</p>
                <p className="text-muted small mb-3">
                  123 Creative Lane, Studio District, Mumbai, Maharashtra
                  400050, India
                </p>

                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <p className="mb-1">Shoot days :</p>
                    <p className="text-muted small">3 × ₹8,000</p>
                  </div>
                  <p className="fw-bold">₹21,000</p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <p className="mb-1">Pre-setup & Dismantle :</p>
                    <p className="text-muted small">2 × ₹4,000</p>
                  </div>
                  <p className="fw-bold">₹8,000</p>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Total (INR)</p>
                  <p className="fw-bold">₹29,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Payment */}
        <div className="col-md-4">
          <div className="card border-0 shadow mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Payment method</h5>
              <div className="mb-3 d-flex justify-content-between">
                <span>
                  <img src={paymentgateway} alt="Visa" className="me-1" />
                </span>
              </div>

              <div className="mb-3">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="d-flex align-items-center">
                      {/* <span className="me-2" style={{width: "24px", height: "24px", display: "inline-block", textAlign: "center"}}>
                        <img src="/api/placeholder/24/24" alt="UPI" style={{width: "24px"}} />
                      </span> */}
                      UPI
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    id="qrCode"
                  />
                  <label className="form-check-label" htmlFor="qrCode">
                    Pay using UPI QR code
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentType"
                    id="upiId"
                    checked
                  />
                  <label className="form-check-label" htmlFor="upiId">
                    UPI ID
                  </label>
                </div>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary" type="button">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
