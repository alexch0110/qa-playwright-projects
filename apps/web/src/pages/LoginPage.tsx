import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { setToken } from "../shared/auth/token";
import { getApiErrorMessage } from "../shared/api/error";
import { login } from "../shared/api/auth";

import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const location = useLocation();
  const [flash, setFlash] = useState<string | null>(() => {
    const state = location.state as { flash?: string } | null;
    return state?.flash ?? null;
  });

  useEffect(() => {
    if (!flash) return;

    const t = setTimeout(() => setFlash(null), 4000); // 4 секунды
    return () => clearTimeout(t);
  }, [flash]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: FormData) {
    setServerError(null);

    try {
      const res = await login(values.email, values.password);
      setToken(res.token);
      navigate("/");
    } catch (e: unknown) {
      setServerError(getApiErrorMessage(e, "Login failed. Try again."));
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <div className="text-2xl font-semibold">Sign in</div>
          <div className="text-sm text-slate-400">
            Demo: test@example.com / password123
          </div>
        </div>
        {flash && (
          <div
            className="text-sm text-green-400 text-center"
            data-testid="login-flash"
          >
            {flash}
          </div>
        )}
        <Card>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            data-testid="login-form"
          >
            <Input
              label="Email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
              data-testid="login-email"
            />

            <Input
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register("password")}
              data-testid="login-password"
            />

            {serverError && (
              <div className="text-sm text-red-400" data-testid="login-error">
                {serverError}
              </div>
            )}

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full"
              data-testid="login-submit"
            >
              Login
            </Button>
          </form>

          <div className="mt-4 text-sm text-slate-400 text-center">
            No account?{" "}
            <Link
              className="underline text-slate-200 hover:text-white"
              to="/register"
            >
              Create one
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
