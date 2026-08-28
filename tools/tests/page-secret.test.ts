import { describe, expect, test } from "bun:test"
import { judgeFrontmatter } from "../../page/property/judge.ts"
import { keysIn, sidecarFor } from "../lib/page-secret.ts"
import { block, fileTreeOf, declaredOn, FILES, vocabularyIn } from "./page-frontmatter-fixture.ts"

const FILE_TREE = fileTreeOf({
  ...FILES,
  "pages/page-property-definition/leaf-token.page-property-definition.md": block([
    "defined-on-slug: leaf",
    "key: token",
    "type: text",
    "secret: true",
    "required: true",
  ]),
})

const DECLARED = declaredOn("leaf", FILE_TREE)

const VOCABULARY = vocabularyIn(FILE_TREE)

const judged = (lines: readonly string[]) => judgeFrontmatter(block(lines), "leaf", DECLARED, VOCABULARY)

describe("a secret a page holds", () => {
  test("its sops file is the page's own path with `.md` replaced", () => {
    expect(sidecarFor("claude-accounts/one.md")).toBe("claude-accounts/one.sops.yaml")
    expect(sidecarFor("claude-accounts/one.yaml")).toBeNull()
  })

  test("a key its page type declares secret is refused in frontmatter", () => {
    const { refusals } = judged(["domain: some-domain", "token: in-the-clear"])
    expect(refusals).toHaveLength(1)
    expect(refusals[0]).toContain("sops file")
  })

  test("a required secret is not owed in frontmatter, since frontmatter is not where it stands", () => {
    expect(judged(["domain: some-domain"]).refusals).toEqual([])
  })

  test("which keys a sops file holds is readable without the key that opens them", () => {
    const text = [
      "access-token: ENC[AES256_GCM,data:aaaa,type:str]",
      "refresh-token: ENC[AES256_GCM,data:bbbb,type:str]",
      "sops:",
      "    mac: ENC[AES256_GCM,data:cccc,type:str]",
      "    version: 3.13.1",
    ].join("\n")
    expect(keysIn(text)).toEqual(["access-token", "refresh-token"])
  })
})
