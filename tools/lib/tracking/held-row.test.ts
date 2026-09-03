import { beforeEach, describe, expect, mock, test } from "bun:test"
import { join } from "node:path"
import { EXIT, exitCodeOf } from "../exit.ts"

const HERE = import.meta.dir

/**
 * A property definition as the store holds one.
 *
 * `expression` is the field the query filters on. `relation` stands here for every other way a
 * property can be worked out rather than written, and is what the filter does not look at.
 */
interface Property {
  readonly definedOn: string
  readonly key: string
  readonly expression?: string
  readonly relation?: string
}

let catalog: readonly Property[] = []

let broken: string | undefined

/** Every query the store was asked, so a test can count them and read the filter. */
const asked: Record<string, unknown>[] = []

/**
 * A stand-in store that applies the filter the query states, rather than the filter the caller
 * meant. A test can then say which properties came back and why.
 */
function answerFor(query: Record<string, unknown>): unknown {
  if (broken !== undefined) return { ok: false, why: broken }
  const where = (query.where ?? {}) as Record<string, Record<string, unknown>>
  const definedOn = where["defined-on-slug"]?.is
  let rows = catalog.filter((one) => `page-type/${one.definedOn}` === definedOn)
  const expression = where.expression
  if (expression !== undefined && expression.empty === false) {
    rows = rows.filter((one) => one.expression !== undefined && one.expression !== "")
  }
  return {
    ok: true,
    n: rows.length,
    unfound: [],
    rows: rows.map((one) => ({ at: one.key, values: { key: one.key } })),
  }
}

/**
 * Re-installed before every test as well as at load, because a module mock is a thing the whole run
 * shares and another test file mocking the same module would otherwise reach into these tests.
 */
function standIn(): void {
  mock.module(join(HERE, "..", "page-query-client.ts"), () => ({
    askComposed: (query: Record<string, unknown>) => {
      asked.push(query)
      return Promise.resolve(answerFor(query))
    },
  }))
}

standIn()

const { forgetWorkedOutKeys, heldRow, workedOutKeysOf } = await import("./held-row.ts")

const SESSION = "session-tracking"

const CATALOG: readonly Property[] = [
  { definedOn: SESSION, key: "title" },
  { definedOn: SESSION, key: "safety-level" },
  { definedOn: SESSION, key: "duration-seconds", expression: "end-time - start-time" },
  { definedOn: SESSION, key: "daily-tracking", relation: "daily-tracking" },
  { definedOn: "daily-tracking", key: "block-count", expression: "count(sessions)" },
]

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
  forgetWorkedOutKeys()
  asked.length = 0
  catalog = CATALOG
  broken = undefined
})

describe("the keys a row never writes", () => {
  test("the twelve names on the drop list are dropped, however the caller spelled them", async () => {
    const row = await heldRow(SESSION, {
      seq: 3,
      "daily-tracking-slug": "x",
      "page-type-id": "x",
      "page-type-slug": "x",
      "user-id": "x",
      "created-at": "x",
      "updated-at": "x",
      "deleted-at": "x",
      "unique-key": "x",
      "parent-key": "x",
      slug: "x",
      icon: "x",
      title: "Deep work",
    })
    expect(row).toEqual({ title: "Deep work" })
  })

  test("the camel spelling of each is the same key, and is dropped too", async () => {
    const row = await heldRow(SESSION, {
      dailyTrackingSlug: "x",
      pageTypeId: "x",
      pageTypeSlug: "x",
      userId: "x",
      createdAt: "x",
      updatedAt: "x",
      deletedAt: "x",
      uniqueKey: "x",
      parentKey: "x",
      title: "Deep work",
    })
    expect(row).toEqual({ title: "Deep work" })
  })

  test("an id is not on the list, because a row states its own identity", async () => {
    expect(await heldRow(SESSION, { id: "row-1" })).toEqual({ id: "row-1" })
  })
})

describe("the spelling and the emptiness of what is written", () => {
  test("a camel key is written in kebab, which is how the store names it", async () => {
    expect(await heldRow(SESSION, { safetyLevel: "2", startTime: "a" })).toEqual({
      "safety-level": "2",
      "start-time": "a",
    })
  })

  test("a key already in kebab is left as it is", async () => {
    expect(await heldRow(SESSION, { "safety-level": "2" })).toEqual({ "safety-level": "2" })
  })

  test("nothing stated is nothing written, for null as much as for undefined", async () => {
    expect(await heldRow(SESSION, { title: "Deep work", notes: null, endTime: undefined })).toEqual({
      title: "Deep work",
    })
  })

  test("a false, a zero and an empty string are stated values and are written", async () => {
    expect(await heldRow(SESSION, { done: false, count: 0, notes: "" })).toEqual({
      done: false,
      count: 0,
      notes: "",
    })
  })

  test("nothing at all in is nothing at all out", async () => {
    expect(await heldRow(SESSION, {})).toEqual({})
  })
})

