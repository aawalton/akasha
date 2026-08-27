import { readFileSync } from "node:fs"
import { writeFileAtomicSync } from "@shared/utils-fs/atomic-write"
import { log } from "./logger"

const MAX_RETRIES = 5
const BACKOFF_MS = [200, 400, 800, 1600, 3200]

function isRetryableError(err: unknown): boolean {
  if (err === null || typeof err !== "object" || !("code" in err)) return false
  const code = err.code
  return code === "EBUSY" || code === "EAGAIN"
}

function retryOnBusy<T>(fn: () => T, label: string): T {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return fn()
    } catch (err) {
      if (!isRetryableError(err) || attempt === MAX_RETRIES) throw err
      log(`Retrying ${label} (attempt ${attempt}/${MAX_RETRIES})...`)
      Bun.sleepSync(BACKOFF_MS[attempt - 1] ?? 3200)
    }
  }
  throw new Error("unreachable")
}

export function readFileWithRetry(path: string, encoding: BufferEncoding): string {
  return retryOnBusy(() => readFileSync(path, encoding), `read ${path}`)
}

export function writeFileAtomicWithRetry(path: string, content: string): undefined {
  writeFileAtomicSync(path, content, { retryOnBusy: true, onRetry: log })
}
