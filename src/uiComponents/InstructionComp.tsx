
const instructions = [
  "This is a timed test the running time is displayed on top left corner of the screen.",
  "The bar above the question text displays the question numbers in the current section of the test. You can move to any question by clicking on the respective number.",
  "The question screen displays the question number along with the question and respective options.",
  "The top right of section above the question has an option to mark the question for review. You can later view the marked question.",
  "You can mark or unmark any option you have chosen by tapping on the respective option.",
  "The bottom left corner contains the option to move to the previous question.",
  "The bottom right corner contains the option to move to the next question.",
  "You can jump between sections(if allowed by tutor) by choosing the section in bottom centre drop down.",
  "You can submit the test at any point of time by clicking the Submit button on top right corner of the screen.",
  "Before submission, the screen shows a confirmation pop-up with the total number of questions in the test, questions answered and questions marked for review.",
  "Test must be completed in one attempt. Test once submitted cannot be re-attempted or started again.",
  "You should not change or close the test screen while attempting test.",
  "If the app is closed or screen is changed more than three times by any means, the test will be submitted automatically.",
  "After completion of test, a test summary screen will be displayed with section details & solutions.",
  "If something goes wrong, contact your tutor and communicate the problem.",
];

export default function InstructionComp() {
  return (
    <div>
      <header className="border-b border-gray-400">
        <h3 className="md:text-xl text-base md:px-12 py-4">
          General Instruction
        </h3>
      </header>
      <ul className="flex flex-col gap-4 md:text-lg text-base list-disc px-8 py-4 h-[80dvh] overflow-y-scroll">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
}
