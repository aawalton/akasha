import { beforeEach, describe, expect, mock, test } from "bun:test"
import { join } from "node:path"
import { EXIT, exitCodeOf } from "../exit.ts"

const HERE = import.meta.dir

interface Answered {
  readonly ok: boolean
  readonly rows?: readonly { readonly at: string; readonly values: Record<string, unknown> }[]
  readonly n?: number
  readonly unfound?: readonly string[]
  readonly why?: string
}

/** Every query the store was asked, so a test can say the store was not asked at all. */
const asked: Record<string, unknown>[] = []

let answer: Answered = { ok: true, rows: [], n: 0, unfound: [] }

/**
 * Re-installed before every test as well as at load, because a module mock is a thing the whole run
 * shares. Another test file mocking the same module would otherwise reach into these tests.
 */
function standIn(): void {
  mock.module(join(HERE, "..", "page-query-client.ts"), () => ({
    askComposed: (query: Record<string, unknown>) => {
      asked.push(query)
      return Promise.resolve(answer)
    },
  }))
}

standIn()

const { mapTokensToRelationshipIds, parseRelationshipTokens, resolveRelationshipIds } = await import(
  "./relationships.ts"
)

const MOM = "11111111-2222-3333-4444-555555555555"

const DAD = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"

const PAGES = [
  { id: MOM, title: "Mom" },
  { id: DAD, title: "Dad" },
]

function refusalOf(f: () => unknown): { code: number; message: string } {
  try {
    f()
  } catch (thrown) {
    return { code: exitCodeOf(thrown), message: (thrown as Error).message }
  }
  throw new Error("nothing was refused")
}

async function refusalOfAsync(f: () => Promise<unknown>): Promise<{ code: number; message: string }> {
  try {
    await f()
  } catch (thrown) {
    return { code: exitCodeOf(thrown), message: (thrown as Error).message }
  }
  throw new Error("nothing was refused")
}

beforeEach(() => {
  standIn()
  asked.length = 0
  answer = { ok: true, rows: [], n: 0, unfound: [] }
})

describe("reading relationship tokens off the flags", () => {
  test("one flag may name several, separated by commas, and space around them is dropped", () => {
    expect(parseRelationshipTokens(["Mom, Dad"])).toEqual(["Mom", "Dad"])
    expect(parseRelationshipTokens([" Mom ", "Dad"])).toEqual(["Mom", "Dad"])
  })

  test("empty pieces are dropped rather than becoming empty tokens", () => {
    expect(parseRelationshipTokens(["Mom,,Dad", "  ", ","])).toEqual(["Mom", "Dad"])
    expect(parseRelationshipTokens([])).toEqual([])
    expect(parseRelationshipTokens([""])).toEqual([])
  })

  test("a repeated name is kept twice here, because deduplication happens later", () => {
    expect(parseRelationshipTokens(["Mom,Mom"])).toEqual(["Mom", "Mom"])
  })
})

