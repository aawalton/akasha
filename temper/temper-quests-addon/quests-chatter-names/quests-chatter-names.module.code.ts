import {
  CHATTER_OPTION_TYPE_NAMES,
  INTERACTION_TYPE_NAMES,
} from "../quests-chatter-name-tables/quests-chatter-name-tables.module.code.ts"

export function buildEsoNameMap(
  globals: Record<string, unknown>,
  names: readonly string[]
): Record<number, string> {
  const map: Record<number, string> = {}
  for (const name of names) {
    const value = globals[name]
    if (typeof value === "number") map[value] = name
  }
  return map
}

export function nameFromMap(map: Record<number, string>, value: number): string {
  return map[value] ?? `UNKNOWN_${value}`
}

declare const _G: Record<string, unknown>

let chatterMap: Record<number, string> | undefined
let interactionMap: Record<number, string> | undefined

export function chatterOptionTypeName(value: number): string {
  if (chatterMap === undefined) chatterMap = buildEsoNameMap(_G, CHATTER_OPTION_TYPE_NAMES)
  return nameFromMap(chatterMap, value)
}

export function interactionTypeName(value: number): string {
  if (interactionMap === undefined) interactionMap = buildEsoNameMap(_G, INTERACTION_TYPE_NAMES)
  return nameFromMap(interactionMap, value)
}
