
import { flushSession } from "./lib/session-flush-core.ts"

const agentId = process.env.AGENT_ID
const sessionId = process.env.SESSION_ID
const transcriptPath = process.env.TRANSCRIPT_PATH
if (
  agentId !== undefined &&
  agentId !== "" &&
  sessionId !== undefined &&
  sessionId !== "" &&
  transcriptPath !== undefined &&
  transcriptPath !== ""
) {
  await flushSession(agentId, sessionId, transcriptPath)
}
