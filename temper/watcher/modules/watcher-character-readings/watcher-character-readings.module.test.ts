import { expect, test } from "bun:test"
import { characterReadingsFor } from "akasha/temper/watcher/modules/watcher-character-readings/watcher-character-readings.module.code.ts"

const ROWS = [
  { slug: "erin", esoCharacterId: "1001", completion: "json" },
  { slug: "ryoka", esoCharacterId: "1002", completion: "json" },
  { slug: "mrsha", esoCharacterId: "1003" },
]

function seam(said: string[], asked: unknown[]) {
  return {
    getRows: (async (args: unknown) => {
      asked.push(args)
      return { rows: ROWS, nextCursor: null, count: null }
    }) as never,
    readPages: (async (named: readonly { slug: string }[]) => ({
      ok: true,
      unplaced: [],
      bodies: named.map((one) => ({ path: `c/${one.slug}/${one.slug}.c.ts`, content: "" })),
    })) as never,
    readFiles: (async (paths: readonly string[]) => ({
      ok: true,
      at: "head",
      bodies: paths.map((path) => ({ path, content: "{}" })),
    })) as never,
    reading: (async () => {
      if (asked.length > 1) return { refused: "the frontBar reading kept no skills" }
      asked.push("read")
      return { toughnessPerSecond: 197914.6, damagePerSecond: 7771.5, healingPerSecond: 14030.6 }
    }) as never,
    report: (message: string) => {
      said.push(message)
    },
  }
}

test("each character of the account with a completion is read, keyed by the game's id", async () => {
  const said: string[] = []
  const asked: unknown[] = []
  const readings = await characterReadingsFor("temper-account/alan", seam(said, asked))
  expect(asked[0]).toEqual({
    pageTypeSlug: "temper-account-character",
    where: [{ key: "accountPage", eq: "temper-account/alan" }],
    select: ["slug", "esoCharacterId", "completion"],
    limit: 1000,
  })
  expect(readings).toEqual({ "1001": { toughness: 197915, damage: 7772, healing: 14031 } })
  expect(said).toEqual(["Readings: ryoka has none, since the frontBar reading kept no skills"])
})
