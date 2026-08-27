
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { OAuthErrorEnvelopeSchema } from "../lib/oauth-schemas.ts"
import { answer, type Classification, STANDING, VECTORS } from "./oauth-errors-vectors.ts"

describe("oauth-errors — the port answers what the code repository answers", () => {
  for (const vector of VECTORS) {
    it(`agrees on ${vector.id}`, () => {
      const standing = STANDING[vector.id]
      if (standing === undefined) throw new Error(`no standing answer for ${vector.id}`)
      const verdict = hold(vector.id, standing, answer(vector))
      expect(verdict.matches).toBe(true)
    })
  }

  it("holds every vector the standing table names, and no vector twice", () => {
    const ids = VECTORS.map((vector) => vector.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.slice().sort()).toEqual(Object.keys(STANDING).sort())
  })

  it("carries all seven of the source suite's own scenarios", () => {
    expect(VECTORS.filter((vector) => vector.id.startsWith("carried-")).length).toBe(7)
  })
})

describe("the comparison goes red when a single field moves", () => {
  const subject = "carried-invalid-grant-400"
  const vector = VECTORS.find((one) => one.id === subject)
  if (vector === undefined) throw new Error(`the control's subject ${subject} left the table`)
  const recorded = STANDING[subject]
  if (recorded === undefined) throw new Error(`no standing answer for ${subject}`)
  const live = answer(vector)

  it("agrees with the recorded answer before anything is moved", () => {
    expect(hold(subject, recorded, live).matches).toBe(true)
  })

  it("is sensitive to `terminal` — the field the caller branches on", () => {
    const moved: Classification = { ...recorded, terminal: !recorded.terminal }
    expect(hold(subject, moved, live).matches).toBe(false)
  })

  it("is sensitive to `code`", () => {
    const moved: Classification = { ...recorded, code: "invalid_client" }
    expect(hold(subject, moved, live).matches).toBe(false)
  })

  it("is sensitive to `description`", () => {
    const moved: Classification = { ...recorded, description: "Refresh token expired." }
    expect(hold(subject, moved, live).matches).toBe(false)
  })
})

describe("a wrong classifier is caught by this vector set", () => {
  const TERMINAL = new Set(["invalid_grant", "invalid_client"])

  function envelope(body: string): { error: string | null; description: string | null } | null {
    let parsed: ReturnType<typeof OAuthErrorEnvelopeSchema.safeParse>
    try {
      parsed = OAuthErrorEnvelopeSchema.safeParse(JSON.parse(body))
    } catch {
      return null
    }
    if (!parsed.success) return null
    return { error: parsed.data.error ?? null, description: parsed.data.error_description ?? null }
  }

  function widerTerminalSet(status: number, body: string): Classification {
    if (status >= 500) return { terminal: false, code: null, description: null }
    if (status === 429) return { terminal: false, code: "rate_limited", description: null }
    const held = envelope(body)
    if (held === null) return { terminal: false, code: null, description: null }
    const wider = new Set([...TERMINAL, "invalid_request"])
    const terminal = status >= 400 && status < 500 && held.error !== null && wider.has(held.error)
    return { terminal, code: held.error, description: held.description }
  }

  function noRateLimitShortCircuit(status: number, body: string): Classification {
    if (status >= 500) return { terminal: false, code: null, description: null }
    const held = envelope(body)
    if (held === null) return { terminal: false, code: null, description: null }
    const terminal = status >= 400 && status < 500 && held.error !== null && TERMINAL.has(held.error)
    return { terminal, code: held.error, description: held.description }
  }

  function caseInsensitive(status: number, body: string): Classification {
    if (status >= 500) return { terminal: false, code: null, description: null }
    if (status === 429) return { terminal: false, code: "rate_limited", description: null }
    const held = envelope(body)
    if (held === null) return { terminal: false, code: null, description: null }
    const terminal =
      status >= 400 &&
      status < 500 &&
      held.error !== null &&
      TERMINAL.has(held.error.toLowerCase())
    return { terminal, code: held.error, description: held.description }
  }

  function objectLookup(status: number, body: string): Classification {
    if (status >= 500) return { terminal: false, code: null, description: null }
    if (status === 429) return { terminal: false, code: "rate_limited", description: null }
    const held = envelope(body)
    if (held === null) return { terminal: false, code: null, description: null }
    const map: Record<string, boolean> = { invalid_grant: true, invalid_client: true }
    const terminal =
      status >= 400 && status < 500 && held.error !== null && Boolean(map[held.error])
    return { terminal, code: held.error, description: held.description }
  }

  const mutants: ReadonlyArray<[string, (status: number, body: string) => Classification]> = [
    ["a wider terminal set", widerTerminalSet],
    ["no 429 short-circuit", noRateLimitShortCircuit],
    ["a case-insensitive code match", caseInsensitive],
    ["an object lookup rather than a Set", objectLookup],
  ]

  function disagreements(candidate: (status: number, body: string) => Classification): string[] {
    return VECTORS.filter((vector) => {
      const standing = STANDING[vector.id]
      if (standing === undefined) throw new Error(`no standing answer for ${vector.id}`)
      return !hold(vector.id, standing, candidate(vector.status, vector.body)).matches
    }).map((vector) => vector.id)
  }

  for (const [name, mutant] of mutants) {
    it(`catches ${name}`, () => {
      expect(disagreements(mutant).length).toBeGreaterThan(0)
    })
  }
})

describe("what this arm cannot see", () => {
  it("cannot catch dropping `status < 500`, because the 5xx return above makes it dead", () => {
    const withoutUpperBound = (status: number, body: string): Classification => {
      if (status >= 500) return { terminal: false, code: null, description: null }
      if (status === 429) return { terminal: false, code: "rate_limited", description: null }
      let parsed: ReturnType<typeof OAuthErrorEnvelopeSchema.safeParse>
      try {
        parsed = OAuthErrorEnvelopeSchema.safeParse(JSON.parse(body))
      } catch {
        return { terminal: false, code: null, description: null }
      }
      if (!parsed.success) return { terminal: false, code: null, description: null }
      const code = parsed.data.error ?? null
      const description = parsed.data.error_description ?? null
      const terminal = status >= 400 && code !== null && new Set(["invalid_grant", "invalid_client"]).has(code)
      return { terminal, code, description }
    }

    const disagreed = VECTORS.filter((vector) => {
      const standing = STANDING[vector.id]
      if (standing === undefined) throw new Error(`no standing answer for ${vector.id}`)
      return !hold(vector.id, standing, withoutUpperBound(vector.status, vector.body)).matches
    })
    expect(disagreed).toEqual([])
  })
})
