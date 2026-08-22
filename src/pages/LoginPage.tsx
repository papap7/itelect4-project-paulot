import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router";

function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (name: string) => {
    login(name);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Login to CloudOps Portal</h1>
      <div className="flex gap-4">
        <button 
          onClick={() => handleLogin("Paulo")}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-semibold"
        >
          Login as Paulo
        </button>
        <button 
          onClick={() => handleLogin("Admin")}
          className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-900 font-semibold dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
