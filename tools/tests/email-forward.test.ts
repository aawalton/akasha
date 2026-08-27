import { describe, expect, test } from "bun:test"
import { forwardOf } from "../lib/email-forward.ts"

const SENDER = { from: '"Amazon.com" <ship@amazon.com>', subject: "Shipped: 1 Home item", to: "alan@example.com" }

const HTML = '<p>Track it <a href="https://example.com/t">here</a>.</p>'
const LATIN1 = Buffer.from([0xa3, 0xe9])

function original(): Buffer {
  return Buffer.concat([
    Buffer.from(
      [
        "Delivered-To: alan@example.com",
        "Date: Thu, 13 Aug 2026 10:51:35 +0000",
        'From: "Amazon.com" <ship@amazon.com>',
        "To: alan@example.com",
        "Subject: =?UTF-8?B?U2hpcHBlZDog4oGmMeKBqQ==?=",
        "MIME-Version: 1.0",
        "Content-Type: multipart/alternative; ",
        '\tboundary="----=_Part_1"',
        "",
        "------=_Part_1",
        "Content-Type: text/plain; charset=iso-8859-1",
        "",
      ].join("\r\n"),
      "latin1"
    ),
    LATIN1,
    Buffer.from(
      ["", "------=_Part_1", "Content-Type: text/html; charset=utf-8", "", HTML, "------=_Part_1--", ""].join("\r\n"),
      "latin1"
    ),
  ])
}

const composed = (): string => forwardOf(original(), "jen@example.com", SENDER).toString("latin1")

describe("forwardOf", () => {
  test("no From is written, so the token still decides whose mailbox it leaves from", () => {
    expect(composed()).not.toMatch(/^From:/m)
  })

  test("the recipient is the address given, not the original's", () => {
    expect(composed()).toMatch(/^To: jen@example\.com$/m)
  })

  test("the subject keeps the encoding the sender spelled it in", () => {
    expect(composed()).toMatch(/^Subject: Fwd: =\?UTF-8\?B\?U2hpcHBlZDog4oGmMeKBqQ==\?=$/m)
  })

  test("the sender's own markup arrives whole rather than reduced to text", () => {
    expect(composed()).toContain(HTML)
  })

  test("a body byte outside UTF-8 survives the round trip", () => {
    expect(Buffer.from(composed(), "latin1").includes(LATIN1)).toBe(true)
  })

  test("the original's folded Content-Type rides onto the part carrying its body", () => {
    expect(composed()).toContain('Content-Type: multipart/alternative; \r\n\tboundary="----=_Part_1"')
  })

  test("the wrapper's boundary is one the original's own bytes do not hold", () => {
    const wrapper = /^Content-Type: multipart\/mixed; boundary="(.+)"$/m.exec(composed())?.[1] ?? ""
    expect(wrapper).not.toBe("")
    expect(original().toString("latin1")).not.toContain(wrapper)
  })

  test("the attribution says whose mail it is", () => {
    const wrapped = /Content-Transfer-Encoding: base64\r\n\r\n([\s\S]+?)\r\n--=_forwarded_/.exec(composed())?.[1] ?? ""
    const said = Buffer.from(wrapped.replace(/\r\n/g, ""), "base64")
    expect(said.toString("utf8")).toBe(
      [
        "---------- Forwarded message ----------",
        'From: "Amazon.com" <ship@amazon.com>',
        "Date: Thu, 13 Aug 2026 10:51:35 +0000",
        "Subject: Shipped: 1 Home item",
        "To: alan@example.com",
      ].join("\n")
    )
  })

  test("a message with no body at all composes rather than throwing", () => {
    expect(forwardOf(Buffer.from("Subject: bare\r\n", "latin1"), "jen@example.com", SENDER).length).toBeGreaterThan(0)
  })
})
