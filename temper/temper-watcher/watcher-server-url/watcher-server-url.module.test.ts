import { describe, expect, test } from "bun:test"
import {
  AUTH_TIMEOUT_MS,
  DEFAULT_SERVER_URL,
  decideCallbackResponse,
  isCallbackPath,
  looksLikeSignInState,
  MISSING_TOKENS_BODY,
  openLinkMessage,
  openNothing,
  randomSignInState,
  STATE_MISMATCH_BODY,
  serverUrlFromEnv,
  signInLinkUrl,
  timedOutMessage,
  WAITING_MESSAGE,
} from "./watcher-server-url.module.code.ts"

const STATE = "0123456789abcdef"
const SERVER = "https://tempereso.com"

function params(over: Record<string, string | null> = {}): URLSearchParams {
  const base: Record<string, string | null> = {
    access_token: "at_live",
    refresh_token: "rt_live",
    state: STATE,
    ...over,
  }
  const out = new URLSearchParams()
  for (const [k, v] of Object.entries(base)) if (v !== null) out.set(k, v)
  return out
}

function decide(over: Record<string, string | null> = {}) {
  return decideCallbackResponse({
    searchParams: params(over),
    expectedState: STATE,
    serverUrl: SERVER,
  })
}

describe("a successful callback returns the user to Temper", () => {
  test("accepts and redirects to the watcher landing", () => {
    const decision = decide()
    expect(decision.kind).toBe("accept")
    if (decision.kind !== "accept") return
    expect(decision.redirectTo).toBe(`${SERVER}/watcher`)
  })

  test("the redirect target is on the server address given, never a hardcoded host", () => {
    const decision = decideCallbackResponse({
      searchParams: params(),
      expectedState: STATE,
      serverUrl: "http://localhost:3100",
    })
    expect(decision.kind === "accept" && decision.redirectTo).toBe("http://localhost:3100/watcher")
  })

  test("captures both tokens for the caller to install", () => {
    const decision = decide()
    expect(decision.kind === "accept" && decision.session).toEqual({
      access_token: "at_live",
      refresh_token: "rt_live",
    })
  })

  test("the accept arm carries no message of its own", () => {
    const decision = decide()
    expect(decision.kind === "accept" && "body" in decision).toBe(false)
    expect(JSON.stringify(decision)).not.toContain("success")
    expect(JSON.stringify(decision)).not.toContain("linked")
    expect(JSON.stringify(decision)).not.toContain("close this tab")
  })
})

describe("a callback that cannot be trusted is refused, and says why", () => {
  test("a mismatched state is refused as a CSRF guard", () => {
    const decision = decide({ state: "attacker-supplied" })
    expect(decision.kind).toBe("reject")
    expect(decision.kind === "reject" && decision.status).toBe(400)
    expect(decision.kind === "reject" && decision.body).toContain("State mismatch")
  })

  test("an absent state is refused rather than treated as matching", () => {
    expect(decide({ state: null }).kind).toBe("reject")
  })

  test("an empty expected state still refuses a stateless callback", () => {
    const decision = decideCallbackResponse({
      searchParams: params({ state: null }),
      expectedState: "",
      serverUrl: SERVER,
    })
    expect(decision.kind).toBe("reject")
  })

  test.each([
    ["access_token", { access_token: null }],
    ["refresh_token", { refresh_token: null }],
  ])("a callback missing %s is refused", (_name, over) => {
    const decision = decide(over)
    expect(decision.kind).toBe("reject")
    expect(decision.kind === "reject" && decision.body).toContain("Missing tokens")
  })

  test("no refusal carries a redirect", () => {
    const refused: Record<string, string | null>[] = [
      { state: "wrong" },
      { access_token: null },
      { refresh_token: null },
    ]
    for (const over of refused) {
      expect("redirectTo" in decide(over)).toBe(false)
    }
  })
})

describe("what the legacy module was observed to produce", () => {
  test("both refusal pages are byte for byte what the legacy module sent", () => {
    expect(STATE_MISMATCH_BODY).toBe(
      "<html><body><h2>State mismatch. Please try again.</h2></body></html>"
    )
    expect(MISSING_TOKENS_BODY).toBe(
      "<html><body><h2>Missing tokens in callback. Please try again.</h2></body></html>"
    )
  })

  test("an empty token is accepted rather than refused as missing", () => {
    const decision = decide({ access_token: "", refresh_token: "" })
    expect(decision.kind === "accept" && decision.session).toEqual({
      access_token: "",
      refresh_token: "",
    })
  })

  test("an unset server address falls back to tempereso", () => {
    expect(serverUrlFromEnv({})).toBe(DEFAULT_SERVER_URL)
    expect(DEFAULT_SERVER_URL).toBe("https://tempereso.com")
  })

  test("a server address set to an empty string is taken as that empty address", () => {
    expect(serverUrlFromEnv({ TEMPER_SERVER_URL: "" })).toBe("")
  })

  test("the sign-in link is byte for byte what the legacy module opened", () => {
    expect(signInLinkUrl({ serverUrl: SERVER, port: 41234, state: STATE })).toBe(
      "https://tempereso.com/cli-link?port=41234&state=0123456789abcdef"
    )
  })

  test("both lines the legacy module logged are unchanged", () => {
    expect(openLinkMessage("https://x.test/cli-link?port=1&state=s")).toBe(
      "Open this URL in your browser to link your account: https://x.test/cli-link?port=1&state=s"
    )
    expect(WAITING_MESSAGE).toBe("Waiting for authorization...")
  })

  test("the timeout message at the default timeout is unchanged", () => {
    expect(AUTH_TIMEOUT_MS).toBe(300_000)
    expect(timedOutMessage(AUTH_TIMEOUT_MS)).toBe("Authorization timed out after 5 minutes")
  })
})

describe("what this recreation was written to mean", () => {
  test("a state carrying characters needing escaping is escaped into the link", () => {
    expect(signInLinkUrl({ serverUrl: SERVER, port: 1, state: "a b&c" })).toBe(
      "https://tempereso.com/cli-link?port=1&state=a%20b%26c"
    )
  })

  test("one minute is counted in the singular", () => {
    expect(timedOutMessage(60_000)).toBe("Authorization timed out after 1 minute")
  })

  test("the callback path is the only path the local server answers", () => {
    expect(isCallbackPath("/callback")).toBe(true)
    expect(isCallbackPath("/")).toBe(false)
    expect(isCallbackPath("/callback/")).toBe(false)
  })

  test("a sign-in state is sixteen random bytes written as hex", () => {
    const state = randomSignInState()
    expect(looksLikeSignInState(state)).toBe(true)
    expect(state).toHaveLength(32)
  })

  test("two sign-in states in a row differ", () => {
    expect(randomSignInState()).not.toBe(randomSignInState())
  })

  test("a caller handing in no way to open a link opens nothing", () => {
    expect(openNothing()).toBeUndefined()
  })
})
