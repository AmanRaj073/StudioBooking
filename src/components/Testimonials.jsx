import React from 'react'
import poster1 from '../assets/testimonials/Arav.png'
import poster2 from '../assets/testimonials/samantha.png'
import poster3 from '../assets/testimonials/rohan.png'
const Testimonials = () => {
    const services = [
        { image: poster1, name: "Photography Studio",title:"Professional Photographer", description: "Booking a studio has never been this easy! The platform is smooth, and the studios are top-notch. Highly recommend!" },
        { image: poster2, name: "Video Production", title:"Film Director", description: "Loved the flexibility and professionalism. The booking process was seamless, and the studio had everything we needed!" },
        { image: poster3, name: "Editing Services",title:"Music Producer", description: "Great experience! The equipment was high-quality, and the space was exactly as described. Will book again!" }
      ];
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold mb-4 display-4">Testimonials</h2>
      
      <div className="row g-4">
        {services.map((service, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
             
              <div className="card-body">
              <div className="card-img-container" style={{ height: "250px", overflow: "hidden" }}>
              <img 
                  src={service.image} 
                  className="card-img h-100 w-100 object-fit-cover" 
                  alt={service.title}
                />
              </div>
                <h5 className="card-title fw-bold mt-2">{service.name}</h5>
                <p className="card-text text-muted mb-2">{service.title}</p>
                <p className="card-text  mb-2">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials