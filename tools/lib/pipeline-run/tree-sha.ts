import { treeSha40, type TreeSha40 } from "../workflow-dsl/ci-identifiers.ts"
import { awaitSpawnWithTimeout } from "./await-spawn-with-timeout.ts"

export const TREE_SHA_CEILING_MS = 30_000

export async function getCommitTreeSha(workDir: string, commitSha: string): Promise<TreeSha40> {
  const spelled = `${commitSha}^{tree}`
  const proc = Bun.spawn(["git", "-C", workDir, "rev-parse", spelled], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr, exit] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    awaitSpawnWithTimeout(proc, `git rev-parse ${spelled} in ${workDir}`, TREE_SHA_CEILING_MS),
  ])
  if (exit !== 0) {
    throw new Error(
      `git rev-parse ${spelled} failed in ${workDir} (exit ${exit}): ${stderr.trim()}`
    )
  }
  return treeSha40(stdout.trim())
}
