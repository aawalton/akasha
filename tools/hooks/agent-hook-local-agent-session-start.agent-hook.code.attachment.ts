import { payloadText } from "../lib/hook-command.ts"
import { seatNameOf, seatPageFile } from "../lib/hook-seat-page.ts"

const HOOK_NAME = "local-agent-session-start"

const FLUSH = `${import.meta.dir}/../session-flush.ts`

async function noteRotation(agent: string, sessionId: string): Promise<void> {
  const seat = seatNameOf(seatPageFile(agent))
  if (seat === "") return
  const { patchPage } = await import("../lib/page-query-client.ts")
  const landed = await patchPage("seat", seat, { "rotated-session-uuid": sessionId }, HOOK_NAME)
  if (!landed.ok) {
    process.stderr.write(`[${HOOK_NAME}] the rotated session uuid did not land: ${landed.why}\n`)
  }
}

async function main(): Promise<number> {
  const stdin = await Bun.stdin.text()
  const source = payloadText(stdin, "source")
  const sessionId = payloadText(stdin, "session_id")
  const transcriptPath = payloadText(stdin, "transcript_path")

  const agent = process.env.AGENT_ID ?? ""
  if (agent === "") return 0
  if (sessionId === "" || transcriptPath === "") return 0

  if (source === "clear") await noteRotation(agent, sessionId)

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
