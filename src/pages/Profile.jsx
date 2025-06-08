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
    <div className="container-fluid px-3 px-md-4 py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          {/* Profile Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-3 p-md-4">
              <div className="d-flex flex-column flex-sm-row align-items-center text-center text-sm-start">
                <div
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ 
                    width: "80px", 
                    height: "80px", 
                    fontSize: "32px",
                    minWidth: "80px"
                  }}
                >
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="mt-3 mt-sm-0 ms-sm-3 ms-md-4">
                  <h4 className="fw-bold mb-2 fs-5 fs-md-4">
                    {user?.name || "User Name"}
                  </h4>
                  <p className="text-muted mb-0 small">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History Section */}
          <div className="d-flex align-items-center mb-4">
            <h4 className="fw-bold mb-0 fs-5 fs-md-4">Booking History</h4>
            <div className="flex-grow-1 ms-3">
              <hr className="my-0" />
            </div>
          </div>

          {history.length === 0 ? (
            <div className="card shadow-sm border-0">
              <div className="card-body text-center py-5">
                <div className="text-muted">
                  <i className="bi bi-calendar-x fs-1 d-block mb-3"></i>
                  <p className="mb-0">No booking history found.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="row g-3 g-md-4">
              {history.map((booking) => {
                const f = booking.formData || {};
                const u = booking.userId || {};
                return (
                  <div key={booking._id} className="col-12">
                    <div className="card shadow-sm border-0">
                      <div className="card-body p-3 p-md-4">
                        {/* Header Section */}
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3">
                          <div className="mb-3 mb-md-0 flex-grow-1">
                            <h5 className="fw-semibold mb-2 fs-6 fs-md-5">
                              {f.productionName || "Unnamed Production"}
                            </h5>
                            <div className="text-muted small d-flex flex-column flex-sm-row gap-1 gap-sm-3">
                              <span>
                                <i className="bi bi-person-circle me-1"></i>
                                {u.name || "NA"}
                              </span>
                              <span>
                                <i className="bi bi-envelope-fill me-1"></i>
                                {u.email || "NA"}
                              </span>
                            </div>
                          </div>
                          
                          {/* Badges - Stack on mobile, inline on larger screens */}
                          <div className="d-flex flex-column flex-sm-row gap-2 align-self-stretch align-self-md-start">
                            <span className="badge bg-warning text-white px-3 py-2 fs-7">
                              <i className="bi bi-calendar-event me-1"></i>
                              {formatDate(f.date)}
                            </span>
                            <span className="badge bg-success text-white px-3 py-2 fs-7">
                              <i className="bi bi-clock me-1"></i>
                              {f.time || "NA"}
                            </span>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="row g-3">
                          <div className="col-6 col-md-3">
                            <div className="d-flex flex-column">
                              <small className="text-muted fw-semibold mb-1">Phone</small>
                              <span className="small">{f.phoneNumber || "NA"}</span>
                            </div>
                          </div>
                          <div className="col-6 col-md-3">
                            <div className="d-flex flex-column">
                              <small className="text-muted fw-semibold mb-1">Shooting Days</small>
                              <span className="small">{f.shootingDays || "NA"}</span>
                            </div>
                          </div>
                          <div className="col-6 col-md-3">
                            <div className="d-flex flex-column">
                              <small className="text-muted fw-semibold mb-1">Pre-Setup Days</small>
                              <span className="small">{f.preSetupDays || "NA"}</span>
                            </div>
                          </div>
                          <div className="col-6 col-md-3">
                            <div className="d-flex flex-column">
                              <small className="text-muted fw-semibold mb-1">Dismantle Days</small>
                              <span className="small">{f.dismantalDays || "NA"}</span>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-flex flex-column">
                              <small className="text-muted fw-semibold mb-1">Additional Notes</small>
                              <span className="small">{f.additionalNote || "None"}</span>
                            </div>
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