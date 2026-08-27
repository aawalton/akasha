import { describe, expect, it } from "bun:test"

import { DEFAULT_DOWNSTREAM_KEEPALIVE_MS } from "../lib/model-gateway/keepalive.ts"
import { DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS, parseBootEnv } from "../lib/model-gateway/parse-boot-env.ts"

const validEnv = {
  OAUTH_PROXY_AGENT_ID: "agent-123",
  OAUTH_PROXY_LOG_DIR: "/tmp/oauth-proxy-test/logs",
  OAUTH_PROXY_REGISTRATION_ACCOUNT: "alice",
} satisfies NodeJS.ProcessEnv

describe("parseBootEnv — carried from packages/agents/oauth-proxy/src/parse-boot-env.unit.test.ts", () => {
  it("returns all typed fields with defaults when only required vars are set", () => {
    const result = parseBootEnv(validEnv)
    expect(result).toEqual({
      agentId: "agent-123",
      logDir: "/tmp/oauth-proxy-test/logs",
      registrationAccount: "alice",
      oauthProxyVersion: "unknown",
      port: 0,
      upstreamIdleTimeoutMs: DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS,
      downstreamKeepaliveMs: DEFAULT_DOWNSTREAM_KEEPALIVE_MS,
    })
  })

  it("ignores unrelated env keys (PATH, HOME, etc.)", () => {
    const env = {
      ...validEnv,
      PATH: "/usr/bin",
      HOME: "/home/walton",
      LANG: "en_US.UTF-8",
    } satisfies NodeJS.ProcessEnv
    const result = parseBootEnv(env)
    expect(result.agentId).toBe("agent-123")
  })

  it("throws naming the missing key when OAUTH_PROXY_AGENT_ID is unset", () => {
    const env = { ...validEnv, OAUTH_PROXY_AGENT_ID: undefined } satisfies NodeJS.ProcessEnv
    expect(() => parseBootEnv(env)).toThrow(/OAUTH_PROXY_AGENT_ID/)
  })

  it("throws naming the missing key when OAUTH_PROXY_LOG_DIR is unset", () => {
    const env = { ...validEnv, OAUTH_PROXY_LOG_DIR: undefined } satisfies NodeJS.ProcessEnv
    expect(() => parseBootEnv(env)).toThrow(/OAUTH_PROXY_LOG_DIR/)
  })

  it("throws naming the missing key when OAUTH_PROXY_REGISTRATION_ACCOUNT is unset", () => {
    const env = {
      ...validEnv,
      OAUTH_PROXY_REGISTRATION_ACCOUNT: undefined,
    } satisfies NodeJS.ProcessEnv
    expect(() => parseBootEnv(env)).toThrow(/OAUTH_PROXY_REGISTRATION_ACCOUNT/)
  })

  it("rejects empty-string values as missing", () => {
    const env = { ...validEnv, OAUTH_PROXY_AGENT_ID: "" } satisfies NodeJS.ProcessEnv
    expect(() => parseBootEnv(env)).toThrow(/OAUTH_PROXY_AGENT_ID/)
  })

  it("returns OAUTH_PROXY_VERSION verbatim when set", () => {
    const env = { ...validEnv, OAUTH_PROXY_VERSION: "abc123def" } satisfies NodeJS.ProcessEnv
    const result = parseBootEnv(env)
    expect(result.oauthProxyVersion).toBe("abc123def")
  })

  it("parses OAUTH_PROXY_PORT as an integer when set", () => {
    const env = { ...validEnv, OAUTH_PROXY_PORT: "12345" } satisfies NodeJS.ProcessEnv
    const result = parseBootEnv(env)
    expect(result.port).toBe(12345)
  })

  it("rejects a non-numeric OAUTH_PROXY_PORT", () => {
    const env = { ...validEnv, OAUTH_PROXY_PORT: "not-a-port" } satisfies NodeJS.ProcessEnv
    expect(() => parseBootEnv(env)).toThrow(/OAUTH_PROXY_PORT/)
  })

  it("rejects an out-of-range OAUTH_PROXY_PORT", () => {
    const env = { ...validEnv, OAUTH_PROXY_PORT: "70000" } satisfies NodeJS.ProcessEnv
    expect(() => parseBootEnv(env)).toThrow(/OAUTH_PROXY_PORT/)
  })

  describe("OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS", () => {
    it("parses an explicit integer millisecond value", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "120000",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).upstreamIdleTimeoutMs).toBe(120000)
    })

    it("honors 0 as the explicit disable sentinel", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "0",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).upstreamIdleTimeoutMs).toBe(0)
    })

    it("falls back to the default on an empty string (no silent-disable footgun)", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).upstreamIdleTimeoutMs).toBe(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
    })

    it("falls back to the default on a whitespace-only string", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "   ",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).upstreamIdleTimeoutMs).toBe(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
    })

    it("falls back to the default on a non-numeric value (fail-safe, does not throw)", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "not-a-number",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).upstreamIdleTimeoutMs).toBe(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
    })

    it("falls back to the default on a negative value", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "-5",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).upstreamIdleTimeoutMs).toBe(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
    })

    it("falls back to the default on a fractional value", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "12.9",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).upstreamIdleTimeoutMs).toBe(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
    })
  })

  describe("OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS", () => {
    it("parses an explicit integer millisecond value", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "2000",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).downstreamKeepaliveMs).toBe(2000)
    })

    it("honors 0 as the explicit disable sentinel (kill-switch)", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "0",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).downstreamKeepaliveMs).toBe(0)
    })

    it("falls back to the default on an empty string (no silent-disable footgun)", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).downstreamKeepaliveMs).toBe(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
    })

    it("falls back to the default on a whitespace-only string", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "   ",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).downstreamKeepaliveMs).toBe(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
    })

    it("falls back to the default on a non-numeric value (fail-safe, does not throw)", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "not-a-number",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).downstreamKeepaliveMs).toBe(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
    })

    it("falls back to the default on a negative value", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "-5",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).downstreamKeepaliveMs).toBe(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
    })

    it("falls back to the default on a fractional value", () => {
      const env = {
        ...validEnv,
        OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "12.9",
      } satisfies NodeJS.ProcessEnv
      expect(parseBootEnv(env).downstreamKeepaliveMs).toBe(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
    })
  })
})
