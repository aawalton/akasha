import { describe, expect, it } from "bun:test"
import { decideDir, type DirFacts } from "../../services/sweep-supervisor-logs.ts"

const NOW = 1_700_000_000_000

const CUTOFF = NOW - 7 * 86_400_000

const AGENT = "019e7e28-186c-76fd-a0ca-4fed602da903"

function facts(over: Partial<DirFacts> = {}): DirFacts {
  return { name: AGENT, newest: CUTOFF - 1, bytes: 10, files: 2, ...over }
}

describe("decideDir", () => {
  it("keeps a directory a standing seat page names, however old its files are", () => {
    const verdict = decideDir({
      facts: facts({ newest: 0 }),
      seatAgentIds: new Set([AGENT]),
      cutoff: CUTOFF,
    })
    expect(verdict.kind).toBe("seat-standing")
  })

  it("keeps a directory written on the cutoff itself", () => {
    const verdict = decideDir({
      facts: facts({ newest: CUTOFF }),
      seatAgentIds: new Set(),
      cutoff: CUTOFF,
    })
    expect(verdict.kind).toBe("inside-window")
  })

  it("takes a directory whose seat is gone and whose files predate the window", () => {
    const verdict = decideDir({ facts: facts(), seatAgentIds: new Set(), cutoff: CUTOFF })
    expect(verdict.kind).toBe("departed")
  })

  it("takes an empty directory, which states no file to date it by", () => {
    const verdict = decideDir({
      facts: facts({ newest: 0, files: 0, bytes: 0 }),
      seatAgentIds: new Set(),
      cutoff: CUTOFF,
    })
    expect(verdict.kind).toBe("departed")
  })
})
