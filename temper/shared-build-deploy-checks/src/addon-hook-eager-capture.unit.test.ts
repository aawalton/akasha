import { describe, expect, test } from "bun:test"
import {
  collectDeferredPublishedFields,
  collectHookEagerCaptureIssues,
  parseAddonSource,
} from "./addon-hook-eager-capture"

const deferredFields = (src: string, path = "a.ts"): readonly string[] =>
  collectDeferredPublishedFields(parseAddonSource(src, path))
const issuesIn = (src: string, path: string, deferred: ReadonlySet<string>) =>
  collectHookEagerCaptureIssues(parseAddonSource(src, path), deferred)

const PCHAT_DEFERRED: ReadonlySet<string> = new Set([
  "pChat.SaveChatConfig",
  "pChat.SaveChatHistory",
  "pChat.SaveX",
  "pChat.OnActivated",
])

describe("collectDeferredPublishedFields", () => {
  test("captures OBJ.FIELD assigned INSIDE a function body", () => {
    const src = `
export function InitializeChatConfig() {
  pChat.SaveChatConfig = (from) => save(from)
}
`
    expect(deferredFields(src, "a.ts")).toEqual(["pChat.SaveChatConfig"])
  })

  test('captures OBJ["FIELD"] element-access assignment inside a function', () => {
    const src = `const init = () => { pChat["SaveX"] = fn }`
    expect(deferredFields(src, "a.ts")).toEqual(["pChat.SaveX"])
  })

  test("ignores a MODULE-TOP assignment (import-order business, not deferred)", () => {
    const src = `pChat.ConvertHexToRGBA = ConvertHexToRGBA`
    expect(deferredFields(src, "a.ts")).toEqual([])
  })

  test("ignores an assignment inside a top-level bare block (runs at module load)", () => {
    const src = `{ const x = 1\n pChat.Foo = bar }`
    expect(deferredFields(src, "a.ts")).toEqual([])
  })
})

describe("collectHookEagerCaptureIssues — the #12685 reproduction", () => {
  const PRE_FIX = `
export function LoadHooks(this: void): undefined {
  const saveChatHistory = pChat.SaveChatHistory
  const saveChatConfig = pChat.SaveChatConfig
  ZO_PreHook("ReloadUI", (): undefined => {
    saveChatHistory(1)
    saveChatConfig("RelaodUI")
  })
  ZO_PreHook("Logout", (): undefined => {
    saveChatHistory(2)
    saveChatConfig("Logout")
  })
}
`

  test("FIRES on the pre-fix eager-capture-then-deferred-call pattern", () => {
    const issues = issuesIn(PRE_FIX, "hooks.ts", PCHAT_DEFERRED)
    expect(issues).toHaveLength(4)
    const captured = [...new Set(issues.map((i) => i.capturedName))].sort()
    expect(captured).toEqual(["saveChatConfig", "saveChatHistory"])
    for (const i of issues) {
      expect(i.objectName).toBe("pChat")
      expect(i.closureSite).toEqual({ kind: "hook-installer", name: "ZO_PreHook" })
    }
    const fields = [...new Set(issues.map((i) => i.fieldName))].sort()
    expect(fields).toEqual(["SaveChatConfig", "SaveChatHistory"])
  })

  test("PASSES clean on the lazy-resolution fix (call pChat.X at fire time)", () => {
    const POST_FIX = `
export function LoadHooks(this: void): undefined {
  ZO_PreHook("ReloadUI", (): undefined => {
    pChat.SaveChatHistory(1)
    pChat.SaveChatConfig("RelaodUI")
  })
  ZO_PreHook("Logout", (): undefined => {
    pChat.SaveChatHistory(2)
    pChat.SaveChatConfig("Logout")
  })
}
`
    expect(issuesIn(POST_FIX, "hooks.ts", PCHAT_DEFERRED)).toEqual([])
  })
})

