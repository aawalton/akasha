import { exportedAs } from "../../akasha/pages-system/page/page-export-name/page-export-name.module.code.ts"
import { landInAkasha } from "./akasha-landing.ts"
import { akashaAccountPath, akashaRoot } from "./claude-account-akasha.ts"
import { ACCOUNT_SHAPE } from "./oauth-page-push.ts"

export const PAGE_TYPE_SLUG = "claude-account"

const WRITER = "claude-account-page-writer"

const EMAIL_SHAPE = /^\S+@\S+$/

export type PageCreate =
  | {
      readonly kind: "created"
      readonly account: string
      readonly relPath: string
      readonly id: string
      readonly sha: string | null
      readonly unpushed: string | null
    }
  | { readonly kind: "standing"; readonly account: string; readonly relPath: string }
  | { readonly kind: "refused"; readonly account: string; readonly why: string }

export interface AccountPageCreate {
  readonly account: string
  readonly email: string
  readonly aliasIndex: number
  readonly root?: string
  readonly id?: string
}

export function accountTitle(account: string): string {
  return account.charAt(0).toUpperCase() + account.slice(1)
}

export const ACCOUNTS_AT = "akasha/agents-system/claude-account/claude-accounts"

export function accountPageStands(account: string): boolean {
  return akashaAccountPath(account) !== null
}

export function accountPagePath(account: string): string {
  return `${ACCOUNTS_AT}/${account}.${PAGE_TYPE_SLUG}.ts`
}

// What an account states when it is made. The uuid, the plan, the band, the renewal day and the
// scopes are all answered by the upstream probe at the first sign-in, so none of them is written
// here and the page type declares none of them required.
export function accountPageText(args: {
  readonly account: string
  readonly email: string
  readonly aliasIndex: number
  readonly id: string
}): string {
  return [
    `import type { ClaudeAccount } from "../claude-account.page-type.ts"`,
    ``,
    `export const ${exportedAs(args.account)} = {`,
    `  id: "${args.id}",`,
    `  pageTypeSlug: "${PAGE_TYPE_SLUG}",`,
    `  slug: "${args.account}",`,
    `  email: "${args.email}",`,
    `  aliasIndex: ${args.aliasIndex},`,
    `} as const satisfies ClaudeAccount`,
    ``,
  ].join("\n")
}

export function createAccountPage(args: AccountPageCreate): PageCreate {
  const { account } = args
  try {
    if (!ACCOUNT_SHAPE.test(account)) {
      return { kind: "refused", account, why: `\`${account}\` is not an account name this writes a path from` }
    }
    if (!EMAIL_SHAPE.test(args.email)) {
      return {
        kind: "refused",
        account,
        why: `\`${args.email}\` is not an address this writes onto one frontmatter line`,
      }
    }
    if (!Number.isInteger(args.aliasIndex) || args.aliasIndex < 1) {
      return {
        kind: "refused",
        account,
        why: `\`${args.aliasIndex}\` is not a c-alias slot, which is a whole number from 1 up`,
      }
    }
    const standing = akashaAccountPath(account)
    if (standing !== null) return { kind: "standing", account, relPath: standing }
    const relPath = accountPagePath(account)

    const id = args.id ?? Bun.randomUUIDv7()
    const text = accountPageText({ account, email: args.email, aliasIndex: args.aliasIndex, id })

    const landed = landInAkasha(akashaRoot(), WRITER, `akasha: add ${relPath}`, [
      { relPath, body: text },
    ])
    if (!landed.ok) return { kind: "refused", account, why: landed.why }
    return {
      kind: "created",
      account,
      relPath,
      id,
      sha: landed.sha,
      unpushed: null,
    }
  } catch (thrown) {
    return {
      kind: "refused",
      account,
      why: `the page create threw, which it is written never to do: ${thrown instanceof Error ? thrown.message : thrown}`,
    }
  }
}
