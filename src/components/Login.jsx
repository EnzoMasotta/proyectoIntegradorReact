import { useUser } from "../contexts/UserContext";

function Login() {
  const { login } = useUser();

  const handleLogin = () => {
    login({ name: "María", email: "maria@ejemplo.com" });
  };

  return <button onClick={handleLogin}>Iniciar sesión</button>;
}

export default Login;
