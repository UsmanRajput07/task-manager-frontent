import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
import { project } from "@/zod/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "./FormFiled";
import { FormDesc } from "./FormDesc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import projectS from "@/sevices/project";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Create, Project } from "@/Types/project";

export default function ProjectSheet({
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
  projectData?: Project;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof project>>({
    resolver: zodResolver(project),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
    },
  });

  const create = useMutation({
    mutationKey: ["create-project"],
    mutationFn: projectS.createProject,

    onSuccess: () => {
      toast.success(`project created successfully`);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
    },
    onError: () => {
      toast.error(`error while creating project`);
    },
  });
  const update = useMutation({
    mutationKey: ["update-project"],
    mutationFn: async ({ id, data }: { id: string; data: Create }) => {
      return projectS.updateProject(id, data);
    },

    /*************  ✨ Windsurf Command ⭐  *************/
    /**
 * Called when the mutation is successful.
 * Shows a success toast, resets the form, invalidates the projects query, and closes the sheet.
/*******  125d33da-299b-48ee-a4b0-830f8c8d0890  *******/
    onSuccess: () => {
      toast.success(`project created successfully`);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setOpen(false);
    },
    onError: () => {
      toast.error(`error while creating project`);
    },
  });

  const handleCreate = (data: z.infer<typeof project>) => {
    if (projectData?.id) {
      update.mutate({
        id: projectData.id,
        data,
      });
      return;
    }
    create.mutate(data);
  };

  useEffect(() => {
    if (projectData?.id) {
      form.reset({
        name: projectData.name,
        description: projectData.description,
        status: projectData.status,
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
              placeholder="Enter your project name"
              type="text"
              required={true}
              //   description="This  is your project name"
            />
            <FormDesc
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter your project description"
              type="text"
              required={true}
            />
            <FormInput
              control={form.control}
              name="status"
              label="Status"
              placeholder="Enter your project status"
              type="text"
              required={true}
            />
            <SheetFooter className="flex flex-col gap-4">
              <Button type="submit">Save changes</Button>
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
