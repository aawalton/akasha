import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { registrationAccountOf } from "../lib/seat-registration-account.ts"
import { type Fixture, fixture } from "./fixture.ts"

const AGENT = "019ee764-0000-7000-8000-0000000000ac"

const SEAT = "worker"

const ELSEWHERE = "/nowhere/.claude/accounts/somebody-else"

let at: Fixture
let heldConfig: string | undefined

function plant(frontmatter: readonly string[]): void {
  at.put(`agent/seat/${SEAT}.seat.md`, ["---", ...frontmatter, "---", ""].join("\n"))
}

const STANDING = ["page-type-slug: seat", `id: ${AGENT}`, `title: "${SEAT}"`]

beforeEach(() => {
  at = fixture()
  heldConfig = process.env.CLAUDE_CONFIG_DIR
  process.env.CLAUDE_CONFIG_DIR = ELSEWHERE
})

afterEach(() => {
  at.dispose()
  if (heldConfig === undefined) delete process.env.CLAUDE_CONFIG_DIR
  else process.env.CLAUDE_CONFIG_DIR = heldConfig
})

describe("a seat's account is what its page states", () => {
  it("reads the account off the seat's own page", () => {
    plant([...STANDING, "registration-account: aawalton"])
    expect(registrationAccountOf(AGENT)).toEqual({ value: "aawalton" })
  })

  it("a page stating no account reads as none, never as the account the asker runs under", () => {
    plant(STANDING)
    expect(registrationAccountOf(AGENT)).toBeNull()
  })

  it("a seat with no page reads as none, whatever CLAUDE_CONFIG_DIR names", () => {
    expect(registrationAccountOf(AGENT)).toBeNull()
  })
})
