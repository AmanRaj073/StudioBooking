import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import axios from 'axios';

export default function LoginRegisterModal({ show, onHide }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';

    if (!form.password || form.password.length < 6)
      newErrors.password = 'Min 6 characters';

    if (!isLogin && !form.name) newErrors.name = 'Name is required';
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

        // Optionally trigger some logged-in state outside modal here

      } else {
        // Register API call
        await axios.post(`${process.env.REACT_APP_API}/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        // After successful registration, switch to login mode and clear form
        setIsLogin(true);
        setForm({ name: '', email: '', password: '' });
        setErrors({});
        alert('Registration successful! Please login.');
      }
    } catch (err) {
      // Handle API errors, show message
      if (err.response?.data?.error) {
        setApiError(err.response.data.error);
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav fill variant="tabs" defaultActiveKey={isLogin ? 'login' : 'register'}>
          <Nav.Item>
            <Nav.Link
              eventKey="login"
              active={isLogin}
              onClick={() => {
                setIsLogin(true);
                setErrors({});
                setApiError('');
                setForm({ name: '', email: '', password: '' });
              }}
            >
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="register"
              active={!isLogin}
              onClick={() => {
                setIsLogin(false);
                setErrors({});
                setApiError('');
                setForm({ name: '', email: '', password: '' });
              }}
            >
              Register
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {apiError && <div className="text-danger my-2">{apiError}</div>}

        <Form className="mt-3" onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
