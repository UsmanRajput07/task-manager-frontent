import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs({
  question,
  answer,
  idx,
}: {
  question: string;
  answer: string;
  idx: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-gray-200 py-1 rounded-lg px-4"
    >
      <AccordionItem value={`item-${idx}`}>
        <AccordionTrigger className="md:text-lg text-lg font-semibold capatlize">
          {question}
        </AccordionTrigger>
        <AccordionContent className="md:text-base text-sm font-semibold text-gray-600">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
