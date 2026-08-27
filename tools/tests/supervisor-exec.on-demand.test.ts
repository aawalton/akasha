
import { dlopen, FFIType } from "bun:ffi"
import { describe, expect, it } from "bun:test"
import { closeSync, openSync } from "node:fs"
import { decided, hold } from "../lib/digest-harness.ts"
import type { ChildExitRuleSource } from "../lib/supervisor-child-exit-rule.ts"
import {
  asFd,
  asPid,
  execvpe,
  isProcessAlive,
  resolveMappedLibc,
  setFdCloexec,
  signalPid,
  waitForPidExit,
} from "../lib/supervisor-exec.ts"

const FD_CLOEXEC = 1
const F_GETFD = 1

const fcntl = dlopen(resolveMappedLibc(), {
  fcntl: { args: [FFIType.i32, FFIType.i32, FFIType.i32], returns: FFIType.i32 },
}).symbols.fcntl

function getFdFlags(fd: number): number {
  return fcntl(fd, F_GETFD, 0)
}

function childExitRuleDouble(): ChildExitRuleSource {
  const decided_ = <T>(value: T) => Promise.resolve({ value, notice: null })
  return {
    decodeWaitStatus: (raw) => decided_({ exitCode: raw, signal: null }),
    collapse: (status) => decided_(status.exitCode ?? 0),
    classify: (observation) =>
      decided_({
        crashed: false,
        stopReason: "deliberate" as const,
        reason: "double",
        status: observation.status,
      }),
    shutdownWrite: () =>
      decided_({ stampCleanExit: true, stopReason: "deliberate" as const, recordCrash: false }),
  }
}

interface Case {
  readonly name: string
  readonly run: () => Promise<Record<string, unknown>>
  readonly standing: Record<string, unknown>
}

const CASES: readonly Case[] = [
  {
    name: "setFdCloexec flips FD_CLOEXEC on and off, preserving other flags",
    run: async () => {
      const fd = openSync("/dev/null", "r")
      try {
        const before = getFdFlags(fd)
        setFdCloexec(fd, true)
        const afterOn = getFdFlags(fd)
        setFdCloexec(fd, false)
        const afterOff = getFdFlags(fd)
        return {
          beforeCloexecBit: before & FD_CLOEXEC,
          onCloexecBit: afterOn & FD_CLOEXEC,
          onPreservesOtherBits: (afterOn & ~FD_CLOEXEC) === (before & ~FD_CLOEXEC),
          offCloexecBit: afterOff & FD_CLOEXEC,
          offEqualsBefore: afterOff === before,
        }
      } finally {
        closeSync(fd)
      }
    },
    standing: {
      beforeCloexecBit: 0,
      onCloexecBit: FD_CLOEXEC,
      onPreservesOtherBits: true,
      offCloexecBit: 0,
      offEqualsBefore: true,
    },
  },
  {
    name: "setFdCloexec is idempotent — setting the same value twice is a no-op",
    run: async () => {
      const fd = openSync("/dev/null", "r")
      try {
        setFdCloexec(fd, true)
        const first = getFdFlags(fd)
        setFdCloexec(fd, true)
        const second = getFdFlags(fd)
        return { secondEqualsFirst: second === first }
      } finally {
        closeSync(fd)
      }
    },
    standing: { secondEqualsFirst: true },
  },
  {
    name: "isProcessAlive returns true for the current process",
    run: async () => ({ alive: isProcessAlive(process.pid) }),
    standing: { alive: true },
  },
  {
    name: "isProcessAlive returns false for a pid that doesn't exist",
    run: async () => ({ alive: isProcessAlive(0x7fff_ffff) }),
    standing: { alive: false },
  },
  {
    name: "signalPid delivers the signal — the target dies",
    run: async () => {
      const proc = Bun.spawn(["sleep", "30"])
      signalPid(proc.pid, "SIGTERM")
      await proc.exited
      return { aliveAfterExit: isProcessAlive(proc.pid) }
    },
    standing: { aliveAfterExit: false },
  },
  {
    name: "signalPid returns silently for a pid that is already gone",
    run: async () => ({ threw: threwFrom(() => signalPid(0x7fff_ffff, "SIGTERM")) !== null }),
    standing: { threw: false },
  },
  {
    name: "execvpe rejects empty file before invoking syscall",
    run: async () => ({ throwsMatching: matches(() => execvpe("", ["x"], {}), /file must be non-empty/) }),
    standing: { throwsMatching: true },
  },
  {
    name: "execvpe rejects empty argv[0] before invoking syscall",
    run: async () => ({
      throwsMatching: matches(() => execvpe("x", [""], {}), /argv\[0\] must be non-empty/),
    }),
    standing: { throwsMatching: true },
  },
  {
    name: "execvpe rejects empty argv array before invoking syscall",
    run: async () => ({
      throwsMatching: matches(() => execvpe("x", [], {}), /argv\[0\] must be non-empty/),
    }),
    standing: { throwsMatching: true },
  },
  {
    name: "waitForPidExit resolves once a short-lived child exits",
    run: async () => {
      const proc = Bun.spawn(["sleep", "0.1"])
      const status = await waitForPidExit(proc.pid, childExitRuleDouble(), { pollIntervalMs: 50 })
      return { keys: Object.keys(status).sort() }
    },
    standing: { keys: ["exitCode", "signal"] },
  },
  {
    name: "asFd / asPid return the same numeric value (compile-time brand only)",
    run: async () => ({ fdSelfEqual: asFd(7) === asFd(7), pidSelfEqual: asPid(123) === asPid(123) }),
    standing: { fdSelfEqual: true, pidSelfEqual: true },
  },
]

function threwFrom(act: () => unknown): unknown {
  try {
    act()
    return null
  } catch (err) {
    return err ?? new Error("a falsy throw")
  }
}

function matches(act: () => unknown, pattern: RegExp): boolean {
  const thrown = threwFrom(act)
  if (thrown === null) return false
  return pattern.test(thrown instanceof Error ? thrown.message : String(thrown))
}

function projected(answered: Record<string, unknown>, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = answered[key]
  return picked
}

describe("supervisor-exec, held against what the code repository asserts", () => {
  for (const one of CASES) {
    it(one.name, async () => {
      const answered = decided("ported", { value: await one.run(), notice: null })
      const verdict = hold(one.name, one.standing, projected(answered, one.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("carries the standing suite's whole population, and compares something in every case", () => {
    let asserted = 0
    for (const one of CASES) {
      expect(Object.keys(one.standing).length).toBeGreaterThan(0)
      asserted += Object.keys(one.standing).length
    }
    expect(CASES.length).toBe(11)
    expect(asserted).toBe(16)
  })
})
