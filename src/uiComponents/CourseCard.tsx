import { setCourse } from "@/app/features/courseDetails.slice";
import type { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import _config from "@/config/config";
import type { GetCourse, GetCourses } from "@/Types/Courses/getCourses";
import { ClockFading, Languages, Video } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function CourseCard({
  data,
  isPurchased,
}: {
  data: GetCourses;
  isPurchased: boolean;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleNavigate = (item: GetCourse) => {
    navigate(
      `/dashboard/courses/dst${(item?.courseId ?? item?.id)?.slice(0, 3)}`
    );
    dispatch(setCourse({ ...item, isPurchased: isPurchased }));
  };
  return data?.map((item) => {
    return (
      <Card
        key={item.courseId ?? item?.id}
        className="cursor-pointer h-fit hover:scale-105 hover:shadow-lg  transition-all duration-300 ease-in-out"
        onClick={handleNavigate.bind(null, item)}
      >
        <CardHeader>
          <CardTitle className="flex flex-col gap-4 text-xl">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={`${_config.CloudFrontUrl}/courseSource/${item?.thumbnail}`}
                alt="telegram"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <p className="line-clamp-1">{item?.title}</p>
          </CardTitle>
          <CardDescription className="text-base line-clamp-4">
            {item?.description}
          </CardDescription>
          <CardFooter className="flex flex-row gap-2 items-center justify-start p-0 flex-wrap">
            <Button>
              <ClockFading />
              {"Not available"}
            </Button>
            <Button>
              <Languages />
              {item?.language}
            </Button>
            <Button>
              <Video />
              {item?._count?.modules}
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
    );
  });
}
