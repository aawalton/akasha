import { describe, expect, it } from "bun:test"
import { isRetryableUploadError, withUploadRetry } from "./upload-retry"

function recorder(): { sleeps: readonly number[]; sleep: (ms: number) => Promise<void> } {
  const sleeps: number[] = []
  return {
    sleeps,
    sleep: async (ms: number): Promise<void> => {
      sleeps.push(ms)
    },
  }
}

const halfJitter = (): number => 0.5

describe("isRetryableUploadError — only transient-by-construction failures", () => {
  it("matches the statement-timeout string the server actually returned", () => {
    const observed = new Error(
      "bulkUpsertPages(temper-mined-item): canceling statement due to statement timeout"
    )
    expect(isRetryableUploadError(observed)).toBe(true)
  })

  it("matches a bare SQLSTATE 57014", () => {
    expect(isRetryableUploadError(new Error("upsert failed: 57014"))).toBe(true)
  })

  it("matches the gateway 502 — the 10th observed failure, same timeout upstream", () => {
    const observed = new Error("HTTP 502 from https://tempereso.com/api/watcher/upsert-mined-items")
    expect(isRetryableUploadError(observed)).toBe(true)
  })

  it("matches 503 and 504", () => {
    expect(isRetryableUploadError(new Error("HTTP 503 from https://x.invalid"))).toBe(true)
    expect(isRetryableUploadError(new Error("HTTP 504 from https://x.invalid"))).toBe(true)
  })

  it("does NOT match an expired token — retrying that is pointless and hides it", () => {
    expect(isRetryableUploadError(new Error("Invalid or expired watcher token"))).toBe(false)
  })

  it("does NOT match a 400 malformed body", () => {
    expect(isRetryableUploadError(new Error("HTTP 400 from https://x.invalid"))).toBe(false)
  })

  it("does NOT match a 500 that is not a gateway code", () => {
    expect(isRetryableUploadError(new Error("HTTP 500 from https://x.invalid"))).toBe(false)
  })

  it("does not match a non-Error throw", () => {
    expect(isRetryableUploadError("canceling statement due to statement timeout")).toBe(false)
  })
})

describe("withUploadRetry — a transient batch failure must not discard the run", () => {
  it("returns the value without sleeping when the first attempt succeeds", async () => {
    const { sleeps, sleep } = recorder()
    let calls = 0
    const result = await withUploadRetry(
      async () => {
        calls++
        return "landed"
      },
      { sleep, random: halfJitter }
    )
    expect(result).toBe("landed")
    expect(calls).toBe(1)
    expect(sleeps).toEqual([])
  })

  it("retries a timed-out batch and returns once it lands", async () => {
    const { sleeps, sleep } = recorder()
    let calls = 0
    const result = await withUploadRetry(
      async () => {
        calls++
        if (calls < 3) throw new Error("canceling statement due to statement timeout")
        return "landed"
      },
      { sleep, random: halfJitter }
    )
    expect(result).toBe("landed")
    expect(calls).toBe(3)
    expect(sleeps).toEqual([250, 500])
  })

  it("rethrows a non-retryable error immediately, without sleeping", async () => {
    const { sleeps, sleep } = recorder()
    let calls = 0
    await expect(
      withUploadRetry(
        async () => {
          calls++
          throw new Error("Invalid or expired watcher token")
        },
        { sleep, random: halfJitter }
      )
    ).rejects.toThrow("Invalid or expired watcher token")
    expect(calls).toBe(1)
    expect(sleeps).toEqual([])
  })

  it("gives up on a PERSISTENT timeout and rethrows — a real outage stays visible", async () => {
    const { sleeps, sleep } = recorder()
    let calls = 0
    await expect(
      withUploadRetry(
        async () => {
          calls++
          throw new Error("canceling statement due to statement timeout")
        },
        { maxAttempts: 4, sleep, random: halfJitter }
      )
    ).rejects.toThrow("statement timeout")
    expect(calls).toBe(4)
    expect(sleeps).toHaveLength(3)
  })

  it("caps the backoff ceiling so a long retry chain cannot stall the watcher", async () => {
    const { sleeps, sleep } = recorder()
    await expect(
      withUploadRetry(
        async () => {
          throw new Error("HTTP 502 from https://x.invalid")
        },
        { maxAttempts: 8, baseDelayMs: 500, maxDelayMs: 2000, sleep, random: () => 1 }
      )
    ).rejects.toThrow("502")
    expect(sleeps).toEqual([500, 1000, 2000, 2000, 2000, 2000, 2000])
  })
})
