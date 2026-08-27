import { changeBranchWorktree } from "./branch-worktree.ts"
import { dataError } from "./exit.ts"

export function resolveWorktreePath(seq: number): string {
  const worktree = changeBranchWorktree(seq)
  if (!worktree.ok) throw dataError(worktree.why)
  return worktree.path
}
