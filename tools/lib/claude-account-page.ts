import { readFileSync } from "node:fs"

import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { pageRelIn } from "../../page/page-types.ts"
import { canonicalize } from "../../repo/path/path"
import { pagesRoot } from "./oauth-page-push.ts"

export const CONFIG_ACCOUNT = "aawalton"

const EXTENDED_CONTEXT_AVAILABLE = "extended-context-available"

export function claudeAccountPagePath(account: string, from: string = pagesRoot()): string {
  const root = canonicalize(from)
  return `${root}/${pageRelIn(root, "claude-account", account)}`
}

export function extendedContextAvailable(
  account: string = CONFIG_ACCOUNT,
  from: string = pagesRoot()
): boolean {
  const page = parseFrontmatter(readFileSync(claudeAccountPagePath(account, from), "utf8"))
  return textField(page, EXTENDED_CONTEXT_AVAILABLE) === "true"
}
