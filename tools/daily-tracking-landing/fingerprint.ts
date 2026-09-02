/**
 * What a directory of files held at one instant, said in a way two instants can be held apart.
 *
 * The corpus this migration reads is live: Alan's tracking appends a session row to today's sidecar
 * while the landing runs. A landing that read the corpus once and wrote an hour later would drop
 * whatever arrived in between and never know. So the landing takes a fingerprint before it reads,
 * and takes another before it writes and after it writes, and refuses on any difference.
 *
 * A fingerprint is per file. `cat *.jsonl | wc -l` undercounts this corpus, because two sidecars end
 * without a newline and `cat` welds their last row onto the next file's first — so nothing here ever
 * treats the directory as one stream.
 */

import { createHash } from "node:crypto"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

export type FileMark = {
  readonly sha256: string
  readonly bytes: number
}

export type Fingerprint = {
  readonly root: string
  readonly takenAtMs: number
  readonly files: ReadonlyMap<string, FileMark>
  /** Every file's mark rolled into one, so two instants compare in one string. */
  readonly digest: string
  readonly bytes: number
}

/** How one file differs between two instants. */
export type DriftKind = "appeared" | "vanished" | "grew" | "shrank" | "rewritten"

export type Drift = {
  readonly name: string
  readonly kind: DriftKind
  readonly detail: string
}

function sha256Of(bytes: Uint8Array | string): string {
  return createHash("sha256").update(bytes).digest("hex")
}

/**
 * The directory as it stands, file by file.
 *
 * A subdirectory is a refusal rather than something skipped: this corpus is flat, and a directory
 * appearing in it is something nobody has decided about, so nothing here decides for them.
 */
export function fingerprintOf(root: string): Fingerprint {
  const found = statSync(root, { throwIfNoEntry: false })
  if (found === undefined || !found.isDirectory()) {
    throw new Error(`'${root}' is no directory, so what stands there is unknown rather than empty`)
  }
  const files = new Map<string, FileMark>()
  let bytes = 0
  for (const name of readdirSync(root).sort()) {
    const full = join(root, name)
    const here = statSync(full)
    if (here.isDirectory()) {
      throw new Error(`'${full}' is a directory, and this corpus is flat, so its contents are unread`)
    }
    if (!here.isFile()) {
      throw new Error(`'${full}' is no plain file, so what it holds cannot be fingerprinted`)
    }
    const held = readFileSync(full)
    files.set(name, { sha256: sha256Of(held), bytes: held.byteLength })
    bytes += held.byteLength
  }
  const rolled = [...files]
    .map(([name, mark]) => `${name} ${mark.sha256} ${String(mark.bytes)}`)
    .join("\n")
  return { root, takenAtMs: Date.now(), files, digest: sha256Of(rolled), bytes }
}

/** Every file that is not what it was, and how it is not. */
export function driftBetween(before: Fingerprint, after: Fingerprint): readonly Drift[] {
  const drift: Drift[] = []
  for (const [name, was] of before.files) {
    const now = after.files.get(name)
    if (now === undefined) {
      drift.push({ name, kind: "vanished", detail: `held ${String(was.bytes)} bytes and is gone` })
      continue
    }
    if (now.sha256 === was.sha256) continue
    if (now.bytes > was.bytes) {
      drift.push({
        name,
        kind: "grew",
        detail: `grew by ${String(now.bytes - was.bytes)} bytes, which is a row appended`,
      })
      continue
    }
    if (now.bytes < was.bytes) {
      drift.push({
        name,
        kind: "shrank",
        detail: `lost ${String(was.bytes - now.bytes)} bytes`,
      })
      continue
    }
    drift.push({ name, kind: "rewritten", detail: "the same length and different content" })
  }
  for (const [name, now] of after.files) {
    if (before.files.has(name)) continue
    drift.push({ name, kind: "appeared", detail: `${String(now.bytes)} bytes that were not there` })
  }
  return drift
}

/** The fingerprint as a file the landing leaves behind, so a later act can say what it read. */
export function fingerprintJson(mark: Fingerprint): string {
  const files: Record<string, FileMark> = {}
  for (const [name, held] of mark.files) files[name] = held
  return `${JSON.stringify(
    {
      root: mark.root,
      takenAtMs: mark.takenAtMs,
      digest: mark.digest,
      bytes: mark.bytes,
      count: mark.files.size,
      files,
    },
    null,
    2
  )}\n`
}
