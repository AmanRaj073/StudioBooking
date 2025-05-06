import React from 'react';
import about1 from '../assets/aboutUs/about1.png';

const AboutUs = () => {
  return (
    <section className="container py-5 my-lg-4">
      <div className="row flex-column-reverse flex-lg-row g-4 g-lg-5 align-items-center">
        {/* Content Section */}
        <div className="col-lg-6">
          <div className="pe-lg-4">
            <h2 className="fw-bold mb-4 display-4" style={{ color: '#212529' }}>
              About Us
            </h2>
            <p className=" mb-4" style={{ color: '#495057', fontSize: '1.25rem' }}>
              Your Studio Booking Platform makes studio booking simple and hassle-free for photographers, filmmakers, and content creators. Our mission is to provide top-quality spaces with flexible booking options, so you can focus on creating.
            </p>
            
            <div className="d-flex flex-column gap-3">
              {[
                "State-of-the-art equipment",
                "Flexible booking options",
                "Affordable rates",
                "Premium locations",
              ].map((feature, index) => (
                <div key={index} className="d-flex align-items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 512 512"
                    width="24"
                    height="24"
                    fill="#34C759"
                    className="me-3 flex-shrink-0"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                  </svg>
                  <p className="mb-0 fs-5" style={{ color: '#212529' }}>{feature}</p>
                </div>
              ))}
            </div>

            {/* <button className="btn btn-primary mt-4 px-4 py-2 rounded-1 fw-medium">
              Book Your Studio Now
            </button> */}
          </div>
        </div>

        {/* Image Section */}
        <div className="col-lg-6">
          <div className="position-relative">
            <img 
              src={about1} 
              className='img-fluid rounded-4 shadow-lg' 
              alt="Modern photography studio with professional equipment" 
              style={{ 
                objectFit: 'cover', 
                minHeight: '400px',
                width: '100%'
              }}
            />
            {/* <div className="position-absolute bottom-0 start-0 bg-primary text-white p-3 rounded-end" style={{ zIndex: 1 }}>
              <div className="d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <span className="ms-2 fw-medium">Trusted by 500+ creators</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;