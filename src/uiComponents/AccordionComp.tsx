import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { GetModule, Lessons } from "@/Types/Courses/getCourses";
import type { attemptedQuiz } from "@/Types/quiz";
import {
  CaseSensitive,
  ExternalLink,
  FileAudio,
  FileText,
  MessageCircleQuestionMark,
  Video,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const getIcon = (lessonType: string) => {
  switch (lessonType) {
    case "text":
      return <CaseSensitive />;
    case "video":
      return <Video />;
    case "audio":
      return <FileAudio />;
    case "document":
      return <FileText />;
    case "quiz":
      return <MessageCircleQuestionMark />;
    default:
      return <FileText />;
  }
};

export default function AccordionComp({
  item,
  idx,
  readmore,
  setReadmore,
  attempted,
}: {
  item: GetModule;
  idx: number;
  readmore: boolean;
  setReadmore: (value: boolean) => void;
  attempted: attemptedQuiz[];
}) {
  const navigate = useNavigate();
  const handleNavigate = (lesson: Lessons) => {
    switch (lesson.type) {
      case "video":
        navigate(`/dashboard/course/video/${lesson.id}`);
        break;
      case "document":
        navigate(`/dashboard/course/pdf/${lesson.documentUrl}`, {state: {folder: "document"}});
        break;
      case "quiz":
        navigate(`/quiz/${lesson.title}`, { state: { quiz: lesson } });
        break;
    }
  };
  const handleResources = (url: string) => {
    navigate(`/dashboard/course/pdf/${url}`, {state: {folder: "resources"}});
  };
  return (
    <Accordion type="single" collapsible className="w-full  rounded-md px-2">
      <AccordionItem value={`item-${idx}`}>
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col gap-4 flex-wrap">
            <div className="flex flex-row gap-8 items-center ">
              <p className="text-lg font-semibold">Module {idx + 1}</p>
              <p className="md:text-lg text-base font-semibold capatlize">
                {item?.title}
                {/* <span>Duration : 06 min </span> */}
              </p>
            </div>
            <p
              className={`text-balance text-base ${
                readmore ? "" : "line-clamp-4"
              }  `}
            >
              {item?.description.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <p
              onClick={() => setReadmore(!readmore)}
              className="w-30 text-sm font-semibold text-primary cursor-pointer bg-primary/10 hover:bg-primary/20 p-2 rounded-md"
            >
              {readmore ? "Read Less" : "Read More"}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <ItemGroup className="flex flex-col gap-4">
            {item?.lessons?.map((lesson, i) => (
              <Item variant="outline" size="sm" key={i}>
                <ItemMedia className="text-muted-foreground">
                  {getIcon(lesson.type)}
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="md:text-lg text-sm text-balance font-semibold">
                    {lesson.title || "Lesson Title"}
                  </ItemTitle>
                  {lesson?.resources?.length > 0 && (
                    <ItemDescription className="flex flex-col gap-2">
                      <p className="text-lg font-semibold text-primary">
                        Resources
                      </p>

                      {lesson?.resources?.map((resource) => (
                        <Button
                          variant={"outline"}
                          key={resource.id}
                          className="w-1/2 justify-start"
                          onClick={handleResources.bind(
                            null,
                            resource.resource.url
                          )}
                        >
                          <FileText />
                          <p className="text-balance line-clamp-1">{resource?.resource?.url}</p> 
                        </Button>
                      ))}
                    </ItemDescription>
                  )}
                </ItemContent>
                {lesson?.id &&
                attempted?.find((a) => a.lessonId === lesson.id) ? (
                  <ItemActions>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigate(
                          `/quizResult/${
                            attempted?.find((a) => a.lessonId === lesson.id)?.id
                          }`,
                          { state: { title: lesson.title } }
                        );
                      }}
                    >
                      <ExternalLink className="text-primary" /> Summary
                    </Button>
                  </ItemActions>
                ) : lesson?.id ? (
                  <ItemActions>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleNavigate(lesson);
                      }}
                    >
                      <ExternalLink /> Open
                    </Button>
                  </ItemActions>
                ) : null}
              </Item>
            ))}
          </ItemGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
