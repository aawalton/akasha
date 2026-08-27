
export type SendRecipientChoice =
  | {
      readonly action: "use"
      readonly recipient: string
      readonly origin: "named" | "principal"
    }
  | { readonly action: "refuse"; readonly reason: string }

export function decideSendRecipient(params: {
  readonly namedRecipient: string | null
  readonly senderParentAgentId: string | null
}): SendRecipientChoice {
  const named = params.namedRecipient
  if (named !== null && named !== "") return { action: "use", recipient: named, origin: "named" }
  const parent = params.senderParentAgentId
  if (parent !== null && parent !== "") {
    return { action: "use", recipient: parent, origin: "principal" }
  }
  return {
    action: "refuse",
    reason:
      "No recipient given, and nothing records a parent for this seat — so a bare send has nobody to " +
      "default to. A bare `ops seat send` goes to the seat that dispatched you; a seat Alan " +
      "started himself has none, by design, and this is one. Name the recipient with " +
      "`--to <uuid|name|prefix>`, or state what they must have with `--domain` and `--role`.",
  }
}

export function personaSeatSendIsMisaddressed(): boolean {
  return false
}
