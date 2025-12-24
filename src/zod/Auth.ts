import z from "zod";

const login = z.object({
  email: z.string(),
  password: z.string().min(6),
});

const organizationSignup = z.object({
  organizationName: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const authSchema = {
  login,
  organizationSignup,
};

