
import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { fire, hookPath, type Ran } from "./hook-shell.ts"

const SCRIPT = "block-destructive-git.sh"

function runHook(command: string): Ran {
  return fire(SCRIPT, { stdin: { tool_input: { command } } })
}

const ALTERNATIVES: Record<string, RegExp> = {
  copyAside: /copy each file you changed aside/,
  show: /git show <ref>:<path>/,
  editDirectly: /edit the file directly/,
  rmAdd: /rm <path>.*git add <path>/,
  mergeMain: /git merge origin\/main/,
  furtherCommit: /land a further commit/,
  landedBranch: /git branch -d <name> is permitted/,
}

const VERB_BULLETS: Record<string, ReadonlyArray<keyof typeof ALTERNATIVES>> = {
  stash: ["copyAside", "show", "editDirectly"],
  reset: ["copyAside", "show", "editDirectly"],
  rebase: ["mergeMain"],
  checkout: ["copyAside", "show", "editDirectly"],
  restore: ["editDirectly"],
  clean: ["editDirectly"],
  rm: ["rmAdd"],
  amend: ["furtherCommit"],
  force: ["furtherCommit"],
  branchD: ["landedBranch"],
}

const BLOCKED: Array<[string, string, keyof typeof VERB_BULLETS]> = [
  ["git stash", "stash", "stash"],
  ["git stash push -m note", "stash", "stash"],
  ["git reset --hard", "reset", "reset"],
  ["git reset --hard HEAD", "reset", "reset"],
  ["git reset HEAD~1", "reset", "reset"],
  ["git reset --soft HEAD~1", "reset", "reset"],
  ["git rebase main", "rebase", "rebase"],
  ["git rebase -i HEAD~3", "rebase", "rebase"],
  ["git checkout main", "checkout", "checkout"],
  ["git checkout HEAD -- foo.ts", "checkout", "checkout"],
  ["git restore foo.ts", "restore", "restore"],
  ["git restore --source=HEAD foo.ts", "restore", "restore"],
  ["git clean -fd", "clean", "clean"],
  ["git clean -fdx", "clean", "clean"],
  ["git rm foo.ts", "rm", "rm"],
  ["git rm -rf packages/old", "rm", "rm"],
  ["git commit --amend", "commit --amend", "amend"],
  ["git commit --amend -m fix", "commit --amend", "amend"],
  ["git push --force", "force", "force"],
  ["git push -f origin main", "force", "force"],
  ["git push --force-with-lease", "force", "force"],
  ["git push --force-with-lease=main:abcd1234", "force", "force"],
  ["git branch -D feature", "branch -D", "branchD"],
  ["git branch --delete --force feature", "branch --delete --force", "branchD"],
  ["git branch --force --delete feature", "branch --delete --force", "branchD"],
  ["git -C /tmp reset --hard", "reset", "reset"],
  ["git --git-dir=/tmp/.git reset --hard", "reset", "reset"],
  ["git -c user.name=foo reset --hard", "reset", "reset"],
  ["git status; git reset --hard", "reset", "reset"],
  ["git status && git reset --hard", "reset", "reset"],
  ["git diff > /tmp/p.patch && git reset --hard", "reset", "reset"],
  ["git status | head; git stash", "stash", "stash"],
  ["git checkout -- .gitignore", "checkout", "checkout"],
  ["git checkout -- .github/workflows/ci.yml", "checkout", "checkout"],
  ["git restore .gitattributes", "restore", "restore"],
  ["git clean -fd .github", "clean", "clean"],
  ["git rm --cached .gitignore", "rm", "rm"],
  ["git reset --hard -- packages/infra/git-porcelain", "reset", "reset"],
  ["git stash -- .gitignore", "stash", "stash"],
  ["git rebase --onto digit main", "rebase", "rebase"],
  ["git push --force origin digit", "force", "force"],
  ["git clean -fd digit", "clean", "clean"],
  ["/usr/bin/git reset --hard", "reset", "reset"],
]

const ALLOWED: string[] = [
  "git status",
  "git log -3",
  "git diff",
  "git diff --stat",
  "git commit -m fix",
  "git commit -am fix",
  "git push origin main",
  "git push -u origin feature",
  "git branch",
  "git branch --list",
  "git branch -a",
  "git branch new-feature",
  "git branch --delete feature",
  "git fetch",
  "git pull",
  "git add foo.ts",
  "git add -A",
  "git worktree add /var/tmp/check-9098 origin/main",
  "git worktree list",
  "git show main:foo.ts",
  "git show HEAD~1:packages/foo",
  "git ls-tree main",
  "git cat-file -p HEAD",
  "ls",
  "rm foo.ts",
  "echo 'git reset --hard'",
  "ops project rebase",
  "git status -- .gitignore",
  "git log --oneline -- .github",
  "git diff -- packages/infra/git-porcelain",
  "git show HEAD:.gitignore",
  "git add .gitignore",
  "git ls-files .github",
  "git",
  "git --list-cmds=builtins",
  "",
]

test.each(BLOCKED)("blocks: %s", (cmd, marker, verbKey) => {
  const result = runHook(cmd)
  expect(result.exitCode).toBe(2)
  expect(result.stdout).toContain('"decision"')
  expect(result.stdout).toContain('"block"')
  expect(result.stderr).toContain(marker)
  expect(result.stderr).toContain("Safe alternatives")

  const wantBullets = new Set<string>(VERB_BULLETS[verbKey])
  for (const [key, pattern] of Object.entries(ALTERNATIVES)) {
    if (wantBullets.has(key)) {
      expect(result.stderr).toMatch(pattern)
    } else {
      expect(result.stderr).not.toMatch(pattern)
    }
  }
})

test.each(ALLOWED)("allows: %s", (cmd) => {
  const result = runHook(cmd)
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toBe("")
})

test("allows tool calls with no command field", () => {
  expect(fire(SCRIPT, { stdin: { tool_input: { file_path: "/tmp/foo" } } }).exitCode).toBe(0)
})

test("--scope prints the reach the file itself declares", () => {
  const result = fire(SCRIPT, { args: ["--scope"] })
  expect(result.exitCode).toBe(0)
  expect(result.stdout).toContain("predicate-derivation: open-sample")
  expect(result.stdout).toContain("checkout-index")
  expect(result.stdout).toContain("read-tree -u")
  expect(result.stdout).toContain("worktree remove --force")
})

test("declares its predicate-derivation state exactly once", () => {
  const lines = readFileSync(hookPath(SCRIPT), "utf8").split("\n")
  expect(lines.filter((line) => line.includes("predicate-derivation:"))).toHaveLength(1)
})

test("a refusal never names a verb the guard does not reach", () => {
  const stderr = runHook("git checkout main").stderr
  for (const unreached of ["checkout-index", "read-tree", "worktree remove"]) {
    expect(stderr).not.toContain(unreached)
  }
})

test("error message does NOT recommend git reset --hard (the pattern that caused #9092)", () => {
  const result = runHook("git stash")
  expect(result.exitCode).toBe(2)
  expect(result.stderr).not.toContain("git reset --hard")
})
