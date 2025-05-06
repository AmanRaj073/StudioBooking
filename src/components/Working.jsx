import React from 'react';
import icon1 from '../assets/icons/BuildingIcon.svg';
import icon2 from '../assets/icons/CalenderIcon.svg';
import icon3 from '../assets/icons/TickIcon.svg';
import icon4 from '../assets/icons/ChevronRight.svg';

const Working = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold display-4">How it Works</h2>
      
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
        {/* Step 1 */}
        <div className="d-flex flex-md-row flex-column align-items-center">
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">
              <img src={icon1} alt="Choose Studio" width="75" height="75" />
            </div>
            <p className="fw-semibold mb-0">Choose Your Studio</p>
          </div>
          
          {/* Desktop Divider Arrow */}
          <div className="mx-md-4 my-2 my-md-0 d-none d-md-flex align-items-center px-5">
            <img src={icon4} alt=">" width="50" style={{ opacity: 1 }} />
          </div>
        </div>

        {/* Step 2 */}
        <div className="d-flex flex-md-row flex-column align-items-center">
          {/* Mobile Top Arrow */}
          <div className="d-md-none my-2">
            <img src={icon4} alt="v" width="50" style={{ opacity: 1, transform: 'rotate(90deg)' }} />
          </div>
          
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">
              <img src={icon2} alt="Select Date" width="75" height="75" />
            </div>
            <p className="fw-semibold mb-0">Select Date & Duration</p>
          </div>
          
          {/* Desktop Divider Arrow */}
          <div className="mx-md-4 my-2 my-md-0 d-none d-md-flex align-items-center px-5">
            <img src={icon4} alt=">" width="50" style={{ opacity: 1 }} />
          </div>
          
          {/* Mobile Bottom Arrow */}
          <div className="d-md-none my-2">
            <img src={icon4} alt="v" width="50" style={{ opacity: 1, transform: 'rotate(90deg)' }} />
          </div>
        </div>

        {/* Step 3 */}
        <div className="d-flex flex-md-row flex-column align-items-center">
          {/* Mobile Top Arrow */}
          {/* <div className="d-md-none my-2">
            <img src={icon4} alt="v" width="50" style={{ opacity: 1, transform: 'rotate(90deg)' }} />
          </div> */}
          
          <div className="d-flex flex-column align-items-center">
            <div className="mb-3">
              <img src={icon3} alt="Confirm" width="75" height="75" />
            </div>
            <p className="fw-semibold mb-0">Confirm & Pay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;