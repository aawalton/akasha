import { describe, expect, test } from "bun:test"
import { addressPerson } from "../lib/message-to-person.ts"

const INBOX = "alan"

describe("addressPerson", () => {
  test("a person is addressed by their slug", () => {
    expect(addressPerson(INBOX, INBOX)).toEqual({ kind: "inbox", slug: INBOX })
  })

  test("a domain that is not a person addresses nobody, and is sent to --domain", () => {
    const answer = addressPerson("pages-system", INBOX)
    expect(answer.kind).toBe("refuse")
    if (answer.kind !== "refuse") return
    expect(answer.reason).toContain("is a domain rather than a person")
    expect(answer.reason).toContain("--domain")
  })

  test("a person carrying no mailbox is refused with the persona who does reach them", () => {
    const answer = addressPerson("jenny", INBOX)
    expect(answer.kind).toBe("refuse")
    if (answer.kind !== "refuse") return
    expect(answer.reason).toContain("holds no mailbox")
    expect(answer.reason).toContain("pages/person/jenny.person.md")
  })
})
