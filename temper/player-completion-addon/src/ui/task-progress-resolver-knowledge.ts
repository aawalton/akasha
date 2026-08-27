import type { SavedCharacterEntry } from "../saved-variables"
import { getEsoDateString } from "../tracking/daily-writs"
import { DAILY_WRIT_COUNT } from "../tracking/daily-writs-state"
import { getRecipeTotals } from "../tracking/recipes"
import type { TaskProgress } from "./task-progress-resolver-types"

export function resolveDailyWrits(charData: SavedCharacterEntry | undefined): TaskProgress {
  const dw = charData?.dailyWrits
  const today = getEsoDateString(GetTimeStamp())
  if (dw === undefined || dw.date !== today) return { current: 0, total: DAILY_WRIT_COUNT }
  return { current: dw.completed, total: DAILY_WRIT_COUNT }
}

export function resolveRecipes(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const recipes = charData?.recipes
  if (recipes === undefined) return undefined

  const totals = getRecipeTotals()

  if (itemPath !== undefined && itemPath.length > 0) {
    const listIndex = Number(itemPath[0])
    const known = recipes[listIndex]
    const knownCount = known !== undefined ? known.length : 0
    const total = totals[listIndex] !== undefined ? totals[listIndex] : knownCount
    return { current: knownCount, total }
  }

  let current = 0
  let total = 0
  for (const [, listTotal] of Object.entries(totals)) {
    total += listTotal
  }
  for (const [, known] of Object.entries(recipes)) {
    current += known.length
  }
  if (total === 0) total = current
  return { current, total }
}

export function resolveScribing(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const scribing = charData?.scribing
  if (scribing === undefined) return undefined

  if (itemPath !== undefined && itemPath.length > 0) {
    const section = String(itemPath[0])
    if (section === "grimoires") {
      let current = 0
      let total = 0
      for (const [, g] of Object.entries(scribing.grimoires)) {
        total++
        if (g.unlocked) current++
      }
      return { current, total }
    }
    if (section === "scripts") {
      if (itemPath.length > 1) {
        const slotOrType = itemPath[1]
        const slot =
          typeof slotOrType === "number"
            ? slotOrType
            : slotOrType === "focusScripts"
              ? 1
              : slotOrType === "signatureScripts"
                ? 2
                : slotOrType === "affixScripts"
                  ? 3
                  : undefined
        if (slot === undefined) return undefined
        let current = 0
        let total = 0
        for (const [, s] of Object.entries(scribing.scripts)) {
          if (s.slot === slot) {
            total++
            if (s.unlocked) current++
          }
        }
        return { current, total }
      }
      let current = 0
      let total = 0
      for (const [, s] of Object.entries(scribing.scripts)) {
        total++
        if (s.unlocked) current++
      }
      return { current, total }
    }
    return undefined
  }

  let current = 0
  let total = 0
  for (const [, g] of Object.entries(scribing.grimoires)) {
    total++
    if (g.unlocked) current++
  }
  for (const [, s] of Object.entries(scribing.scripts)) {
    total++
    if (s.unlocked) current++
  }
  return { current, total }
}
