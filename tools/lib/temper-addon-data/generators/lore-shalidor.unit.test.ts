import { describe, expect, test } from "bun:test"
import { generateLoreShalidor } from "./lore-shalidor.ts"

interface Category {
  categoryIndex: number
  name: string
  collections: readonly {
    collectionIndex: number
    name: string
    books: readonly { bookIndex: number; name: string }[]
  }[]
}

function category1(): Category {
  const collections = []
  for (let ci = 1; ci <= 29; ci++) {
    const bookCount = ci === 29 ? 17 : 10
    const books = []
    for (let bi = 1; bi <= bookCount; bi++) {
      books.push({ bookIndex: bi, name: `Book ${ci}-${bi}` })
    }
    collections.push({ collectionIndex: ci, name: `Collection ${ci}`, books })
  }
  return { categoryIndex: 1, name: "Shalidor's Library", collections }
}

function otherCategory(): Category {
  return {
    categoryIndex: 2,
    name: "Crafting Motifs",
    collections: [
      {
        collectionIndex: 99,
        name: "Cat 2 Collection",
        books: [{ bookIndex: 1, name: "Cat 2 Book" }],
      },
    ],
  }
}

describe("generateLoreShalidor", () => {
  test("emits 29 collections / 297 books from category 1", () => {
    const out = generateLoreShalidor([category1(), otherCategory()])
    expect(out.split("books: [").length - 1).toBe(29)
    expect(out.split("{ bookIndex:").length - 1).toBe(297)
  })

  test("groups books under their collection, category-1 only", () => {
    const out = generateLoreShalidor([otherCategory(), category1()])
    const idxC1 = out.indexOf('name: "Collection 1"')
    const idxB1 = out.indexOf('name: "Book 1-1"')
    const idxC29 = out.indexOf('name: "Collection 29"')
    const idxB29 = out.indexOf('name: "Book 29-17"')
    expect(idxB1).toBeGreaterThan(idxC1)
    expect(idxB1).toBeLessThan(idxC29)
    expect(idxB29).toBeGreaterThan(idxC29)
    expect(out).not.toContain("Cat 2 Collection")
    expect(out).not.toContain("Cat 2 Book")
  })

  test("sorts collections by collectionIndex ascending regardless of input order", () => {
    const cat = category1()
    const reversed: Category = { ...cat, collections: [...cat.collections].reverse() }
    const out = generateLoreShalidor([reversed])
    expect(out.indexOf('name: "Collection 1"')).toBeLessThan(out.indexOf('name: "Collection 2"'))
  })

  test("throws when category 1 is absent", () => {
    expect(() => generateLoreShalidor([otherCategory()])).toThrow(/category 1 not found/)
  })

  test("throws when the collection count is wrong (fail loud, fixed-size)", () => {
    const cat = category1()
    const short: Category = { ...cat, collections: cat.collections.slice(0, 28) }
    expect(() => generateLoreShalidor([short])).toThrow(/expected 29 collections/)
  })

  test("throws when the book count is wrong (fail loud, fixed-size)", () => {
    const cat = category1()
    const trimmed = cat.collections.map((c, i) =>
      i === 0 ? { ...c, books: c.books.slice(0, c.books.length - 1) } : c
    )
    const short: Category = { ...cat, collections: trimmed }
    expect(() => generateLoreShalidor([short])).toThrow(/expected 297 books/)
  })
})
