import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseCardSk({ idx }: { idx: number }) {
  return (
    <Card
      className="cursor-pointer h-fit transition-all duration-300 ease-in-out"
      key={idx}
    >
      <CardHeader>
        <CardTitle className="flex flex-col gap-4 text-xl">
          {/* Thumbnail Skeleton */}
          <div className="aspect-video overflow-hidden rounded-lg">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>

        {/* Description Skeleton */}
        <CardDescription className="mt-2 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </CardDescription>

        {/* Footer Buttons Skeleton */}
        <CardFooter className="flex flex-row gap-4 items-center justify-start p-0 flex-wrap mt-4">
          <Button variant="outline" disabled className="pointer-events-none">
            <Skeleton className="h-4 w-20" />
          </Button>
          <Button variant="outline" disabled className="pointer-events-none">
            <Skeleton className="h-4 w-16" />
          </Button>
          <Button variant="outline" disabled className="pointer-events-none">
            <Skeleton className="h-4 w-10" />
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