describe("collectHookEagerCaptureIssues — closure-site coverage", () => {
  const installers: readonly string[] = [
    "ZO_PreHook",
    "ZO_PostHook",
    "ZO_PreHookHandler",
    "SecurePostHook",
  ]
  for (const installer of installers) {
    test(`fires inside a ${installer} callback`, () => {
      const src = `
const f = pChat.SaveX
${installer}("Target", () => { f(1) })
`
      const issues = issuesIn(src, "a.ts", PCHAT_DEFERRED)
      expect(issues).toHaveLength(1)
      expect(issues[0]?.closureSite).toEqual({ kind: "hook-installer", name: installer })
      expect(issues[0]?.capturedName).toBe("f")
    })
  }

  test("fires inside a LAM setFunc option callback (the sync.ts / anti-spam.ts surface)", () => {
    const src = `
export function buildSyncSection(ctx) {
  const saveChatConfig = pChat.SaveChatConfig
  return { controls: [{ setFunc: (v) => { saveChatConfig("LAM_Setting") } }] }
}
`
    const issues = issuesIn(src, "sync.ts", PCHAT_DEFERRED)
    expect(issues).toHaveLength(1)
    expect(issues[0]?.closureSite).toEqual({ kind: "property", name: "setFunc" })
    expect(issues[0]?.fieldName).toBe("SaveChatConfig")
  })

  test("fires inside an EVENT_MANAGER.RegisterForEvent callback", () => {
    const src = `
const f = pChat.OnActivated
EVENT_MANAGER.RegisterForEvent(NAME, EVENT_PLAYER_ACTIVATED, () => { f() })
`
    const issues = issuesIn(src, "a.ts", PCHAT_DEFERRED)
    expect(issues).toHaveLength(1)
    expect(issues[0]?.closureSite).toEqual({
      kind: "hook-installer",
      name: "EVENT_MANAGER.RegisterForEvent",
    })
  })

  test("captures element-access fields too — const f = pChat['SaveX']", () => {
    const src = `
const f = pChat["SaveX"]
ZO_PreHook("ReloadUI", () => { f() })
`
    const issues = issuesIn(src, "a.ts", PCHAT_DEFERRED)
    expect(issues).toHaveLength(1)
    expect(issues[0]?.fieldName).toBe("SaveX")
  })
})

describe("collectHookEagerCaptureIssues — no false positives", () => {
  test("the detour idiom (capture original + override SAME field in this file) is NOT flagged", () => {
    const src = `
const orgUpdate = ZO_KeyboardOptions.UpdatePanelVisibility
ZO_KeyboardOptions.UpdatePanelVisibility = function (self) {
  orgUpdate(self)
}
`
    const deferred = new Set(["ZO_KeyboardOptions.UpdatePanelVisibility"])
    expect(issuesIn(src, "panel.ts", deferred)).toEqual([])
  })

  test("a Lua-stdlib capture (string.sub) is NOT flagged — never addon-published", () => {
    const src = `
const strsub = string.sub
const strfind = string.find
ZO_PreHookHandler(BOX, "OnBackspace", (self) => {
  const a = strsub(self.GetText(), 1, 3)
  const b = strfind(a, "x")
  return false
})
`
    expect(issuesIn(src, "a.ts", PCHAT_DEFERRED)).toEqual([])
  })

  test("a capture made INSIDE the callback body is lazy — not flagged", () => {
    const src = `
ZO_PreHook("ReloadUI", () => {
  const db = pChat.db
  db.save()
})
`
    expect(issuesIn(src, "a.ts", PCHAT_DEFERRED)).toEqual([])
  })

  test("a capture off a LOCAL object (not ambient) is not flagged", () => {
    const src = `
const helpers = makeHelpers()
const f = helpers.save
ZO_PreHook("ReloadUI", () => { f() })
`
    expect(issuesIn(src, "a.ts", new Set(["helpers.save"]))).toEqual([])
  })

  test("a capture off an IMPORTED object is not flagged", () => {
    const src = `
import { svc } from "./svc"
const f = svc.save
ZO_PreHook("ReloadUI", () => { f() })
`
    expect(issuesIn(src, "a.ts", new Set(["svc.save"]))).toEqual([])
  })

  test("a MODULE-TOP-published field (convertHexToRGBA) called in a closure is not flagged", () => {
    const src = `
const convertHexToRGBA = pChat.ConvertHexToRGBA
globalThis.ZO_ChatSystem_GetCategoryColorFromChannel = function (channelId) {
  return convertHexToRGBA("ffffff")
}
`
    expect(issuesIn(src, "a.ts", new Set())).toEqual([])
  })

  test("a name re-declared INSIDE the body shadows the outer capture — not flagged", () => {
    const src = `
const f = pChat.SaveX
ZO_PreHook("ReloadUI", () => {
  const f = pChat.SaveX
  f()
})
`
    expect(issuesIn(src, "a.ts", PCHAT_DEFERRED)).toEqual([])
  })

  test("lazy property-access call inside the hook body is not flagged", () => {
    const src = `
ZO_PreHook("ReloadUI", () => { pChat.SaveX(1) })
`
    expect(issuesIn(src, "a.ts", PCHAT_DEFERRED)).toEqual([])
  })

  test("an eager capture called at module top, in no closure at all, is not flagged", () => {
    const src = `
const f = pChat.SaveX
f()
`
    expect(issuesIn(src, "a.ts", PCHAT_DEFERRED)).toEqual([])
  })

  test("a capture called from a named function DECLARATION is not flagged", () => {
    const src = `
const f = pChat.SaveX
function helper() { f() }
`
    expect(issuesIn(src, "a.ts", PCHAT_DEFERRED)).toEqual([])
  })
})

