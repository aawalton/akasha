import { describe, expect, test } from "bun:test"
import { type CanonicalRef, readWireVocabulary } from "./widget-wire-vocabulary.ts"

const CIRCLE = `
/** One circle's whole drawing, and the shape the widget endpoints serialize. */
export interface StoplightRing {
  /** The colour the circle wears. */
  readonly tier: DailyTierColor
  /**
   * The reading the tier was decided from, written for display.
   *
   * A sentence in here mentioning progress: like this one, is prose about the
   * vocabulary and not a member of it.
   */
  readonly reading: string
  readonly nextTier: DailyTierColor | null
  readonly progress: number | null
}
`

const INBOX = `
export interface InboxStoplight extends StoplightRing {
  readonly inbox: InboxKey
}
`

const FOLD = `
/** The columns the two count surfaces render, and the payload's key set. */
export const PROJECT_COUNT_COLUMNS = ["parent", "child"] as const

export type ProjectCountColumn = (typeof PROJECT_COUNT_COLUMNS)[number]
`

const ROUTE = `
export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const stoplights = await getInboxStoplightTiers({ day })
  return Response.json(
    { stoplights },
    { headers: { "Cache-Control": READOUT_CACHE_CONTROL } }
  )
}
`

const FILES: Record<string, string> = {
  "src/stoplight-circle.ts": CIRCLE,
  "src/inbox-stoplights.ts": INBOX,
  "src/project-progress-fold.ts": FOLD,
  "routes/api.inbox-stoplights.ts": ROUTE,
}

const read = (file: string): string => {
  const source = FILES[file]
  if (source === undefined) throw new Error(`ENOENT: ${file}`)
  return source
}

const siblings = (file: string): ReadonlyMap<string, string> => {
  const dir = file.slice(0, file.lastIndexOf("/"))
  return new Map(Object.entries(FILES).filter(([path]) => path.startsWith(`${dir}/`)))
}

const namesOf = (ref: CanonicalRef): readonly string[] => {
  const read1 = readWireVocabulary({ ref, read, siblings })
  if (!read1.ok) throw new Error(`expected names, got refusal: ${read1.reason}`)
  return read1.names
}

const refusalOf = (ref: CanonicalRef): string => {
  const result = readWireVocabulary({ ref, read, siblings })
  if (result.ok) throw new Error(`expected a refusal, got ${result.names.join(", ")}`)
  return result.reason
}

describe("array vocabulary", () => {
  test("the quoted members are the key set", () => {
    expect(
      namesOf({
        file: "src/project-progress-fold.ts",
        anchor: "export const PROJECT_COUNT_COLUMNS = [",
        kind: "array",
      })
    ).toEqual(["parent", "child"])
  })

  test("an anchor that no longer matches refuses instead of reading empty", () => {
    expect(
      refusalOf({
        file: "src/project-progress-fold.ts",
        anchor: "export const PROJECT_COUNT_ROWS = [",
        kind: "array",
      })
    ).toContain("was not found")
  })
})

describe("member vocabulary", () => {
  test("property names are read and prose between them is not", () => {
    expect(
      namesOf({
        file: "src/stoplight-circle.ts",
        anchor: "export interface StoplightRing {",
        kind: "members",
      })
    ).toEqual(["tier", "reading", "nextTier", "progress"])
  })

  test("an `extends` clause is followed into the declaration it names", () => {
    expect(
      namesOf({
        file: "src/inbox-stoplights.ts",
        anchor: "export interface InboxStoplight extends StoplightRing {",
        kind: "members",
      })
    ).toEqual(["inbox", "tier", "reading", "nextTier", "progress"])
  })

  test("a chain that dead-ends refuses rather than reporting the half it read", () => {
    expect(
      refusalOf({
        file: "src/inbox-stoplights.ts",
        anchor: "export interface Orphan extends NothingDeclaresThis {",
        kind: "members",
      })
    ).toContain("was not found")
  })
})

describe("body vocabulary", () => {
  test("a shorthand key in the response literal is the wrapper's key set", () => {
    expect(
      namesOf({
        file: "routes/api.inbox-stoplights.ts",
        anchor: "return Response.json(\n    {",
        kind: "body",
      })
    ).toEqual(["stoplights"])
  })

  test("a spread refuses rather than contributing the keys it can see", () => {
    const spread = "return Response.json(\n    { ...payload, day },\n  )"
    const result = readWireVocabulary({
      ref: { file: "spread.ts", anchor: "return Response.json(\n    {", kind: "body" },
      read: () => spread,
      siblings: () => new Map(),
    })
    expect(result.ok).toBe(false)
  })
})

describe("an unreadable file", () => {
  test("throws out to the caller rather than becoming a refusal or an empty set", () => {
    expect(() =>
      readWireVocabulary({
        ref: { file: "src/gone.ts", anchor: "export interface Gone {", kind: "members" },
        read,
        siblings,
      })
    ).toThrow("ENOENT")
  })
})
