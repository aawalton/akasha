export type MotifBookId = {
  readonly styleId: number
  readonly chapterId: number | null
}

const CHAPTER_SUFFIX_TO_ID: Readonly<Record<string, number>> = {
  Axes: 1,
  Belts: 2,
  Boots: 3,
  Bows: 4,
  Chests: 5,
  "Chest Pieces": 5,
  Daggers: 6,
  Dagger: 6,
  Gloves: 7,
  Helmets: 8,
  Helmet: 8,
  Helms: 8,
  Legs: 9,
  "Leg Greaves": 9,
  Maces: 10,
  Shields: 11,
  Shield: 11,
  Shoulders: 12,
  Cops: 12,
  Staves: 13,
  Swords: 14,
}

const SUFFIXES: readonly string[] = [
  "Style",
  "Chest Pieces",
  "Leg Greaves",
  "Axes",
  "Belts",
  "Boots",
  "Bows",
  "Chests",
  "Daggers",
  "Dagger",
  "Gloves",
  "Helmets",
  "Helmet",
  "Helms",
  "Legs",
  "Maces",
  "Shields",
  "Shield",
  "Shoulders",
  "Cops",
  "Staves",
  "Swords",
]

const PREFIX = "Crafting Motif "
const CROWN_PREFIX = "Crown Crafting Motif "

const TOME_EDITION_TAIL = ", Tome Edition"

function parsePositiveInteger(s: string): number | undefined {
  if (s.length === 0) return undefined
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i)
    if (code < 48 || code > 57) return undefined
  }
  const n = Number(s)
  if (!Number.isInteger(n) || n <= 0) return undefined
  return n
}

export function parseMotifBookName(cleanName: string): MotifBookId | undefined {
  const isCrown = cleanName.startsWith(CROWN_PREFIX)
  const afterPrefix = isCrown
    ? cleanName.slice(CROWN_PREFIX.length)
    : cleanName.startsWith(PREFIX)
      ? cleanName.slice(PREFIX.length)
      : undefined
  if (afterPrefix === undefined) return undefined
  const colonIdx = afterPrefix.indexOf(": ")
  if (colonIdx <= 0) return undefined
  const idStr = afterPrefix.slice(0, colonIdx)
  const styleId = parsePositiveInteger(idStr)
  if (styleId === undefined) return undefined
  const afterColonRaw = afterPrefix.slice(colonIdx + 2)
  if (afterColonRaw.length === 0) return undefined
  const afterColon = afterColonRaw.endsWith(TOME_EDITION_TAIL)
    ? afterColonRaw.slice(0, -TOME_EDITION_TAIL.length)
    : afterColonRaw
  if (afterColon.length === 0) return undefined

  for (const suffix of SUFFIXES) {
    const tail = ` ${suffix}`
    if (afterColon.length <= tail.length) continue
    if (afterColon.endsWith(tail)) {
      if (suffix === "Style") {
        return { styleId, chapterId: null }
      }
      const chapterId = CHAPTER_SUFFIX_TO_ID[suffix]
      if (chapterId === undefined) return undefined
      return { styleId, chapterId }
    }
  }
  if (isCrown) return { styleId, chapterId: null }
  return undefined
}
