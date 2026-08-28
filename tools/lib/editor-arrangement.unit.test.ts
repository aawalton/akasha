import { describe, expect, test } from "bun:test"
import { type Arrangement, pagesFor } from "./editor-arrangement.ts"

const WINDOW = "1422801-27517001"

const TERMINAL = "2127661-27012894"

const arrangement: Arrangement = {
  window: WINDOW,
  groups: [
    {
      position: 1,
      active: true,
      tabs: [
        { label: "one", active: true, terminal: TERMINAL, seat: "astra" },
        { label: "two", active: false },
      ],
    },
  ],
}

describe("the pages an editor arrangement lands", () => {
  // `writePage` composes a page's frontmatter from these values alone, so a key absent here is a
  // key erased from the standing file. Every one of these pages is addressed by its `name`, which
  // is its file stem, and a page states the name it is addressed by.
  test("every page states the name it is addressed by as its slug", () => {
    for (const page of pagesFor(arrangement)) expect(page.values["slug"]).toBe(page.name)
  })

  test("covers a window, a group, a terminal and a tab", () => {
    expect(pagesFor(arrangement).map((one) => one.name)).toEqual([
      WINDOW,
      `${WINDOW}-1`,
      TERMINAL,
      `${WINDOW}-1-1`,
      `${WINDOW}-1-2`,
    ])
  })
})
