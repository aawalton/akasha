import { admitSeatName } from "./admit-seat-name.ts"
import { resolveRoots, targetRoot } from "../../repo/roots/roots"
import { seatNameShapes } from "./seat-name-families.ts"
import { nameVocabularyOf } from "./seat-name-vocabulary.ts"

export interface SeatNameAdmission {
  readonly admitted: boolean
  readonly declaredShapes: readonly string[]
}

export function seatNameAdmission(name: string): SeatNameAdmission {
  const named = nameVocabularyOf(targetRoot(resolveRoots()))
  const { admitted } = admitSeatName(name, {
    personas: new Set(named.personas),
    persons: new Set(named.persons),
    domains: new Set(named.domains),
  })
  return { admitted, declaredShapes: seatNameShapes() }
}
