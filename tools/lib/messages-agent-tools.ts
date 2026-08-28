import { basename } from "node:path"
import { fileStemOf } from "../../page/name/name"
import { transcriptOf } from "./seat-transcript-path.ts"
import { claimMessage, releaseClaim, takeMessage } from "./message-file.ts"
import { watchMessagesTo } from "./message-file-watch.ts"
import { startDeliveryWitness } from "./messages-delivery-witness.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"

const PAGE_SUFFIX = ".md"

const WITNESS_HEARTBEAT_MS = 30_000

const MESSAGE_SOURCE = "user"

export interface DeliveredMessage {
  id: string
  content: string
  sender_agent_id: string | null
  source: string | null
}

export interface ChannelServer {
  readonly server: {
    readonly notification: (message: {
      readonly method: string
      readonly params: Record<string, unknown>
    }) => Promise<void>
  }
}

async function sendChannelNotification(
  server: ChannelServer,
  msg: DeliveredMessage
): Promise<void> {
  await server.server.notification({
    method: "notifications/claude/channel",
    params: {
      content: msg.content,
      meta: {
        sender: msg.sender_agent_id ?? "system",
        source_type: msg.source ?? MESSAGE_SOURCE,
        message_id: msg.id,
      },
    },
  })
}

export async function deliverClaimedMessage(args: {
  row: { id: string; content: string; sender_agent_id: string | null; source: string | null }
  claim: (id: string) => Promise<boolean>
  notify: (msg: DeliveredMessage) => Promise<void>
  release: (id: string) => Promise<void>
  witness?: (id: string) => void
  logError?: (message: string, err: unknown) => void
}): Promise<void> {
  const { row, claim, notify, release } = args
  const logError = args.logError ?? ((message, err) => console.error(message, err))
  if (!(await claim(row.id))) return
  try {
    await notify({
      id: row.id,
      content: row.content,
      sender_agent_id: row.sender_agent_id,
      source: row.source,
    })
  } catch (err) {
    await release(row.id)
    logError(
      "[messages] Channel subscription render FAILED; released claim (message returned to unclaimed for redelivery):",
      err
    )
    return
  }
  args.witness?.(row.id)
}

export function seatNameForAgent(agentId: string): string | null {
  const page = seatPageForAgent(agentId)
  return page === null ? null : fileStemOf(page)
}

export async function startChannelListener(
  server: ChannelServer,
  agentId: string
): Promise<() => void> {
  const to = seatNameForAgent(agentId)
  if (to === null) {
    throw new Error(
      `no seat page names agent ${agentId}, so there is no recipient directory to watch and ` +
        "nothing here could say which messages are this seat's"
    )
  }

  const witness = startDeliveryWitness({
    agentId,
    advance: async (messageId) => takeMessage(to, messageId).kind !== "refused",
    currentTranscriptPath: (id) => transcriptOf(id)?.value ?? null,
    heartbeatMs: WITNESS_HEARTBEAT_MS,
  })

  const watching = watchMessagesTo(to, (message) =>
    deliverClaimedMessage({
      row: {
        id: message.id,
        content: message.body,
        sender_agent_id: message.from,
        source: MESSAGE_SOURCE,
      },
      claim: (messageId) => Promise.resolve(claimMessage(to, messageId)),
      notify: (msg) => sendChannelNotification(server, msg),
      release: (messageId) => Promise.resolve(releaseClaim(to, messageId)),
      witness: witness.track,
    })
  )

  return () => {
    witness.stop()
    watching.stop()
  }
}
