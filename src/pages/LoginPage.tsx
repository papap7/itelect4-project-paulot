import { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
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
          <div className="grid gap-1.5">
            <Label htmlFor="name" className="text-foreground">Your name</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan dela Cruz" 
            />
          </div>
          
          <Button 
            onClick={handleLogin} 
            disabled={name === ""} 
            className="w-full mt-3 justify-center"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
