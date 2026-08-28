import { describe, expect, test } from "bun:test"
import { composeMessage, messageRelPath } from "./message-file.ts"

const ID = "01a045c6-af7e-7000-adc5-91b35cbbd2ed"

const TO = "change-harness-cluster-operator"

function slugStated(text: string): string | null {
  const line = text.split("\n").find((one) => one.startsWith("slug: "))
  return line === undefined ? null : line.slice("slug: ".length)
}

describe("the message page a message writer composes", () => {
  test("is placed at a path whose stem is the id it was drawn under", () => {
    expect(messageRelPath(TO, ID)).toBe(
      "pages/message/change-harness-cluster-operator/01a045c6-af7e-7000-adc5-91b35cbbd2ed.message.md"
    )
  })

  test("states that same stem as its slug", () => {
    const text = composeMessage({
      slug: ID,
      to: TO,
      from: "astra",
      warrant: "announce",
      body: "a body",
    })

    expect(slugStated(text)).toBe(ID)
  })
})
