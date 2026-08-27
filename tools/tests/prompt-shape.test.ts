
import { describe, expect, test } from "bun:test"
import {
  classifyPromptShape,
  isAlanAuthoredPrompt,
  isBareKeyboardPrompt,
  parseChannelEnvelope,
} from "../lib/prompt-shape.ts"

function channel(
  attrs: { source?: string; sender?: string; sourceType?: string },
  body: string
): string {
  const source = attrs.source ?? "messages"
  const sender = attrs.sender ?? "system"
  const sourceType = attrs.sourceType ?? "user"
  return `<channel source="${source}" sender="${sender}" source_type="${sourceType}" message_id="019f0000-0000-7000-8000-000000000000">\n${body}\n</channel>`
}

describe("parseChannelEnvelope", () => {
  test("extracts source, sender, source_type, and trimmed inner text", () => {
    const env = parseChannelEnvelope(
      channel({ source: "messages", sender: "system", sourceType: "page-chat" }, "hey nimue")
    )
    expect(env).toEqual({
      source: "messages",
      sender: "system",
      sourceType: "page-chat",
      text: "hey nimue",
    })
  })

  test("returns null for a bare prompt", () => {
    expect(parseChannelEnvelope("hey nimue, how are you?")).toBeNull()
  })

  test("defaults sender to 'system' and source_type to 'user' when those attrs absent", () => {
    const env = parseChannelEnvelope('<channel source="messages">\nhi\n</channel>')
    expect(env).toEqual({ source: "messages", sender: "system", sourceType: "user", text: "hi" })
  })
})

describe("classifyPromptShape", () => {
  test("a channel envelope classifies as channel", () => {
    const shape = classifyPromptShape(channel({}, "hi"))
    expect(shape.kind).toBe("channel")
  })

  test("a bare prompt classifies as bare", () => {
    const shape = classifyPromptShape("hi there")
    expect(shape).toEqual({ kind: "bare", text: "hi there" })
  })
})

describe("isAlanAuthoredPrompt — the stamp gate", () => {
  test("BARE human RC keystroke → stamp", () => {
    expect(isAlanAuthoredPrompt("hey nimue, did the deploy land?")).toBe(true)
  })

  test("BARE mid-turn framing wrapper → stamp", () => {
    expect(
      isAlanAuthoredPrompt("The user sent a new message while you were working: check the logs")
    ).toBe(true)
  })

  test("BARE spawn seed '/persona-<slug>' → skip", () => {
    expect(isAlanAuthoredPrompt("/persona-zadi")).toBe(false)
  })

  test("BARE skill seed '/probe' → skip", () => {
    expect(isAlanAuthoredPrompt("/probe")).toBe(false)
  })

  test("BARE supervisor '/compact <text>' → skip", () => {
    expect(isAlanAuthoredPrompt("/compact keep the plan and the open questions")).toBe(false)
  })

  test("BARE '[supervisor]' notice (defensive) → skip", () => {
    expect(isAlanAuthoredPrompt("[supervisor] You have been restarted.")).toBe(false)
  })

  test("BARE '<task-notification>' background-task completion → skip", () => {
    expect(
      isAlanAuthoredPrompt(
        '<task-notification>\n<task-id>bd1rgnbij</task-id>\n<status>completed</status>\n<summary>Background command "deploy" completed (exit code 0)</summary>\n</task-notification>'
      )
    ).toBe(false)
  })

  test("BARE empty/whitespace → skip", () => {
    expect(isAlanAuthoredPrompt("   ")).toBe(false)
  })

  test("CHANNEL agent-to-agent (sender=UUID, source_type=user) → skip", () => {
    expect(
      isAlanAuthoredPrompt(
        channel(
          { sender: "019f677c-834c-7fa2-991b-3c30f047d35b", sourceType: "user" },
          "worker report"
        )
      )
    ).toBe(false)
  })

  test("CHANNEL system notice (sender=system, source_type=system) → skip", () => {
    expect(
      isAlanAuthoredPrompt(
        channel({ sender: "system", sourceType: "system" }, "[supervisor] You have been restarted.")
      )
    ).toBe(false)
  })

  test("CHANNEL Alan voice/TUI (sender=system, source_type=user) → stamp", () => {
    expect(
      isAlanAuthoredPrompt(channel({ sender: "system", sourceType: "user" }, "good morning"))
    ).toBe(true)
  })

  test("CHANNEL Alan page-chat (sender=system, source_type=page-chat) → stamp", () => {
    expect(
      isAlanAuthoredPrompt(
        channel({ sender: "system", sourceType: "page-chat" }, "hi from the app")
      )
    ).toBe(true)
  })
})

describe("isBareKeyboardPrompt — the terminal-tint clear gate", () => {
  test("BARE human keystroke → clears", () => {
    expect(isBareKeyboardPrompt("hey nimue")).toBe(true)
  })

  test("BARE spawn seed → does not clear", () => {
    expect(isBareKeyboardPrompt("/persona-zadi")).toBe(false)
  })

  test("BARE '<task-notification>' → does not clear", () => {
    expect(
      isBareKeyboardPrompt("<task-notification>\n<task-id>x</task-id>\n</task-notification>")
    ).toBe(false)
  })

  test("CHANNEL from Alan → does NOT clear (not Alan at THIS keyboard)", () => {
    expect(isBareKeyboardPrompt(channel({ sender: "system", sourceType: "page-chat" }, "hi"))).toBe(
      false
    )
  })

  test("CHANNEL agent send → does not clear", () => {
    expect(
      isBareKeyboardPrompt(channel({ sender: "019f0000-aaaa-7000-8000-000000000000" }, "x"))
    ).toBe(false)
  })
})
