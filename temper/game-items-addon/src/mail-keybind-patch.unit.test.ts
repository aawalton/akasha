import { expect, test } from "bun:test"
import { buildSafeName, patchMailKeybindName } from "./mail-keybind-patch"

function setMailInbox(value: unknown): undefined {
  Reflect.set(globalThis, "MAIL_INBOX", value)
}

test("buildSafeName returns undefined for a static-string name (nothing to fix)", () => {
  expect(buildSafeName("Report Player")).toBeUndefined()
})

test("buildSafeName returns undefined for a non-function, non-string name", () => {
  expect(buildSafeName(undefined)).toBeUndefined()
  expect(buildSafeName(42)).toBeUndefined()
})

test("buildSafeName coalesces a nil-returning name function to empty string", () => {
  const wrapped = buildSafeName(() => undefined)
  expect(wrapped).toBeDefined()
  expect(wrapped?.()).toBe("")
})

test("buildSafeName passes through a string-returning name function unchanged", () => {
  const wrapped = buildSafeName(() => "Report Player")
  expect(wrapped?.()).toBe("Report Player")
})

test("buildSafeName forwards the descriptor argument to the original name function", () => {
  const seen: MailKeybindDescriptor[] = []
  const original = (descriptor: MailKeybindDescriptor): string => {
    seen.push(descriptor)
    return "ok"
  }
  const wrapped = buildSafeName(original)
  const stub: MailKeybindDescriptor = { keybind: "UI_SHORTCUT_HELP" }
  expect(wrapped?.(stub)).toBe("ok")
  expect(seen).toEqual([stub])
})

test("patchMailKeybindName is a no-op when MAIL_INBOX is absent", () => {
  setMailInbox(undefined)
  expect(() => patchMailKeybindName()).not.toThrow()
})

test("patchMailKeybindName leaves a static-string name untouched (hotfixed game)", () => {
  const descriptor: MailKeybindDescriptor = { keybind: "UI_SHORTCUT_HELP", name: "Report Player" }
  setMailInbox({ selectionKeybindStripDescriptor: [descriptor] })
  patchMailKeybindName()
  expect(descriptor.name).toBe("Report Player")
})

test("patchMailKeybindName wraps the UI_SHORTCUT_HELP function name, leaves siblings alone, and is idempotent", () => {
  const helpDescriptor: MailKeybindDescriptor = {
    keybind: "UI_SHORTCUT_HELP",
    name: (): undefined => undefined,
  }
  const sibling: MailKeybindDescriptor = { keybind: "UI_SHORTCUT_PRIMARY", name: "Take" }
  setMailInbox({ selectionKeybindStripDescriptor: [sibling, helpDescriptor] })

  patchMailKeybindName()

  const patchedName = helpDescriptor.name
  expect(typeof patchedName).toBe("function")
  if (typeof patchedName === "function") {
    expect(patchedName(helpDescriptor)).toBe("")
  }
  expect(sibling.name).toBe("Take")

  const afterFirst = helpDescriptor.name
  patchMailKeybindName()
  expect(helpDescriptor.name).toBe(afterFirst)
})
