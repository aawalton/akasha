
import { describe, expect, it } from "bun:test"
import { decideSpawnGuard } from "../lib/spawn-guard.ts"

describe("decideSpawnGuard — an uncertain holder is not a live one", () => {
  it("a holder whose process stands rejects on the basis of life", () => {
    const d = decideSpawnGuard({ holder: "present" })
    expect(d.kind).toBe("reject")
    if (d.kind !== "reject") throw new Error("expected reject")
    expect(d.basis).toBe("holder-live")
  })

  it("a holder whose process cannot be read rejects on the basis of uncertainty, not life", () => {
    const d = decideSpawnGuard({ holder: "unknown" })
    expect(d.kind).toBe("reject")
    if (d.kind !== "reject") throw new Error("expected reject")
    expect(d.basis).toBe("holder-uncertain")
  })

  it("the uncertain reason does NOT claim the holder is alive, and names the way out", () => {
    const d = decideSpawnGuard({ holder: "unknown" })
    if (d.kind !== "reject") throw new Error("expected reject")
    expect(d.reason).not.toContain("a live agent already holds")
    expect(d.reason.toLowerCase()).toContain("cannot")
    expect(d.reason).toContain("ops seat stop")
  })
})

describe("no ending refuses a revive", () => {
  it("a seat whose supervisor no longer stands is admitted", () => {
    expect(decideSpawnGuard({ holder: "absent" })).toEqual({ kind: "allow" })
  })
})
