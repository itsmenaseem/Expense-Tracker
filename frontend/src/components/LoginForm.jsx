// import { useState } from "react"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [signupData, setSignupData] = useState({
    email: "",
    "signup-password": "",
    "signup-confirm": "",
    name: "",
  });
  const [loginData, setLoginData] = useState({ _email: "", password: "" });

  function handleChange1(e) {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleChange2(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function loginSubmit(){
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,{
          email:loginData._email,password:loginData.password
        })
        toast.success(response.data.message)
    } catch (error) {
        const message = error.response.data.message
        toast.error(message)
    }
  }
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 mx-auto mt-20">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="cursor-pointer">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="cursor-pointer">
            Signup
          </TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email and password to log in.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  name="_email"
                  onChange={handleChange2}
                  value={loginData._email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  onChange={handleChange2}
                  value={loginData.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full cursor-pointer" onClick = {loginSubmit}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Fill in the details below to sign up.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  onChange={handleChange1}
                  value={signupData.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  onChange={handleChange1}
                  value={signupData.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  name="signup-password"
                  onChange={handleChange1}
                  value={signupData["signup-password"]}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  placeholder="••••••••"
                  name="signup-confirm"
                  onChange={handleChange1}
                  value={signupData["signup-confirm"]}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full cursor-pointer">Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