describe("collectHookEagerCaptureIssues — a finding names the site it found", () => {
  const INSTALLER_NAMES: readonly string[] = [
    "ZO_PreHook",
    "ZO_PostHook",
    "ZO_PreHookHandler",
    "ZO_PreHookWidget",
    "SecurePostHook",
    "RegisterForEvent",
    "RegisterForUpdate",
  ]

  const namesNoAbsentInstaller = (message: string, source: string): boolean =>
    INSTALLER_NAMES.every((n) => !message.includes(n) || source.includes(n))

  const bareSiteCases: readonly (readonly [string, string])[] = [
    [
      "a module-scope arrow in no installer",
      `
const f = pChat.SaveX
export const doIt = () => { f(1) }
`,
    ],
    [
      "an immediately-invoked module-scope arrow",
      `
const f = pChat.SaveX
;(() => { f(1) })()
`,
    ],
    [
      "a global function-expression rewrite",
      `
const f = pChat.SaveX
globalThis.ZO_ChatSystem_Rewrite = function (channelId) { return f(channelId) }
`,
    ],
  ]

  for (const [label, src] of bareSiteCases) {
    test(`${label} is flagged, and the finding names no installer`, () => {
      const issues = issuesIn(src, "a.ts", PCHAT_DEFERRED)
      expect(issues).toHaveLength(1)
      expect(issues[0]?.closureSite).toEqual({ kind: "bare" })
      expect(namesNoAbsentInstaller(issues[0]?.message ?? "", src)).toBe(true)
    })
  }

  test("an installer finding names that installer, and a property finding names a property", () => {
    const hooked = `
const f = pChat.SaveX
ZO_PreHook("ReloadUI", () => { f(1) })
`
    const hookedIssue = issuesIn(hooked, "a.ts", PCHAT_DEFERRED)[0]
    expect(hookedIssue?.closureSite).toEqual({ kind: "hook-installer", name: "ZO_PreHook" })
    expect(hookedIssue?.message).toContain("ZO_PreHook")

    const propped = `
const f = pChat.SaveX
export const opts = { setFunc: () => { f(1) } }
`
    const proppedIssue = issuesIn(propped, "a.ts", PCHAT_DEFERRED)[0]
    expect(proppedIssue?.closureSite).toEqual({ kind: "property", name: "setFunc" })
    expect(proppedIssue?.message).toContain("setFunc")
    expect(namesNoAbsentInstaller(proppedIssue?.message ?? "", propped)).toBe(true)
  })
})

describe("parseAddonSource — one parse serves both passes", () => {
  test("one parse per file drives the publish pass and then the judgement pass", () => {
    const parsed = [
      parseAddonSource(`export function Init() { pChat.SaveX = () => {} }`, "chat-config.ts"),
      parseAddonSource(
        `
const f = pChat.SaveX
export function LoadHooks() { ZO_PreHook("ReloadUI", () => { f(1) }) }
`,
        "hooks.ts"
      ),
    ]

    const deferred = new Set(parsed.flatMap((sf) => [...collectDeferredPublishedFields(sf)]))
    expect([...deferred]).toEqual(["pChat.SaveX"])

    const issues = parsed.flatMap((sf) => [...collectHookEagerCaptureIssues(sf, deferred)])
    expect(issues).toHaveLength(1)
    expect(issues[0]?.filePath).toBe("hooks.ts")
    expect(issues[0]?.closureSite).toEqual({ kind: "hook-installer", name: "ZO_PreHook" })
  })

  test("re-judging the SAME parsed file repeats the finding — no parse-order state", () => {
    const sf = parseAddonSource(
      `
const f = pChat.SaveX
ZO_PreHook("ReloadUI", () => { f(1) })
`,
      "hooks.ts"
    )
    collectDeferredPublishedFields(sf)
    const first = collectHookEagerCaptureIssues(sf, PCHAT_DEFERRED)
    const second = collectHookEagerCaptureIssues(sf, PCHAT_DEFERRED)
    expect(first).toHaveLength(1)
    expect(second).toEqual(first)
  })
})
