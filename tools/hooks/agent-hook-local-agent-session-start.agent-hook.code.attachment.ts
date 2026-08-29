import { payloadText } from "../lib/hook-command.ts"
import { keepRotated } from "../lib/seat-rotated-session.ts"

const FLUSH = `${import.meta.dir}/../session-flush.ts`

async function main(): Promise<number> {
  const stdin = await Bun.stdin.text()
  const source = payloadText(stdin, "source")
  const sessionId = payloadText(stdin, "session_id")
  const transcriptPath = payloadText(stdin, "transcript_path")

  const agent = process.env.AGENT_ID ?? ""
  if (agent === "") return 0
  if (sessionId === "" || transcriptPath === "") return 0

  if (source === "clear") keepRotated(agent, sessionId)

  if (process.env.AGENT_LAUNCH === "spawned") {
    try {
      const flushing = Bun.spawn({
        cmd: ["bun", FLUSH],
        env: { ...process.env, SESSION_ID: sessionId, TRANSCRIPT_PATH: transcriptPath },
        stdin: "ignore",
        stdout: "ignore",
        stderr: "ignore",
        detached: true,
      })
      flushing.unref()
    } catch {
      return 0
    }
  }
  return 0
}

if (import.meta.main) process.exit(await main())
