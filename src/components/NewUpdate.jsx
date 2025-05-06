import React from "react";

const NewUpdate = () => {
  return (
    <section className="hero-container bg-dark text-white py-5">
      <div className="container">
        <div className="text-center">
          <h2 className="display-4 fw-bold mb-4">New Features Coming Soon</h2>
          <div className="mx-auto" style={{ maxWidth: "800px" }}>
            <p className="lead mb-4 px-3 px-md-0">
              Are you a studio owner looking to list your property for rent?
              Soon, you'll be able to add your studio to our platform and
              connect with photographers, filmmakers, and creators in need of a
              professional space.
            </p>
            <p className="mb-4">Stay tuned for updates!</p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 p-3">
              <p className="mb-3 mb-md-0">Interested? Sign Up</p>
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4 py-2"
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.25rem)",
                  minWidth: "150px",
                  whiteSpace: "nowrap",
                }}
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewUpdate;