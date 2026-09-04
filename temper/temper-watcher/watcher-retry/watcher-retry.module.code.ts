import { readFileSync } from "node:fs"
import { writeFileAtomicSync } from "@akasha/utils-fs/atomic-write"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"

export const MAX_RETRIES = 5

export const BACKOFF_MS: readonly number[] = [200, 400, 800, 1600, 3200]

export interface RetryDeps {
  readonly sleepSync?: (ms: number) => void
  readonly onRetry?: (message: string) => void
}

export function isBusyError(err: unknown): boolean {
  if (err === null || typeof err !== "object" || !("code" in err)) return false
  const code = (err as { code: unknown }).code
  return code === "EBUSY" || code === "EAGAIN"
}

export function backoffFor(attempt: number): number {
  return BACKOFF_MS[attempt - 1] ?? 3200
}

export function retryOnBusy<T>(fn: () => T, label: string, deps: RetryDeps = {}): T {
  const sleepSync = deps.sleepSync ?? Bun.sleepSync
  const onRetry = deps.onRetry ?? log
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return fn()
    } catch (err) {
      if (!isBusyError(err) || attempt === MAX_RETRIES) throw err
      onRetry(`Retrying ${label} (attempt ${attempt}/${MAX_RETRIES})...`)
      sleepSync(backoffFor(attempt))
    }
  }
  throw new Error(`retryOnBusy left its loop without answering for ${label}`)
}

export function readFileWithRetry(path: string, encoding: BufferEncoding): string {
  return retryOnBusy(() => readFileSync(path, encoding), `read ${path}`)
}

export function writeFileAtomicWithRetry(path: string, content: string): undefined {
  writeFileAtomicSync(path, content, { retryOnBusy: true, onRetry: log })
  return undefined
}
