import { expect, test } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { commitWorktree, stagedNames } from "./worktree-commit.ts"

const SCRATCH = "/var/tmp"

function scratchRepo(): string {
  const at = mkdtempSync(`${SCRATCH}/worktree-commit-`)
  execFileSync("git", ["-C", at, "init", "-q"])
  execFileSync("git", ["-C", at, "config", "user.email", "a@b.c"])
  execFileSync("git", ["-C", at, "config", "user.name", "t"])
  writeFileSync(`${at}/root.txt`, "x\n")
  execFileSync("git", ["-C", at, "add", "-A"])
  execFileSync("git", ["-C", at, "commit", "-qm", "hold"])
  return at
}

// A git call that could not answer, failed for a real reason rather than stubbed: `diff --cached`
// must read the tree HEAD names, and an object store that has lost it is the shape a damaged
// repository takes. `git add -A` never reads HEAD, so it still succeeds — which is what lets the
// failure reach the emptiness test below it at all.
function loseHeadTree(root: string): void {
  const tree = execFileSync("git", ["-C", root, "rev-parse", "HEAD^{tree}"]).toString().trim()
  rmSync(`${root}/.git/objects/${tree.slice(0, 2)}/${tree.slice(2)}`, { force: true })
}

test("a root holding nothing staged answers with the empty list", () => {
  expect(stagedNames(scratchRepo(), [])).toEqual([])
})

// A TRUE EMPTY AND A FAILED CALL MUST NOT READ ALIKE. A file stands staged here, so the empty array
// the old code handed back was a claim about the index that no call supported.
test("a root whose diff --cached could not answer answers with null, not with nothing", () => {
  const at = scratchRepo()
  writeFileSync(`${at}/new.txt`, "y\n")
  execFileSync("git", ["-C", at, "add", "-A"])
  loseHeadTree(at)
  expect(stagedNames(at, [])).toBe(null)
})

// THE REFUSAL A CALLER SEES NAMES THE FAULT IT HAS. Both cases stop the commit, so a caller reading
// only `ok` cannot tell a root worth abandoning from a git call worth running again.
test("a root git could not be asked about is refused differently from one holding nothing", () => {
  const onEmpty = commitWorktree(scratchRepo(), "nothing to do")

  const failed = scratchRepo()
  writeFileSync(`${failed}/new.txt`, "y\n")
  loseHeadTree(failed)
  const onFailure = commitWorktree(failed, "cannot be asked")

  expect(onEmpty.ok).toBe(false)
  expect(onFailure.ok).toBe(false)
  if (onEmpty.ok || onFailure.ok) return
  expect(onEmpty.why).toContain("nothing stands in")
  expect(onFailure.why).toContain("could not establish what is staged")
  expect(onFailure.why).not.toContain("nothing stands in")
})
