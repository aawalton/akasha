/**
 * The half of the landing the read gate does not stand in.
 *
 * `akasha write` is the only verb that writes under `akasha/`, and it is gated: it can refuse for a
 * reading the caller owes, and a refusal in the middle of an act is what left the first landing with
 * an undo that printed `STUCK`. Everything in this file is outside `akasha/` — the old markdown
 * corpus under `pages/daily-tracking/` and the funnel in `tools/` — so every call here is a plain
 * file write and a `git commit` naming its paths. None of it can be refused for a reading.
 *
 * That is the whole reason it stands apart. The landing does the ungated, restorable half first and
 * the gated half last, so the one step that can refuse is the last step there is, and taking the act
 * back never asks the gate for anything.
 *
 * Nothing here reads the corpus. What goes back on a restore is the snapshot the landing already
 * took and fingerprinted, so a restore puts back the bytes that were read rather than bytes read
 * again from a corpus that has since moved.
 */

import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"

/** How many times a commit is retried while another lane holds the index. */
const LOCK_TRIES = 5

const LOCK_WAIT_MS = 400

export type Ran = { readonly ok: true } | { readonly ok: false; readonly why: string }

/**
 * What a commit attempt did, which is not answered by its exit code alone.
 *
 * VERIFIED: `git commit` with a pathspec naming paths HEAD does not hold refuses those paths by name,
 * exits non-zero, AND COMMITS THE REST. Reading a non-zero exit as "nothing landed" is how a landing
 * restores the files it deleted while the commit that deleted them still stands — the disk and HEAD
 * then disagree, and nothing says so. So whether HEAD moved is measured rather than inferred.
 */
export type Landed = Ran & { readonly moved: boolean }

export function headHere(repoRoot: string): string {
  const ran = Bun.spawnSync(["git", "rev-parse", "HEAD"], { cwd: repoRoot })
  return ran.exitCode === 0 ? new TextDecoder().decode(ran.stdout).trim() : ""
}

/**
 * A file written to a name beside itself and moved onto it, so no half file is ever readable.
 *
 * The rename is the whole point: a reader of the funnel either sees the old text or the new one, and
 * never a file being written. The landing leans on that, because the funnel is read by every reach
 * that writes one of Alan's days and one of those may run at any instant.
 */
export function landFile(at: string, text: string): void {
  const temp = `${at}.landing-${String(process.pid)}`
  writeFileSync(temp, text)
  renameSync(temp, at)
}

/**
 * Which of the corpus's files git does not track, which is what makes taking them away a lie.
 *
 * This landing says the markdown corpus stands in the commit before it, and that is the whole reason
 * removing it is safe rather than destructive. A file git never tracked stands in no commit: taking
 * it away leaves the bytes nowhere but this run's snapshot, which is a temp directory. So the act
 * refuses rather than removing one, and it refuses before anything is deleted rather than finding
 * out while committing.
 *
 * It is asked of git in one call rather than one per file, because a corpus is hundreds of files and
 * a process per file is a minute of nothing.
 */
export function untrackedAmong(
  repoRoot: string,
  from: string,
  names: readonly string[]
): readonly string[] {
  const at = relative(repoRoot, from)
  /**
   * Asked of HEAD rather than of the index, which is the difference that bit.
   *
   * `git ls-files` reads the index, so a file another lane has staged and not committed reads as
   * tracked. It is not in HEAD, and `git commit` with a pathspec builds its commit from HEAD, so
   * that file matches nothing and the commit refuses it by name — after this act has already taken
   * it off the disk. HEAD is also what the landing's own claim is about: the corpus stands in the
   * commit before this one.
   */
  const ran = Bun.spawnSync(["git", "ls-tree", "-r", "-z", "--name-only", "HEAD", "--", at], {
    cwd: repoRoot,
  })
  if (ran.exitCode !== 0) {
    return [`git does not say what HEAD holds under '${at}', so nothing here removes anything`]
  }
  const tracked = new Set(
    new TextDecoder()
      .decode(ran.stdout)
      .split("\0")
      .filter((one) => one !== "")
      .map((one) => one.slice(at.length + 1))
  )
  return names.filter((name) => !tracked.has(name))
}

