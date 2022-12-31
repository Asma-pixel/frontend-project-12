import LoginForm from './LoginForm.jsx';

const LoginPage = () => {
  const className = 'text-center';
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6 align-self-center">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className={className}>
                <span>Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
