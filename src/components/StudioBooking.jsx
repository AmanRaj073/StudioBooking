import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, AlertCircle, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import StudioInfo from "./StudioInfo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Mock data for booked time slots
const MOCK_BOOKED_SLOTS = {
  // Format: "YYYY-MM-DD": ["HH:MM", "HH:MM"]
  "2025-05-10": ["9AM - 9PM", "2PM - 2AM"],
  "2025-05-11": ["7AM - 7PM", "2PM - 2AM"],
  "2025-05-12": ["7AM - 7PM", "9AM - 9PM", "2PM - 2AM"],
  "2025-05-15": ["7AM - 7PM", "9AM - 9PM"],
};

// Available time slots
const TIME_SLOTS = ["7AM - 7PM", "9AM - 9PM", "2PM - 2AM"];

const StudioBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    shootingDays: "0",
    preSetupDays: "0",
    dismantalDays: "0",
    additionalNote: "",
    productionName: "",
    personName: "",
    phoneNumber: "",
    emailAddress: "",
    gst: "",
    gstFile: null,
    govId: "",
    govIdFile: null,
  });

  const [selectedDateObj, setSelectedDateObj] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Update available time slots when date changes
  useEffect(() => {
    if (formData.date) {
      const bookedSlots = MOCK_BOOKED_SLOTS[formData.date] || [];
      const available = TIME_SLOTS.filter(
        (slot) => !bookedSlots.includes(slot)
      );
      setAvailableTimeSlots(available);

      // If current selected time is no longer available, reset it
      if (formData.time && !available.includes(formData.time)) {
        setFormData((prev) => ({ ...prev, time: "" }));
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.date]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when field is modified
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { id, files } = e.target;
    const fileKey = id === "gstUpload" ? "gstFile" : "govIdFile";

    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [fileKey]: files[0] }));

      // Clear error when field is modified
      if (formErrors[fileKey]) {
        setFormErrors((prev) => ({ ...prev, [fileKey]: null }));
      }
    }
  };

  // Handle date change from DatePicker
  const handleDateChange = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      setSelectedDateObj(date);
      setFormData((prev) => ({ ...prev, date: formattedDate }));

      // Clear date error if it exists
      if (formErrors.date) {
        setFormErrors((prev) => ({ ...prev, date: null }));
      }
    } else {
      setSelectedDateObj(null);
      setFormData((prev) => ({ ...prev, date: "" }));
    }
  };

  // Select time slot
  const selectTimeSlot = (time) => {
    setFormData((prev) => ({ ...prev, time }));

    // Clear time error if it exists
    if (formErrors.time) {
      setFormErrors((prev) => ({ ...prev, time: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      { field: "date", label: "Date" },
      { field: "time", label: "Time" },
      { field: "productionName", label: "Production Name" },
      { field: "personName", label: "Contact Name" },
      { field: "phoneNumber", label: "Phone Number" },
      { field: "emailAddress", label: "Email Address" },
    ];

    requiredFields.forEach(({ field, label }) => {
      if (!formData[field]) {
        errors[field] = `${label} is required`;
      }
    });

    // Email validation
    if (formData.emailAddress && !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = "Email is invalid";
    }

    // Phone number validation
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = Object.keys(formErrors)[0];
      document
        .getElementById(firstErrorField)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();

      for (const key in formData) {
        if (key === "gstFile" || key === "govIdFile") {
          if (formData[key]) {
            form.append(key, formData[key]);
          }
        } else {
          form.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        "https://studio-booking-backend-leti.vercel.app/submit-form",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Form submitted:", response.data);
      setFormSubmitted(true);
      const queryParams = new URLSearchParams({
        date: formData.date,
        time: formData.time,
        productionName: formData.productionName,
        personName: formData.personName,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        shootingDays: formData.shootingDays,
        preSetupDays: formData.preSetupDays,
        dismantalDays: formData.dismantalDays,
        additionalNote: formData.additionalNote,
      });

      navigate(`/booking-confirmation?${queryParams.toString()}`);
      localStorage.setItem("order",formData)

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form, please try again.");
      setFormSubmitted(false);
    } finally {
      // This ensures the loader stops whether the request succeeded or failed
      setIsSubmitting(false);
    }
  };

  // Custom DatePicker styling
  const datePickerCustomStyles = {
    className: `form-control ${formErrors.date ? "is-invalid" : ""}`,
    placeholderText: "Select a date",
    id: "date",
  };

  // Custom date highlighter for DatePicker
  const highlightWithAvailability = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const hasBookings =
      MOCK_BOOKED_SLOTS[dateString] && MOCK_BOOKED_SLOTS[dateString].length > 0;
    const isFullyBooked =
      hasBookings && MOCK_BOOKED_SLOTS[dateString].length === TIME_SLOTS.length;

    return isFullyBooked
      ? "fully-booked-date"
      : hasBookings
      ? "partially-booked-date"
      : "";
  };

  // Format date for display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Render improved time slots
  const renderTimeSlots = () => {
    if (!formData.date || availableTimeSlots.length === 0) return null;

    return (
      <div className="d-flex flex-wrap gap-2 mt-2">
        {availableTimeSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            className={`btn ${
              formData.time === slot ? "btn-primary" : "btn-outline-secondary"
            } rounded-pill px-3 py-1`}
            onClick={() => selectTimeSlot(slot)}
          >
            <Clock size={14} className="me-1" />
            {slot}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Header with back button */}
      <div className="d-flex align-items-center px-2 px-md-4 mt-3 mb-4">
        <button className="btn btn-link p-0 me-2">
          <ChevronLeft size={50} opacity={1} onClick={() => navigate("/")} />
        </button>
        <h1 className="mb-0 fw-bold">Information Page</h1>
      </div>

      <div className="container-fluid px-3 px-md-5 ">
        <div className="row">
          {/* Right Column - Studio Info and Photos */}
          <StudioInfo />

          {/* Left Column - Booking Form */}
          <div className="col-lg-4 order-lg-1 order-2 mt-4 mt-lg-0">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="mb-4">Booking Details</h4>
                <form onSubmit={handleSubmit}>
                  {/* Date Input - Using React DatePicker */}
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label fw-medium">
                      Date <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <DatePicker
                        selected={selectedDateObj}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dayClassName={highlightWithAvailability}
                        {...datePickerCustomStyles}
                      />
                      <div className="calendar-icon">
                        <Calendar size={18} className="text-muted" />
                      </div>
                      {formErrors.date && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {formErrors.date}
                        </div>
                      )}
                    </div>

                    {selectedDateObj && (
                      <div className="mt-2 small text-muted">
                        Selected: {formatDateDisplay(formData.date)}
                      </div>
                    )}
                  </div>

                  {/* Time Input - IMPROVED */}
                  <div className="mb-3">
                    <label htmlFor="time" className="form-label fw-medium">
                      Time <span className="text-danger">*</span>
                    </label>

                    {formData.date ? (
                      <div>
                        {availableTimeSlots.length > 0 ? (
                          <div>
                            {formData.time && (
                              <div className="mb-2 p-2 bg-light rounded border d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <Clock
                                    size={18}
                                    className="text-primary me-2"
                                  />
                                  <span className="fw-medium">
                                    {formData.time}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-sm text-primary"
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      time: "",
                                    }))
                                  }
                                >
                                  Change
                                </button>
                              </div>
                            )}

                            {!formData.time && renderTimeSlots()}

                            {formErrors.time && (
                              <div className="text-danger mt-1 small">
                                {formErrors.time}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-3 bg-danger bg-opacity-10 rounded text-danger d-flex align-items-center">
                            <AlertCircle size={18} className="me-2" />
                            <span>
                              All slots booked for this date. Please select
                              another date.
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-light rounded text-muted d-flex align-items-center justify-content-center">
                        <Calendar size={18} className="me-2" />
                        <span>Please select a date first</span>
                      </div>
                    )}
                  </div>

                  {/* Shooting Days */}
                  <div className="mb-3">
                    <label
                      htmlFor="shootingDays"
                      className="form-label fw-medium"
                    >
                      Shooting days
                    </label>
                    <select
                      className="form-select"
                      id="shootingDays"
                      value={formData.shootingDays}
                      onChange={handleInputChange}
                    >
                      {Array.from({ length: 16 }, (_, i) => (
                        <option key={i} value={i.toString()}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pre Setup Days */}
                  <div className="mb-3">
                    <label
                      htmlFor="preSetupDays"
                      className="form-label fw-medium"
                    >
                      Pre setup days
                    </label>
                    <select
                      className="form-select"
                      id="preSetupDays"
                      value={formData.preSetupDays}
                      onChange={handleInputChange}
                    >
                      <option default value="0">
                        Select
                      </option>
                      <option value="1">1 Day only</option>
                    </select>
                  </div>

                  {/* Dismantle Days */}
                  <div className="mb-3">
                    <label
                      htmlFor="dismantalDays"
                      className="form-label fw-medium"
                    >
                      Dismantle days
                    </label>
                    <select
                      className="form-select"
                      id="dismantalDays"
                      value={formData.dismantalDays}
                      onChange={handleInputChange}
                    >
                      <option default value="0">
                        Select
                      </option>
                      <option value="1">1 Day only</option>
                    </select>
                  </div>

                  {/* Additional Note */}
                  <div className="mb-4">
                    <label
                      htmlFor="additionalNote"
                      className="form-label fw-medium"
                    >
                      Additional note
                    </label>
                    <textarea
                      className="form-control"
                      id="additionalNote"
                      rows="2"
                      placeholder="Write something"
                      value={formData.additionalNote}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  {/* Personal Information Section */}
                  <h5 className="fw-bold mb-3">Your Information</h5>

                  {/* Production Name */}
                  <div className="mb-3">
                    <label
                      htmlFor="productionName"
                      className="form-label fw-medium"
                    >
                      Production House <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.productionName ? "is-invalid" : ""
                      }`}
                      id="productionName"
                      placeholder="Production Name"
                      value={formData.productionName}
                      onChange={handleInputChange}
                    />
                    {formErrors.productionName && (
                      <div className="invalid-feedback">
                        {formErrors.productionName}
                      </div>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div className="mb-3">
                    <label
                      htmlFor="personName"
                      className="form-label fw-medium"
                    >
                      Contact Person <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.personName ? "is-invalid" : ""
                      }`}
                      id="personName"
                      placeholder="Your Name"
                      value={formData.personName}
                      onChange={handleInputChange}
                    />
                    {formErrors.personName && (
                      <div className="invalid-feedback">
                        {formErrors.personName}
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="mb-3">
                    <label
                      htmlFor="phoneNumber"
                      className="form-label fw-medium"
                    >
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        formErrors.phoneNumber ? "is-invalid" : ""
                      }`}
                      id="phoneNumber"
                      placeholder="9999999999"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                    {formErrors.phoneNumber && (
                      <div className="invalid-feedback">
                        {formErrors.phoneNumber}
                      </div>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="mb-3">
                    <label
                      htmlFor="emailAddress"
                      className="form-label fw-medium"
                    >
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        formErrors.emailAddress ? "is-invalid" : ""
                      }`}
                      id="emailAddress"
                      placeholder="example@gmail.com"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                    />
                    {formErrors.emailAddress && (
                      <div className="invalid-feedback">
                        {formErrors.emailAddress}
                      </div>
                    )}
                  </div>

                  {/* GST Number */}
                  <div className="mb-3">
                    <label htmlFor="gst" className="form-label fw-medium">
                      GST Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="0000000000000"
                      id="gst"
                      value={formData.gst}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* GST Upload */}
                  <div className="mb-3">
                    <label htmlFor="gstUpload" className="form-label fw-medium">
                      Upload GST Certificate
                    </label>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        id="gstUpload"
                        onChange={handleFileChange}
                      />
                    </div>
                    {formData.gstFile && (
                      <div className="small text-success mt-1">
                        File uploaded: {formData.gstFile.name}
                      </div>
                    )}
                  </div>

                  {/* Gov ID Number */}
                  <div className="mb-3">
                    <label htmlFor="govId" className="form-label fw-medium">
                      Gov ID Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="0000000000000"
                      id="govId"
                      value={formData.govId}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Gov ID Upload */}
                  <div className="mb-3">
                    <label
                      htmlFor="govIdUpload"
                      className="form-label fw-medium"
                    >
                      Upload Govt ID
                    </label>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        id="govIdUpload"
                        onChange={handleFileChange}
                      />
                    </div>
                    {formData.govIdFile && (
                      <div className="small text-success mt-1">
                        File uploaded: {formData.govIdFile.name}
                      </div>
                    )}
                  </div>

                  {/* Form success message */}
                  {formSubmitted && (
                    <div className="alert alert-success">
                      Form submitted successfully! Redirecting to checkout...
                    </div>
                  )}

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
                      type="submit"
                      className="btn btn-primary rounded-pill px-4 py-2 flex-grow-1 flex-sm-grow-0"
                      style={{
                        fontSize: "clamp(1rem, 3vw, 1.25rem)",
                        minWidth: "150px",
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Processing...
                        </>
                      ) : (
                        "Confirm & Pay"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for DatePicker */}
        <style jsx>{`
          /* DatePicker custom styles */
          .react-datepicker-wrapper {
            width: 100%;
          }

          .react-datepicker-wrapper .form-control {
            padding-right: 35px;
          }

          .calendar-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
          }

          .partially-booked-date {
            background-color: rgba(255, 193, 7, 0.2);
            border-radius: 0.3rem;
          }

          .fully-booked-date {
            background-color: rgba(220, 53, 69, 0.2);
            border-radius: 0.3rem;
            text-decoration: line-through;
          }
        `}</style>
      </div>
    </>
  );
};

export default StudioBooking;
