import { openSync } from "node:fs"
import { payloadText } from "../lib/hook-command.ts"
import { seatNameOf, seatPageFile, seatPageValue, SEAT_FORWARDS_TO_KEY } from "../lib/hook-seat-page.ts"

const RECORDER = `${import.meta.dir}/../lib/forward-turn.sh`

async function main(): Promise<number> {
  const agent = process.env.AGENT_ID ?? ""
  if (agent === "") return 0
  const seatFile = seatPageFile(agent)
  if (seatFile === "") return 0
  if (seatPageValue(seatFile, SEAT_FORWARDS_TO_KEY) === "") return 0

  let stdin = ""
  try {
    stdin = await Bun.stdin.text()
  } catch {
    stdin = ""
  }
  const transcript = payloadText(stdin, "transcript_path")
  if (transcript === "") return 0

  const seat = seatNameOf(seatFile)
  if (seat === "") return 0

  const logDir = process.env.FORWARD_TURN_LOG_DIR
  const dir = logDir === undefined || logDir === "" ? "/var/tmp" : logDir
  const log = openSync(`${dir}/forward-turn-${seat}.log`, "a")
  const forwarding = Bun.spawn({
    cmd: ["setsid", "bash", RECORDER, transcript],
    stdin: "ignore",
    stdout: log,
    stderr: log,
    detached: true,
  })
  forwarding.unref()
  return 0
}

if (import.meta.main) process.exit(await main())
