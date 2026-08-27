
export async function bash(
  script: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bash", "-c", script], {
    env: process.env,
    stdout: "pipe",
    stderr: "pipe",
  })
  const stdoutP = new Response(proc.stdout).text()
  const stderrP = new Response(proc.stderr).text()
  const [stdout, stderr] = await Promise.all([stdoutP, stderrP])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}
