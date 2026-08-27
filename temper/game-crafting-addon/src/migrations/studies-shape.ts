import { state } from "../state"

export function MigrateStudiesShape(): undefined {
  const studies = state.Account.crafting.studies
  for (const [char, entry] of pairs(studies)) {
    if (!istable(entry)) {
      studies[char] = {}
    }
  }
}