/**
 * The old corpus taken off the disk, its directory kept.
 *
 * The directory stays because the funnel still answers `markdown` for any day it does not name — a
 * day Alan tracks after this landing — and the markdown writer needs somewhere to put it. Taking the
 * folder as well would make the next day's first write depend on a `mkdir` nobody wrote.
 */
export function takenAway(from: string, names: readonly string[]): Ran {
  const stuck: string[] = []
  for (const name of names) {
    try {
      rmSync(join(from, name), { force: true })
    } catch (error) {
      stuck.push(`${name}: ${(error as Error).message}`)
    }
  }
  if (stuck.length > 0) return { ok: false, why: stuck.join("; ") }
  return { ok: true }
}

/**
 * The old corpus put back exactly as the snapshot holds it.
 *
 * This is the undo of `takenAway`, and it is what makes the landing's undo gate-free: the bytes come
 * off the snapshot the landing took before it read anything, so a restore is a copy of a copy rather
 * than a call to a verb that can refuse.
 */
export function putBack(from: string, snapshot: string, names: readonly string[]): Ran {
  const stuck: string[] = []
  if (!existsSync(from)) mkdirSync(from, { recursive: true })
  for (const name of names) {
    try {
      landFile(join(from, name), readFileSync(join(snapshot, name), "utf8"))
    } catch (error) {
      stuck.push(`${name}: ${(error as Error).message}`)
    }
  }
  if (stuck.length > 0) return { ok: false, why: stuck.join("; ") }
  return { ok: true }
}

/**
 * Which of the named paths git sees a change at, asked of git rather than assumed.
 *
 * `git commit` with a pathspec refuses a path it cannot match and commits the rest, so a pathspec
 * list is only safe if every entry matches. Rather than reason about when one does, the list handed
 * to the commit is the list git itself reports as changed. A path expected and not reported is a
 * deletion that did not register, which is worth refusing over rather than committing around.
 */
function changedAmong(repoRoot: string, named: readonly string[]): ReadonlySet<string> {
  const ran = Bun.spawnSync(["git", "status", "--porcelain", "-z", "--", ...named], {
    cwd: repoRoot,
  })
  if (ran.exitCode !== 0) return new Set()
  const seen = new Set<string>()
  for (const one of new TextDecoder().decode(ran.stdout).split("\0")) {
    if (one.length < 4) continue
    seen.add(one.slice(3))
  }
  return seen
}

/**
 * Named paths staged and committed as one call.
 *
 * One call because this worktree is shared by every lane running tonight: anything staged and left
 * uncommitted is swept up by whoever commits next. The paths are named one by one rather than by
 * their folder, so a file arriving in that folder while this runs is not carried along.
 *
 * `index.lock` is another lane holding the index for a moment rather than a fault, so it is waited
 * out rather than reported.
 */
export function committed(repoRoot: string, paths: readonly string[], message: string): Landed {
  const asked = paths.map((one) => relative(repoRoot, one))
  const changed = changedAmong(repoRoot, asked)
  const named = asked.filter((one) => changed.has(one))
  if (named.length === 0) {
    return { ok: false, why: "git sees no change at any of the named paths", moved: false }
  }
  const was = headHere(repoRoot)
  let last = ""
  for (let go = 0; go < LOCK_TRIES; go += 1) {
    const ran = Bun.spawnSync(["git", "commit", "--only", "-m", message, "--", ...named], {
      cwd: repoRoot,
    })
    const moved = headHere(repoRoot) !== was
    if (ran.exitCode === 0) return { ok: true, moved }
    last = new TextDecoder().decode(ran.stderr) + new TextDecoder().decode(ran.stdout)
    if (!last.includes("index.lock")) return { ok: false, why: last.trim(), moved }
    Bun.sleepSync(LOCK_WAIT_MS)
  }
  return {
    ok: false,
    why: `the index stayed locked through ${String(LOCK_TRIES)} tries :: ${last.trim()}`,
    moved: headHere(repoRoot) !== was,
  }
}
