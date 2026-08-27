import { describe, expect, test } from "bun:test"
import {
  chapterPageName,
  chapterSlugOf,
  chapterTitleOf,
  isPatronTitle,
  publishedDayOf,
  strippedOfTrailingNav,
} from "../lib/wandering-inn/chapter.ts"

const NBSP = " "
const REAL_TAIL = `\n${NBSP} \n\n\n             \n               \n             \n           Previous Chapter Next Chapter`

describe("the navigation the site prints after the prose is not prose", () => {
  test("the both-labels tail and its padding lines go", () => {
    const prose = "The blade went in.\n\n“Us.”"
    expect(strippedOfTrailingNav(prose + REAL_TAIL)).toBe(prose)
  })

  test("the tail with no separator between the labels goes", () => {
    const prose = "“Don’t die. And welcome to Wistram.”"
    const tail = `\n${NBSP}\n${NBSP}\n\n\n             \n               \n             \n           Previous ChapterNext Chapter`
    expect(strippedOfTrailingNav(prose + tail)).toBe(prose)
  })

  test("a previous-only tail goes", () => {
    const prose = "…or WordPress’ Reader Mode.)"
    expect(strippedOfTrailingNav(`${prose}\n\n\n             \n           Previous Chapter`)).toBe(prose)
  })

  test("a next-only tail on its own line goes", () => {
    const prose = "The end of the beginning."
    expect(strippedOfTrailingNav(`${prose}\n\nNext Chapter`)).toBe(prose)
  })

  test("prose that merely ends with the phrase on its own line stays", () => {
    const prose = "She smiled. All of that waited in the Next Chapter"
    expect(strippedOfTrailingNav(prose)).toBe(prose)
  })

  test("an occurrence with prose after it stays", () => {
    const held = "Before.\nPrevious Chapter Next Chapter\nAfter the nav, more prose."
    expect(strippedOfTrailingNav(held)).toBe(held)
  })

  test("prose with no tail stays, and stripping twice changes nothing", () => {
    expect(strippedOfTrailingNav("Plain chapter body.\nWith lines.\n")).toBe(
      "Plain chapter body.\nWith lines.\n"
    )
    const once = strippedOfTrailingNav(`Prose.${REAL_TAIL}`)
    expect(strippedOfTrailingNav(once)).toBe(once)
    expect(strippedOfTrailingNav("")).toBe("")
  })
})

describe("a chapter's day comes from the dated path the site publishes it under", () => {
  test("the date in the path is the day", () => {
    expect(publishedDayOf("https://wanderinginn.com/2026/08/15/10-73-h/")).toBe("2026-08-15")
  })

  test("a path carrying no date has no day", () => {
    expect(publishedDayOf("https://wanderinginn.com/table-of-contents/")).toBeNull()
  })

  test("a date that is not a day has no day", () => {
    expect(publishedDayOf("https://wanderinginn.com/2026/02/30/x/")).toBeNull()
  })
})

describe("a chapter's page is named for where it stands in the story", () => {
  test("the position is padded so the names sort in order", () => {
    expect(chapterPageName(829, "10-73-h")).toBe(
      "the-wandering-inn/wandering-inn/the-wandering-inn/chapters/0829-10-73-h"
    )
    expect(chapterPageName(1, "1-00")).toBe(
      "the-wandering-inn/wandering-inn/the-wandering-inn/chapters/0001-1-00"
    )
  })

  test("a title becomes a slug, and a title with nothing sluggable becomes untitled", () => {
    expect(chapterSlugOf("10.73 H")).toBe("10-73-h")
    expect(chapterSlugOf("  ——  ")).toBe("untitled")
  })
})

describe("a chapter's title is the best of the three the page offers", () => {
  test("the open-graph title wins", () => {
    expect(chapterTitleOf("10.74 H", "10.74 H - The Wandering Inn", "listed")).toBe("10.74 H")
  })

  test("the document title has the site name taken off it", () => {
    expect(chapterTitleOf("", "10.74 H - The Wandering Inn", "listed")).toBe("10.74 H")
  })

  test("the listed title is what is left", () => {
    expect(chapterTitleOf("", " - The Wandering Inn", "listed")).toBe("listed")
  })
})

describe("a patron early access chapter is named as one", () => {
  test("the prefix the site uses says so", () => {
    expect(isPatronTitle("Patron Early Access 10.75")).toBe(true)
    expect(isPatronTitle("10.74 H")).toBe(false)
  })
})
