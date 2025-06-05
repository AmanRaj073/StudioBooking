import React from "react";
import poster1 from '../assets/aboutUs/post1.jpg';
import poster2 from '../assets/aboutUs/post2.jpg';
import poster3 from '../assets/aboutUs/post3.jpg';
import { Navigate, useNavigate } from "react-router-dom";

const WhatWeOffer = () => {
  const navigate = useNavigate()
  const services = [
    { image: poster1, title: "Photography Studio", description: "Professional photography services for all occasions" },
    { image: poster2, title: "Video Shoot", description: "High-quality video production and editing" },
    { image: poster3, title: "Complete Shooting Solution", description: "Expert photo and video editing" }
  ];


  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold mb-4 display-4">What We Offer</h2>
      
      <div className="row g-4">
        {services.map((service, index) => (
          <div onClick={()=> navigate("/booking")} style={{cursor:"pointer"}} key={index}  className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
             
              <div className="card-body">
              <div className="card-img-container" style={{ height: "250px", overflow: "hidden" }}>
              <img 
                  src={service.image} 
                  className="card-img h-100 w-100 object-fit-cover" 
                  alt={service.title}
                />
              </div>
                <h5 className="card-title fw-bold mt-2">{service.title}</h5>
                <p className="card-text text-muted mb-2">View Details</p>
                {/* <button className="btn btn-primary mt-2">View Details</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;