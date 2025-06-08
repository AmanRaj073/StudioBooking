import React, { useState } from 'react';
import { Modal, Button, Form, Nav, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function LoginRegisterModal({ show, onHide }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field-specific error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!isLogin && !form.name) {
      newErrors.name = 'Full name is required';
    } else if (!isLogin && form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login API call
        const res = await axios.post(`${process.env.REACT_APP_API}/login`, {
          email: form.email,
          password: form.password,
        });

        // Save user info & token locally
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);

        // Clear form and close modal
        setForm({ name: '', email: '', password: '' });
        onHide();

        // Show success message (optional)
        // You might want to handle this in parent component

      } else {
        // Register API call
        await axios.post(`${process.env.REACT_APP_API}/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        // After successful registration, switch to login mode
        setIsLogin(true);
        setForm({ name: '', email: '', password: '' });
        setErrors({});
        setApiError('');
        
        // Show success alert instead of browser alert
        setTimeout(() => {
          setApiError('Registration successful! Please login with your credentials.');
        }, 100);
      }
    } catch (err) {
      // Handle API errors
      if (err.response?.data?.error) {
        setApiError(err.response.data.error);
      } else if (err.response?.status === 401) {
        setApiError('Invalid email or password. Please try again.');
      } else if (err.response?.status === 409) {
        setApiError('An account with this email already exists.');
      } else {
        setApiError('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    setErrors({});
    setApiError('');
    setForm({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      backdrop="static"
      size="md"
      className="auth-modal"
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="w-100 text-center">
          <div className="mb-3">
            <i className="fas fa-user-circle fa-2x text-primary mb-2"></i>
            <h4 className="mb-0 fw-bold">Welcome Back</h4>
            <small className="text-muted">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </small>
          </div>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="px-4">
        {/* Custom styled tabs */}
        <div className="row g-3 mb-4">
          <div className="col">
            <button
              type="button"
              className={`btn w-100 py-3 ${
                isLogin 
                  ? 'btn-primary shadow-sm' 
                  : 'btn-outline-secondary'
              }`}
              onClick={() => switchMode(true)}
              disabled={isLoading}
            >
              <i className="fas fa-sign-in-alt me-2"></i>
              Sign In
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className={`btn w-100 py-3 ${
                !isLogin 
                  ? 'btn-primary shadow-sm' 
                  : 'btn-outline-secondary'
              }`}
              onClick={() => switchMode(false)}
              disabled={isLoading}
            >
              <i className="fas fa-user-plus me-2"></i>
              Sign Up
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {apiError && (
          <Alert
            variant={apiError.includes('successful') ? 'success' : 'danger'}
            dismissible
            onClose={() => setApiError('')}
            className="mb-4"
          >
            <i className={`fas ${apiError.includes('successful') ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
            {apiError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          {/* Name field for registration */}
          {!isLogin && (
            <div className="mb-4">
              <Form.Label className="fw-semibold text-dark">
                <i className="fas fa-user me-2 text-muted"></i>
                Full Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                placeholder="Enter your full name"
                className="py-3 shadow-sm"
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                <i className="fas fa-exclamation-circle me-1"></i>
                {errors.name}
              </Form.Control.Feedback>
            </div>
          )}

          {/* Email field */}
          <div className="mb-4">
            <Form.Label className="fw-semibold text-dark">
              <i className="fas fa-envelope me-2 text-muted"></i>
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="Enter your email address"
              className="py-3 shadow-sm"
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              <i className="fas fa-exclamation-circle me-1"></i>
              {errors.email}
            </Form.Control.Feedback>
          </div>

          {/* Password field */}
          <div className="mb-4">
            <Form.Label className="fw-semibold text-dark">
              <i className="fas fa-lock me-2 text-muted"></i>
              Password
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                placeholder="Enter your password"
                className="py-3 pe-5 shadow-sm"
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{ border: 'none', background: 'none' }}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <Form.Control.Feedback type="invalid">
              <i className="fas fa-exclamation-circle me-1"></i>
              {errors.password}
            </Form.Control.Feedback>
            {!isLogin && (
              <Form.Text className="text-muted">
                <i className="fas fa-info-circle me-1"></i>
                Password must be at least 6 characters long
              </Form.Text>
            )}
          </div>

          {/* Submit button */}
          <div className="d-grid mb-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading}
              className="py-3 fw-semibold shadow-sm"
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} me-2`}></i>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </Button>
          </div>

          {/* Additional links */}
          {isLogin && (
            <div className="text-center">
              <a 
                href="#" 
                className="text-decoration-none small text-muted"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-key me-1"></i>
                Forgot your password?
              </a>
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <div className="w-100 text-center">
          <small className="text-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none fw-semibold"
              onClick={() => switchMode(!isLogin)}
              disabled={isLoading}
            >
              {isLogin ? 'Sign up here' : 'Sign in here'}
            </button>
          </small>
        </div>
      </Modal.Footer>

      <style jsx>{`
        .auth-modal .modal-content {
          border: none;
          border-radius: 1rem;
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
        }
        
        .auth-modal .modal-header {
          padding: 2rem 2rem 1rem;
        }
        
        .auth-modal .modal-body {
          padding: 1rem 2rem;
        }
        
        .auth-modal .modal-footer {
          padding: 1rem 2rem 2rem;
        }
        
        .auth-modal .form-control {
          border: 2px solid #e9ecef;
          border-radius: 0.75rem;
          transition: all 0.2s ease-in-out;
        }
        
        .auth-modal .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
        }
        
        .auth-modal .btn {
          border-radius: 0.75rem;
          transition: all 0.2s ease-in-out;
        }
        
        .auth-modal .btn-primary {
          background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
          border: none;
        }
        
        .auth-modal .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0.5rem 1rem rgba(13, 110, 253, 0.3);
        }
      `}</style>
    </Modal>
  );
}