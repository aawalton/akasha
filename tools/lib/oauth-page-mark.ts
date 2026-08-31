import { akashaAccountPath, akashaUncommittedKeys, holdBesideAccount } from "./claude-account-akasha.ts"

export type Marks = Readonly<Record<string, string | null>>

export type PageMark =
  | { readonly kind: "held"; readonly account: string; readonly keys: readonly string[] }
  | { readonly kind: "unchanged"; readonly account: string }
  | { readonly kind: "skipped"; readonly account: string; readonly why: string }
  | { readonly kind: "refused"; readonly account: string; readonly why: string }

function unfit(key: string, value: string): string | null {
  if (value.includes("\n")) return `\`${key}\` holds a newline, and a mark is one line`
  if (value.trim() === "") return `\`${key}\` arrived empty, and a mark with no value is a removal`
  return null
}

export function holdMarksOnPage(account: string, marks: Marks): PageMark {
  try {
    if (akashaAccountPath(account) === null) {
      return { kind: "skipped", account, why: `no page stands for \`${account}\`, and a mark belongs to one` }
    }

    // Where each mark goes is declared on the claude-account page type and nowhere else. This
    // throws where that cannot be read, and the catch below answers it as a refusal, because a
    // mark written to the wrong side of the commit is worse than a mark not written at all.
    const uncommittedKeys = akashaUncommittedKeys()
    const beside: Record<string, string | null> = {}
    const stated: string[] = []
    for (const [key, value] of Object.entries(marks)) {
      if (uncommittedKeys.has(key)) beside[key] = value
      else stated.push(key)
    }

    // Every mark a pass writes is a reading, and every reading stands beside the page. A key the
    // account states is settled when the account is made, so a mark carrying one is refused here
    // rather than written: changing it means editing the page, which is a person's act.
    if (stated.length > 0) {
      return {
        kind: "refused",
        account,
        why:
          `\`${stated.join("`, `")}\` ${stated.length === 1 ? "is a value" : "are values"} the account states rather than ` +
          `${stated.length === 1 ? "a reading" : "readings"} taken of it, and what an account states is settled when it is ` +
          `made — change it on the page at ${akashaAccountPath(account)}`,
      }
    }

    if (Object.keys(beside).length === 0) return { kind: "unchanged", account }

    for (const [key, value] of Object.entries(beside)) {
      if (value === null) continue
      const wrong = unfit(key, value)
      if (wrong !== null) return { kind: "refused", account, why: wrong }
    }

    const held = holdBesideAccount(account, beside)
    if (held !== null) return { kind: "refused", account, why: held }
    return { kind: "held", account, keys: Object.keys(marks) }
  } catch (thrown) {
    return {
      kind: "refused",
      account,
      why: `the page mark threw, which it is written never to do: ${thrown instanceof Error ? thrown.message : thrown}`,
    }
  }
}
