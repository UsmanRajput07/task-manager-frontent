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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "./FormFiled";
import { FormDesc } from "./FormDesc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import projectS from "@/sevices/project";
import { useEffect, useState } from "react";
import type { Project } from "@/Types/project";
import { createTask, UpdateTask } from "@/zod/task";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import member from "@/sevices/member";
import type { Members } from "@/Types/members";
import task from "@/sevices/task";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { CreateTask as taskType, Task } from "@/Types/task";

export default function TaskSheet({
  buttonTitle,
  title,
  description,
  variant,
  size,
  taskData,
}: {
  buttonTitle: string;
  title: string;
  description: string;
  variant?: "default" | "destructive" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  taskData?: Task;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof createTask | typeof UpdateTask>>({
    resolver: zodResolver(createTask),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      estimateMinutes: "0",
      assigneeId: "",
      projectId: "",
      status: "todo",
    },
  });
  const projectId = form.watch("projectId");

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: projectS.getProjects,
  });

  const { data: members } = useQuery({
    queryKey: ["members", projectId],
    queryFn: () => member.fetchMembers(projectId),
    enabled: !!projectId,
  });

  const create = useMutation({
    mutationKey: ["create-task"],
    mutationFn: task.create,

    onSuccess: () => {
      toast.success(`task created successfully`);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      setOpen(false);
    },
    onError: () => {
      toast.error(`error while creating project`);
    },
  });
  const update = useMutation({
    mutationKey: ["update-project"],
    mutationFn: async ({ id, data }: { id: string; data: taskType }) => {
      return task.updateTask(id, data);
    },
    onSuccess: () => {
      toast.success(`task updated successfully`);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      setOpen(false);
    },
    onError: () => {
      toast.error(`error while updating task`);
    },
  });

  const handleCreate = (data: z.infer<typeof createTask>) => {
    if (taskData?.id) {
      update.mutate({
        id: taskData.id,
        data,
      });
      return;
    }
    create.mutate(data);
  };

  useEffect(() => {
    if (taskData?.id) {
      form.reset({
        title: taskData.title,
        description: taskData.description || "",
        priority: taskData.priority,
        estimateMinutes: taskData.estimateMinutes.toString(),
        assigneeId: taskData.assigneeId,
        projectId: taskData.projectId,
        status: taskData.status,
      });
    }
  }, [taskData, form]);

  useEffect(() => {
    form.setValue("assigneeId", "");
  }, [projectId]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant={variant} size={size}>
          {buttonTitle}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-visible">
        <Form {...form}>
          <form
            className="space-y-4 px-6 pb-4 sm:pb-6 h-full flex flex-col justify-between overflow-y-scroll"
            onSubmit={form.handleSubmit(handleCreate)}
          >
            <SheetHeader>
              <SheetTitle>{title || "Create Task"}</SheetTitle>
              <SheetDescription>
                {description || "Create a new Task"}
              </SheetDescription>
            </SheetHeader>
            <FormInput
              control={form.control}
              name="title"
              label="Title"
              placeholder="Enter your task title"
              type="text"
              required={true}
              //   description="This  is your project name"
            />
            <FormDesc
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter your task description"
              type="text"
              required={true}
            />
            <FormInput
              control={form.control}
              name="priority"
              label="Priority"
              placeholder="Enter your task priority"
              type="text"
              required={true}
            />
            <FormField
              name="projectId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
            <FormField
              name="assigneeId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {members?.data?.map((member: Members) => (
                        <SelectItem key={member.user.id} value={member.user.id}>
                          {member.user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormInput
              control={form.control}
              name="estimateMinutes"
              label="Estimate Minutes"
              placeholder="Enter your task taken time"
              type="text"
              required={true}
            />
            <FormInput
              control={form.control}
              name="status"
              label="Status"
              placeholder="Enter your task status"
              type="text"
              required={true}
            />
            <SheetFooter className="flex flex-col gap-4">
              <Button type="submit" disabled={create.isPending || update.isPending}>
                {buttonTitle}
                {create.isPending && <Loader2 className="animate-spin ml-2" />}
                {update.isPending && <Loader2 className="animate-spin ml-2" />}
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
