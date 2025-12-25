import project from "@/sevices/project";
import ProjectCard from "@/uiComponents/ProjectCard";
import ProjectSheet from "@/uiComponents/ProjectSheet";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: project.getProjects,
  });
  return (
    <div className="px-4 py-8 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-end">
        <ProjectSheet
          buttonTitle="Create Project"
          title="Project Create"
          description="Create a new project"
        />
      </div>

      <h2>Projects</h2>
      <div className="grid grid-cols-2 gap-4  max-h-screen overflow-y-scroll">
        <ProjectCard projects={data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
}
