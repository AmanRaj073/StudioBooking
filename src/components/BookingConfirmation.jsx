import React from "react";
import { useLocation } from "react-router-dom";

function BookingConfirmation() {
  // Get URL query params
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // Extract only the fields you sent from the form
  const date = queryParams.get("date");
  const time = queryParams.get("time");
  const productionName = queryParams.get("productionName");
  const personName = queryParams.get("personName");
  const phoneNumber = queryParams.get("phoneNumber");
  const emailAddress = queryParams.get("emailAddress");
  const shootingDays = queryParams.get("shootingDays");
  const preSetupDays = queryParams.get("preSetupDays");
  const dismantalDays = queryParams.get("dismantalDays");
  const additionalNote = queryParams.get("additionalNote");

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 rounded-4" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-success bg-opacity-10 d-flex justify-content-center align-items-center mx-auto"
            style={{ width: "60px", height: "60px" }}
          >
            <i className="bi bi-check-circle-fill text-success fs-3"></i>
          </div>
          <h4 className="mt-3 fw-bold">Booking Confirmed!</h4>
          <p className="text-muted mb-0">Your booking has been successfully done.</p>
        </div>

        {/* Show each field only if it exists */}
        {date && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-calendar-event fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Date</div>
                <div className="text-muted">{date}</div>
              </div>
            </div>
          </div>
        )}

        {time && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-clock fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Time</div>
                <div className="text-muted">{time}</div>
              </div>
            </div>
          </div>
        )}

        {/* {productionName && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-film fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Production Name</div>
                <div className="text-muted">{productionName}</div>
              </div>
            </div>
          </div>
        )}

        {personName && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-person fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Person Name</div>
                <div className="text-muted">{personName}</div>
              </div>
            </div>
          </div>
        )}

        {phoneNumber && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-telephone fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Phone Number</div>
                <div className="text-muted">{phoneNumber}</div>
              </div>
            </div>
          </div>
        )}

        {emailAddress && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-envelope fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Email Address</div>
                <div className="text-muted">{emailAddress}</div>
              </div>
            </div>
          </div>
        )}

        {shootingDays && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-calendar2-check fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Shooting Days</div>
                <div className="text-muted">{shootingDays}</div>
              </div>
            </div>
          </div>
        )}

        {preSetupDays && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-gear fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Pre-Setup Days</div>
                <div className="text-muted">{preSetupDays}</div>
              </div>
            </div>
          </div>
        )}

        {dismantalDays && (
          <div className="mb-3">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-x-circle fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Dismantal Days</div>
                <div className="text-muted">{dismantalDays}</div>
              </div>
            </div>
          </div>
        )}

        {additionalNote && (
          <div className="mb-4">
            <div className="d-flex align-items-center p-3 bg-light rounded-3">
              <i className="bi bi-sticky fs-5 me-3 text-secondary"></i>
              <div>
                <div className="fw-bold">Additional Note</div>
                <div className="text-muted">{additionalNote}</div>
              </div>
            </div>
          </div>
        )} */}

        <div className="d-grid">
          <a
            href="https://wa.me/917979841343"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success btn-lg"
          >
            Connect with us on Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
