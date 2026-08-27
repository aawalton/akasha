
export interface CredentialIdentity {
  readonly accountUuid: string
  readonly email: string | null
}

export type IdentityPushDecision =
  | { readonly kind: "match" }
  | { readonly kind: "pin"; readonly accountUuid: string }
  | { readonly kind: "rebind"; readonly accountUuid: string; readonly previousUuid: string }
  | { readonly kind: "refuse"; readonly reason: string }

export type IdentityPinStage = "clear" | "credential" | "pin"

export function describeFailedIdentityWrite(args: {
  account: string
  previousUuid: string | null
  at: IdentityPinStage
  why: string
}): string {
  const what =
    args.previousUuid === null
      ? `pinning claude-account "${args.account}" to the upstream account its credential resolves to`
      : `re-pinning claude-account "${args.account}" off upstream account ${args.previousUuid}`
  if (args.at === "clear") {
    return (
      `${what} stopped before anything moved: ${args.why}. The page keeps the credential and the ` +
      `bookkeeping it already held, so nothing is half done.`
    )
  }
  if (args.at === "credential") {
    const alreadyCleared =
      args.previousUuid === null
        ? ""
        : ` The previous account's pacing and at-limit bookkeeping is already off the page, and clearing it again costs nothing.`
    return (
      `${what}: the credential did not reach the page — ${args.why}. The credential still stands where it ` +
      `was issued and the page is pinned where it was, so the same push run again lands all of it.${alreadyCleared}`
    )
  }
  const naming =
    args.previousUuid === null
      ? "naming no upstream account"
      : `still naming upstream account ${args.previousUuid}`
  return (
    `${what}: the credential reached the page but the pin did not — ${args.why}. The page holds the new ` +
    `credential while ${naming}, so repair what the page refused and push again to finish the pin.`
  )
}

export function decideIdentityPush(args: {
  account: string
  identity: CredentialIdentity
  pinnedUuidByAccount: ReadonlyMap<string, string>
  allowRebind: boolean
}): IdentityPushDecision {
  const { account, identity, pinnedUuidByAccount, allowRebind } = args
  const observed = identity.accountUuid
  const who = identity.email ?? "login email unknown"

  for (const [otherAccount, otherUuid] of pinnedUuidByAccount) {
    if (otherAccount === account || otherUuid !== observed) continue
    return {
      kind: "refuse",
      reason:
        `the credential offered for claude-account "${account}" belongs to upstream account ` +
        `${observed} (${who}), which claude-account "${otherAccount}" is already pinned to. Two ` +
        `claude-accounts must never map to one upstream account — that is the phantom-account ` +
        `defect: the picker counts capacity twice and rotating off one lands on the same wall. ` +
        `Re-auth "${account}" with a browser session signed in as its own account.`,
    }
  }

  const pinned = pinnedUuidByAccount.get(account)
  if (pinned === undefined) return { kind: "pin", accountUuid: observed }
  if (pinned === observed) return { kind: "match" }
  if (!allowRebind) {
    return {
      kind: "refuse",
      reason:
        `identity mismatch on claude-account "${account}": its page is pinned to upstream account ` +
        `${pinned}, but the credential offered resolves to ${observed} (${who}). Refusing the ` +
        `write — a credential is never written to a page it does not belong to. If this ` +
        `swap is intentional, re-run with --rebind, which re-pins the page and clears the previous ` +
        `account's pacing and at-limit bookkeeping as part of the same push.`,
    }
  }
  return { kind: "rebind", accountUuid: observed, previousUuid: pinned }
}
