import { useState } from 'react';
import { Eye, Trash2, FileText } from 'lucide-react';
import profile from '../assets/profile.png';

export default function Profile() {
  const [upcoming, setUpcoming] = useState([
    {
      id: 1,
      studio: 'Studio A',
      address: '123 Creative Lane, Studio District, Mumbai, Maharashtra 400050, India',
      date: '21 - April - 2025',
      days: '3 shoot +2 setup',
      total: '₹18,000',
      status: 'Paid',
    },
  ]);

  const [history, setHistory] = useState([
    {
      id: 2,
      studio: 'Studio B',
      address: '456 Creative Lane, Studio District, Mumbai, Maharashtra 400050, India',
      date: '28 - March - 2025',
      days: '2 shoot +1 setup',
      total: '₹20,000',
      status: 'Completed',
    },
  ]);

  const handleDelete = (id, type) => {
    if (type === 'upcoming') setUpcoming(upcoming.filter(b => b.id !== id));
    else setHistory(history.filter(b => b.id !== id));
  };

  return (
    <div className="container-fluid p-3 p-md-5">
      {/* Profile Header */}
      <div className="row mb-4">
        <div className="col-12 col-md-6 d-flex mb-3 mb-md-0">
          <img src={profile} alt="Profile" className="rounded-circle me-3" style={{ width: '100px', height: '100px' }} />
          <div>
            <h2 className="fw-bold mb-1">Rahul Mehra</h2>
            <p className="text-muted mb-1">rahul.mehra@gmail.com</p>
            <p className="text-muted mb-0">+91 98765 43210</p>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex flex-column gap-2 align-items-start align-items-md-end">
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
              <div><span className="text-muted me-1">GST No.:</span>0000000000</div>
              <button className="btn btn-primary d-flex align-items-center gap-1 px-2 px-md-3">
                <Eye size={16} /> <span className="d-none d-sm-inline">View Document</span>
              </button>
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
              <div><span className="text-muted me-1">GOV ID.:</span>ABCXY000000</div>
              <button className="btn btn-primary d-flex align-items-center gap-1 px-2 px-md-3">
                <Eye size={16} /> <span className="d-none d-sm-inline">View Document</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <hr className="my-4" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Upcoming Bookings</h4>
        <a href="#" className="text-primary text-decoration-none">View more</a>
      </div>
      {upcoming.map(booking => (
        <div key={booking.id} className="card mb-3 bg-light border-0">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="mb-2"><strong>Studio:</strong> {booking.studio}</div>
                <div className="mb-2"><strong>Address:</strong> {booking.address}</div>
                <div className="mb-2"><strong>Date:</strong> {booking.date}</div>
                <div className="mb-2"><strong>Days:</strong> {booking.days}</div>
              </div>
              <div className="col-12 col-md-4 text-start text-md-end mt-3 mt-md-0">
                <div className="mb-2"><strong>Total:</strong> {booking.total}</div>
                <div className="mb-3"><strong>Status:</strong> {booking.status}</div>
                <div className="d-flex flex-wrap justify-content-start justify-content-md-end gap-2">
                  <button className="btn btn-primary d-flex align-items-center gap-1 px-3">
                    <FileText size={16} /> Invoice
                  </button>
                  <button
                    className="btn btn-danger d-flex align-items-center gap-1 px-3"
                    onClick={() => handleDelete(booking.id, 'upcoming')}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Booking History */}
      <hr className="my-4" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Booking History</h4>
        <a href="#" className="text-primary text-decoration-none">View more</a>
      </div>
      {history.map(booking => (
        <div key={booking.id} className="card mb-3 bg-light border-0">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="mb-2"><strong>Studio:</strong> {booking.studio}</div>
                <div className="mb-2"><strong>Address:</strong> {booking.address}</div>
                <div className="mb-2"><strong>Date:</strong> {booking.date}</div>
                <div className="mb-2"><strong>Days:</strong> {booking.days}</div>
              </div>
              <div className="col-12 col-md-4 text-start text-md-end mt-3 mt-md-0">
                <div className="mb-2"><strong>Total:</strong> {booking.total}</div>
                <div className="mb-3"><strong>Status:</strong> {booking.status}</div>
                <div className="d-flex flex-wrap justify-content-start justify-content-md-end gap-2">
                  <button className="btn btn-primary d-flex align-items-center gap-1 px-3">
                    <Eye size={16} /> View Details
                  </button>
                  <button
                    className="btn btn-danger d-flex align-items-center gap-1 px-3"
                    onClick={() => handleDelete(booking.id, 'history')}
                  >
                    <Trash2 size={16} /> Delete
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
