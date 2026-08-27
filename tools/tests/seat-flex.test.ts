import { describe, expect, it } from "bun:test"
import { flexInName, launchFrom, launchStating, refuseFlex } from "../lib/seat-flex.ts"

const TARGET = "01a01ab1-bc67-76a5-be53-609bfa0fe89c"
const CALLER = "019ff7d3-64eb-7461-915f-86e3404857d6"

describe("launchFrom", () => {
  it("reads a seat naming the person who opened it as opened", () => {
    expect(launchFrom({ "person-slug": "alan" })).toBe("opened")
  })

  it("reads a seat naming the seat above it as spawned", () => {
    expect(launchFrom({ "principal-seat-name": "nimue" })).toBe("spawned")
  })

  it("reads the person before the seat above, so a page stating both is opened", () => {
    expect(launchFrom({ "person-slug": "alan", "principal-seat-name": "nimue" })).toBe("opened")
  })

  it("answers null for a page stating neither, which says nothing about how it came to exist", () => {
    expect(launchFrom({ "role-slug": "worker" })).toBeNull()
  })

  it("answers null where there is no page at all", () => {
    expect(launchFrom(null)).toBeNull()
  })

  it("reads a value that is not a string as absent rather than as its own rendering", () => {
    expect(launchFrom({ "person-slug": 5, "principal-seat-name": "" })).toBeNull()
  })
})

describe("flexInName", () => {
  it("reads the flex a seat name ends in", () => {
    expect(flexInName("technology-worker-flex-99")).toBe("flex-99")
  })

  it("reads a flex standing between two other segments", () => {
    expect(flexInName("technology-worker-flex-2-build")).toBe("flex-2")
  })

  it("reads a name that is a flex and nothing else", () => {
    expect(flexInName("flex-0")).toBe("flex-0")
  })

  it("answers null for a name carrying no flex", () => {
    expect(flexInName("technology-worker")).toBeNull()
  })

  it("answers null where the segment is no flex value", () => {
    expect(flexInName("technology-worker-flex-01")).toBeNull()
  })
})

describe("launchStating", () => {
  it("keeps what the page already says, whatever the statement carries", () => {
    expect(launchStating("opened", false, "nimue")).toBe("opened")
  })

  it("reads a statement naming the seat above as spawned, before any page stands", () => {
    expect(launchStating(null, false, "nimue")).toBe("spawned")
  })

  it("reads a statement for a person's own seat as opened, so a flex stays refused", () => {
    expect(launchStating(null, true, "nimue")).toBe("opened")
  })

  it("answers null where no page stands and the statement names no seat above", () => {
    expect(launchStating(null, false, null)).toBeNull()
  })

  it("reads an empty seat above as naming none", () => {
    expect(launchStating(null, false, "")).toBeNull()
  })
})

describe("refuseFlex", () => {
  it("admits a flex on a spawned seat", () => {
    expect(refuseFlex("flex-2", TARGET, CALLER, () => "spawned")).toEqual([])
  })

  it("refuses a flex on a seat a person opened, naming who assigns one", () => {
    const refused = refuseFlex("flex-2", TARGET, CALLER, () => "opened")
    expect(refused).toHaveLength(1)
    expect(refused[0]).toContain("spawned")
  })

  it("refuses a flex where nothing says how the seat came to exist", () => {
    const refused = refuseFlex("flex-2", TARGET, CALLER, () => null)
    expect(refused).toHaveLength(1)
    expect(refused[0]).toContain("nothing says how")
  })

  it("refuses a seat stating its own flex without ever asking how it was launched", () => {
    const refused = refuseFlex("flex-2", TARGET, TARGET, () => {
      throw new Error("a seat's own flex is refused before anything is read")
    })
    expect(refused).toHaveLength(1)
    expect(refused[0]).toContain("your own seat")
  })

  it("refuses a value that is no flex value", () => {
    expect(refuseFlex("flex", TARGET, CALLER, () => "spawned")).toHaveLength(1)
  })
})
