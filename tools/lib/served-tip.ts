export const TRANSPORT = "origin"

function ran(codeRoot: string, args: readonly string[]): { ok: boolean; out: string } {
  const got = Bun.spawnSync(["git", "-C", codeRoot, ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: { ...process.env },
  })
  return { ok: got.exitCode === 0, out: got.stdout.toString().trim() }
}

export function servedTip(codeRoot: string, branch: string): string | null {
  const got = ran(codeRoot, ["ls-remote", TRANSPORT, `refs/heads/${branch}`])
  if (!got.ok) return null
  const commit = got.out.split(/\s+/)[0]
  return commit === undefined || commit === "" ? null : commit
}

export function standsLocally(codeRoot: string, commit: string): boolean {
  return ran(codeRoot, ["cat-file", "-e", `${commit}^{commit}`]).ok
}
