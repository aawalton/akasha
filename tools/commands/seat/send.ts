export const summary = "Send a message to another agent"

import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { stampByAgentId } from "../../lib/persona-last-messaged.ts"
import { addressPerson } from "../../lib/message-to-person.ts"
import { readStated, undeclared } from "../../lib/message-to.ts"
import { decideDirectRevive } from "../../lib/decide-direct-revive.ts"
import { decideSendRecipient } from "../../lib/decide-send-recipient.ts"
import { reachSeat, resumeSeat } from "../../lib/message-to-start.ts"
import { personaFrontmatter } from "../../lib/persona-attachment-property.ts"
import { writeMessage } from "../../lib/message-file.ts"
import { seatRecord } from "../../lib/seat-facts.ts"
import {
  planSeatResolution,
  requireSenderInput,
  resolveSeatTarget,
  resolveSeatTargetCli,
  resolveSenderTargetCli,
} from "../../lib/seat-handle.ts"
import { resolveMessageContent } from "../../lib/message-content.ts"

const VOICE_SHA_KEY = "voice-reference-sha256"

const ALAN_AGENT_NAME = "alan"
const AINE_AGENT_NAME = "aine"

const MESSAGE_SOURCE = "user"

import { help } from "../../lib/seat-send-help.ts"

export { help }

export default async function agentSend(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const namedRecipient = parsed.string("--to") ?? null
  if (namedRecipient !== null) {
    const plan = planSeatResolution(namedRecipient)
    if (plan.kind === "invalid") {
      throw inputError(
        `invalid target-agent-id '${namedRecipient}' (expected UUID, UUID prefix, or name)`
      )
    }
  }

  const personSlug = parsed.string("--person") ?? null

  const stated = readStated(parsed.string("--domain"), parsed.string("--role"))
  if (stated.kind === "refuse") throw inputError(stated.reason)
  if (stated.kind !== "none") {
    const missing = undeclared(stated)
    if (missing !== null) throw inputError(missing)
  }

  const contentFlag = parsed.string("--content")
  const contentFile = parsed.string("--content-file")

  const json = parsed.boolean("--json")

  const fromFlag = parsed.string("--from")
  const senderInput = await requireSenderInput(fromFlag)

  const blocked = parsed.boolean("--blocked")

  const contentText = await resolveMessageContent({ contentFlag, contentFile })

  const senderAgentId = await resolveSenderTargetCli(senderInput)

  const senderAgent = seatRecord(senderAgentId)
  if (senderAgent === null) {
    throw dataError(`Sender seat ${senderAgentId} not found`)
  }

  let recipientInput = namedRecipient
  let reviving: string | null = null
  if (personSlug !== null) {
    const addressed = addressPerson(personSlug, ALAN_AGENT_NAME)
    if (addressed.kind === "refuse") throw inputError(addressed.reason)
    recipientInput = addressed.slug
  }
  if (stated.kind !== "none") {
    const reached = await reachSeat(stated, senderAgentId)
    if (reached.kind === "refuse") throw inputError(reached.reason)
    recipientInput = reached.seat.id
    reviving = reached.revive ? reached.seat.id : null
  }

  const recipientChoice = decideSendRecipient({
    namedRecipient: recipientInput,
    senderParentAgentId: senderAgent.parentAgentId,
  })
  if (recipientChoice.action === "refuse") throw inputError(recipientChoice.reason)

  const resolved = resolveSeatTarget(recipientChoice.recipient)
  if ("error" in resolved) {
    await resolveSeatTargetCli(recipientChoice.recipient)
  }
  const targetAgentId = "error" in resolved ? null : resolved.id

  const targetAgent = targetAgentId === null ? null : seatRecord(targetAgentId)
  reviving =
    reviving ??
    decideDirectRevive({
      addressWasStated: stated.kind !== "none",
      targetAgentId,
      targetIsLive: targetAgent !== null && targetAgent.presence !== "absent",
    })
  const targetName = targetAgent?.name ?? null
  const senderName = senderAgent.name

  const targetIsAlanInbox = targetName === ALAN_AGENT_NAME
  const senderIsAlan = senderAgent.name === ALAN_AGENT_NAME
  let senderIsVoicedPersona = false
  if (targetIsAlanInbox && !senderIsAlan && senderName !== null) {
    senderIsVoicedPersona = (personaFrontmatter(senderName)[VOICE_SHA_KEY] ?? "") !== ""
  }
  if (targetIsAlanInbox && !senderIsAlan && !senderIsVoicedPersona) {
    throw inputError(
      `Refusing a send to the '${ALAN_AGENT_NAME}' agent (Alan's spoken inbox) from a ` +
        `headless, non-voiced agent. Route any question for Alan — an eyes-on / verification ` +
        `ask or an Intent-gap question — to '${AINE_AGENT_NAME}', the single entry point: ` +
        `ops seat send --to ${AINE_AGENT_NAME} --from <self> --content ... . Only Alan's own ` +
        `interactive session or a committed-voice persona may message '${ALAN_AGENT_NAME}' directly.`
    )
  }

  if (targetName === null) {
    throw inputError(
      `nothing here holds a seat named for '${recipientChoice.recipient}', and a message is ` +
        "addressed to a seat or a persona by name — there is no directory to write it in"
    )
  }

  const wrote = writeMessage({
    to: targetName,
    from: senderName ?? senderAgentId,
    warrant: blocked ? "blocked" : "announce",
    body: contentText,
  })
  if (wrote.kind === "refused") {
    throw dataError(`the message was not written, so nothing is waiting: ${wrote.detail}`)
  }
  const messageId = wrote.id
  if (reviving !== null) {
    const woke = await resumeSeat(reviving)
    if (woke.code !== 0) {
      const detail = (woke.stderr.trim() !== "" ? woke.stderr : woke.stdout).trim()
      process.stderr.write(
        `the message stands and reviving ${reviving} to read it exited ${woke.code}: ` +
          `${detail.slice(0, 300)}\n`
      )
    }
  }

  const senderIsUnnamed = senderName === null || senderName.trim() === ""
  if (senderIsUnnamed && targetAgentId !== null) {
    try {
      await stampByAgentId(targetAgentId)
    } catch (err) {
      console.error(
        `[seat send] stamping last-messaged for ${targetAgentId} failed: ${err instanceof Error ? err.message : String(err)}`
      )
    }
  }

  const addressLabel = targetAgentId ?? recipientChoice.recipient

  if (json) {
    const receipt = {
      id: messageId,
      agent_id: targetAgentId,
      status: "written",
      warrant: blocked ? "blocked" : "announce",
      path: wrote.relPath,
    }
    process.stdout.write(`${JSON.stringify(receipt)}\n`)
    return
  }

  process.stdout.write(
    `${messageId}\t${addressLabel}\twritten\t${blocked ? "blocked" : "announce"}\n`
  )
}
