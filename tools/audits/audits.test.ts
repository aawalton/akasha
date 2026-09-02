import { expect, test } from "bun:test"
import { over, type Outcome } from "@akasha/verdict/outcome"
import { AUDITS, auditFileStems, certified, died, registered, shortened, unrun } from "./audits.ts"
import { argumentsIn } from "../../services/audits-watchdog.ts"

const clean: Outcome = { name: "one", verdict: "pass", detail: "", messages: [] }

test("every audit file standing in the folder is registered, and every name answers", () => {
  const outcome = registered(auditFileStems(`${import.meta.dir}`))
  expect(outcome.messages).toEqual([])
  expect(outcome.verdict).toBe("pass")
})

test("a pass over a population of nothing is turned into a refusal", () => {
  const judged = certified({ ...clean, population: over(0, "page(s)") })
  expect(judged.verdict).toBe("fail")
  expect(judged.messages[0]).toContain("certifies nothing")
})

test("a pass over a population it measured is left alone", () => {
  expect(certified({ ...clean, population: over(1, "page(s)") }).verdict).toBe("pass")
})

test("a pass declaring no population at all is turned into a refusal", () => {
  const judged = certified(clean)
  expect(judged.verdict).toBe("fail")
  expect(judged.messages[0]).toContain("declared no population")
})

test("a refusal over a population of nothing stays the refusal it was", () => {
  const refused: Outcome = { ...clean, verdict: "fail", messages: ["something"] }
  const judged = certified({ ...refused, population: over(0, "page(s)") })
  expect(judged.messages).toEqual(["something"])
})

test("an audit whose process left without a verdict refuses and quotes what it said", () => {
  const outcome = died("commands-declare-help", 2, "REFUSED: this is a retired cluster check.")
  expect(outcome.verdict).toBe("fail")
  expect(outcome.messages.join("\n")).toContain("retired cluster check")
})

test("an audit killed at its deadline says so rather than naming an exit code", () => {
  expect(died("suite-runs", null, "").detail).toContain("killed at its deadline")
})

test("audits the budget never reached refuse and are named", () => {
  const outcome = unrun(["a", "b"], 1000)
  expect(outcome.verdict).toBe("fail")
  expect(outcome.messages[0]).toContain("a, b")
})

test("a long message list is cut for drawing and states how many it held back", () => {
  const many = { ...clean, name: "big (akasha)", messages: Array.from({ length: 25 }, (_, at) => `${at}`) }
  const drawn = shortened(many, 10)
  expect(drawn.messages).toHaveLength(11)
  expect(drawn.messages[10]).toContain("15 further message(s)")
  expect(drawn.messages[10]).toContain("--audit big")
})

test("cutting for drawing leaves the verdict and the detail untouched", () => {
  const refused: Outcome = { name: "big", verdict: "fail", detail: "2530 unresolved", messages: ["a", "b", "c"] }
  const drawn = shortened(refused, 1)
  expect(drawn.verdict).toBe("fail")
  expect(drawn.detail).toBe("2530 unresolved")
})

test("a short message list is handed back as it was", () => {
  expect(shortened({ ...clean, messages: ["a"] }, 10).messages).toEqual(["a"])
})

test("a name no audit carries is read as a name rather than dropped", () => {
  const read = argumentsIn(["--audit", "no-such-audit"])
  expect(typeof read).not.toBe("string")
  expect(read).toMatchObject({ only: ["no-such-audit"] })
  expect(AUDITS["no-such-audit"]).toBeUndefined()
})

test("--audit with nothing after it is refused rather than read as a whole run", () => {
  expect(argumentsIn(["--audit"])).toContain("names no audit")
  expect(argumentsIn(["--audit", "--json"])).toContain("names no audit")
})

test("a flag this does not take is refused rather than ignored", () => {
  expect(argumentsIn(["--notify"])).toContain("not a flag this takes")
})

test("no flag reaching a phone is taken", () => {
  expect(argumentsIn(["--notify"])).toContain("--notify")
  expect(argumentsIn([])).toMatchObject({ only: [], json: false, list: false, full: false })
})
