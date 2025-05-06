import React from 'react';

const NotFound = () => {
  return (
    <div className='bg-dark vh-100 d-flex flex-column align-items-center justify-content-center text-white'>
      <h1 className='display-1 fw-bold mb-4'>404</h1>
      <p className='fs-3 mb-5'>Oops! Page not found</p>
      <div className='d-flex'>
        <div className='spinner-grow text-primary mx-2' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className='spinner-grow text-secondary mx-2' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className='spinner-grow text-success mx-2' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
      <a href='/' className='btn btn-outline-light mt-5 px-4 py-2'>
        Return Home
      </a>
    </div>
  );
};

export default NotFound;