import { describe, expect, test } from "bun:test"
import { decideWitnessTick, type PendingWitness, startDeliveryWitness, WITNESS_OBSERVATION_LIMIT, type WitnessAction, witnessActionFor } from "../lib/messages-delivery-witness.ts"
import { type DeliveryVerdict, readDeliveryRecords } from "../lib/channel-delivery-classify"

const ID = "11111111-1111-4111-8111-111111111111"
const OTHER = "22222222-2222-4222-8222-222222222222"

const enqueueLine = (id: string) =>
  JSON.stringify({
    type: "queue-operation",
    operation: "enqueue",
    content: `<channel message_id="${id}" sender="a">hi</channel>`,
  })

const injectionLine = (id: string) =>
  JSON.stringify({
    type: "user",
    message: { content: `<channel message_id="${id}" sender="a">hi</channel>` },
  })

const turnEndLine = () =>
  JSON.stringify({ type: "assistant", message: { stop_reason: "end_turn" } })

const recordsOf = (...lines: readonly string[]) => readDeliveryRecords(lines.join("\n"))

const EVERY_VERDICT = [
  "injected",
  "self-found",
  "lost",
  "not-yet",
  "not-enqueued",
  "undetermined",
] as const satisfies readonly DeliveryVerdict[]

const pendingAt = (observations: number, path = "/t/a.jsonl"): PendingWitness => ({
  messageId: ID,
  transcriptPath: path,
  observations,
})

const HEARTBEAT_MS = 1_000

describe("witnessActionFor — what one verdict licenses", () => {
  const UNDER_LIMIT: Record<DeliveryVerdict, WitnessAction> = {
    injected: "advance",
    "self-found": "retain",
    lost: "retire",
    "not-yet": "retain",
    "not-enqueued": "retain",
    undetermined: "retain",
  }

  const AT_LIMIT: Record<DeliveryVerdict, WitnessAction> = {
    injected: "advance",
    "self-found": "retire",
    lost: "retire",
    "not-yet": "retain",
    "not-enqueued": "retire",
    undetermined: "retire",
  }

  test("the verdict list this file iterates is the whole table — neither can drift alone", () => {
    expect(Object.keys(UNDER_LIMIT).sort()).toEqual([...EVERY_VERDICT].sort())
    expect(Object.keys(AT_LIMIT).sort()).toEqual([...EVERY_VERDICT].sort())
  })

  for (const verdict of EVERY_VERDICT) {
    test(`under the limit, ${verdict} → ${UNDER_LIMIT[verdict]}`, () => {
      expect(
        witnessActionFor({
          verdict,
          observations: 1,
          observationLimit: WITNESS_OBSERVATION_LIMIT,
        })
      ).toBe(UNDER_LIMIT[verdict])
    })
  }

  for (const verdict of EVERY_VERDICT) {
    test(`at the limit, ${verdict} → ${AT_LIMIT[verdict]}`, () => {
      expect(
        witnessActionFor({
          verdict,
          observations: WITNESS_OBSERVATION_LIMIT,
          observationLimit: WITNESS_OBSERVATION_LIMIT,
        })
      ).toBe(AT_LIMIT[verdict])
    })
  }

  test("BOTH verdicts of the writer are reachable from real verdicts", () => {
    const actions = new Set(EVERY_VERDICT.flatMap((v) => [UNDER_LIMIT[v], AT_LIMIT[v]]))
    expect(actions.has("advance")).toBe(true)
    expect(actions.has("retain")).toBe(true)
    expect(actions.has("retire")).toBe(true)
  })

  test("only `injected` ever advances", () => {
    const advancing = EVERY_VERDICT.filter((v) => AT_LIMIT[v] === "advance")
    expect(advancing).toEqual(["injected"])
  })
})

describe("decideWitnessTick — one pass over the transcripts", () => {
  test("an injection in the tracked transcript advances the row and stops the asking", () => {
    const decision = decideWitnessTick({
      pending: [pendingAt(0)],
      recordsByPath: new Map([["/t/a.jsonl", recordsOf(enqueueLine(ID), injectionLine(ID))]]),
    })
    expect(decision.advance).toEqual([ID])
    expect(decision.next).toEqual([])
    expect(decision.retired).toEqual([])
  })

  test("a bare enqueue is `not-yet` — retained, never advanced, never retired", () => {
    const decision = decideWitnessTick({
      pending: [pendingAt(WITNESS_OBSERVATION_LIMIT * 5)],
      recordsByPath: new Map([["/t/a.jsonl", recordsOf(enqueueLine(ID))]]),
    })
    expect(decision.advance).toEqual([])
    expect(decision.retired).toEqual([])
    expect(decision.next[0]?.observations).toBe(WITNESS_OBSERVATION_LIMIT * 5 + 1)
  })

  test("an enqueue overtaken by a later message is `lost` — retired unwritten", () => {
    const decision = decideWitnessTick({
      pending: [pendingAt(0)],
      recordsByPath: new Map([
        ["/t/a.jsonl", recordsOf(enqueueLine(ID), enqueueLine(OTHER), injectionLine(OTHER))],
      ]),
    })
    expect(decision.advance).toEqual([])
    expect(decision.next).toEqual([])
    expect(decision.retired.map((r) => r.messageId)).toEqual([ID])
  })

  test("five completed turns past the enqueue is `lost` — retired unwritten", () => {
    const decision = decideWitnessTick({
      pending: [pendingAt(0)],
      recordsByPath: new Map([
        ["/t/a.jsonl", recordsOf(enqueueLine(ID), ...Array(5).fill(turnEndLine()))],
      ]),
    })
    expect(decision.advance).toEqual([])
    expect(decision.retired.map((r) => r.messageId)).toEqual([ID])
  })

  test("a rotated transcript still advances: an injection record is unforgeable, so ANY of this agent's files carrying one is proof", () => {
    const decision = decideWitnessTick({
      pending: [pendingAt(0, "/t/pre-clear.jsonl")],
      recordsByPath: new Map([
        ["/t/pre-clear.jsonl", recordsOf(enqueueLine(ID))],
        ["/t/successor.jsonl", recordsOf(enqueueLine(ID), injectionLine(ID))],
      ]),
    })
    expect(decision.advance).toEqual([ID])
  })

  test("an unreadable transcript declines rather than concluding — and retires only after the limit", () => {
    let pending: readonly PendingWitness[] = [pendingAt(0)]
    for (let i = 0; i < WITNESS_OBSERVATION_LIMIT - 1; i += 1) {
      const decision = decideWitnessTick({ pending, recordsByPath: new Map() })
      expect(decision.advance).toEqual([])
      expect(decision.retired).toEqual([])
      pending = decision.next
    }
    const final = decideWitnessTick({ pending, recordsByPath: new Map() })
    expect(final.advance).toEqual([])
    expect(final.retired.map((r) => r.messageId)).toEqual([ID])
    expect(final.next).toEqual([])
  })

  test("nothing tracked decides nothing", () => {
    const decision = decideWitnessTick({ pending: [], recordsByPath: new Map() })
    expect(decision).toEqual({ advance: [], retired: [], next: [] })
  })

  test("a message injected into a DIFFERENT agent's file it does not read is not advanced", () => {
    const decision = decideWitnessTick({
      pending: [pendingAt(0)],
      recordsByPath: new Map([["/t/a.jsonl", recordsOf(enqueueLine(OTHER), injectionLine(OTHER))]]),
    })
    expect(decision.advance).toEqual([])
  })
})

