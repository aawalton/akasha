export type RequiredSkillLinesMode = "all-maxed" | "any-not-maxed"

export interface RequiredSkillLinesCondition {
  readonly skillLineIds: readonly string[]
  readonly mode: RequiredSkillLinesMode
}
