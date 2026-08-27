
import type { FetchVector, MarkVector, PacingVector, ParseVector } from "./oauth-usage-vectors.ts"
import { fetchVectors, markVectors, pacingVectors, parseVectors } from "./oauth-usage-vectors.ts"
import type { RepollScenario } from "./oauth-usage-repoll-vectors.ts"
import { repollScenarios } from "./oauth-usage-repoll-vectors.ts"
import type { Bound, Cred, Request } from "./oauth-usage-harness.ts"
import { seam, spellError, stubFetch, underHarness } from "./oauth-usage-harness.ts"

export interface Row {
  k: string
  v: unknown
}

function parseRows(bound: Bound, vectors: ParseVector[]): Row[] {
  return vectors.map((vector) => {
    let value: unknown = "<threw>"
    let threw: unknown = null
    try {
      value = bound.parseUsageResponse(vector.raw)
    } catch (err) {
      threw = spellError(err)
    }
    const narrowed = value as { five_hour?: object; seven_day?: object } | string
    return {
      k: `parse|${vector.label}`,
      v: {
        threw,
        value,
        keys:
          typeof narrowed === "object" && narrowed !== null
            ? {
                top: Object.keys(narrowed).sort(),
                five: Object.keys(narrowed.five_hour ?? {}).sort(),
                seven: Object.keys(narrowed.seven_day ?? {}).sort(),
              }
            : null,
      },
    }
  })
}

async function fetchRows(bound: Bound, vectors: FetchVector[]): Promise<Row[]> {
  const out: Row[] = []
  const realFetch = globalThis.fetch
  for (const vector of vectors) {
    const requests: Request[] = []
    globalThis.fetch = stubFetch(() => vector.transport, requests)
    const run = await underHarness(null, async () => bound.fetchUsage(vector.accessToken))
    globalThis.fetch = realFetch
    out.push({
      k: `fetch|${vector.label}`,
      v: { threw: run.threw, value: run.value, logged: run.logged, requests },
    })
  }
  return out
}

async function pacingRows(bound: Bound, vectors: PacingVector[]): Promise<Row[]> {
  const out: Row[] = []
  for (const vector of vectors) {
    const writes: { keys: string[]; values: Record<string, unknown> }[] = []
    seam.pacing = ({ values }) => {
      if (vector.writeThrows) throw new Error("write failed")
      writes.push({ keys: Object.keys(values).sort(), values })
    }
    const usage = {
      five_hour: { utilization: vector.fiveHourUtil, resets_at: vector.fiveHourResetsAt },
      seven_day: { utilization: vector.sevenDayUtil, resets_at: vector.sevenDayResetsAt },
    }
    const run = await underHarness(vector.now, async () =>
      vector.logPrefix === undefined
        ? bound.pushPacingToPage(vector.account, usage)
        : bound.pushPacingToPage(vector.account, usage, vector.logPrefix)
    )
    seam.pacing = () => {}
    out.push({
      k: `pacing|${vector.label}`,
      v: {
        threw: run.threw,
        resolvedUndefined: run.value === undefined,
        logged: run.logged,
        clockReads: run.clockReads,
        writes,
      },
    })
  }
  return out
}

async function markRows(bound: Bound, vectors: MarkVector[]): Promise<Row[]> {
  const out: Row[] = []
  for (const vector of vectors) {
    const writes: { account: string; marks: Record<string, string | null> }[] = []
    seam.mark = (args) => {
      if (vector.writeThrows) throw new Error("page write failed")
      writes.push(args)
    }
    const args =
      vector.logPrefix === undefined
        ? { account: vector.account, retryAfterHeader: vector.retryAfterHeader }
        : { account: vector.account, retryAfterHeader: vector.retryAfterHeader, logPrefix: vector.logPrefix }
    const run = await underHarness(vector.now, async () => bound.markAccountAtLimit(args))
    seam.mark = () => {}
    out.push({
      k: `account|${vector.label}`,
      v: {
        threw: run.threw,
        resolvedUndefined: run.value === undefined,
        logged: run.logged,
        clockReads: run.clockReads,
        writes: writes.map((write) => ({
          account: write.account,
          keys: Object.keys(write.marks).sort(),
          offsets: Object.entries(write.marks)
            .sort(([l], [r]) => (l < r ? -1 : l > r ? 1 : 0))
            .map(([key, held]) => [key, typeof held === "string" ? Date.parse(held) - vector.now : "<not-a-string>"]),
        })),
      },
    })
  }
  return out
}

async function repollRows(bound: Bound, scenarios: RepollScenario[]): Promise<Row[]> {
  const out: Row[] = []
  const realFetch = globalThis.fetch
  for (const scenario of scenarios) {
    bound.resetRepollGateForTests()
    for (const step of scenario.steps) {
      const requests: Request[] = []
      const writes: unknown[] = []
      globalThis.fetch = stubFetch(() => step.transport, requests)
      seam.pacing = ({ values }) => {
        if (step.writeThrows) throw new Error("write failed")
        writes.push(values)
      }
      const getToken = async (account: string): Promise<Cred | null> => {
        if (step.token === "null") return null
        if (step.token === "throws") throw new Error("token fetch failed")
        return {
          account,
          accessToken: `token-${account}`,
          refreshToken: "refresh",
          expiresAt: step.now + 3_600_000,
          scopes: [],
          subscriptionType: "max",
          rateLimitTier: null,
        }
      }
      const run = await underHarness(step.now, async () =>
        step.logPrefix === undefined
          ? bound.repollUsageAfter429(step.account, getToken)
          : bound.repollUsageAfter429(step.account, getToken, step.logPrefix)
      )
      globalThis.fetch = realFetch
      seam.pacing = () => {}
      out.push({
        k: `repoll|${scenario.label}|${step.label}`,
        v: {
          threw: run.threw,
          resolvedUndefined: run.value === undefined,
          logged: run.logged,
          clockReads: run.clockReads,
          requests,
          writes,
        },
      })
    }
  }
  bound.resetRepollGateForTests()
  return out
}

export async function rows(bound: Bound): Promise<Row[]> {
  return [
    ...parseRows(bound, parseVectors()),
    ...(await fetchRows(bound, fetchVectors())),
    ...(await pacingRows(bound, pacingVectors())),
    ...(await markRows(bound, markVectors())),
    ...(await repollRows(bound, repollScenarios())),
  ]
}
