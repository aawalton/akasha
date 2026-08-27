#!/usr/bin/env bun

import { recipientFromLead } from "./lib/decide-domain-lead.ts"
import {
  resolveAlertRecipient,
  resolveBlockedPrincipal,
  resolveDomainLead,
} from "./lib/recipient-derivation.ts"
import { answerAsked, object, payloadOrHelp, reply, str, strOrNull } from "./lib/decide-payload.ts"

const HELP = `bun tools/recipient.ts — who is waiting on a seat, and who answers for a condition

Reads a JSON object on stdin and prints a JSON object on stdout. Every key is a
decision name; only the keys asked about come back. No flags and no arguments — the
whole call is the payload.

  blockedPrincipal  {agentName}
                    -> {kind:"unresolved",reason}
                    Nothing binds a seat to work another party waits on, so this
                    answers unresolved for every seat and carries the reason.

  domainLead        {domain, defaultHandle}
                    -> {lead, recipient}
                    lead is {kind:"lead",handle} or {kind:"unresolved",reason}.
                    A persona is derived from a domain, so this descends from the
                    named domain to the nearest document carrying \`persona-champion-slug:\`.
                    The root domain carries one, so every declared slug resolves and
                    the default is left for a slug that names no domain at all.
                    recipient is null where defaultHandle is null; otherwise
                    {handle, defaultedBecause}, and defaultedBecause is non-null
                    whenever the default was used, so it never applies quietly.

  alertRecipient    {alert}
                    -> {kind:"domain",domain} | {kind:"person",person}
                     | {kind:"unresolved",reason}
                    The requirement one alert states, read off its own document by the
                    \`slug:\` it declares. It names a requirement rather than a
                    party: which seat satisfies it is a live question, and answering
                    one here would bake in whoever stood when the file was read.
                    Each way of not resolving carries its own reason, the four being
                    repaired in four different places.

\`domainLead\` and \`alertRecipient\` read the instructions pages on
disk and reaches no database, the persona-to-domain edge living in the files. A read
that fails comes back as the \`unresolved\` arm carrying the reason, never as an answer
naming nobody — that arm is a value the caller is obliged to put somewhere a reader
will see.

Every field is required; a missing one is refused rather than read as null.

  --help  This.

  echo '{"blockedPrincipal":{"agentName":"athena-developer"}}' | bun tools/recipient.ts
`

const DECISIONS = {
  blockedPrincipal: (value: unknown, path: string) =>
    resolveBlockedPrincipal(strOrNull(object(value, path), "agentName", path)),
  alertRecipient: (value: unknown, path: string) =>
    resolveAlertRecipient(str(object(value, path), "alert", path)),
  domainLead: async (value: unknown, path: string) => {
    const it = object(value, path)
    const domain = str(it, "domain", path)
    const fallback = strOrNull(it, "defaultHandle", path)
    const lead = await resolveDomainLead(domain)
    return { lead, recipient: fallback === null ? null : recipientFromLead(lead, fallback) }
  },
}

export function answer(payload: unknown): Promise<Record<string, unknown>> {
  return answerAsked(payload, DECISIONS)
}

if (import.meta.main) {
  const payload = await payloadOrHelp(process.argv.slice(2), HELP)
  if (payload !== null) await reply(() => answer(payload))
}
