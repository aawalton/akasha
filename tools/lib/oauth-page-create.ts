import { existsSync } from "node:fs"

import { type GatedAct, landBodies } from "./gated-landing.ts"
import { ACCOUNT_SHAPE, accountPage, pagesRoot } from "./oauth-page-push.ts"

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

export function accountPageStands(account: string, root = pagesRoot()): boolean {
  return existsSync(`${root}/${accountPage(account, root)}`)
}

export function accountPageText(args: {
  readonly account: string
  readonly email: string
  readonly aliasIndex: number
  readonly id: string
}): string {
  const lines = [
    "---",
    `page-type-slug: ${PAGE_TYPE_SLUG}`,
    `title: "${accountTitle(args.account)}"`,
    `id: ${args.id}`,
    `slug: ${args.account}`,
    `email: ${args.email}`,
    `alias-index: ${args.aliasIndex}`,
    "---",
  ]
  return `${lines.join("\n")}\n`
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
    const root = args.root ?? pagesRoot()
    const relPath = accountPage(account, root)
    if (existsSync(`${root}/${relPath}`)) return { kind: "standing", account, relPath }

    const id = args.id ?? Bun.randomUUIDv7()
    const text = accountPageText({ account, email: args.email, aliasIndex: args.aliasIndex, id })

    const act: GatedAct = {
      repo: "akasha",
      writer: WRITER,
      message: `akasha: add ${relPath}`,
      root,
    }
    const landed = landBodies(act, [{ relPath, body: text }])
    if (!landed.ok) return { kind: "refused", account, why: landed.why }
    return {
      kind: "created",
      account,
      relPath,
      id,
      sha: landed.sha,
      unpushed: landed.unpushed,
    }
  } catch (thrown) {
    return {
      kind: "refused",
      account,
      why: `the page create threw, which it is written never to do: ${thrown instanceof Error ? thrown.message : thrown}`,
    }
  }
}
