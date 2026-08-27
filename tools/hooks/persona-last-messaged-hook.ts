const STAMP = `${import.meta.dir}/../lib/persona-last-messaged.ts`

async function main(): Promise<number> {
  let payload = ""
  try {
    payload = await Bun.stdin.text()
  } catch {
    payload = ""
  }
  const agent = process.env.AGENT_ID ?? ""
  if (agent === "") return 0
  try {
    const stamping = Bun.spawn({
      cmd: ["bun", STAMP, agent],
      stdin: Buffer.from(payload),
      stdout: "ignore",
      stderr: "ignore",
      detached: true,
    })
    stamping.unref()
  } catch {
    return 0
  }
  return 0
}

if (import.meta.main) process.exit(await main())
