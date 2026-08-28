
import { readFileSync } from "node:fs"
import { ON_CALL_KEY } from "./frontmatter-keys.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { pageRelIn } from "../../page/page-types.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { type Found, documentFor } from "./seat-resolve.ts"
import { pageFlagOf, pageTextOf } from "./seat-page-values.ts"

const ROLE_SLUG_KEY = "role-slug"

const ON_CALL_PAGE_KEY = "on-call"

export function onCallOf(agent: string): boolean {
  return pageFlagOf(agent, ON_CALL_PAGE_KEY)
}

export function roleGrantsOnCall(slug: string | null, root: string, found: Found): boolean {
  if (slug === null) return false
  const at = documentFor("role", slug, root)
  if (at === null) return false
  const fm = found.docs.frontmatterOf(at)
  return fm !== null && textField(fm, ON_CALL_KEY) === "true"
}

export function roleOnCallStated(instructions: string, slug: string | null): boolean {
  if (slug === null) return false
  try {
    const at = pageRelIn(instructions, "role", slug)
    const body = readFileSync(`${instructions}/${at}`, "utf8")
    return textField(parseFrontmatter(body), ON_CALL_KEY) === "true"
  } catch {
    return false
  }
}

export function roleOnCallOf(agent: string): boolean {
  const where = rootFor(resolveRoots(), AKASHA)
  return roleOnCallStated(where, pageTextOf(agent, ROLE_SLUG_KEY))
}

export function onCallLine(recorded: boolean): string {
  return `  ${"on-call".padEnd(8)} ${recorded ? "stated" : "— none stated"}`
}