describe("startDeliveryWitness — the shell", () => {
  const harness = (opts?: { files?: Record<string, string>; currentPath?: string | null }) => {
    const files = opts?.files ?? {}
    const advanced: string[] = []
    const declined: string[] = []
    const reads: string[] = []
    const witness = startDeliveryWitness({
      agentId: "worker-17088",
      heartbeatMs: HEARTBEAT_MS,
      advance: async (id) => {
        advanced.push(id)
        return true
      },
      readTranscript: (path) => {
        reads.push(path)
        return files[path] ?? null
      },
      currentTranscriptPath: () =>
        opts?.currentPath === undefined ? "/t/now.jsonl" : opts.currentPath,
      scheduleInterval: () => () => {},
      logDecline: (id) => declined.push(id),
    })
    return { witness, advanced, declined, reads, files }
  }

  test("an injection in the transcript advances the row", async () => {
    const h = harness({
      files: { "/t/now.jsonl": [enqueueLine(ID), injectionLine(ID)].join("\n") },
    })
    h.witness.track(ID)
    await h.witness.tick()
    expect(h.advanced).toEqual([ID])
  })

  test("a bare enqueue advances nothing and keeps asking", async () => {
    const h = harness({ files: { "/t/now.jsonl": enqueueLine(ID) } })
    h.witness.track(ID)
    await h.witness.tick()
    await h.witness.tick()
    expect(h.advanced).toEqual([])
    expect(h.declined).toEqual([])
    expect(h.reads.length).toBe(2)
  })

  test("an id resolved once is not re-read on the next pass", async () => {
    const h = harness({
      files: { "/t/now.jsonl": [enqueueLine(ID), injectionLine(ID)].join("\n") },
    })
    h.witness.track(ID)
    await h.witness.tick()
    await h.witness.tick()
    expect(h.advanced).toEqual([ID])
    expect(h.reads).toEqual(["/t/now.jsonl"])
  })

  test("nothing tracked reads no files at all", async () => {
    const h = harness({ files: { "/t/now.jsonl": enqueueLine(ID) } })
    await h.witness.tick()
    expect(h.reads).toEqual([])
  })

  test("the transcript live at TRACK time is read even after the session rotates", async () => {
    const files: Record<string, string> = {
      "/t/pre-clear.jsonl": [enqueueLine(ID), injectionLine(ID)].join("\n"),
      "/t/successor.jsonl": "",
    }
    let current = "/t/pre-clear.jsonl"
    const advanced: string[] = []
    const witness = startDeliveryWitness({
      agentId: "worker-17088",
      heartbeatMs: HEARTBEAT_MS,
      advance: async (id) => {
        advanced.push(id)
        return true
      },
      readTranscript: (path) => files[path] ?? null,
      currentTranscriptPath: () => current,
      scheduleInterval: () => () => {},
      logDecline: () => {},
    })
    witness.track(ID)
    current = "/t/successor.jsonl"

    await witness.tick()

    expect(advanced).toEqual([ID])
  })

  test("no sentinel at all still resolves from the captured path", async () => {
    const h = harness({
      files: { "/t/now.jsonl": [enqueueLine(ID), injectionLine(ID)].join("\n") },
    })
    h.witness.track(ID)
    const blind = harness({ currentPath: null })
    await blind.witness.tick()
    await h.witness.tick()
    expect(h.advanced).toEqual([ID])
    expect(blind.advanced).toEqual([])
  })

  test("an unreadable transcript is given up on loudly, and never advanced", async () => {
    const h = harness({ files: {} })
    h.witness.track(ID)
    for (let i = 0; i < WITNESS_OBSERVATION_LIMIT; i += 1) await h.witness.tick()
    expect(h.advanced).toEqual([])
    expect(h.declined).toEqual([ID])
  })
})
