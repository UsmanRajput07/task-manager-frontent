import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <Skeleton className="h-4 w-32" />

        <Skeleton className="mt-2 h-8 w-40 @[250px]/card:h-10" />

        {/* Badge */}
        <div className="absolute right-6 top-6">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <Skeleton className="h-4 w-52" />

        <Skeleton className="h-3 w-44" />
      </CardFooter>
    </Card>
  );
}
