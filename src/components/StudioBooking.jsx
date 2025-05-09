import React, { useState, useEffect } from "react";
import { MapPin, Camera, Calendar, Clock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import icon4 from "../assets/icons/ChevronRight.svg";
import studio1 from "../assets/studio1.jpg";
import studio2 from "../assets/studio2.jpg";
import studio3 from "../assets/studio3.jpg";
import studio4 from "../assets/studio4.jpg";
import studio5 from "../assets/studio5.jpg";
import studio6 from "../assets/studio6.jpg";
import { Link, useNavigate } from "react-router-dom";

// Mock data for booked time slots
const MOCK_BOOKED_SLOTS = {
  // Format: "YYYY-MM-DD": ["HH:MM", "HH:MM"]
  "2025-05-10": ["09:00", "10:00", "14:00", "15:00"],
  "2025-05-11": ["11:00", "12:00", "16:00"],
  "2025-05-12": ["09:00", "10:00", "11:00", "12:00"],
  "2025-05-15": ["14:00", "15:00", "16:00"],
};

// Available time slots
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

const StudioBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    shootingDays: "00",
    preSetupDays: "00",
    dismantalDays: "00",
    additionalNote: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    gst: "",
    gstFile: null,
    govId: "",
    govIdFile: null
  });
  
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Update available time slots when date changes
  useEffect(() => {
    if (formData.date) {
      const bookedSlots = MOCK_BOOKED_SLOTS[formData.date] || [];
      const available = TIME_SLOTS.filter(slot => !bookedSlots.includes(slot));
      setAvailableTimeSlots(available);
      
      // If current selected time is no longer available, reset it
      if (formData.time && !available.includes(formData.time)) {
        setFormData(prev => ({ ...prev, time: "" }));
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.date]);

  // Format time for display
  const formatTimeDisplay = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when field is modified
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { id, files } = e.target;
    const fileKey = id === "gstUpload" ? "gstFile" : "govIdFile";
    
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [fileKey]: files[0] }));
      
      // Clear error when field is modified
      if (formErrors[fileKey]) {
        setFormErrors(prev => ({ ...prev, [fileKey]: null }));
      }
    }
  };

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Select date from calendar
  const selectDate = (day) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    
    const selectedDate = `${year}-${formattedMonth}-${formattedDay}`;
    setFormData(prev => ({ ...prev, date: selectedDate }));
    setShowCalendar(false);
  };

  // Select time slot
  const selectTimeSlot = (time) => {
    setFormData(prev => ({ ...prev, time }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      { field: 'date', label: 'Date' },
      { field: 'time', label: 'Time' },
      { field: 'firstName', label: 'First Name' },
      { field: 'lastName', label: 'Last Name' },
      { field: 'phoneNumber', label: 'Phone Number' },
      { field: 'emailAddress', label: 'Email Address' }
    ];
    
    requiredFields.forEach(({ field, label }) => {
      if (!formData[field]) {
        errors[field] = `${label} is required`;
      }
    });
    
    // Email validation
    if (formData.emailAddress && !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = 'Email is invalid';
    }
    
    // Phone number validation
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        console.log("Form submitted:", formData);
        setIsSubmitting(false);
        setFormSubmitted(true);
        
        // Navigate to checkout after small delay
        setTimeout(() => {
          navigate('/checkout');
        }, 1000);
      }, 1500);
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(formErrors)[0];
      document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Render improved calendar for date selection
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    
    // Get today's date for comparison
    const today = new Date();
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-1"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = date.getTime() === currentDate.getTime();
      const isPast = date < currentDate;
      const isSelected = dateString === formData.date;
      const hasBookings = MOCK_BOOKED_SLOTS[dateString] && MOCK_BOOKED_SLOTS[dateString].length > 0;
      const isFullyBooked = hasBookings && MOCK_BOOKED_SLOTS[dateString].length === TIME_SLOTS.length;
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`p-1`}
        >
          <div
            className={`rounded-lg flex flex-col items-center justify-center py-2 cursor-pointer
                      ${isPast ? 'opacity-50 bg-light text-muted' : ''} 
                      ${isToday ? 'border border-primary' : ''} 
                      ${isSelected ? 'bg-primary text-white' : ''}
                      ${hasBookings && !isFullyBooked && !isSelected ? 'bg-warning bg-opacity-25' : ''}
                      ${isFullyBooked && !isSelected ? 'bg-danger bg-opacity-25' : ''}`}
            onClick={() => !isPast && selectDate(day)}
          >
            <div className="font-bold">{day}</div>
            {hasBookings && !isFullyBooked && !isSelected && (
              <small className="d-block text-muted">{TIME_SLOTS.length - MOCK_BOOKED_SLOTS[dateString].length} slots</small>
            )}
            {isFullyBooked && !isSelected && (
              <small className="d-block text-danger">Booked</small>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="calendar bg-white shadow rounded p-3 position-absolute top-100 start-0 mt-1 z-3" style={{ width: "320px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button 
            type="button"
            className="btn btn-sm btn-link text-dark p-0"
            onClick={goToPreviousMonth}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="fw-bold fs-5">{monthNames[month]} {year}</div>
          <button
            type="button"
            className="btn btn-sm btn-link text-dark p-0"
            onClick={goToNextMonth}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="d-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {dayNames.map(day => (
            <div key={day} className="text-center mb-2 fw-medium text-muted fs-6">{day}</div>
          ))}
          {days}
        </div>
        <div className="mt-3 border-top pt-2">
          <div className="d-flex align-items-center mb-1">
            <div className="me-2 rounded bg-warning bg-opacity-25" style={{ width: "12px", height: "12px" }}></div>
            <small>Partially booked</small>
          </div>
          <div className="d-flex align-items-center">
            <div className="me-2 rounded bg-danger bg-opacity-25" style={{ width: "12px", height: "12px" }}></div>
            <small>Fully booked</small>
          </div>
        </div>
      </div>
    );
  };

  // Render improved time slots
  const renderTimeSlots = () => {
    if (!formData.date || availableTimeSlots.length === 0) return null;
    
    return (
      <div className="d-flex flex-wrap gap-2 mt-2">
        {availableTimeSlots.map(slot => (
          <button
            key={slot}
            type="button"
            className={`btn ${formData.time === slot 
                    ? 'btn-primary' 
                    : 'btn-outline-secondary'} rounded-pill px-3 py-1`}
            onClick={() => selectTimeSlot(slot)}
          >
            <Clock size={14} className="me-1" />
            {formatTimeDisplay(slot)}
          </button>
        ))}
      </div>
    );
  };

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
              <form onSubmit={handleSubmit}>
                {/* Date Input - IMPROVED */}
                <div className="mb-3 position-relative">
                  <label htmlFor="date" className="form-label fw-medium">
                    Date <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${formErrors.date ? 'is-invalid' : ''}`}
                      id="date"
                      placeholder="YYYY-MM-DD"
                      value={formData.date}
                      onChange={handleInputChange}
                      onClick={() => setShowCalendar(!showCalendar)}
                      readOnly
                    />
                    <span 
                      className="input-group-text cursor-pointer" 
                      onClick={() => setShowCalendar(!showCalendar)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Calendar size={20} />
                    </span>
                    {formErrors.date && (
                      <div className="invalid-feedback">{formErrors.date}</div>
                    )}
                  </div>
                  {showCalendar && renderCalendar()}
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
                                <Clock size={18} className="text-primary me-2" />
                                <span className="fw-medium">{formatTimeDisplay(formData.time)}</span>
                              </div>
                              <button 
                                type="button"
                                className="btn btn-sm text-primary"
                                onClick={() => setFormData(prev => ({ ...prev, time: "" }))}
                              >
                                Change
                              </button>
                            </div>
                          )}

                          {!formData.time && renderTimeSlots()}
                          
                          {formErrors.time && (
                            <div className="text-danger mt-1 small">{formErrors.time}</div>
                          )}
                        </div>
                      ) : (
                        <div className="p-3 bg-danger bg-opacity-10 rounded text-danger d-flex align-items-center">
                          <AlertCircle size={18} className="me-2" />
                          <span>All slots booked for this date. Please select another date.</span>
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
                  <label htmlFor="shootingDays" className="form-label fw-medium">
                    Shooting days
                  </label>
                  <select 
                    className="form-select" 
                    id="shootingDays"
                    value={formData.shootingDays}
                    onChange={handleInputChange}
                  >
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
                  <select 
                    className="form-select" 
                    id="preSetupDays"
                    value={formData.preSetupDays}
                    onChange={handleInputChange}
                  >
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
                  <select 
                    className="form-select" 
                    id="dismantalDays"
                    value={formData.dismantalDays}
                    onChange={handleInputChange}
                  >
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
                    placeholder="Write something"
                    value={formData.additionalNote}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                {/* Personal Information Section */}
                <h2 className="fw-bold mb-3">Your Information</h2>

                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label fw-medium">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {formErrors.firstName && (
                    <div className="invalid-feedback">{formErrors.firstName}</div>
                  )}
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label fw-medium">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {formErrors.lastName && (
                    <div className="invalid-feedback">{formErrors.lastName}</div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label fw-medium">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${formErrors.phoneNumber ? 'is-invalid' : ''}`}
                    id="phoneNumber"
                    placeholder="9999999999"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {formErrors.phoneNumber && (
                    <div className="invalid-feedback">{formErrors.phoneNumber}</div>
                  )}
                </div>

                {/* Email Address */}
                <div className="mb-3">
                  <label htmlFor="emailAddress" className="form-label fw-medium">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.emailAddress ? 'is-invalid' : ''}`}
                    id="emailAddress"
                    placeholder="example@gmail.com"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                  />
                  {formErrors.emailAddress && (
                    <div className="invalid-feedback">{formErrors.emailAddress}</div>
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
                  <label htmlFor="govIdUpload" className="form-label fw-medium">
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
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : 'Confirm & Pay'}
                  </button>
                </div>
              </form>
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
              <h1 className="display-4 fw-bold mb-0 mb-md-2">Recording Studio</h1>
              {/* <h1 className="display-4 fw-bold">Studio</h1> */}
            </div>

            {/* Booking Info Panel */}
            <div
              className="position-absolute bg-white rounded-4 shadow p-1 p-md-2 d-flex flex-wrap justify-content-center align-items-center"
              style={{
                bottom: "2px",
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