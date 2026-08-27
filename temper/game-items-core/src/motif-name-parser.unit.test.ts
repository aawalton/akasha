import { describe, expect, it } from "bun:test"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { parseMotifBookName } from "./motif-name-parser"

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

describe("parseMotifBookName — master books", () => {
  it("parses Crafting Motif 1: High Elf Style as styleId 1, chapterId null", () => {
    expect(parseMotifBookName("Crafting Motif 1: High Elf Style")).toEqual({
      styleId: 1,
      chapterId: null,
    })
  })

  it("parses Crafting Motif 14: Imperial Style as styleId 14, chapterId null", () => {
    expect(parseMotifBookName("Crafting Motif 14: Imperial Style")).toEqual({
      styleId: 14,
      chapterId: null,
    })
  })

  it("parses Crafting Motif 15: Dwemer Style as styleId 15, chapterId null", () => {
    expect(parseMotifBookName("Crafting Motif 15: Dwemer Style")).toEqual({
      styleId: 15,
      chapterId: null,
    })
  })

  it("parses Crafting Motif 136: Voskrona Guardian Style as styleId 136, chapterId null", () => {
    expect(parseMotifBookName("Crafting Motif 136: Voskrona Guardian Style")).toEqual({
      styleId: 136,
      chapterId: null,
    })
  })
})

describe("parseMotifBookName — Crown-prefixed master books", () => {
  it("parses Crown Crafting Motif 1: High Elf Style as styleId 1, chapterId null", () => {
    expect(parseMotifBookName("Crown Crafting Motif 1: High Elf Style")).toEqual({
      styleId: 1,
      chapterId: null,
    })
  })

  it("parses Crown Crafting Motif 43: Grim Harlequin Style as styleId 43, chapterId null", () => {
    expect(parseMotifBookName("Crown Crafting Motif 43: Grim Harlequin Style")).toEqual({
      styleId: 43,
      chapterId: null,
    })
  })

  it("parses Crown Crafting Motif 46: Frostcaster Style as styleId 46, chapterId null", () => {
    expect(parseMotifBookName("Crown Crafting Motif 46: Frostcaster Style")).toEqual({
      styleId: 46,
      chapterId: null,
    })
  })

  it("parses truncated Crown master book Annihilarch's Chosen (styleId 107) as chapterId null", () => {
    expect(parseMotifBookName("Crown Crafting Motif 107: Annihilarch's Chosen")).toEqual({
      styleId: 107,
      chapterId: null,
    })
  })

  it("parses truncated Crown master book Kindred's Concord (styleId 123) as chapterId null", () => {
    expect(parseMotifBookName("Crown Crafting Motif 123: Kindred's Concord")).toEqual({
      styleId: 123,
      chapterId: null,
    })
  })

  it("parses truncated Crown master book Hircine Bloodhunter (styleId 129) as chapterId null", () => {
    expect(parseMotifBookName("Crown Crafting Motif 129: Hircine Bloodhunter")).toEqual({
      styleId: 129,
      chapterId: null,
    })
  })

  it("returns undefined for a bare motif name with no suffix (no Crown prefix)", () => {
    expect(parseMotifBookName("Crafting Motif 107: Annihilarch's Chosen")).toBeUndefined()
  })
})

describe("parseMotifBookName — Tome Edition master books", () => {
  it("parses Crafting Motif 61: Psijic Style, Tome Edition as styleId 61, chapterId null", () => {
    expect(parseMotifBookName("Crafting Motif 61: Psijic Style, Tome Edition")).toEqual({
      styleId: 61,
      chapterId: null,
    })
  })

  it("parses Crown Crafting Motif 61: Psijic Style, Tome Edition as styleId 61, chapterId null", () => {
    expect(parseMotifBookName("Crown Crafting Motif 61: Psijic Style, Tome Edition")).toEqual({
      styleId: 61,
      chapterId: null,
    })
  })
})

