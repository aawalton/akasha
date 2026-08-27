
import {
  askClassify,
  askCollapse,
  askDecodeWaitStatus,
  askShutdownWrite,
  readClassify,
  readCollapse,
  readDecodeWaitStatus,
  readShutdownWrite,
} from "../lib/supervisor-child-exit-rule.ts"

const STOP_REASON = {
  deliberate: "deliberate",
  reaped: "reaped",
  crashReaped: "crash-reaped",
  childCrashed: "child-crashed",
}

const unreachable = (): Promise<unknown> => {
  throw new Error("no instructions tree here")
}

const classified = (declared: Record<string, string>): unknown => ({
  childExitRule: {
    stopReason: declared,
    classifyChildExit: {
      crashed: false,
      stopReason: "deliberate",
      reason: "supplied",
      status: { exitCode: 0, signal: null },
    },
  },
})

function refusal(run: () => unknown, names?: RegExp): Record<string, boolean> {
  let message: string | null = null
  try {
    run()
  } catch (error) {
    message = error instanceof Error ? error.message : String(error)
  }
  if (names === undefined) return { threw: message !== null }
  return { threw: message !== null, names: message !== null && names.test(message) }
}

export interface Vector {
  readonly name: string
  readonly asserted: string
  readonly standing: unknown
  readonly ported: () => unknown | Promise<unknown>
}

export const VECTORS: readonly Vector[] = [
  {
    name: "reads the decoded exit pair at the shape the wait loop holds",
    asserted: "supervisor-rule-parse.unit.test.ts:103-105",
    standing: { exitCode: 0, signal: null },
    ported: () =>
      readDecodeWaitStatus({ childExitRule: { decodeWaitStatus: { exitCode: 0, signal: null } } }),
  },
  {
    name: "reads the collapsed exit number the adoption path holds",
    asserted: "supervisor-rule-parse.unit.test.ts:106",
    standing: 143,
    ported: () => readCollapse({ childExitRule: { collapseChildExitStatus: 143 } }),
  },
  {
    name: "reads the shutdown write at the shape the shutdown path holds",
    asserted: "supervisor-rule-parse.unit.test.ts:107-118",
    standing: { stampCleanExit: true, stopReason: "deliberate", recordCrash: false },
    ported: () =>
      readShutdownWrite({
        childExitRule: {
          stopReason: STOP_REASON,
          decideShutdownExitWrite: {
            stampCleanExit: true,
            stopReason: "deliberate",
            recordCrash: false,
          },
        },
      }),
  },
  {
    name: "refuses an answer missing the key it was asked for",
    asserted: "supervisor-rule-parse.unit.test.ts:156",
    standing: { threw: true },
    ported: () => refusal(() => readCollapse({ childExitRule: {} })),
  },
  {
    name: "refuses a value the column spells differently, naming it",
    asserted: "supervisor-rule-parse.unit.test.ts:174-178",
    standing: { threw: true, names: true },
    ported: () =>
      refusal(
        () => readClassify(classified({ ...STOP_REASON, deliberate: "on-purpose" })),
        /deliberate/
      ),
  },
  {
    name: "refuses a reason the column has no value for, naming it",
    asserted: "supervisor-rule-parse.unit.test.ts:180-184",
    standing: { threw: true, names: true },
    ported: () =>
      refusal(() => readClassify(classified({ ...STOP_REASON, wandered: "wandered" })), /wandered/),
  },
  {
    name: "refuses a classification carrying a reason outside the column",
    asserted: "supervisor-rule-parse.unit.test.ts:186-200",
    standing: { threw: true },
    ported: () =>
      refusal(() =>
        readClassify({
          childExitRule: {
            stopReason: STOP_REASON,
            classifyChildExit: {
              crashed: true,
              stopReason: "wandered-off",
              reason: "supplied",
              status: { exitCode: null, signal: "SIGKILL" },
            },
          },
        })
      ),
  },
  {
    name: "reads an exit nobody could look at on an unreachable tree",
    asserted: "supervisor-rule-parse.unit.test.ts:219-222",
    standing: { exitCode: null, signal: null },
    ported: async () => (await askDecodeWaitStatus(256, unreachable)).value,
  },
  {
    name: "never collapses an unreachable tree to a clean exit",
    asserted: "supervisor-rule-parse.unit.test.ts:221-223",
    standing: { isZero: false },
    ported: async () => ({
      isZero: (await askCollapse({ exitCode: 0, signal: null }, unreachable)).value === 0,
    }),
  },
  {
    name: "classifies nothing on an exit it could not decide",
    asserted: "supervisor-rule-parse.unit.test.ts:226-231",
    standing: null,
    ported: async () =>
      (
        await askClassify(
          { status: { exitCode: 0, signal: null }, supervisorKilled: false, shuttingDown: false },
          unreachable
        )
      ).value,
  },
  {
    name: "writes nothing on a shutdown it could not decide",
    asserted: "supervisor-rule-parse.unit.test.ts:232",
    standing: null,
    ported: async () => (await askShutdownWrite(null, unreachable)).value,
  },
]
