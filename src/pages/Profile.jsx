import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({ name: parsedUser.name, email: parsedUser.email });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Fetch booking history
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API}/my-bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHistory(res.data || []);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Profile Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex flex-column flex-md-row align-items-center text-center text-md-start">
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white"
                style={{ width: "100px", height: "100px", fontSize: "40px" }}
              >
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="ms-md-4 mt-3 mt-md-0">
                <h4 className="fw-bold mb-1">{user?.name || "User Name"}</h4>
                <p className="text-muted mb-0">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Booking History Section */}
          <hr className="my-4" />
          <h4 className="fw-bold mb-4">Booking History</h4>

          {history.length === 0 ? (
            <div className="text-muted">No booking history found.</div>
          ) : (
            <div className="row g-4">
              {history.map((booking) => {
                const f = booking.formData || {};
                const u = booking.userId || {};
                return (
                  <div key={booking._id} className="col-12">
                    <div className="card shadow-sm border-0">
                      <div className="card-body">
                        {/* Top Section */}
                        <div className="d-flex justify-content-between flex-wrap mb-3">
                          <div className="mb-2 mb-md-0">
                            <h5 className="fw-semibold mb-1">
                              {f.productionName || "Unnamed Production"}
                            </h5>
                            <div className="text-muted small">
                              <i className="bi bi-person-circle me-1"></i>
                              {u.name || "NA"}&nbsp;|&nbsp;
                              <i className="bi bi-envelope-fill me-1"></i>
                              {u.email || "NA"}
                            </div>
                          </div>
                          <div className="text-end d-flex flex-wrap justify-content-end gap-2">
                            <span className="badge bg-warning theme text-white p-3">
                              {formatDate(f.date)}
                            </span>
                            <span className="badge bg-success theme text-white p-3">
                              {f.time || "NA"}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="row g-3">
                          <div className="col-12 col-md-4">
                            <strong>Phone:</strong>
                            <br />
                            {f.phoneNumber || "NA"}
                          </div>
                          <div className="col-12 col-md-4">
                            <strong>Shooting Days:</strong>
                            <br />
                            {f.shootingDays || "NA"}
                          </div>
                          <div className="col-12 col-md-4">
                            <strong>Pre-Setup Days:</strong>
                            <br />
                            {f.preSetupDays || "NA"}
                          </div>
                          <div className="col-12 col-md-4">
                            <strong>Dismantle Days:</strong>
                            <br />
                            {f.dismantalDays || "NA"}
                          </div>
                          <div className="col-12 col-md-8">
                            <strong>Additional Notes:</strong>
                            <br />
                            {f.additionalNote || "None"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
