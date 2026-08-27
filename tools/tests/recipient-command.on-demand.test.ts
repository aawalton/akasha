
import { describe, expect, it } from "bun:test"
import { answer } from "../recipient.ts"

const COMMAND = new URL("../recipient.ts", import.meta.url).pathname

describe("the envelope", () => {
  it("refuses a payload asking nothing, which would otherwise read as both rules declining", () => {
    expect(answer({})).rejects.toThrow(/asks nothing/)
  })

  it("refuses a misspelled key rather than answering an empty object about it", () => {
    expect(answer({ blockedPrincipals: {} })).rejects.toThrow(/no decision this command makes/)
  })

  it("names both decisions it makes when it refuses a key it does not", async () => {
    await expect(answer({ nonsense: {} })).rejects.toThrow(/blockedPrincipal/)
    await expect(answer({ nonsense: {} })).rejects.toThrow(/domainLead/)
  })

  it("refuses a payload that is not an object at all", () => {
    expect(answer("blockedPrincipal")).rejects.toThrow(/the payload: expected an object/)
  })
})

describe("nothing is defaulted, and nothing is read before the payload is admitted", () => {
  it("refuses an absent `agentName` rather than walking from null", () => {
    expect(answer({ blockedPrincipal: {} })).rejects.toThrow(
      /blockedPrincipal\.agentName: expected to be present/
    )
  })

  it("refuses an absent `defaultHandle` before the persona rows are read", () => {
    expect(answer({ domainLead: { domain: "agent-harness" } })).rejects.toThrow(
      /domainLead\.defaultHandle: expected to be present/
    )
  })

  it("refuses a `domain` of the wrong type", () => {
    expect(answer({ domainLead: { domain: 7, defaultHandle: null } })).rejects.toThrow(
      /domainLead\.domain: expected a string/
    )
  })
})

describe("the file is a command, not only a module", () => {
  it("prints its help and exits 0 without touching stdin", async () => {
    const proc = Bun.spawn({
      cmd: [process.execPath, COMMAND, "--help"],
      stdin: "ignore",
      stdout: "pipe",
      stderr: "pipe",
    })
    const [out, code] = await Promise.all([new Response(proc.stdout).text(), proc.exited])
    expect(code).toBe(0)
    expect(out).toContain("blockedPrincipal")
    expect(out).toContain("domainLead")
  })

  it("refuses an argument before it reads stdin, so a wrong call is not a hang", async () => {
    const proc = Bun.spawn({
      cmd: [process.execPath, COMMAND, "--agent-name", "athena"],
      stdin: "ignore",
      stdout: "pipe",
      stderr: "pipe",
    })
    const [err, code] = await Promise.all([new Response(proc.stderr).text(), proc.exited])
    expect(code).toBe(1)
    expect(err).toContain("takes none")
  })

  it("refuses a malformed payload at exit 1 with the path in it, spending no query", async () => {
    const proc = Bun.spawn({
      cmd: [process.execPath, COMMAND],
      stdin: new TextEncoder().encode(JSON.stringify({ blockedPrincipal: {} })),
      stdout: "pipe",
      stderr: "pipe",
    })
    const [err, code] = await Promise.all([new Response(proc.stderr).text(), proc.exited])
    expect(code).toBe(1)
    expect(err).toContain("blockedPrincipal.agentName")
  })
})
