import React, { ChangeEvent, useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [variant, setVariant] = useState("signin");
  const isSignIn = variant === "signin";

  const onChangeVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "signin" ? "register" : "signin"
    );
  }, []);

  const login = useCallback(async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: `${window.location.origin}/`,
    });
    router.push("/");
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <div className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </div>
        <div className="flex justify-center mb-20">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounder-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "signin" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {!isSignIn && (
                <Input
                  id="name"
                  type="text"
                  label="name"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <button
                onClick={isSignIn ? login : register}
                className="bg-red-600 text-white w-full rounded-sm px-6 py-3 mt-3 hover:bg-red-700 transition"
              >
                {isSignIn ? "Sign in" : "Register"}
              </button>
              <div className="flex items-center justify-center gap-4 mt-">
                <div
                  className="flex items-center justify-center bg-white w-12 h-12 rounded-full hover:opacity-80 transition"
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: `/`,
                    })
                  }
                >
                  <FcGoogle size={35} />
                </div>
                <div
                  className="flex items-center justify-center bg-white w-12 h-12 rounded-full hover:opacity-80 transition"
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                >
                  <BsGithub size={35} />
                </div>
              </div>
              <p className="text-neutral-500 mt-8">
                {isSignIn
                  ? "First time using netflix?"
                  : "Already have an account?"}
                <span
                  onClick={onChangeVariant}
                  className="text-white hover:underline cursor-pointer"
                >
                  {isSignIn ? "Sign in" : "Create an account"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
