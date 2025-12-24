import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuizSummarySkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl md:text-xl">
          <Skeleton className="h-6 w-40" />
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-5 gap-4">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 col-span-5 flex flex-col items-center gap-6 py-4">
          <Skeleton className="h-6 w-24" /> {/* Score label */}
          <Skeleton className="h-12 w-20" /> {/* Score value */}
          <Skeleton className="h-6 w-32" /> {/* Out of */}
          <Skeleton className="h-6 w-28" /> {/* Duration */}
          {/* Circle Chart Skeleton */}
          <Skeleton className="h-48 w-48 rounded-full" />
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-3 col-span-5 flex items-center justify-center">
          {/* Bar chart skeleton */}
          <Skeleton className="h-64 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
