import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes';
import { useAuth } from '../hooks';

const SignUpForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const validatePassword = yup.object({
    username: yup.string().min(3, 'incorrectLengthUsername').max(20, 'incorrectLengthUsername').required('emptyField'),
    password: yup.string().min(6, 'toShortPassword').required('emptyField'),
    confirmPassword: yup.string().test('isPassword', 'passwordsNotEqual', (value, { parent }) => {
      const { password } = parent;
      return value === password;
    }),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validatePassword,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const { signUpPath } = routes;
      const formData = { username: values.username, password: values.password };
      try {
        const res = await axios.post(signUpPath(), formData);
        const data = JSON.stringify(res.data);
        auth.logIn(data);
        navigate('/');
      } catch (e) {
        if (e.response.status === 409) return toast.error(t('signupPage.errors.userExists'));
        toast.error(t('generalErrors.network'));
      }
      return setSubmitting(false);
    },
  });
  console.log(formik.errors);
  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
      <fieldset disabled={formik.isSubmitting}>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            placeholder="username"
            isInvalid={!!formik.errors.username && formik.touched.username}
            name="username"
            id="username"
            autoComplete="username"
            required
          />
          <Form.Label htmlFor="username" className="mb-3">
            {t('signupPage.usernameLabel')}
          </Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            { t(`signupPage.errors.${formik.errors.username}`) }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isInvalid={!!formik.errors.password && formik.touched.password}
            placeholder="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
          />
          <Form.Label htmlFor="password">{t('signupPage.passwordLabel')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            { t(`signupPage.errors.${formik.errors.password}`) }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
            placeholder="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="current-confirmPassword"
            required
          />
          <Form.Label htmlFor="confirmPassword" className="mb-4">
            {t('signupPage.confirmPasswordLabel')}
          </Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            { t(`signupPage.errors.${formik.errors.confirmPassword}`) }
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary" className="w-100">{t('signupPage.btn')}</Button>
      </fieldset>
    </Form>
  );
};
export default SignUpForm;
