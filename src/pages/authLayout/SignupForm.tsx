import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { authSchema } from "@/zod/Auth";
import { z } from "zod";
import { FormInput } from "@/uiComponents/FormFiled";
import { Form } from "@/components/ui/form";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import auth from "@/sevices/auth";

import { toast } from "sonner";
import type { OrgSignup } from "@/Types/auth";
export default function SignupForm() {
  const naviagte = useNavigate();
  const signupForm = useForm<z.infer<typeof authSchema.organizationSignup>>({
    resolver: zodResolver(authSchema.organizationSignup),
    defaultValues: {
      organizationName: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const signup = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: OrgSignup) => auth.adminSignup(data),

    onSuccess: () => {
      toast.success("signup successful");
      naviagte("/login", {
        replace: true,
        state: { email: signupForm.getValues("email") },
      });
      signupForm.reset();
    },

    onError: () => {
      toast.error(`failed to signup`);
    },
  });

  const onSubmit = (data: z.infer<typeof authSchema.organizationSignup>) => {
    signup.mutate({
      organizationName: data.organizationName,
      adminUser: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  };
  return (
    <div>
      <Form {...signupForm}>
        <form
          className="space-y-2"
          onSubmit={signupForm.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Craete a new admin account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter the details to craete a new admin account for your
                organization
              </p>
            </div>
            <FormInput
              control={signupForm.control}
              name="organizationName"
              label="Organization Name"
              placeholder="Enter your Organization Name"
              type="text"
              // description="Enter your Name"
              required={true}
            />
            <FormInput
              control={signupForm.control}
              name="name"
              label="Name"
              placeholder="Enter your Organization Name"
              type="text"
              // description="Enter your Name"
              required={true}
            />

            <FormInput
              control={signupForm.control}
              name="email"
              label="Email"
              required={true}
              // description="Enter your email address"
              type="email"
              placeholder="Enter your email"
            />
            <FormInput
              control={signupForm.control}
              name="password"
              label="Password"
              required={true}
              // description="Enter your phone number"
              type="password"
              placeholder="Enter your phone number"
            />
            <Button type="submit" className="font-semibold font-mono">
              Singup
            </Button>
            <Field>
              <FieldDescription className="text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="underline underline-offset-4 text-blue-600"
                >
                  Login
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </Form>
    </div>
  );
}
