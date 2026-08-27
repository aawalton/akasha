import { describe, expect, it } from "bun:test"
import { examined } from "../lib/temper-addon-lua.ts"
import { CAPTURE_RESULT, CLASSIFY_RESULT, loaded, SUBJECTS } from "./temper-errors-capture-fixture.ts"

describe("classifyError / captureError boundary (real Lua 5.1)", () => {

  it("examines 3 code-repo sources, and refuses where one is not there to examine", () => {
    expect(examined(SUBJECTS)).toBe(3)
  })
  it('(a) empty errorString records a NON-EMPTY sentinel message, not ""', async () => {
    const result = await loaded(async (vm) =>
      CLASSIFY_RESULT.parse(
        await vm.run(
          `local r = __classify("", 100, 0); return { message = r.message, traceback = r.traceback }`
        )
      )
    )
    expect(result.message).not.toBe("")
    expect(result.traceback).not.toBe("")
    expect(result.message).toContain("empty or whitespace lua error")
    expect(result.message).toContain("eventCode=100")
    expect(result.message).toContain("errorCode=0")
    expect(result.traceback).toContain("eventCode=100")
  })

  it("(a') all-whitespace errorString is also treated as blind", async () => {
    const result = await loaded(async (vm) =>
      CLASSIFY_RESULT.parse(
        await vm.run(
          `local r = __classify("   \\n\\t  ", 100, 0); return { message = r.message, traceback = r.traceback }`
        )
      )
    )
    expect(result.message).toContain("empty or whitespace lua error")
    expect(result.traceback).not.toBe("")
  })

  it("(b) non-string error value is coerced and recorded non-empty", async () => {
    const result = await loaded(async (vm) => {
      const tableCase = CLASSIFY_RESULT.parse(
        await vm.run(
          `local r = __classify({}, 100, 5); return { message = r.message, traceback = r.traceback }`
        )
      )
      const nilCase = CLASSIFY_RESULT.parse(
        await vm.run(
          `local r = __classify(nil, 100, nil); return { message = r.message, traceback = r.traceback }`
        )
      )
      return { tableCase, nilCase }
    })
    expect(result.tableCase.message).not.toBe("")
    expect(result.tableCase.message).toContain("non-string lua error")
    expect(result.tableCase.message).toContain("type=object")
    expect(result.tableCase.message).toContain("errorCode=5")
    expect(result.nilCase.message).not.toBe("")
    expect(result.nilCase.message).toContain("non-string lua error")
    expect(result.nilCase.message).toContain("errorCode=nil")
  })

  it("(c) well-formed msg + stack traceback splits unchanged", async () => {
    const result = await loaded(async (vm) =>
      CLASSIFY_RESULT.parse(
        await vm.run(`
          local err = "user:/AddOns/Foo/Foo.lua:42: attempt to index a nil value\\nstack traceback:\\n\\t<frame Foo.lua:42>"
          local r = __classify(err, 100, 0)
          return { message = r.message, traceback = r.traceback }
        `)
      )
    )
    expect(result.message).toBe("user:/AddOns/Foo/Foo.lua:42: attempt to index a nil value")
    expect(result.traceback).toContain("stack traceback:")
    expect(result.traceback).toContain("Foo.lua:42")
    expect(result.traceback).not.toContain("no-lua-traceback")
  })

  it("(d) dedup keeps distinct blind errors separate when context differs", async () => {
    const result = await loaded(async (vm) =>
      CAPTURE_RESULT.parse(
        await vm.run(`
          -- Two blind fires with the SAME context dedup into one entry (count 2)...
          __capture(100, "", 0)
          __capture(100, "", 0)
          -- ...a different errorCode is a distinct class (separate entry)...
          __capture(100, "", 7)
          -- ...and a different eventCode is also distinct.
          __capture(200, "", 0)
          local entries = __sv.entries
          local messages, tracebacks, counts = {}, {}, {}
          for i = 1, #entries do
            messages[i] = entries[i].message
            tracebacks[i] = entries[i].traceback
            counts[i] = entries[i].count
          end
          return { entryCount = #entries, messages = messages, tracebacks = tracebacks, counts = counts }
        `)
      )
    )
    expect(result.entryCount).toBe(3)
    expect(result.counts).toContain(2)
    for (const m of result.messages) expect(m).not.toBe("")
    for (const t of result.tracebacks) expect(t).not.toBe("")
    expect(new Set(result.tracebacks).size).toBe(3)
  })
})
