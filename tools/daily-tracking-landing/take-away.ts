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
 * This comment used to say a pathspec commit naming paths HEAD does not hold refuses those by name,
 * exits non-zero AND COMMITS THE REST. Measured against git 2.55, it does not, and the difference
 * decides where the fault is:
 *
 *   VERIFIED  a pathspec git cannot match at all refuses the WHOLE commit — every named path is
 *             reported, the exit is non-zero and HEAD does not move. Nothing partial happens.
 *   VERIFIED  a pathspec git CAN match but HEAD does not hold — a path another lane staged and never
 *             committed — is dropped silently, at exit 0, with the rest committed. That is the quiet
 *             half, and it is why `untrackedAmong` asks HEAD rather than the index.
 *
 * So the loud case needs the paths made matchable and the quiet case needs them refused, which is
 * what `committed` now does. Whether HEAD moved is still measured rather than inferred, because a
 * caller that must know its commit landed cannot learn it from an exit code either way.
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

/** What `git status --porcelain` answers for a path git has never been told about. */
const UNTRACKED = "??"

/**
 * Staged as an addition and then taken off the disk, which is a path no pathspec commit can record.
 *
 * A commit built against HEAD can record a deletion only of something HEAD holds. This code means
 * another lane staged the file and never committed it, so HEAD does not hold it — and this act has
 * since deleted it. VERIFIED that `git commit --only` naming such a path exits 0 and quietly leaves
 * it out, which is the take-away's own way of making the landing's claim false without saying so.
 */
const ADDED_THEN_GONE = "AD"

/**
 * What git sees at each of the named paths, as its two-letter porcelain code.
 *
 * `git commit` with a pathspec is all or nothing: one entry it cannot match and the whole commit
 * refuses, HEAD unmoved. VERIFIED against git 2.55 rather than assumed, because the comment above
 * `Landed` once said such a commit lands the rest, and it does not.
 *
 * So the codes are read rather than only the names. Two callers need them for opposite reasons: a
 * take-away names paths it has just deleted and every one must be a path git already holds, while a
 * restore names paths it has just written back and those are untracked until git is told about them.
 */
function statusAmong(repoRoot: string, named: readonly string[]): ReadonlyMap<string, string> {
  const ran = Bun.spawnSync(["git", "status", "--porcelain", "-z", "--", ...named], {
    cwd: repoRoot,
  })
  if (ran.exitCode !== 0) return new Map()
  const seen = new Map<string, string>()
  for (const one of new TextDecoder().decode(ran.stdout).split("\0")) {
    if (one.length < 4) continue
    seen.set(one.slice(3), one.slice(0, 2))
  }
  return seen
}

/**
 * The untracked among the named paths told to git, so a pathspec commit can match them.
 *
 * This is what the undo was missing. Once the take-away commit has landed, HEAD no longer holds the
 * markdown corpus, so every file the restore puts back is untracked — and `git commit --only` refuses
 * a path git does not know, by name, and commits nothing. The restore then had the files on the disk
 * and no way to say so.
 *
 * `--intent-to-add` rather than a plain `git add`, and the difference is the shared worktree. A plain
 * `git add` stages the content, so in the instant between staging and committing another lane's bare
 * `git commit` carries these files into ITS commit — the sweep CLAUDE.md warns about. An
 * intent-to-add entry holds no content: VERIFIED that `git diff --cached` lists a plainly added file
 * and does not list an intent-to-add one, so a bare commit cannot sweep it. It records only that the
 * path exists, which is all a pathspec needs to match, and the commit below then takes the bytes off
 * the working tree.
 */
function madeKnown(repoRoot: string, paths: readonly string[]): string | null {
  if (paths.length === 0) return null
  const ran = Bun.spawnSync(["git", "add", "--intent-to-add", "--", ...paths], { cwd: repoRoot })
  if (ran.exitCode === 0) return null
  return (
    new TextDecoder().decode(ran.stderr) + new TextDecoder().decode(ran.stdout)
  ).trim()
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
  const stands = statusAmong(repoRoot, asked)

  /**
   * Nothing to record is done rather than stuck, which is the undo's other way of jamming.
   *
   * The restore calls this whenever HEAD has moved since the act began — and HEAD moves because
   * ANY of fourteen lanes committed, not only because this one did. So when the take-away commit
   * itself failed and a neighbour's commit moved HEAD anyway, the restore puts back files that
   * were never removed from HEAD and asks git to record a difference that is not there. That is
   * the world already being as it should be. Reporting it as a failure is how an undo prints
   * `STUCK` over a tree it has correctly left alone.
   *
   * `moved: false` is the whole answer: no commit was made, and none was owed. A caller that
   * needed one says so by weighing `moved`, which the take-away does.
   */
  if (stands.size === 0) return { ok: true, moved: false }

  /**
   * A path this act changed that git does not report is refused rather than committed around.
   *
   * The comment above said this and the code did not do it — it filtered the unreported paths out
   * and committed the rest. VERIFIED that the quiet case is real: a path another lane had staged
   * but never committed, deleted by a take-away, is reported by nothing, and the commit then lands
   * at exit 0 having silently kept it. That is the landing's claim — the corpus stands in the
   * commit before this one — coming out false for the one file it is false about.
   */
  const unsaid = asked.filter((one) => {
    const code = stands.get(one)
    return code === undefined || code === ADDED_THEN_GONE
  })
  if (unsaid.length > 0) {
    return {
      ok: false,
      why:
        `git would record nothing for ${String(unsaid.length)} of ${String(asked.length)} named ` +
        `path(s), so what this act did to them would go unsaid: ${unsaid.slice(0, 8).join(", ")}`,
      moved: false,
    }
  }

  const unknown = asked.filter((one) => stands.get(one) === UNTRACKED)
  const was = headHere(repoRoot)
  let last = ""
  for (let go = 0; go < LOCK_TRIES; go += 1) {
    /**
     * Told to git inside the retry, because `git add` takes the same index lock the commit does.
     * A restore that gave up because a neighbour held the index for a moment would be the same
     * `STUCK` by another road. Telling git twice about a path costs nothing.
     */
    const knew = madeKnown(repoRoot, unknown)
    if (knew !== null) {
      last = knew
      if (!knew.includes("index.lock")) return { ok: false, why: knew, moved: false }
      Bun.sleepSync(LOCK_WAIT_MS)
      continue
    }
    const ran = Bun.spawnSync(["git", "commit", "--only", "-m", message, "--", ...asked], {
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
