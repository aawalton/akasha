import { describe, expect, test } from "bun:test"
import { accountPage } from "./oauth-page-push.ts"
import { accountPageText } from "./oauth-page-create.ts"

const ACCOUNT = "aine"

const NO_PAGES = "/var/tmp/oauth-page-create-unit-test-no-such-root"

function stemOf(relPath: string): string {
  const base = relPath.slice(relPath.lastIndexOf("/") + 1)
  return base.split(".")[0] ?? base
}

function slugStated(text: string): string | null {
  const line = text.split("\n").find((one) => one.startsWith("slug: "))
  return line === undefined ? null : line.slice("slug: ".length)
}

describe("the account page a claude-account writer composes", () => {
  test("is placed at a path whose stem is the account", () => {
    expect(accountPage(ACCOUNT, NO_PAGES)).toBe("pages/claude-account/aine.md")
    expect(stemOf(accountPage(ACCOUNT, NO_PAGES))).toBe(ACCOUNT)
  })

  test("states that same stem as its slug", () => {
    const text = accountPageText({
      account: ACCOUNT,
      email: "aine@alanwalton.com",
      aliasIndex: 8,
      id: "019fa944-c37d-7631-be0b-d2ff83b74635",
    })

    expect(slugStated(text)).toBe(ACCOUNT)
  })
})
