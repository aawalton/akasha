import { payloadText } from "../lib/hook-command.ts"
import { seatNameOf, seatPageFile } from "../lib/hook-seat-page.ts"

const HOOK_NAME = "local-agent-session-start"

const ROTATION_PATIENCE = "2"

const FLUSH = `${import.meta.dir}/../session-flush.ts`

function originOf(): string {
  const stated = process.env.PAGE_QUERY_ORIGIN
  return stated === undefined || stated === "" ? "http://127.0.0.1:8787" : stated
}

function noteRotation(agent: string, sessionId: string): void {
  const seat = seatNameOf(seatPageFile(agent))
  if (seat === "") return
  const body = JSON.stringify({ writer: HOOK_NAME, values: { "rotated-session-uuid": sessionId } })
  try {
    Bun.spawnSync({
      cmd: [
        "curl",
        "-s",
        "-m",
        ROTATION_PATIENCE,
        "-o",
        "/dev/null",
        "-X",
        "POST",
        `${originOf()}/patch/seat/${seat}`,
        "-H",
        "content-type: application/json",
        "-d",
        body,
      ],
      stdout: "ignore",
      stderr: "ignore",
    })
  } catch {
    return
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

  if (source === "clear") noteRotation(agent, sessionId)

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
