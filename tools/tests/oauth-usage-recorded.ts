
export type Row = { k: string; v: Record<string, unknown> }

export async function recordedRows(): Promise<Row[]> {
  const arm = new URL("./oauth-usage-arm.ts", import.meta.url).pathname
  const run = Bun.spawn(["bun", arm], { stdout: "pipe", stderr: "pipe" })
  const [out, err, code] = await Promise.all([
    new Response(run.stdout).text(),
    new Response(run.stderr).text(),
    run.exited,
  ])
  if (code !== 0) throw new Error(`the arm exited ${code}: ${err}`)
  const last = out.trimEnd().split("\n").at(-1) ?? ""
  return JSON.parse(last) as Row[]
}
