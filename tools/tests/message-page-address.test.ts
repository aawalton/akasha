
import { describe, expect, test } from "bun:test"
import { messagePageAddress, personBehindHandlerSeat } from "../lib/message-page-address.ts"
import { resolveRoots } from "../../repo/roots/roots"

const ROOT = resolveRoots().instructions

const ID = "019ff7d3-64eb-7461-915f-86e3404857d6"

describe("personBehindHandlerSeat", () => {
  test("a handler seat name reads back as the person whose domain the seat states", () => {
    expect(personBehindHandlerSeat("alan", ROOT)).toBe("alan")
  })

  test("a name no person's handler is spelled as names nobody", () => {
    expect(personBehindHandlerSeat("amy", ROOT)).toBeNull()
    expect(personBehindHandlerSeat("alan-handler-extra", ROOT)).toBeNull()
  })
})

describe("messagePageAddress", () => {
  test("a handler mailbox is addressed by the person's domain and the handler role", () => {
    expect(messagePageAddress(`alan/${ID}`, ROOT)).toEqual({
      stated: { kind: "domain", domain: "alan", role: "handler" },
      id: ID,
    })
  })

  test("a domain and a role stated in the page name are the address", () => {
    expect(messagePageAddress(`technology/worker/${ID}`, ROOT)).toEqual({
      stated: { kind: "domain", domain: "technology", role: "worker" },
      id: ID,
    })
  })

  test("a mailbox no handler answers for carries no address, and is written where it says", () => {
    expect(messagePageAddress(`athena/${ID}`, ROOT)).toBeNull()
    expect(messagePageAddress(ID, ROOT)).toBeNull()
  })
})
