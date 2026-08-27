import { describe, expect, test } from "bun:test"
import { addressOf, addressParts } from "../../page/page-address.ts"
import { RULES } from "../../page/property/value.ts"
import type { Fault } from "../../page/property/stated.ts"

function holds(type: string, text: string): Fault | string | null {
  const rule = RULES.get(type)
  return rule === undefined ? `no rule is registered for \`${type}\`` : rule.holds(text)
}

describe("an address read apart", () => {
  test("splits into the page type before the slash and the slug after it", () => {
    expect(addressParts("page-type/domain")).toEqual({ type: "page-type", slug: "domain" })
  })

  test("is written back from its halves as it was read", () => {
    expect(addressOf("page-type", "domain")).toBe("page-type/domain")
  })

  test("is nothing where a half is missing", () => {
    expect(addressParts("domain")).toBeNull()
    expect(addressParts("domain/")).toBeNull()
    expect(addressParts("/domain")).toBeNull()
    expect(addressParts("")).toBeNull()
  })

  test("is nothing where a half is not a slug", () => {
    expect(addressParts("domain//global")).toBeNull()
    expect(addressParts("domain/global/extra")).toBeNull()
    expect(addressParts("Domain/Global")).toBeNull()
    expect(addressParts("domain global")).toBeNull()
  })
})

describe("the rule a relation address carries", () => {
  test("accepts a page type and a slug", () => {
    expect(holds("relation-address", "domain/global")).toBeNull()
  })

  test("refuses a bare slug, which names no page type", () => {
    expect(holds("relation-address", "global")).not.toBeNull()
  })

  test("says the form it wants, so a refusal names what to write", () => {
    expect(RULES.get("relation-address")?.says).toContain("<page-type>/<slug>")
  })
})

describe("the rule a relation slug carries", () => {
  test("accepts a bare slug, its page type standing on the definition", () => {
    expect(holds("relation-slug", "global")).toBeNull()
  })

  test("refuses an address, the two types naming their page different ways", () => {
    expect(holds("relation-slug", "domain/global")).not.toBeNull()
  })
})
