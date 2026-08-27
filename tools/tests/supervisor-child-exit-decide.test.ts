
import { describe, expect, test } from "bun:test"
import {
  type ChildExitObservation,
  classifyChildExit,
  decideShutdownExitWrite,
  decodeWaitStatus,
  STOP_REASON,
} from "../lib/supervisor-child-exit-decide.ts"

const unaskedFor = (status: ChildExitObservation["status"]): ChildExitObservation => ({
  status,
  supervisorKilled: false,
  shuttingDown: false,
})

describe("decodeWaitStatus — the raw waitpid status the adopt path polls", () => {
  test("a signal death carries the signal and no code", () => {
    expect(decodeWaitStatus(9)).toEqual({ exitCode: null, signal: "SIGKILL" })
    expect(decodeWaitStatus(15)).toEqual({ exitCode: null, signal: "SIGTERM" })
  })

  test("a normal exit carries the code and no signal", () => {
    expect(decodeWaitStatus(0)).toEqual({ exitCode: 0, signal: null })
    expect(decodeWaitStatus(3 << 8)).toEqual({ exitCode: 3, signal: null })
  })

  test("an unnameable signal number still reports a signal, never a code", () => {
    const decoded = decodeWaitStatus(0x40)
    expect(decoded.exitCode).toBeNull()
    expect(decoded.signal).not.toBeNull()
  })
})

describe("classifyChildExit — non-crash arms", () => {
  test("a supervisor-issued kill is not a crash, whatever the child's status", () => {
    const v = classifyChildExit({
      status: { exitCode: null, signal: "SIGTERM" },
      supervisorKilled: true,
      shuttingDown: false,
    })
    expect(v.crashed).toBe(false)
    expect(v.stopReason).toBe(STOP_REASON.deliberate)
  })

  test("a shutting-down supervisor's child exit is not a crash — the seat is already leaving", () => {
    const v = classifyChildExit({
      status: { exitCode: null, signal: "SIGKILL" },
      supervisorKilled: false,
      shuttingDown: true,
    })
    expect(v.crashed).toBe(false)
    expect(v.stopReason).toBe(STOP_REASON.deliberate)
  })

  test("a clean quit the supervisor did not ask for stays deliberate", () => {
    const v = classifyChildExit(unaskedFor({ exitCode: 0, signal: null }))
    expect(v.crashed).toBe(false)
    expect(v.stopReason).toBe(STOP_REASON.deliberate)
  })
})

describe("classifyChildExit — crash arms", () => {
  test("a signalled child is a crash", () => {
    const v = classifyChildExit(unaskedFor({ exitCode: null, signal: "SIGKILL" }))
    expect(v.crashed).toBe(true)
    expect(v.stopReason).toBe(STOP_REASON.childCrashed)
    expect(v.reason).toContain("SIGKILL")
  })

  test("a non-zero exit is a crash", () => {
    const v = classifyChildExit(unaskedFor({ exitCode: 1, signal: null }))
    expect(v.crashed).toBe(true)
    expect(v.stopReason).toBe(STOP_REASON.childCrashed)
  })

  test("an unobservable exit status is a crash, not a deliberate quit", () => {
    const v = classifyChildExit(unaskedFor({ exitCode: null, signal: null }))
    expect(v.crashed).toBe(true)
    expect(v.stopReason).toBe(STOP_REASON.childCrashed)
  })
})

describe("the stop reason a crash carries", () => {
  test("names neither a reap nor a deliberate quit — nothing reaped it", () => {
    expect(STOP_REASON.childCrashed).not.toBe(STOP_REASON.deliberate)
    expect(STOP_REASON.childCrashed).not.toBe(STOP_REASON.reaped)
    expect(STOP_REASON.childCrashed).not.toBe(STOP_REASON.crashReaped)
  })

  test("crashed is true exactly when the stop reason is not deliberate", () => {
    const cases: ChildExitObservation[] = [
      unaskedFor({ exitCode: 0, signal: null }),
      unaskedFor({ exitCode: 137, signal: null }),
      unaskedFor({ exitCode: null, signal: "SIGSEGV" }),
      unaskedFor({ exitCode: null, signal: null }),
      { status: { exitCode: 0, signal: null }, supervisorKilled: true, shuttingDown: false },
      { status: { exitCode: 1, signal: null }, supervisorKilled: false, shuttingDown: true },
    ]
    for (const obs of cases) {
      const v = classifyChildExit(obs)
      expect(v.crashed).toBe(v.stopReason !== STOP_REASON.deliberate)
    }
  })
})

describe("decideShutdownExitWrite — all three surfaces from one classification", () => {
  const clean = classifyChildExit(unaskedFor({ exitCode: 0, signal: null }))
  const crash = classifyChildExit(unaskedFor({ exitCode: null, signal: "SIGKILL" }))

  test("an unobserved child exit writes exactly what a clean shutdown writes today", () => {
    expect(decideShutdownExitWrite(null)).toEqual({
      stampCleanExit: true,
      stopReason: STOP_REASON.deliberate,
      recordCrash: false,
    })
  })

  test("a non-crash classification is that same write", () => {
    expect(decideShutdownExitWrite(clean)).toEqual(decideShutdownExitWrite(null))
  })

  test("a crash suppresses the clean-exit crumb and stamps the crash reason", () => {
    expect(decideShutdownExitWrite(crash)).toEqual({
      stampCleanExit: false,
      stopReason: STOP_REASON.childCrashed,
      recordCrash: true,
    })
  })

  test("the crumb and the record are never both taken, and never both skipped", () => {
    for (const input of [null, clean, crash]) {
      const write = decideShutdownExitWrite(input)
      expect(write.stampCleanExit).toBe(!write.recordCrash)
    }
  })
})
