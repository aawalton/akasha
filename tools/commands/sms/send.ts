export const summary = "Send an SMS via the Telnyx toll-free number (--to E.164, --text body)"

import type { CommandHelp } from "../../ops/surface.ts"
import { buildTelnyxSendRequest, parseTelnyxSendResponse } from "@alanwalton/sms-core/telnyx-send"
import { requireEnv } from "@shared/utils-narrow/validate"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "to",
      required: false,
      aliasOfFlag: "--to",
      description: "Recipient number in E.164 (e.g. +18015551234)",
    },
  ],
  flags: [
    {
      name: "--to",
      argLabel: "<e164>",
      valueShape: "token",
      required: true,
      description: "Recipient number in E.164 (e.g. +18015551234)",
    },
    {
      name: "--text",
      argLabel: "<body>",
      valueShape: "prose",
      required: true,
      description: "Message body to send",
    },
    {
      name: "--from",
      argLabel: "<e164>",
      valueShape: "token",
      description: "Override the sender number (default: TELNYX_FROM_NUMBER)",
    },
    {
      name: "--base-url",
      argLabel: "<url>",
      valueShape: "token",
      description: "Override the Telnyx API base (default: https://api.telnyx.com)",
    },
    { name: "--json", description: "Emit { sent, to, id } instead of the confirmation line" },
  ],
  exits: [
    {
      code: 1,
      meaning: "input error: missing flag, or TELNYX_API_KEY / TELNYX_FROM_NUMBER not set",
    },
    {
      code: 3,
      meaning: "operational error: Telnyx send request failed or returned a non-OK status",
    },
  ],
  examples: [
    "ops sms send --to +18015551234 --text-file ./message.md",
    "ops sms send --to +18015551234 --text-file ./message.md --base-url https://api.telnyx.com",
  ],
}

export default async function smsSend(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const to = parsed.requireString("--to")
  const text = parsed.requireString("--text")
  const json = parsed.boolean("--json")

  const requireSmsEnv = async (name: string): Promise<string> => {
    try {
      return requireEnv(name)
    } catch {
      throw inputError(
        `${name} is not set — add it to ~/.secrets.env (Telnyx credential; never commit, never log)`
      )
    }
  }

  const apiKey = await requireSmsEnv("TELNYX_API_KEY")
  const from = parsed.string("--from") ?? (await requireSmsEnv("TELNYX_FROM_NUMBER"))
  const baseUrl = parsed.string("--base-url")

  const req = buildTelnyxSendRequest({ apiKey, from, to, text, baseUrl })

  let res: Response
  try {
    res = await fetch(req.url, { method: req.method, headers: req.headers, body: req.body })
  } catch (e) {
    throw operationalError(
      `telnyx send failed: ${e instanceof Error ? e.message : String(e)}`
    )
  }

  let bodyJson: unknown
  try {
    bodyJson = await res.json()
  } catch {
    throw operationalError(`telnyx send: HTTP ${res.status} with non-JSON response`)
  }
  const parsedRes = parseTelnyxSendResponse(bodyJson)
  if (!res.ok) {
    throw operationalError(`telnyx send: HTTP ${res.status}`)
  }
  if (!parsedRes.ok) {
    throw operationalError(`telnyx send: ${parsedRes.reason}`)
  }

  if (json) {
    process.stdout.write(`${JSON.stringify({ sent: true, to, id: parsedRes.id })}\n`)
    return
  }
  process.stdout.write(`sent\t${to}\t${parsedRes.id}\n`)
}
