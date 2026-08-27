import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  assessDistTreeCurrency,
  BUILD_ID_FILE,
  describeDistTreeFaults,
  parseBuildIdStamp,
  readDistBuildIdStamps,
  toBuildId,
  UNKNOWN_BUILD_ID,
} from "./addon-dist-roster"

describe("toBuildId", () => {
  test("reduces any SHA the writer accepts to its 8-hex stamp form", () => {
    expect(toBuildId("C5B24FCB19abcdef0123")).toBe("c5b24fcb")
    expect(toBuildId("c5b24fcb")).toBe("c5b24fcb")
  })

  test("answers the sentinel whenever fewer than 8 hex characters survive", () => {
    expect(toBuildId("zz-zz")).toBe(UNKNOWN_BUILD_ID)
    expect(toBuildId("")).toBe(UNKNOWN_BUILD_ID)
  })
})

describe("parseBuildIdStamp", () => {
  test("recovers the addon and id from the form the writer emits", () => {
    expect(
      parseBuildIdStamp(
        'TemperBuildIds = TemperBuildIds or {}\nTemperBuildIds["TemperEvents"] = "c5b24fcb"\n'
      )
    ).toEqual({ addon: "TemperEvents", buildId: "c5b24fcb" })
  })

  test("answers null for any body not in that form", () => {
    expect(parseBuildIdStamp("TemperBuildIds.TemperEvents = 'c5b24fcb'")).toBeNull()
    expect(parseBuildIdStamp("")).toBeNull()
  })
})

describe("readDistBuildIdStamps", () => {
  const root = mkdtempSync("/var/tmp/dist-roster-")
  afterAll(() => rmSync(root, { recursive: true, force: true }))

  const stampInto = (dir: string, addon: string, id: string) => {
    mkdirSync(join(root, dir), { recursive: true })
    writeFileSync(
      join(root, dir, BUILD_ID_FILE),
      `TemperBuildIds = TemperBuildIds or {}\nTemperBuildIds["${addon}"] = "${id}"\n`
    )
  }

  test("keys by the addon the stamp NAMES rather than by the directory holding it", () => {
    stampInto("TemperEvents", "TemperEvents", "aaaaaaaa")
    stampInto("RenamedDir", "TemperNavigation", "aaaaaaaa")
    mkdirSync(join(root, "NoStampAtAll"), { recursive: true })

    const stamps = readDistBuildIdStamps(root)
    expect([...stamps.keys()].sort()).toEqual(["TemperEvents", "TemperNavigation"])
    expect(stamps.get("TemperNavigation")).toBe("aaaaaaaa")
  })

  test("an absent tree reads as no stamps rather than throwing", () => {
    expect(readDistBuildIdStamps(join(root, "nope")).size).toBe(0)
  })
})

describe("assessDistTreeCurrency / describeDistTreeFaults", () => {
  const roster = new Set(["Alpha", "Beta"])
  const at = (id: string) =>
    new Map([
      ["Alpha", id],
      ["Beta", id],
    ])

  test("a complete tree built at the source in hand carries no fault", () => {
    const currency = assessDistTreeCurrency(at("abcd1234"), roster, "abcd1234")
    expect(currency).toEqual({
      unstamped: [],
      foreign: [],
      buildIds: ["abcd1234"],
      headBuildId: "abcd1234",
    })
    expect(describeDistTreeFaults(currency)).toEqual([])
  })

  test("a roster addon the tree never built stands as unstamped, and refuses", () => {
    const currency = assessDistTreeCurrency(new Map([["Alpha", "abcd1234"]]), roster, "abcd1234")
    expect(currency.unstamped).toEqual(["Beta"])
    expect(describeDistTreeFaults(currency).length).toBeGreaterThan(0)
  })

  test("output that outlasted its addon stands as foreign, and refuses", () => {
    const stamps = new Map(at("abcd1234"))
    stamps.set("Departed", "abcd1234")
    const currency = assessDistTreeCurrency(stamps, roster, "abcd1234")
    expect(currency.foreign).toEqual(["Departed"])
    expect(describeDistTreeFaults(currency).length).toBeGreaterThan(0)
  })

  test("a patchwork of separate builds refuses even with every addon present", () => {
    const currency = assessDistTreeCurrency(
      new Map([
        ["Alpha", "abcd1234"],
        ["Beta", "99887766"],
      ]),
      roster,
      "abcd1234"
    )
    expect(currency.unstamped).toEqual([])
    expect(currency.foreign).toEqual([])
    expect(currency.buildIds).toHaveLength(2)
    expect(describeDistTreeFaults(currency).length).toBeGreaterThan(0)
  })

  test("a whole tree built at an older commit refuses", () => {
    const currency = assessDistTreeCurrency(at("0000aaaa"), roster, "abcd1234")
    expect(currency.unstamped).toEqual([])
    expect(currency.foreign).toEqual([])
    expect(currency.buildIds).toEqual(["0000aaaa"])
    expect(describeDistTreeFaults(currency).length).toBeGreaterThan(0)
  })

  test("a bundle that cannot name the source it was built from refuses", () => {
    const currency = assessDistTreeCurrency(at(UNKNOWN_BUILD_ID), roster, "abcd1234")
    expect(describeDistTreeFaults(currency).length).toBeGreaterThan(0)
  })

  test("an unresolvable source build id refuses rather than passing", () => {
    const currency = assessDistTreeCurrency(at("abcd1234"), roster, null)
    expect(currency.unstamped).toEqual([])
    expect(currency.foreign).toEqual([])
    expect(currency.buildIds).toEqual(["abcd1234"])
    expect(describeDistTreeFaults(currency).length).toBeGreaterThan(0)
  })

  test("an unresolvable source build id refuses even where NO other arm can fire", () => {
    const currency = assessDistTreeCurrency(new Map(), new Set<string>(), null)
    expect(currency).toEqual({
      unstamped: [],
      foreign: [],
      buildIds: [],
      headBuildId: null,
    })
    expect(describeDistTreeFaults(currency).length).toBeGreaterThan(0)
  })

  test("an empty tree against a live roster refuses", () => {
    const currency = assessDistTreeCurrency(new Map(), roster, "abcd1234")
    expect(currency.unstamped).toEqual(["Alpha", "Beta"])
    expect(describeDistTreeFaults(currency).length).toBeGreaterThan(0)
  })
})
