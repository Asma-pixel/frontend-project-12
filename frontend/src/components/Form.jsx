import { useFormik } from 'formik';
import FormGroup from './FormGroup';

const Form = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
  });
  return (
    <form className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <FormGroup
        inputInfo={{
          labelText: 'Ваш ник',
          name: 'username',
          type: 'username',
          onChange: formik.handleChange,
          value: formik.values.username,
        }}
      />
      <FormGroup
        inputInfo={{
          labelText: 'Пароль',
          name: 'password',
          type: 'password',
          onChange: formik.handleChange,
          value: formik.values.password,
        }}
      />
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
};

export default Form;
