
import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { registrationAccountOf } from "../lib/seat-registration-account.ts"

const AGENT = "019ee764-0000-7000-8000-0000000000ac"

const ELSEWHERE = "/nowhere/.claude/accounts/somebody-else"

let memory = ""
let heldMemory: string | undefined
let heldConfig: string | undefined

function plant(frontmatter: readonly string[]): void {
  const dir = `${memory}/pages/seat`
  mkdirSync(dir, { recursive: true })
  writeFileSync(`${dir}/worker.md`, ["---", ...frontmatter, "---", ""].join("\n"), "utf8")
}

const STANDING = ["page-type-slug: seat", `id: ${AGENT}`, 'title: "worker"']

beforeEach(() => {
  memory = mkdtempSync("/var/tmp/seat-account-")
  heldMemory = process.env.MEMORY_ROOT
  heldConfig = process.env.CLAUDE_CONFIG_DIR
  process.env.MEMORY_ROOT = memory
  process.env.CLAUDE_CONFIG_DIR = ELSEWHERE
})

afterEach(() => {
  rmSync(memory, { recursive: true, force: true })
  if (heldMemory === undefined) delete process.env.MEMORY_ROOT
  else process.env.MEMORY_ROOT = heldMemory
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
