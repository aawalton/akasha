export type NutritionPoints = typeof import("./daily-tracking/nutrition-points.ts")
export type TaskPoints = typeof import("./daily-tracking/task-points.ts")
export type HealthTotalPoints = typeof import("./daily-tracking/health-total-points.ts")
export type HealthTotalOutcome = Awaited<ReturnType<HealthTotalPoints["writeHealthTotalPoints"]>>
export type StrengthPoints = typeof import("./daily-tracking/strength-points.ts")
export type TopicWords = typeof import("./daily-tracking/topic-words.ts")

export async function nutritionPoints(): Promise<NutritionPoints> {
  return await import("./daily-tracking/nutrition-points.ts")
}

export async function taskPoints(): Promise<TaskPoints> {
  return await import("./daily-tracking/task-points.ts")
}

export async function healthTotalPoints(): Promise<HealthTotalPoints> {
  return await import("./daily-tracking/health-total-points.ts")
}

export async function strengthPoints(): Promise<StrengthPoints> {
  return await import("./daily-tracking/strength-points.ts")
}

export async function topicWords(): Promise<TopicWords> {
  return await import("./daily-tracking/topic-words.ts")
}
