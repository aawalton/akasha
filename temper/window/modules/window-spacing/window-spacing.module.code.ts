import {
  SPACING_STEPS,
  type SpacingToken,
} from "akasha/design/interface/token/modules/spacing-step/spacing-step.module.code.ts"

export function spaceOf(token: SpacingToken): number {
  for (const step of SPACING_STEPS) {
    if (step.token === token) return step.px
  }
  return 0
}
