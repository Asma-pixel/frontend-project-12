import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginForm = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw err;
      }
    },
  });
  return (
    <Form className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="mb-3">
        <Form.FloatingLabel htmlFor="username" label="Ваш ник">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="username"
            name="username"
            id="username"
            autoComplete="username"
            isInvalid={authFailed}
            required
          />
        </Form.FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.FloatingLabel htmlFor="password" label="Пароль">
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="password"
            name="password"
            id="password"
            autoComplete="current-password"
            isInvalid={authFailed}
            required
          />
          <div className="invalid-tooltip">Неверное имя или пароль</div>
        </Form.FloatingLabel>

      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3 btn">Войти</Button>
    </Form>
  );
};

export default LoginForm;
