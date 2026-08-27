
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  askProxyAdoption,
  type ProxyAdoptionInput,
  readProxyAdoption,
} from "../lib/supervisor-proxy-adoption-rule.ts"
import { ASKS, DEGRADES, READS, RULE } from "./supervisor-proxy-adoption-rule-vectors.ts"

function projected(
  answer: Record<string, unknown>,
  onto: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(onto)) picked[key] = answer[key]
  return picked
}

function holdVector(name: string, standing: Record<string, unknown>, ported: Record<string, unknown>): void {
  const answered = projected(ported, standing)
  const verdict = hold(name, standing, answered)
  if (!verdict.matches) expect(answered).toEqual(standing)
  expect(verdict.matches).toBe(true)
}

function readAnswer(payload: unknown): Record<string, unknown> {
  try {
    return { threw: false, value: readProxyAdoption(payload) }
  } catch (error) {
    const issue = (error as { issues?: readonly { code: string; path: readonly string[]; message: string }[] })
      .issues?.[0]
    return {
      threw: true,
      code: issue?.code,
      path: issue?.path,
      message: issue?.message,
    }
  }
}

describe("readProxyAdoption narrows what came back as the standing implementation did", () => {
  for (const vector of READS) {
    it(vector.name, () => {
      holdVector(vector.name, vector.standing, readAnswer(vector.payload))
    })
  }
})

describe("askProxyAdoption asks the question the standing implementation asked", () => {
  for (const vector of ASKS) {
    it(vector.name, async () => {
      let sent: unknown = null
      const answer = await askProxyAdoption(vector.input as ProxyAdoptionInput, (stdin: string) => {
        sent = JSON.parse(stdin)
        return Promise.resolve({ [RULE]: { decideProxyAdoption: "adopt-with-drift" } })
      })
      const value = decided("ported", answer)
      holdVector(vector.name, vector.standing, { sent, value, noticeIsNull: answer.notice === null })
    })
  }
})

describe("askProxyAdoption degrades to the safe answer as the standing implementation did", () => {
  const wedged: ProxyAdoptionInput = { hasLiveProxy: true, versionMatches: false, healthy: false }
  const arms: readonly (() => Promise<{ value: string; notice: string | null }>)[] = [
    () => askProxyAdoption(wedged, () => Promise.reject(new Error("boom"))),
    () => askProxyAdoption(wedged, () => Promise.resolve({ [RULE]: { decideProxyAdoption: "nonsense" } })),
  ]
  for (const [index, vector] of DEGRADES.entries()) {
    it(vector.name, async () => {
      const arm = arms[index]
      if (arm === undefined) throw new Error(`no arm for the degrade vector \`${vector.name}\``)
      const answer = await arm()
      holdVector(vector.name, vector.standing, {
        value: answer.value,
        noticeIsNull: answer.notice === null,
      })
    })
  }
})
