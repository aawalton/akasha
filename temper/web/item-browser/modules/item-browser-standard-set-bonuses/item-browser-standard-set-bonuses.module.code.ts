import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export interface SetBonusStep {
  readonly numRequired: number
  readonly description: string
}

export type StandardSetBonusKeys = { [key: string]: true | undefined }

export function setBonusKey(this: void, description: string): string {
  const [withoutDecimals] = string.gsub(description, "%d+%.%d+%%?", "")
  const [withoutNumbers] = string.gsub(withoutDecimals, "%d+%%?", "")
  const [collapsed] = string.gsub(withoutNumbers, "%s+", " ")
  const [trimmedStart] = string.gsub(collapsed, "^ ", "")
  const [trimmed] = string.gsub(trimmedStart, " $", "")
  return string.lower(trimmed)
}

function isStandardFivePieceSet(this: void, steps: readonly SetBonusStep[]): boolean {
  const needed: { [numRequired: number]: true | undefined } = {}
  for (const step of steps) {
    if (step.numRequired < 2 || step.numRequired > 5) {
      return false
    }
    needed[step.numRequired] = true
  }
  return needed[2] === true && needed[3] === true && needed[4] === true && needed[5] === true
}

export function buildStandardSetBonusKeys(
  this: void,
  sets: ReadonlyArray<readonly SetBonusStep[]>
): StandardSetBonusKeys {
  const keys: StandardSetBonusKeys = {}
  for (const steps of sets) {
    if (isStandardFivePieceSet(steps)) {
      for (const step of steps) {
        if (step.numRequired < 5) {
          keys[setBonusKey(step.description)] = true
        }
      }
    }
  }
  return keys
}

export function nonStandardSetBonuses(
  this: void,
  keys: StandardSetBonusKeys,
  bonuses: readonly string[]
): string[] {
  const kept: string[] = []
  for (const bonus of bonuses) {
    if (keys[setBonusKey(bonus)] !== true) {
      kept.push(bonus)
    }
  }
  return kept
}
