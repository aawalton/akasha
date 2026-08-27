import { execFileSync } from "node:child_process"
import {
  type BranchFileSet,
  type CheckoutDistance,
  DEFAULT_BASE_REF,
  decideBranchFileSet,
  decideCheckoutDistance,
} from "./checkout-distance.ts"

function git(cwd: string, args: readonly string[]): string | null {
  try {
    return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
  } catch {
    return null
  }
}

function checkoutRootAt(dir: string): string | null {
  return git(dir, ["rev-parse", "--show-toplevel"])?.trim() ?? null
}

function refUpdateLog(checkout: string, baseRef: string): string {
  return git(checkout, ["reflog", "show", "--date=unix", "-n", "1", "--format=%gd", baseRef]) ?? ""
}

export function readCheckoutDistanceAt(dir: string, baseRef = DEFAULT_BASE_REF): CheckoutDistance {
  const checkout = checkoutRootAt(dir)
  if (checkout === null) {
    return { kind: "unmeasurable", checkout: dir, baseRef, reason: "not a git checkout" }
  }
  const headSha = git(checkout, ["rev-parse", "HEAD"])?.trim()
  if (headSha === undefined) {
    return {
      kind: "unmeasurable",
      checkout,
      baseRef,
      reason: "this checkout has no commit at HEAD",
    }
  }
  const baseSha = git(checkout, ["rev-parse", "--verify", "--quiet", baseRef])?.trim()
  if (baseSha === undefined) {
    return {
      kind: "unmeasurable",
      checkout,
      baseRef,
      reason: `${baseRef} does not resolve in this checkout`,
    }
  }
  const leftRightCount = git(checkout, ["rev-list", "--left-right", "--count", `${baseRef}...HEAD`])
  if (leftRightCount === null) {
    return {
      kind: "unmeasurable",
      checkout,
      baseRef,
      reason: `git could not walk ${baseRef}...HEAD in this checkout`,
    }
  }
  return decideCheckoutDistance({
    kind: "refs-read",
    checkout,
    baseRef,
    baseSha,
    headSha,
    leftRightCount,
    refUpdateLog: refUpdateLog(checkout, baseRef),
  })
}

export function readBranchFileSetAt(dir: string, baseRef = DEFAULT_BASE_REF): BranchFileSet {
  const checkout = checkoutRootAt(dir)
  if (checkout === null) {
    return { kind: "unmeasurable", checkout: dir, baseRef, reason: "not a git checkout" }
  }
  if (git(checkout, ["rev-parse", "--verify", "--quiet", baseRef]) === null) {
    return {
      kind: "unmeasurable",
      checkout,
      baseRef,
      reason: `${baseRef} does not resolve in this checkout`,
    }
  }
  const mergeBase = git(checkout, ["merge-base", baseRef, "HEAD"])?.trim()
  if (mergeBase === undefined) {
    return {
      kind: "unmeasurable",
      checkout,
      baseRef,
      reason: `${baseRef} and HEAD share no merge base in this checkout`,
    }
  }
  const nameOnlyZ = git(checkout, ["diff", "--name-only", "-z", `${baseRef}...HEAD`])
  if (nameOnlyZ === null) {
    return {
      kind: "unmeasurable",
      checkout,
      baseRef,
      reason: `git could not diff ${baseRef}...HEAD in this checkout`,
    }
  }
  return decideBranchFileSet({
    kind: "diff-read",
    checkout,
    baseRef,
    mergeBase,
    nameOnlyZ,
    refUpdateLog: refUpdateLog(checkout, baseRef),
  })
}

export function listRegisteredWorktrees(dir: string): readonly string[] | null {
  const porcelain = git(dir, ["worktree", "list", "--porcelain"])
  if (porcelain === null) return null
  return porcelain
    .split("\n")
    .filter((line) => line.startsWith("worktree "))
    .map((line) => line.slice("worktree ".length))
}