describe("turning tokens into relationship ids", () => {
  test("a name is looked up, whatever its case, and answers with the id", () => {
    expect(mapTokensToRelationshipIds(["Mom"], PAGES)).toEqual([MOM])
    expect(mapTokensToRelationshipIds(["mom"], PAGES)).toEqual([MOM])
    expect(mapTokensToRelationshipIds(["Mom", "Dad"], PAGES)).toEqual([MOM, DAD])
  })

  test("the same relationship named twice is written once, in the order first named", () => {
    expect(mapTokensToRelationshipIds(["Dad", "Mom", "dad"], PAGES)).toEqual([DAD, MOM])
  })

  test("no tokens is no relationships, and nothing is looked up", () => {
    expect(mapTokensToRelationshipIds([], PAGES)).toEqual([])
    expect(mapTokensToRelationshipIds(["  "], PAGES)).toEqual([])
  })

  /**
   * A token that reads as a uuid is believed on sight.
   *
   * The list of pages is right there and is not consulted. Nothing checks that the id names a
   * relationship, or a page of any kind, or anything at all — so a copied id from another page type,
   * or a uuid a caller made up, goes into the row and the row looks correctly written.
   */
  // KNOWN DEFECT: an id should be checked against the relationships that exist, the same way a name
  // is, so that an id naming nothing refuses at the point it was typed.
  test("a token shaped like a uuid is taken as an id without checking anything has it", () => {
    const invented = "deadbeef-0000-0000-0000-000000000000"
    expect(mapTokensToRelationshipIds([invented], PAGES)).toEqual([invented])
    expect(mapTokensToRelationshipIds([invented], [])).toEqual([invented])
  })

  test("an id is written down in lower case, and two spellings of one id are one relationship", () => {
    expect(mapTokensToRelationshipIds(["DEADBEEF-0000-0000-0000-000000000000"], [])).toEqual([
      "deadbeef-0000-0000-0000-000000000000",
    ])
    expect(
      mapTokensToRelationshipIds(
        ["DEADBEEF-0000-0000-0000-000000000000", "deadbeef-0000-0000-0000-000000000000"],
        []
      )
    ).toEqual(["deadbeef-0000-0000-0000-000000000000"])
  })

  /**
   * The asymmetry: a mistyped name is refused loudly and a mistyped id is not refused at all.
   *
   * "Mmo" and a made-up uuid are the same mistake — a relationship that does not exist — and only
   * one of them stops the command.
   */
  test("a name that names nothing refuses, where a uuid that names nothing does not", () => {
    const refusal = refusalOf(() => mapTokensToRelationshipIds(["Mmo"], PAGES))
    expect(refusal.code).toBe(EXIT.INPUT)
    expect(refusal.message).toBe('no relationship matches "Mmo" (by id or title)')
    expect(mapTokensToRelationshipIds(["deadbeef-0000-0000-0000-000000000000"], PAGES)).toHaveLength(1)
  })

  test("something that is nearly a uuid is a name, and a name that names nothing refuses", () => {
    expect(refusalOf(() => mapTokensToRelationshipIds(["deadbeef-0000-0000-0000-00000000000"], [])).message).toBe(
      'no relationship matches "deadbeef-0000-0000-0000-00000000000" (by id or title)'
    )
    expect(refusalOf(() => mapTokensToRelationshipIds(["deadbeeg-0000-0000-0000-000000000000"], [])).message).toBe(
      'no relationship matches "deadbeeg-0000-0000-0000-000000000000" (by id or title)'
    )
  })

  /**
   * Two relationships with one name is refused, loudly, and both ids are named in the sentence so
   * the caller can pass whichever they meant. It is not the silent skip a reader might expect from
   * the rest of this file.
   */
  test("a name two relationships share refuses, and the refusal lists both ids", () => {
    const twins = [
      { id: MOM, title: "Mom" },
      { id: DAD, title: "mom" },
    ]
    const refusal = refusalOf(() => mapTokensToRelationshipIds(["Mom"], twins))
    expect(refusal.code).toBe(EXIT.INPUT)
    expect(refusal.message).toBe(
      `"Mom" matches 2 relationships (${MOM}, ${DAD}) — pass the id instead`
    )
  })

  /**
   * A relationship page with no title is left out of the index without a word.
   *
   * It is still reachable by its id, so nothing looks broken; it is only unnameable.
   */
  test("a relationship with no name is left out of the index silently", () => {
    const half = [{ id: MOM, title: undefined }]
    expect(mapTokensToRelationshipIds([MOM], half)).toEqual([MOM])
    expect(refusalOf(() => mapTokensToRelationshipIds(["Mom"], half)).message).toBe(
      'no relationship matches "Mom" (by id or title)'
    )
  })
})

describe("resolving tokens against the store", () => {
  test("no tokens asks the store nothing", async () => {
    expect(await resolveRelationshipIds(null, [])).toEqual([])
    expect(await resolveRelationshipIds(null, ["  "])).toEqual([])
    expect(asked).toHaveLength(0)
  })

  /**
   * When every token reads as a uuid, the relationship pages are never loaded.
   *
   * This is the same asymmetry seen from the other side: the check is skipped because there is
   * nothing to look up, and so there is nothing to check against either.
   */
  test("tokens that all read as uuids are answered without asking the store at all", async () => {
    const invented = "deadbeef-0000-0000-0000-000000000000"
    expect(await resolveRelationshipIds(null, [invented, MOM])).toEqual([invented, MOM])
    expect(asked).toHaveLength(0)
  })

  test("one token that is a name sends the whole lot through a lookup", async () => {
    answer = {
      ok: true,
      n: 1,
      unfound: [],
      rows: [{ at: "a", values: { id: MOM, title: "Mom" } }],
    }
    expect(await resolveRelationshipIds(null, ["Mom"])).toEqual([MOM])
    expect(asked).toHaveLength(1)
    expect(asked[0]).toEqual({
      "page-type": "relationship",
      keys: ["id", "title"],
      limit: 1000,
      offset: 0,
    })
  })

  test("a row with no id is passed over, so the name it carried finds nothing", async () => {
    answer = {
      ok: true,
      n: 1,
      unfound: [],
      rows: [{ at: "a", values: { id: 7, title: "Mom" } }],
    }
    const refusal = await refusalOfAsync(() => resolveRelationshipIds(null, ["Mom"]))
    expect(refusal.message).toBe('no relationship matches "Mom" (by id or title)')
  })

  test("a store that cannot answer is a data fault, and the sentence says what was being read", async () => {
    answer = { ok: false, why: "the page query answered 500" }
    const refusal = await refusalOfAsync(() => resolveRelationshipIds(null, ["Mom"]))
    expect(refusal.code).toBe(EXIT.DATA)
    expect(refusal.message).toBe("reading relationships: the page query answered 500")
  })
})
