import { expect, test } from "bun:test"
import {
  type CapturedStar,
  championStarsIn,
  championStarWrites,
  landChampionStars,
  type StarPage,
  type StarWrite,
} from "akasha/temper/watcher/modules/watcher-champion-star-landing/watcher-champion-star-landing.module.code.ts"

function captureOf(stars: string): string {
  return `
TemperCatalog_SavedVariables =
{
    ["Default"] =
    {
        ["@aawalton"] =
        {
            ["$AccountWide"] =
            {
                ["apiVersion"] = "eso.live.12.1.6.3309674",
                ["manifestApiVersion"] = 101050,
                ${stars}
            },
        },
    },
}
`
}

const THREE_STARS = captureOf(`["championStarCatalog"] =
                {
                    [99] =
                    {
                        ["esoChampionSkillId"] = 99,
                        ["maxPoints"] = 20,
                        ["isSlottable"] = false,
                        ["jumpPoints"] =
                        {
                            [1] = 10,
                            [2] = 20,
                        },
                    },
                    [12] =
                    {
                        ["esoChampionSkillId"] = 12,
                        ["maxPoints"] = 50,
                        ["isSlottable"] = true,
                        ["jumpPoints"] =
                        {
                            [1] = 10,
                            [2] = 20,
                            [3] = 30,
                            [4] = 40,
                            [5] = 50,
                        },
                    },
                    [300] =
                    {
                        ["esoChampionSkillId"] = 300,
                        ["maxPoints"] = 50,
                        ["isSlottable"] = false,
                    },
                },`)

const PAGES: readonly StarPage[] = [
  {
    id: "eldritch",
    slug: "eldritch-insight",
    skillId: 99,
    jumpPoints: [10, 20],
    isSlottable: false,
  },
  { id: "deadly", slug: "deadly-aim", skillId: 12, jumpPoints: [], isSlottable: false },
  { id: "none", slug: "no-warfare-star", skillId: 0, jumpPoints: [], isSlottable: true },
]

test("each captured star is read with its jump points in order and whether it is slottable", () => {
  expect([...championStarsIn(THREE_STARS)]).toEqual([
    [12, { jumpPoints: [10, 20, 30, 40, 50], isSlottable: true }],
    [99, { jumpPoints: [10, 20], isSlottable: false }],
    [300, { jumpPoints: [], isSlottable: false }],
  ])
})

test("jump points saved as a plain list read the same as jump points saved by index", () => {
  const listed = captureOf(`["championStarCatalog"] =
                {
                    [99] = { ["isSlottable"] = false, ["jumpPoints"] = { 10, 20 }, },
                },`)
  expect(championStarsIn(listed).get(99)).toEqual({ jumpPoints: [10, 20], isSlottable: false })
})

test("a capture holding no stars, a landed mark alone, or no capture at all reads as no stars", () => {
  expect(championStarsIn(captureOf("")).size).toBe(0)
  expect(championStarsIn(captureOf(`["championStarCatalog"] = { ["landed"] = true, },`)).size).toBe(
    0
  )
  expect(championStarsIn("this is not lua at all").size).toBe(0)
})

test("a page is written only where its jump points or slotting differ from the capture", () => {
  const { writes } = championStarWrites(championStarsIn(THREE_STARS), PAGES)
  expect(writes).toEqual([
    { id: "deadly", slug: "deadly-aim", jumpPoints: [10, 20, 30, 40, 50], isSlottable: true },
  ])
})

test("a captured star number no page states is reported rather than written", () => {
  const { unpaged } = championStarWrites(championStarsIn(THREE_STARS), PAGES)
  expect(unpaged).toEqual([300])
})

test("a page stating jump points the capture does not is reported and left as it is", () => {
  const stars = new Map<number, CapturedStar>([[99, { jumpPoints: [], isSlottable: false }]])
  const outcome = championStarWrites(stars, PAGES)
  expect(outcome.writes).toEqual([])
  expect(outcome.unjumped).toEqual(["eldritch-insight"])
})

test("the landing writes each differing page and lists no page when the capture holds no star", async () => {
  const written: StarWrite[] = []
  let listed = 0
  const deps = {
    starPages: async () => {
      listed++
      return PAGES
    },
    write: async (write: StarWrite) => {
      written.push(write)
      return write
    },
    report: () => {},
  }
  const outcome = await landChampionStars(THREE_STARS, deps)
  expect(outcome.unpaged).toEqual([300])
  expect(written.map((write) => write.slug)).toEqual(["deadly-aim"])
  expect(await landChampionStars(captureOf(""), deps)).toEqual({
    writes: [],
    unpaged: [],
    unjumped: [],
  })
  expect(listed).toBe(1)
})
