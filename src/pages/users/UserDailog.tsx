import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import user from "@/sevices/user";
import { FormInput } from "@/uiComponents/FormFiled";
import { createUser } from "@/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
export default function UserDailog({
  open,
  setOpen,
  title,
  desc,
  btnTitle,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  desc: string;
  btnTitle: string;
}) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createUser>>({
    resolver: zodResolver(createUser),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "member",
    },
  });

  const create = useMutation({
    mutationKey: ["create-user"],
    mutationFn: user.createUser,

    onSuccess: () => {
      toast.success("User created successfully");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to create user");
    },
  });

  const onSubmit = (data: z.infer<typeof createUser>) => {
    create.mutate(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{desc}</DialogDescription>
            </DialogHeader>
            <FormInput
              name="name"
              control={form.control}
              label="Name"
              placeholder="Enter user name"
              required
            />
            <FormInput
              name="email"
              control={form.control}
              label="Email"
              placeholder="Enter user email address"
              required
            />
            <FormInput
              name="password"
              control={form.control}
              label="Password"
              type="password"
              placeholder="Enter user password for login"
              required
            />
            <FormInput
              name="role"
              control={form.control}
              label="Role"
              type="text"
              placeholder="Enter user role"
              required
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{btnTitle}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