describe("the keys the page type works out for itself", () => {
  /**
   * A key the page type derives is dropped on the way through, without a word.
   *
   * The caller asked for a value to be written and it was not written, and nothing anywhere says so.
   * A caller who has just computed a duration and passed it watches it disappear into a row that
   * comes back reporting success.
   */
  // KNOWN DEFECT: passing a derived key should refuse, naming the key and saying the page type works
  // it out, rather than dropping the value silently.
  test("a derived key passed in vanishes, and nothing refuses", async () => {
    const row = await heldRow(SESSION, { title: "Deep work", durationSeconds: 900 })
    expect(row).toEqual({ title: "Deep work" })
    expect("duration-seconds" in row).toBe(false)
  })

  /**
   * The query asks for properties with a non-empty `expression` and looks at nothing else.
   *
   * A property worked out some other way — a relation, here — has an empty expression, so it is not
   * in the answer and is not dropped. Whether a derived key survives therefore depends on how it
   * happens to be derived.
   */
  test("a key derived by a relation is not dropped, because only expression is filtered on", async () => {
    const row = await heldRow(SESSION, { dailyTracking: "wake-day-2026-03-05" })
    expect(row).toEqual({ "daily-tracking": "wake-day-2026-03-05" })
    expect(asked[0]?.where).toEqual({
      "defined-on-slug": { is: "page-type/session-tracking" },
      expression: { empty: false },
    })
  })

  test("the query names the page type it is asking about, and asks only for the key", async () => {
    await heldRow(SESSION, { title: "Deep work" })
    expect(asked[0]).toEqual({
      "page-type": "page-property-definition",
      where: {
        "defined-on-slug": { is: "page-type/session-tracking" },
        expression: { empty: false },
      },
      keys: ["key"],
      limit: 200,
    })
  })

  test("the worked-out keys of one page type are its own, not another's", async () => {
    expect([...(await workedOutKeysOf(SESSION))]).toEqual(["duration-seconds"])
    expect([...(await workedOutKeysOf("daily-tracking"))]).toEqual(["block-count"])
    expect(asked).toHaveLength(2)
  })

  test("a key with no name is not a key", async () => {
    catalog = [
      { definedOn: SESSION, key: "", expression: "x" },
      { definedOn: SESSION, key: "duration-seconds", expression: "x" },
    ]
    expect([...(await workedOutKeysOf(SESSION))]).toEqual(["duration-seconds"])
  })
})

describe("the answer being remembered", () => {
  test("the store is asked once for a page type, however many rows are built", async () => {
    await heldRow(SESSION, { title: "one" })
    await heldRow(SESSION, { title: "two" })
    await workedOutKeysOf(SESSION)
    expect(asked).toHaveLength(1)
  })

  /**
   * What is remembered is remembered for the life of the process, and the only way out is
   * `forgetWorkedOutKeys`. A page type that gains a derived property mid-run keeps writing it.
   */
  test("a changed catalog is not noticed until it is forgotten", async () => {
    expect(await heldRow(SESSION, { safetyLevel: "2" })).toEqual({ "safety-level": "2" })
    catalog = [...CATALOG, { definedOn: SESSION, key: "safety-level", expression: "worked out now" }]
    expect(await heldRow(SESSION, { safetyLevel: "2" })).toEqual({ "safety-level": "2" })
    expect(asked).toHaveLength(1)

    forgetWorkedOutKeys()
    expect(await heldRow(SESSION, { safetyLevel: "2" })).toEqual({})
    expect(asked).toHaveLength(2)
  })

  test("forgetting is forgetting everything, not one page type", async () => {
    await workedOutKeysOf(SESSION)
    await workedOutKeysOf("daily-tracking")
    expect(asked).toHaveLength(2)
    forgetWorkedOutKeys()
    await workedOutKeysOf(SESSION)
    await workedOutKeysOf("daily-tracking")
    expect(asked).toHaveLength(4)
  })

  test("forgetting when nothing is held is allowed and does nothing", () => {
    expect(() => {
      forgetWorkedOutKeys()
      forgetWorkedOutKeys()
    }).not.toThrow()
  })
})

describe("when the store cannot say", () => {
  test("a store that cannot answer is a data fault naming the page type", async () => {
    broken = "the page query answered 500"
    const refusal = await refusalOfAsync(() => heldRow(SESSION, { title: "Deep work" }))
    expect(refusal.code).toBe(EXIT.DATA)
    expect(refusal.message).toBe(
      "reading which session-tracking properties are worked out: the page query answered 500"
    )
  })

  test("a failed read is not remembered, so the next call asks again", async () => {
    broken = "the page query answered 500"
    await refusalOfAsync(() => workedOutKeysOf(SESSION))
    broken = undefined
    expect([...(await workedOutKeysOf(SESSION))]).toEqual(["duration-seconds"])
    expect(asked).toHaveLength(2)
  })
})
