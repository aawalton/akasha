
export const summary = "Clear the subscription-disabled mark from one claude-account's page so the picker returns it to the eligible pool"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { getCredentialByAccount } from "../../lib/oauth-credentials.ts"
import { clearAccountSubscriptionDisabled } from "../../lib/oauth-subscription-disabled.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--account",
      argLabel: "<name>",
      valueShape: "token",
      description: "Account name (required)",
    },
  ],
  examples: ["ops claude-account re-enable --account aawalton"],
}

export default async function claudeAccountReEnable(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const account = parsed.string("--account")

  if (account == null || account.length === 0) {
    throw inputError("--account is required")
  }

  const cred = await getCredentialByAccount(account)
  if (cred == null) {
    throw inputError(`account not found: ${account}`)
  }

  await clearAccountSubscriptionDisabled(account)
  process.stdout.write(`ok\naccount: ${account}\n`)
}
