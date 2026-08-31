
export const summary = "Onboard a new Claude account — create its claude-account page (next c-alias slot) and refresh the local alias snapshot; backs the `cna` shell function"

import type { CommandHelp } from "../../ops/surface.ts"
import { nextAliasIndex, syncAliasSnapshotFromPages } from "../../lib/alias-snapshot.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { accountPageStands, createAccountPage } from "../../lib/oauth-page-create.ts"
import { aliasIndexesFromPages } from "../../lib/oauth-page-state.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--account",
      argLabel: "<name>",
      valueShape: "token",
      description: "Account slug, e.g. aow (required)",
    },
    {
      name: "--email",
      argLabel: "<email>",
      valueShape: "token",
      description: "Login email for the account (required)",
    },
    {
      name: "--alias-index",
      argLabel: "<n>",
      valueShape: "token",
      description: "Override the auto-assigned c-alias index (default: max existing + 1)",
    },
  ],
  examples: ["ops claude-account add --account aow --email alan@archiveofworlds.app"],
}

export default async function claudeAccountAdd(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const account = parsed.string("--account")
  const email = parsed.string("--email")
  const aliasIndexOverride = parsed.nonNegativeInt("--alias-index")

  if (account == null || account.length === 0) throw inputError("--account is required")
  if (email == null || email.length === 0) throw inputError("--email is required")

  if (accountPageStands(account)) throw inputError(`account already exists: ${account}`)

  const aliasIndex = aliasIndexOverride ?? nextAliasIndex(aliasIndexesFromPages())

  const made = createAccountPage({ account, email, aliasIndex })
  if (made.kind === "standing") throw inputError(`account already exists: ${account}`)
  if (made.kind === "refused") throw operationalError(`no page was written: ${made.why}`)
  syncAliasSnapshotFromPages()

  process.stdout.write(
    `created claude-account page: ${made.relPath} (c${aliasIndex}, ${email})\n` +
      (made.unpushed === null ? "" : `${made.unpushed}\n`) +
      "snapshot refreshed — run /login in the launching session to authenticate.\n"
  )
}
