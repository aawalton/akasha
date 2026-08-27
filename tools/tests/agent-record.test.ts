import { describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { readSeatPage } from "../lib/agent-record.ts"

const SEATED = "athena"

const PAGE = '---\npage-type-slug: seat\n---\n'

function underAnAkashaHolding(seatName: string, ask: () => undefined): undefined {
  const held = process.env.AKASHA_ROOT
  const root = realpathSync(mkdtempSync("/var/tmp/agent-record-akasha-"))
  try {
    mkdirSync(`${root}/agent/seat`, { recursive: true })
    writeFileSync(`${root}/agent/seat/${seatName}.seat.md`, PAGE)
    process.env.AKASHA_ROOT = root
    ask()
  } finally {
    if (held === undefined) delete process.env.AKASHA_ROOT
    else process.env.AKASHA_ROOT = held
    rmSync(root, { recursive: true, force: true })
  }
}

describe("readSeatPage", () => {
  it("finds the page of a seat that stands", () => {
    underAnAkashaHolding(SEATED, () => {
      expect(readSeatPage(SEATED).kind).toBe("page-stands")
    })
  })

  it("says no page holds a name nothing is seated under", () => {
    expect(readSeatPage("athena-arm-name-nothing-holds").kind).toBe("no-page")
  })

  it("reads a name that is no seat name as no page rather than reaching outside the seats", () => {
    expect(readSeatPage("../../etc/passwd").kind).toBe("no-page")
  })

  it("says plainly that it could not look where no seat directory is", () => {
    const held = process.env.AKASHA_ROOT
    process.env.AKASHA_ROOT = "/var/tmp/no-akasha-checkout-is-here"
    try {
      const read = readSeatPage(SEATED)
      expect(read.kind).toBe("unreachable")
      if (read.kind === "unreachable") expect(read.why).toContain("seat directory")
    } finally {
      if (held === undefined) delete process.env.AKASHA_ROOT
      else process.env.AKASHA_ROOT = held
    }
  })
})
