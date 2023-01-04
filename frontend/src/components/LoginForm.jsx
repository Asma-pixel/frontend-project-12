import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        const data = JSON.stringify(res.data);
        auth.logIn(data);
        navigate('/');
      } catch (e) {
        setAuthFailed(true);
        if (e.isAxiosError || e.response.status === 401) return toast.error(t('generalErrors.unknown'));
        toast.error(t('generalErrors.network'));
      }
      setSubmitting(false);
    },
  });
  return (
    <Form className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <Form.Group className="mb-3">
          <Form.FloatingLabel htmlFor="username" label={t('loginPage.usernameLabel')}>
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
          <Form.FloatingLabel htmlFor="password" label={t('loginPage.passwordLabel')}>
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
            <Form.Control.Feedback tooltip className="invalid-tooltip">{t('loginPage.errors.userNotFound')}</Form.Control.Feedback>
          </Form.FloatingLabel>

        </Form.Group>
        <Button type="submit" variant="outline-primary" className="w-100 mb-3 btn">{t('loginPage.btn')}</Button>
      </fieldset>

    </Form>
  );
};

export default LoginForm;
