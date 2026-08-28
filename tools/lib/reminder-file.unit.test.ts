import { describe, expect, test } from "bun:test"
import { composeReminder, reminderRelPath } from "./reminder-file.ts"

// `writeReminder` draws one id, places the file at `reminderRelPath(to, id)` and composes the body
// from these lines alone, so a key absent from the composer is a key no reminder ever carries. A
// reminder is addressed by its file stem, and a page states the name it is addressed by.
const ID = "01a045c6-af7e-7000-adc5-91b35cbbd2ed"

const TO = "nimue"

function slugStated(text: string): string | null {
  const line = text.split("\n").find((one) => one.startsWith("slug: "))
  return line === undefined ? null : line.slice("slug: ".length)
}

describe("the reminder page a reminder writer composes", () => {
  test("is placed at a path whose stem is the id it was drawn under", () => {
    expect(reminderRelPath(TO, ID)).toBe(
      "pages/reminder/nimue/01a045c6-af7e-7000-adc5-91b35cbbd2ed.reminder.md"
    )
  })

  test("states that same stem as its slug", () => {
    const text = composeReminder({
      slug: ID,
      to: TO,
      from: TO,
      warrant: "announce",
      schedule: "hourly",
      body: "a body",
    })

    expect(slugStated(text)).toBe(ID)
  })
})