const CHAPTER_SUFFIXES = [
  "Axes",
  "Belts",
  "Boots",
  "Bows",
  "Chests",
  "Chest Pieces",
  "Daggers",
  "Dagger",
  "Gloves",
  "Helmets",
  "Helmet",
  "Legs",
  "Maces",
  "Shields",
  "Shield",
  "Shoulders",
  "Staves",
  "Swords",
] as const

describe("parseMotifBookName — chapter books", () => {
  for (const suffix of CHAPTER_SUFFIXES) {
    it(`parses Crafting Motif 15: Dwemer ${suffix} as styleId 15 with a non-null chapterId`, () => {
      const parsed = parseMotifBookName(`Crafting Motif 15: Dwemer ${suffix}`)
      expect(parsed).toBeDefined()
      expect(parsed?.styleId).toBe(15)
      expect(parsed?.chapterId).not.toBeNull()
      expect(typeof parsed?.chapterId).toBe("number")
    })
  }

  it("yields the same chapterId for a given suffix across different styles", () => {
    for (const suffix of CHAPTER_SUFFIXES) {
      const dwemer = parseMotifBookName(`Crafting Motif 15: Dwemer ${suffix}`)
      const yokudan = parseMotifBookName(`Crafting Motif 20: Yokudan ${suffix}`)
      expect(dwemer).toBeDefined()
      expect(yokudan).toBeDefined()
      expect(dwemer?.chapterId).toBe(yokudan?.chapterId)
    }
  })

  it("assigns distinct chapterIds across the 14 standard suffixes (Chests / Chest Pieces share)", () => {
    const ids = new Set<number>()
    for (const suffix of CHAPTER_SUFFIXES) {
      const parsed = parseMotifBookName(`Crafting Motif 15: Dwemer ${suffix}`)
      expect(parsed).toBeDefined()
      if (parsed?.chapterId !== null && parsed?.chapterId !== undefined) {
        ids.add(parsed.chapterId)
      }
    }
    expect(ids.size).toBe(14)
  })
})

describe("parseMotifBookName — non-motif names return undefined", () => {
  it("returns undefined for a non-motif lore book name", () => {
    expect(parseMotifBookName("Random Lore Book")).toBeUndefined()
  })

  it("returns undefined for an improvement material name", () => {
    expect(parseMotifBookName("Improvement: Tannin")).toBeUndefined()
  })

  it("returns undefined for an empty string", () => {
    expect(parseMotifBookName("")).toBeUndefined()
  })

  it("returns undefined for a motif-shaped name with an unknown suffix", () => {
    expect(parseMotifBookName("Crafting Motif 1: High Elf Pizza")).toBeUndefined()
  })

  it("returns undefined for a motif prefix missing the style segment", () => {
    expect(parseMotifBookName("Crafting Motif 15:")).toBeUndefined()
  })

  it("returns undefined for a motif name without the leading 'Crafting Motif' prefix", () => {
    expect(parseMotifBookName("Dwemer Axes")).toBeUndefined()
  })
})

describe("parseMotifBookName — every motif-shaped book in lore-library-data parses", () => {
  const motifCategory = loreLibraryData.find(
    (c) => c.categoryIndex === CRAFTING_MOTIFS_CATEGORY_INDEX
  )

  function isMotifShaped(name: string): boolean {
    return name.startsWith("Crafting Motif ") || name.startsWith("Crown Crafting Motif ")
  }

  it("the Crafting Motifs category is present in the lore library data", () => {
    expect(motifCategory).toBeDefined()
  })

  it("every motif-shaped name in the Crafting Motifs category parses to a non-undefined result", () => {
    expect(motifCategory).toBeDefined()
    if (!motifCategory) return
    const unparsed: string[] = []
    for (const collection of motifCategory.collections) {
      for (const book of collection.books) {
        if (!isMotifShaped(book.name)) continue
        const parsed = parseMotifBookName(book.name)
        if (parsed === undefined) {
          unparsed.push(book.name)
        }
      }
    }
    expect(unparsed).toEqual([])
  })
})
