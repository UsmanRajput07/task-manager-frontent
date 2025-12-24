import z from "zod";

export const quizAttemptSchema = z.object({
  userId: z.string(),
  lessonId: z.string(),
  attempts: z.array(
    z.object({
      questionId: z.string(),
      optionId: z.number().optional(),
      status: z.enum(["not_attempted", "visited", "answered", "review"]),
    })
  ),
});
