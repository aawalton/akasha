import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdir, mkdtemp, readdir, rm, utimes } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { z } from "zod"
import { pruneLocalLogs, streamProcessOutput, TAIL_BYTES } from "./tee.ts"

const FILE_TEXT_SCHEMA = z.string()

describe("streamProcessOutput", () => {
  let workDir: string
  beforeEach(async () => {
    workDir = await mkdtemp(join(tmpdir(), "tee-test-"))
  })
  afterEach(async () => {
    await rm(workDir, { recursive: true, force: true })
  })

  test("writes subprocess stdout to log file", async () => {
    const logPath = join(workDir, "step.log")
    const proc = Bun.spawn(["sh", "-c", "echo hello && echo world"], {
      stdout: "pipe",
      stderr: "pipe",
    })
    const { exitCode } = await streamProcessOutput({ proc, prefix: "[s] ", logPath })
    expect(exitCode).toBe(0)
    expect(FILE_TEXT_SCHEMA.parse(await Bun.file(logPath).text())).toBe("hello\nworld\n")
  })

  test("merges stderr into the same log file", async () => {
    const logPath = join(workDir, "step.log")
    const proc = Bun.spawn(["sh", "-c", "echo out; echo err 1>&2"], {
      stdout: "pipe",
      stderr: "pipe",
    })
    await streamProcessOutput({ proc, prefix: "[s] ", logPath })
    const text = FILE_TEXT_SCHEMA.parse(await Bun.file(logPath).text())
    expect(text).toContain("out\n")
    expect(text).toContain("err\n")
  })

  test("prefixes terminal output line-by-line", async () => {
    const logPath = join(workDir, "step.log")
    const captured: string[] = []
    const term = {
      write(s: string) {
        captured.push(s)
      },
    }
    const proc = Bun.spawn(["sh", "-c", "echo a; echo b"], {
      stdout: "pipe",
      stderr: "pipe",
    })
    await streamProcessOutput({
      proc,
      prefix: "[step] ",
      logPath,
      terminal: { stdout: term },
    })
    const out = captured.join("")
    expect(out).toContain("[step] a\n")
    expect(out).toContain("[step] b\n")
  })

  test("does not prefix empty lines", async () => {
    const captured: string[] = []
    const term = {
      write(s: string) {
        captured.push(s)
      },
    }
    const proc = Bun.spawn(["sh", "-c", "printf 'a\\n\\nb\\n'"], {
      stdout: "pipe",
      stderr: "pipe",
    })
    await streamProcessOutput({ proc, prefix: "[s] ", terminal: { stdout: term } })
    expect(captured.join("")).toBe("[s] a\n\n[s] b\n")
  })

  test("flushes a trailing partial line on exit", async () => {
    const captured: string[] = []
    const term = {
      write(s: string) {
        captured.push(s)
      },
    }
    const proc = Bun.spawn(["sh", "-c", "printf 'no-newline'"], {
      stdout: "pipe",
      stderr: "pipe",
    })
    await streamProcessOutput({ proc, prefix: "[s] ", terminal: { stdout: term } })
    expect(captured.join("")).toBe("[s] no-newline\n")
  })

  test("tail returns the last bytes from large output", async () => {
    const logPath = join(workDir, "step.log")
    const script =
      "i=0; while [ $i -lt 200 ]; do printf 'line %03d AAAAAAAAAA\\n' $i; i=$((i+1)); done"
    const proc = Bun.spawn(["sh", "-c", script], { stdout: "pipe", stderr: "pipe" })
    const { exitCode, tail } = await streamProcessOutput({ proc, prefix: "", logPath })
    expect(exitCode).toBe(0)
    const t = await tail()
    expect(t.length).toBeLessThanOrEqual(TAIL_BYTES)
    expect(t).toContain("line 199")
    expect(t).not.toContain("line 000")
  })

  test("works without logPath via in-memory tail", async () => {
    const proc = Bun.spawn(["sh", "-c", "echo only"], { stdout: "pipe", stderr: "pipe" })
    const { exitCode, tail } = await streamProcessOutput({ proc, prefix: "" })
    expect(exitCode).toBe(0)
    expect(await tail()).toBe("only\n")
  })

  test("captures full output to disk without unbounded heap growth", async () => {
    const logPath = join(workDir, "big.log")
    const tenMb = 10 * 1024 * 1024
    const proc = Bun.spawn(["sh", "-c", `yes A | head -c ${tenMb}`], {
      stdout: "pipe",
      stderr: "pipe",
    })
    const { exitCode, tail } = await streamProcessOutput({ proc, prefix: "", logPath })
    expect(exitCode).toBe(0)
    expect(Bun.file(logPath).size).toBe(tenMb)
    expect((await tail()).length).toBeLessThanOrEqual(TAIL_BYTES)
  })

  test("propagates non-zero exit code", async () => {
    const proc = Bun.spawn(["sh", "-c", "exit 42"], { stdout: "pipe", stderr: "pipe" })
    const { exitCode } = await streamProcessOutput({ proc, prefix: "" })
    expect(exitCode).toBe(42)
  })
})

describe("pruneLocalLogs", () => {
  let workDir: string
  beforeEach(async () => {
    workDir = await mkdtemp(join(tmpdir(), "prune-test-"))
  })
  afterEach(async () => {
    await rm(workDir, { recursive: true, force: true })
  })

  test("drops directories older than the cutoff, keeps fresh ones", async () => {
    await mkdir(join(workDir, "old"))
    await mkdir(join(workDir, "fresh"))
    const longAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    await utimes(join(workDir, "old"), longAgo, longAgo)

    await pruneLocalLogs(workDir, 7 * 24 * 60 * 60 * 1000)

    const remaining = await readdir(workDir)
    expect(remaining).toEqual(["fresh"])
  })

  test("is a no-op when the root directory does not exist", async () => {
    const missing = join(workDir, "does-not-exist")
    await pruneLocalLogs(missing, 1000)
  })
})
