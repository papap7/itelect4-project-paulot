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
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 shadow-lg dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to the CloudOps Portal</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleLogin("Paulo")}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Login as Paulo
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">or continue as</span>
            </div>
          </div>

          <button 
            onClick={() => handleLogin("Admin")}
            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
