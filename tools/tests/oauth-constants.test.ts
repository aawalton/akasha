import { describe, expect, it } from "bun:test"
import * as ported from "../lib/oauth-constants.ts"
import { decided, digestOf, hold } from "../lib/digest-harness.ts"

const STANDING: Readonly<Record<string, string | number>> = {
  OAUTH_CLIENT_ID: "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
  OAUTH_TOKEN_URL: "https://platform.claude.com/v1/oauth/token",
  PROFILE_URL: "https://api.anthropic.com/api/oauth/profile",
  REFRESH_BUFFER_MS: 300000,
  USAGE_URL: "https://api.anthropic.com/api/oauth/usage",
}

const OWNED: Readonly<Record<string, string | number>> = {
  UPKEEP_PERIOD_MS: 3600000,
  UPKEEP_RENEWAL_MARGIN_MS: 10800000,
}

function portedExports(): Record<string, unknown> {
  return Object.fromEntries(Object.entries(ported as Record<string, unknown>))
}

describe("oauth-constants, held against what the code repository answered", () => {
  for (const [name, standing] of Object.entries(STANDING)) {
    it(`carries ${name} as the code repository answered it`, () => {
      const value = decided("ported", {
        value: (ported as Record<string, unknown>)[name],
        notice: null,
      })
      const verdict = hold(name, standing, value)
      expect(verdict.matches).toBe(true)
    })
  }

  it("carries every export and no extra one, so a dropped or invented value is not a pass", () => {
    const verdict = hold("every export", { ...STANDING, ...OWNED }, portedExports())
    expect(verdict.matches).toBe(true)
  })

  it("still tells one endpoint from another, so a matching digest is measuring the spelling", () => {
    expect(digestOf(ported.OAUTH_TOKEN_URL)).not.toBe(digestOf(ported.PROFILE_URL))
    expect(hold("near miss", ported.OAUTH_TOKEN_URL, `${ported.OAUTH_TOKEN_URL}/`).matches).toBe(false)
  })
})

describe("oauth-constants, the bounds this repo owns rather than ported", () => {
  it("renews on a margin wider than the reader's buffer, so a reader never races the renewal", () => {
    expect(ported.UPKEEP_RENEWAL_MARGIN_MS).toBeGreaterThan(ported.REFRESH_BUFFER_MS)
  })

  it("ticks often enough to reach an account more than once inside its renewal margin", () => {
    expect(ported.UPKEEP_RENEWAL_MARGIN_MS / ported.UPKEEP_PERIOD_MS).toBeGreaterThanOrEqual(2)
  })
})
