import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { buildCommittedKeepaliveResponse } from "../lib/model-gateway/committed-keepalive.ts"
import type { PickPipelineOutcome } from "../lib/model-gateway/pick-pipeline-types"
import {
  type TransportEvent,
  TransportEventSchema,
} from "../lib/model-gateway/transport-log.ts"
import {
  baseArgs,
  drain,
  emptyPool,
  type KeepaliveArgs,
  newObserverSlot,
  queued,
} from "./model-gateway-committed-keepalive-fixture.ts"

let logDir: string

const served = (body: BodyInit | null, status: number): PickPipelineOutcome => ({
  kind: "served",
  response: new Response(body, { status }),
})

function argsFor(outcomes: readonly PickPipelineOutcome[]): KeepaliveArgs {
  return {
    ...baseArgs({
      logPrefix: "[hold-record-test]",
      observerSlot: newObserverSlot(),
      runAttempt: queued(outcomes),
    }),
    getLogDir: () => logDir,
    emptyPoolReason: "no-viable-account",
  }
}

function readHoldRecords(): readonly TransportEvent[] {
  const raw = readFileSync(join(logDir, "supervisor-transport.jsonl"), "utf8").trim()
  if (raw.length === 0) return []
  return raw.split("\n").map((line) => TransportEventSchema.parse(JSON.parse(line)))
}

describe("a committed hold writes one transport record for how it ended", () => {
  beforeEach(() => {
    logDir = mkdtempSync("/var/tmp/model-gateway-hold-record-")
  })
  afterEach(() => {
    rmSync(logDir, { recursive: true, force: true })
  })

  test("a spliced hold writes one record with heldMs and emptyPoolReason", async () => {
    await drain(
      buildCommittedKeepaliveResponse(argsFor([emptyPool, served("data: chunk\n\n", 200)]))
    )

    const records = readHoldRecords()
    expect(records).toHaveLength(1)
    const [rec] = records
    expect(rec?.termination).toBe("complete")
    expect(rec?.emptyPoolReason).toBe("no-viable-account")
    expect(rec?.heldMs ?? -1).toBeGreaterThanOrEqual(0)
    expect(rec?.framesUpstream).toBe(0)
  })

  test("a committed-error hold still records heldMs and the reason", async () => {
    await drain(buildCommittedKeepaliveResponse(argsFor([served(null, 500)])))

    const records = readHoldRecords()
    expect(records).toHaveLength(1)
    expect(records[0]?.emptyPoolReason).toBe("no-viable-account")
    expect(records[0]?.heldMs ?? -1).toBeGreaterThanOrEqual(0)
  })

  test("no record is written when getLogDir is absent", async () => {
    const args = argsFor([served("data: x\n\n", 200)])
    await drain(buildCommittedKeepaliveResponse({ ...args, getLogDir: undefined }))
    expect(() => readFileSync(join(logDir, "supervisor-transport.jsonl"), "utf8")).toThrow()
  })
})
