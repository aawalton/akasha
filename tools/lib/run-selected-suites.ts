import { classifyRun, type RunVerdict } from "./gate-bun-exit.ts"

export function bunTestArgs(suites: readonly string[], timeoutMs?: number): readonly string[] {
  const timeoutArgs = timeoutMs !== undefined ? ["--timeout", String(timeoutMs)] : []
  return ["test", ...timeoutArgs, ...suites]
}

export async function runSelectedSuites(
  root: string,
  suites: readonly string[],
  opts: { readonly timeoutMs?: number } = {}
): Promise<{ verdict: RunVerdict; passed: boolean; output: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", ...bunTestArgs(suites, opts.timeoutMs)], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const [out, err] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  const output = `${out}${err}`
  const code = proc.exitCode ?? 128
  const verdict = classifyRun({ bunExitCode: code, output })
  return { verdict, passed: verdict === "pass", output, exitCode: code }
}
