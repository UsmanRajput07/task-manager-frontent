import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addMember } from "@/zod/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "./FormFiled";
import { useMutation, useQuery } from "@tanstack/react-query";
import projectS from "@/sevices/project";
import { useEffect, useState } from "react";
import type { Project } from "@/Types/project";
import type { User } from "@/Types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import member from "@/sevices/member";
import { Loader2 } from "lucide-react";

export default function ProjectMember({
  buttonTitle,
  title,
  description,
  variant,
  size,
  projectData,
}: {
  buttonTitle: string;
  title: string;
  description: string;
  variant?: "default" | "destructive" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  projectData?: User;
}) {
  const [open, setOpen] = useState(false);
  //   const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof addMember>>({
    resolver: zodResolver(addMember),
    defaultValues: {
      name: "",
      userId: "",
      ProjectId: "",
      role: "member",
    },
  });

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: projectS.getProjects,
  });

  const create = useMutation({
    mutationKey: ["add-member"],
    mutationFn: member.addMember,

    onSuccess: () => {
      toast.success(`Member added successfully`);
      form.reset();
      // queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
    },
    onError: () => {
      toast.error(`error while adding member`);
    },
  });
  //   const update = useMutation({
  //     mutationKey: ["update-project"],
  //     mutationFn: async ({ id, data }: { id: string; data: Create }) => {
  //       return projectS.updateProject(id, data);
  //     },
  //     onSuccess: () => {
  //       toast.success(`project created successfully`);
  //       form.reset();
  //       queryClient.invalidateQueries({ queryKey: ["projects"] });
  //       setOpen(false);
  //     },
  //     onError: () => {
  //       toast.error(`error while creating project`);
  //     },
  //   });

  const handleCreate = (data: z.infer<typeof addMember>) => {
    create.mutate({
      userId: data.userId || "",
      projectId: data.ProjectId,
      role: data.role,
    });
  };

  useEffect(() => {
    if (projectData?.id) {
      form.reset({
        userId: projectData.id,
        role: projectData.role,
        name: projectData.name,
      });
    }
  }, [projectData, form]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant={variant} size={size}>
          {buttonTitle}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form
            className="space-y-8 px-6 pb-4 sm:pb-6 h-full flex flex-col justify-between"
            onSubmit={form.handleSubmit(handleCreate)}
          >
            <SheetHeader>
              <SheetTitle>{title || "Project Create"}</SheetTitle>
              <SheetDescription>
                {description || "Create a new project"}
              </SheetDescription>
            </SheetHeader>
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter your Name"
              type="text"
              required={true}
              readOnly={true}
              //   description="This  is your project name"
            />
            <FormInput
              control={form.control}
              name="role"
              label="Role"
              placeholder="Enter your Role"
              type="text"
              required={true}
              readOnly={true}
              //   description="This  is your project name"
            />
            <FormField
              name="ProjectId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.data?.map((project: Project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="flex flex-col gap-4">
              <Button type="submit" disabled={create.isPending}>
                {buttonTitle}
                {create.isPending && <Loader2 className="animate-spin ml-2" />}
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
