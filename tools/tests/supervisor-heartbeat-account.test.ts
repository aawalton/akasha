import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { statedForPage } from "../seat-page-beat.ts"
import { type Fixture, fixture } from "./fixture.ts"

const AGENT = "019ee764-0000-7000-8000-0000000000be"

const SEAT = "worker"

let at: Fixture

function plant(extra: readonly string[]): void {
  at.put(
    `agent/seat/${SEAT}.seat.md`,
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
    ].join("\n")
  )
}

beforeEach(() => {
  at = fixture()
})

afterEach(() => {
  at.dispose()
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
