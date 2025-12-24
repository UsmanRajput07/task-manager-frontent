import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { authSchema } from "@/zod/Auth";
import z from "zod";
import { FormInput } from "@/uiComponents/FormFiled";
import { Form } from "@/components/ui/form";
import { Link, useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import auth from "@/sevices/auth";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { setAuth } from "@/app/features/auth.slice";
import type { login } from "@/Types/auth";

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const loginForm = useForm<z.infer<typeof authSchema.login>>({
    resolver: zodResolver(authSchema.login),
    defaultValues: {
      email: state?.email || "",
      password: "",
    },
  });

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: login) => auth.login(data),

    onSuccess: (data) => {
      toast.success("login successful");
      loginForm.reset();
      dispatch(setAuth(data));
      navigate("/dashboard");
    },
    onError: () => {
      toast.error(`failed to verify otp`);
    },
  });

  const onSubmit = (data: z.infer<typeof authSchema.login>) => {
    login.mutate(data);
  };

  return (
    <Form {...loginForm}>
      <form className="space-y-8" onSubmit={loginForm.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email and password below to login to your account
            </p>
          </div>
          <FormInput
            control={loginForm.control}
            name="email"
            label="Email"
            placeholder="Enter your email address"
            type="text"
            required={true}
            description="This is your email address"
          />
          {/* <Button className="self-end" onClick={sendOtp}>
            Resend OTP
          </Button> */}
          <FormInput
            control={loginForm.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            required={true}
            // description="This is your password"
          />
          <Button type="submit" className="font-semibold font-mono">
            Login
          </Button>
          <Field>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/"
                className="underline underline-offset-4 text-blue-600"
              >
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Form>
  );
}
