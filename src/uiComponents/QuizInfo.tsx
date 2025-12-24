// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Item,
//   ItemContent,
//   ItemDescription,
//   ItemMedia,
//   ItemTitle,
// } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { BadgeQuestionMark, ClockFading, Star } from "lucide-react";

export default function QuizInfo({
  term,
  setTerm,
  questions,
}: {
  term: boolean;
  setTerm: (term: boolean) => void;
  questions: number;
}) {
  return (
    <div>
      <header className="border-b border-gray-400 flex gap-4 px-4 py-4">
        <div className="flex gap-2 align-center justify-center">
          <BadgeQuestionMark />
          <h2 className="md:text-lg text-base">{questions} Question's</h2>
        </div>
        <div className="flex gap-2 align-center justify-center">
          <ClockFading />
          <h2 className="md:text-lg text-base">30 Minutes</h2>
        </div>
        <div className="flex gap-2 align-center justify-center">
          <Star />
          <h2 className="md:text-lg text-base">{questions} Marks</h2>
        </div>
      </header>
      <div className="flex flex-col gap-4 md:text-lg text-base list-disc px-8 py-4 h-[80dvh] overflow-y-scroll">
        {/* <h2 className="md:text-lg text-base">Test Sections</h2> */}
        {/* <Item variant="outline" className="border-b border-gray-400">
          <ItemMedia>
            <Avatar className="size-10">
              <AvatarFallback className="text-primary">ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Evil Rabbit</ItemTitle>
            <ItemDescription className="flex gap-4">
              <div className="flex align-center gap-2">
                <BadgeQuestionMark size={20} />
                20 question's
              </div>
              <div className="flex align-center gap-2">
                <Star size={20} />
                20 marks
              </div>
            </ItemDescription>
          </ItemContent>
        </Item> */}
        <div className="flex items-center gap-3">
          <Checkbox id="terms" checked={term} onCheckedChange={setTerm} />
          <Label htmlFor="terms" className="text-lg">
            I have read and understood the instructions. I agree that in case of
            not adhering to the instructions, I shall be liable to be debarred
            from this test and/or disciplinary action, which may include ban
            from future tests.
          </Label>
        </div>
      </div>
    </div>
  );
}
