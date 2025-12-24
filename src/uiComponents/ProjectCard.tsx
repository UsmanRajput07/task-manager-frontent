import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/Types/project";
import ProjectCardSkeleton from "./Skeletons/ProjectCardSkeleton";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { AlertDialogComp } from "./AlertDailogComp";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import project from "@/sevices/project";
import { toast } from "sonner";
import ProjectSheet from "./ProjectSheet";

export default function ProjectCard({
  projects,
  isLoading,
}: {
  projects: Project[];
  isLoading: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();

  const deleteProject = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: project.deleteProject,

    onSuccess: () => {
      toast.success(`project delete successfully`);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setSelectedProjectId(null);
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  const confirmDelete = () => {
    if (!selectedProjectId) return;
    deleteProject.mutate(selectedProjectId);
  };
  // ✅ Loading state
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      <AlertDialogComp
        fn={confirmDelete}
        open={open}
        setOpen={setOpen}
        title="Are you absolutely sure? to delete Project"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      />
      {projects?.map((project) => (
        <Card key={project.id} className="@container/card">
          <CardHeader>
            <CardDescription className="capitalize">
              {project.status}
            </CardDescription>

            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {/* example value */}
              {project.name}
            </CardTitle>

            <CardAction>
              <div className="flex flex-row justify-end align-center gap-2 pb-2">
                <ProjectSheet title={project.name} description={project.description} buttonTitle="Update" variant="outline" size="sm" projectData={project} />
                {/* <Button variant={"outline"} size={"sm"}>
                  Edit
                </Button> */}
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  onClick={() => {
                    setSelectedProjectId(project.id); // ✅ store id
                    setOpen(true); // ✅ open dialog
                  }}
                >
                  Delete
                </Button>

                {/* <Button variant={"destructive"} size={"sm"}>Delete</Button> */}
              </div>

              <Badge variant="outline">
                {/* <IconTrendingUp className="size-4" /> */}
                {format(new Date(project.updatedAt), "eee, MMM dd yyyy HH:mm")}
              </Badge>
            </CardAction>
          </CardHeader>

          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            {/* <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month
              <IconTrendingUp className="size-4" />
            </div> */}

            <div className="text-muted-foreground">
              {/* example value */}
              {project.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
