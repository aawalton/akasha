import { expect, test } from "bun:test"
import {
  landStyleNames,
  type StyleNameWrite,
  type StylePage,
  styleNamesIn,
  styleNameWrites,
} from "akasha/temper/watcher/modules/watcher-style-name-landing/watcher-style-name-landing.module.code.ts"

function captureOf(styles: string): string {
  return `
TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@aawalton"] =
        {
            ["$AccountWide"] =
            {
                ["apiVersion"] = "eso.live.12.0.8.3288357",
                ["manifestApiVersion"] = 101050,
                ${styles}
            },
        },
    },
}
`
}

const THREE_STYLES = captureOf(`["itemStyleCatalog"] =
                {
                    [16] = "Order of the Hour",
                    [17] = "Barbaric",
                    [120] = "Ascendant Order",
                },`)

const PAGES: readonly StylePage[] = [
  { id: "hour", styleId: 16, styleName: undefined },
  { id: "barbaric", styleId: 17, styleName: "Barbaric" },
  { id: "breton", styleId: 1, styleName: undefined },
]

test("each style number the capture names is read with the name the game gave it", () => {
  expect([...styleNamesIn(THREE_STYLES)]).toEqual([
    [16, "Order of the Hour"],
    [17, "Barbaric"],
    [120, "Ascendant Order"],
  ])
})

test("a capture holding no style names, or no capture at all, reads as no names", () => {
  expect(styleNamesIn(captureOf("")).size).toBe(0)
  expect(styleNamesIn("this is not lua at all").size).toBe(0)
})

test("a page is written only where the captured name differs from the one it holds", () => {
  const { writes } = styleNameWrites(styleNamesIn(THREE_STYLES), PAGES)
  expect(writes).toEqual([{ id: "hour", styleName: "Order of the Hour" }])
})

test("a captured number no page states is reported rather than written", () => {
  const { unpaged } = styleNameWrites(styleNamesIn(THREE_STYLES), PAGES)
  expect(unpaged).toEqual([120])
})

test("the landing writes each differing name and lists no page when the capture names none", async () => {
  const written: StyleNameWrite[] = []
  let listed = 0
  const deps = {
    stylePages: async () => {
      listed++
      return PAGES
    },
    name: async (write: StyleNameWrite) => {
      written.push(write)
      return write
    },
    report: () => {},
  }
  expect(await landStyleNames(THREE_STYLES, deps)).toEqual({ named: 1, unpaged: [120] })
  expect(written).toEqual([{ id: "hour", styleName: "Order of the Hour" }])
  expect(await landStyleNames(captureOf(""), deps)).toEqual({ named: 0, unpaged: [] })
  expect(listed).toBe(1)
})
