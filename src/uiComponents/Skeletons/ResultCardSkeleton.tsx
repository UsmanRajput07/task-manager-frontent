import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function ResultCardSkeleton() {
  return (
    <Card className="text-center mx-auto w-full mt-4">
      {/* HEADER */}
      <CardHeader>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent>
        <div className="grid grid-cols-2 h-80 p-4 text-xl font-semibold gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex flex-row items-center justify-center gap-4">
        <Skeleton className="h-10 w-80" />
      </CardFooter>
    </Card>
  );
}
