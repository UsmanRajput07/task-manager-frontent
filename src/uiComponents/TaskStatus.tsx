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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import task from "@/sevices/task";
import type { TaskData } from "@/Types/task";

import { UpdateSatus } from "@/zod/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function TaskStatus({
  open,
  setOpen,
  taskData,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  taskData: TaskData;
}) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UpdateSatus>>({
    resolver: zodResolver(UpdateSatus),
    defaultValues: {
      status: "todo",
    },
  });

  useEffect(() => {
    form.setValue("status", taskData.status);
  }, []);

  const updateStatus = useMutation({
    mutationKey: ["update-task-status-by-user"],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { toStatus: "todo" | "in_progress" | "done" };
    }) => {
      return task.updateTaskStatus(id, data);
    },

    onSuccess: () => {
      toast.success(`task updated successfully`);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["get-user-tasks"] });
      setOpen(false);
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  const hadleSubmit = () => {
    updateStatus.mutate({
      id: taskData.id,
      data: {
        toStatus: form.getValues("status"),
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(hadleSubmit)}>
            <DialogHeader>
              <DialogTitle>Update your task status</DialogTitle>
              <DialogDescription>
                Update your task status for this project its reflet to adminn
                side
              </DialogDescription>
            </DialogHeader>
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="py-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                Save changes
                {updateStatus?.isPending &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
