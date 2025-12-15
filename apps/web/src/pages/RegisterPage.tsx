import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { register as registerApi } from "../shared/api/auth";
import { getApiErrorMessage } from "../shared/api/error";

const schema = z
  .object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Min 6 characters"),
    confirmPassword: z.string().min(6, "Min 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: FormData) {
    setServerError(null);

    try {
      await registerApi(values.email, values.password);

      navigate("/login", {
        state: {
          flash: `Account ${values.email} created. You can sign in now.`,
        },
      });
    } catch (e: unknown) {
      setServerError(getApiErrorMessage(e, "Registration failed. Try again."));
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <div className="text-2xl font-semibold">Create account</div>
          <div className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              className="underline text-slate-200 hover:text-white"
              to="/login"
            >
              Sign in
            </Link>
          </div>
        </div>

        <Card>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            data-testid="register-form"
          >
            <Input
              label="Email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
              data-testid="register-email"
            />

            <Input
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register("password")}
              data-testid="register-password"
            />

            <Input
              label="Confirm password"
              type="password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
              data-testid="register-confirm"
            />

            {serverError && (
              <div
                className="text-sm text-red-400"
                data-testid="register-error"
              >
                {serverError}
              </div>
            )}

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full"
              data-testid="register-submit"
            >
              Create account
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
