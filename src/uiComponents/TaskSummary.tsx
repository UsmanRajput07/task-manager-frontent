import { Sheet, SheetContent } from "@/components/ui/sheet";
import task from "@/sevices/task";
import type { TaskSummary } from "@/Types/task";
import { useQuery } from "@tanstack/react-query";

export default function TaskSummary({
  open,
  setOpen,
  taskId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  taskId: string;
}) {
  const { data } = useQuery({
    queryKey: ["task-summary", taskId],
    queryFn: () => task.fetchTaskSummary(taskId),
    enabled: !!taskId,
  });
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <div className="relative pl-6 space-y-8 overflow-y-scroll mt-12 px-4">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 h-full w-px bg-gray-200" />

          {data?.data?.map((event: TaskSummary) => (
            <div key={event.id} className="relative flex gap-4">
              {/* Dot */}
              <div className="absolute left-[-20px] top-2 h-3 w-3 rounded-full bg-blue-600" />

              {/* Content */}
              <div className="bg-white border rounded-lg shadow-sm p-4 w-full">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{event.user.name}</span>
                  <span>{new Date(event.createdAt).toLocaleString()}</span>
                </div>

                <div className="mt-2 text-sm">
                  <p className="font-medium">Status changed</p>

                  <p className="text-gray-600">
                    <span className="font-medium capitalize">
                      {event.fromStatus}
                    </span>{" "}
                    →{" "}
                    <span className="font-medium capitalize">
                      {event.toStatus}
                    </span>
                  </p>
                </div>

                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">
                    {event.type}
                  </span>

                  <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">
                    ⏱{" "}
                    {event.timeSpentMinutes
                      ? `${event.timeSpentMinutes} min`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
