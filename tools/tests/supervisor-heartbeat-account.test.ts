
import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { statedForPage } from "../lib/supervisor-heartbeat-beat.ts"

const AGENT = "019ee764-0000-7000-8000-0000000000be"

const SEAT = "worker"

let memory = ""
let heldMemory: string | undefined

function plant(extra: readonly string[]): void {
  const dir = `${memory}/pages/seat`
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    `${dir}/${SEAT}.md`,
    [
      "---",
      "page-type-slug: seat",
      `id: ${AGENT}`,
      `title: "${SEAT}"`,
      "domain-slug: global",
      "role-slug: definer",
      "person-slug: alan",
      ...extra,
      "---",
      "",
    ].join("\n"),
    "utf8"
  )
}

beforeEach(() => {
  memory = mkdtempSync("/var/tmp/heartbeat-account-")
  heldMemory = process.env.MEMORY_ROOT
  process.env.MEMORY_ROOT = memory
})

afterEach(() => {
  rmSync(memory, { recursive: true, force: true })
  if (heldMemory === undefined) delete process.env.MEMORY_ROOT
  else process.env.MEMORY_ROOT = heldMemory
})

describe("the beat states the account the supervisor is actually running as", () => {
  it("seeds a page that states no account, so the seat needs no backfill", () => {
    plant([])
    expect(statedForPage(AGENT, "aawalton").registration).toEqual({ value: "aawalton" })
  })

  it("states the running account over a page that names a different one", () => {
    plant(["registration-account: someone-else"])
    expect(statedForPage(AGENT, "aawalton").registration).toEqual({ value: "aawalton" })
  })

  it("leaves the page's account standing where no account was handed to the beat", () => {
    plant(["registration-account: aawalton"])
    expect(statedForPage(AGENT).registration).toEqual({ value: "aawalton" })
  })
})
