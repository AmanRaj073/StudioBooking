import { useState } from 'react';
import { User, MapPin, FileText, Calendar, Clock, Eye, Trash2 } from 'lucide-react';
import profile from '../assets/profile.png'

export default function Profile() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      studio: 'Studio A',
      address: '123 Creative Lane, Studio District, Mumbai, Maharashtra 400050, India',
      date: '21 - April - 2025',
      days: '3 shoot +2 setup',
      total: '₹18,000',
      status: 'Paid'
    },
    {
      id: 2,
      studio: 'Studio B',
      address: '456 Creative Lane, Studio District, Mumbai, Maharashtra 400050, India',
      date: '28 - April - 2025',
      days: '2 shoot +1 setup',
      total: '₹20,000',
      status: 'Pending'
    }
  ]);

  const handleDelete = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  return (
    <div className="container-fluid p-5 ">
      {/* Profile Header */}
      <div className="row mb-4">
        <div className="col-md-6 d-flex">
          <div className="me-4">
            <img 
              src={profile} 
              alt="Profile" 
              className="rounded-circle"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
          <div>
            <h2 className="mb-0 fw-bold">Rahul Mehra</h2>
            <p className="text-muted mb-1">rahul.mehra@gmail.com</p>
            <p className="text-muted mb-0">+91 98765 43210</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row justify-content-end">
            <div className="col-md-6">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">GST No.:</span>
                <span>0000000000</span>
                <button className="btn btn-primary rounded-pill px-2">
                  <Eye size={16} className="me-1" /> View Document
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">GOV ID.:</span>
                <span>ABCXY000000</span>
                <button className="btn btn-primary rounded-pill px-2">
                  <Eye size={16} className="me-1" /> View Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="my-4" />

      {/* Bookings Section */}
      <div className="row mb-3">
        <div className="col d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Upcoming Bookings</h3>
          <a href="#" className="text-primary text-decoration-none">View more</a>
        </div>
      </div>

      {/* Booking Cards */}
      {bookings.map(booking => (
        <div key={booking.id} className="card mb-3 bg-light border-0">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <div className="mb-2">
                  <span className="fw-bold">Studio : </span>
                  <span>{booking.studio}</span>
                </div>
                <div className="mb-2">
                  <span className="fw-bold">Address : </span>
                  <span>{booking.address}</span>
                </div>
                <div className="mb-2">
                  <span className="fw-bold">Date : </span>
                  <span>{booking.date}</span>
                </div>
                <div>
                  <span className="fw-bold">Days : </span>
                  <span>{booking.days}</span>
                </div>
              </div>
              <div className="col-md-4 text-end">
                <div className="mb-2">
                  <span className="fw-bold">Total : </span>
                  <span>{booking.total}</span>
                </div>
                <div className="mb-3">
                  <span className="fw-bold">Status : </span>
                  <span>{booking.status}</span>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-primary px-4 rounded-pill">
                    <Eye size={16} className="me-1" /> View Detail
                  </button>
                  
                  <button className="btn btn-primary px-4 rounded-pill" >
                    <FileText size={16} /> Invoice
                  </button>
                  <button 
                    className="btn btn-danger px-4 rounded-pill"
                    onClick={() => handleDelete(booking.id)}
                  >
                    <Trash2 size={16} className="me-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}