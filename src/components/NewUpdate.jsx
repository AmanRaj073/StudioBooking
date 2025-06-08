import React from "react";

const NewUpdate = () => {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #1e1e2f, #2b2b45)",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* Glow Effect */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
          opacity: 0.4,
        }}
      />

      <div className="container position-relative z-1 text-center">
        <div
          className="p-4 px-md-5 rounded-4 shadow mx-auto"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxWidth: "500px",
          }}
        >
          <h3 className="fw-bold mb-2">Marketplace Coming Soon</h3>
          <p className="text-white-50 mb-3 small">
          Stay tuned for updates! Interested?
          </p>
          <button
            type="button"
            className="btn btn-gradient rounded-pill px-4 py-2 text-white"
            style={{
              background: "linear-gradient(135deg,rgb(175, 177, 123),rgb(237, 222, 58))",
              border: "none",
              fontSize: "1rem",
            }}
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewUpdate;
