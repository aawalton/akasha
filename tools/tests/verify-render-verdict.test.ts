import { describe, expect, test } from "bun:test"
import { verdictFindingLines, verdictHeadline } from "../lib/verdict-channel.ts"
import { renderChannelVerdict } from "../lib/verify-render-verdict.ts"

const AT = 1_700_000_000_000
const CTX = {
  url: "https://atlas.example.com/places/kyoto",
  pageType: "place",
  httpStatus: 200,
  observedAtMs: AT,
}

const built = (verdict: "PASS" | "FAIL" | "INDETERMINATE", observed: boolean) =>
  renderChannelVerdict({ verdict: { verdict, reason: `the ${verdict} reason` }, ...CTX, observed })

describe("only an observed good render passes, and nothing else does", () => {
  test("PASS is a pass", () => {
    expect(built("PASS", true).kind).toBe("pass")
  })

  test("FAIL is a fail — a terminal broken render", () => {
    expect(built("FAIL", true).kind).toBe("fail")
  })

  test("INDETERMINATE fails rather than certifying a render nobody observed", () => {
    expect(built("INDETERMINATE", false).kind).toBe("fail")
  })

  test("and it names what stopped it, which is what a reader acts on", () => {
    expect(verdictFindingLines(built("INDETERMINATE", false))).not.toBeEmpty()
  })
})

describe("the claim names what it rendered", () => {
  test.each(["PASS", "FAIL", "INDETERMINATE"] as const)("%s carries the URL", (kind) => {
    expect(verdictHeadline(built(kind, true))).toContain(CTX.url)
  })

  test.each(["PASS", "FAIL", "INDETERMINATE"] as const)("%s carries the page type", (kind) => {
    expect(verdictHeadline(built(kind, true))).toContain("place")
  })

  test("the http status rides the claim, since a 200 empty and a 404 read alike otherwise", () => {
    expect(verdictHeadline(built("FAIL", true))).toContain("200")
  })

  test("the decider's own reason is not dropped for the locators", () => {
    expect(verdictHeadline(built("FAIL", true))).toContain("the FAIL reason")
  })
})

describe("coverage says whether a render was observed at all", () => {
  test("an unobserved run observed nothing", () => {
    expect(verdictHeadline(built("INDETERMINATE", false))).toContain("0 of 1")
  })

  test("an observed run says so", () => {
    expect(verdictHeadline(built("PASS", true))).toContain("1 of 1")
    expect(verdictHeadline(built("FAIL", true))).toContain("1 of 1")
  })
})

describe("a fail names what failed", () => {
  test("the finding carries the reason and attributes it to the url", () => {
    const lines = verdictFindingLines(built("FAIL", true))
    expect(lines).not.toBeEmpty()
    expect(lines.join("\n")).toContain(CTX.url)
  })

  test("a pass has nothing to enumerate", () => {
    expect(verdictFindingLines(built("PASS", true))).toBeEmpty()
  })
})
