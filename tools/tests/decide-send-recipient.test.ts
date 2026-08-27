
import { describe, expect, it } from "bun:test"
import { decideSendRecipient } from "../lib/decide-send-recipient.ts"

const PARENT = "11111111-1111-1111-1111-111111111111"
const OTHER = "22222222-2222-2222-2222-222222222222"

describe("decideSendRecipient — who a send goes to", () => {
  it("uses the named recipient verbatim, so the resolver still sees every accepted shape", () => {
    for (const named of ["amy", "amy-readouts-lead", OTHER, "019e65b4", "#18384"]) {
      expect(decideSendRecipient({ namedRecipient: named, senderParentAgentId: PARENT })).toEqual({
        action: "use",
        recipient: named,
        origin: "named",
      })
    }
  })

  it("with nothing named, the recipient is the sender's parent — the whole inversion", () => {
    expect(decideSendRecipient({ namedRecipient: null, senderParentAgentId: PARENT })).toEqual({
      action: "use",
      recipient: PARENT,
      origin: "principal",
    })
  })

  it("an EMPTY named recipient falls through to the parent rather than resolving nothing", () => {
    expect(decideSendRecipient({ namedRecipient: "", senderParentAgentId: PARENT })).toEqual({
      action: "use",
      recipient: PARENT,
      origin: "principal",
    })
  })

  it("a bare send from a seat with NO parent refuses, and says where to take it instead", () => {
    const choice = decideSendRecipient({ namedRecipient: null, senderParentAgentId: null })
    expect(choice.action).toBe("refuse")
    if (choice.action !== "refuse") throw new Error("unreachable")
    expect(choice.reason).toContain("--to")
    expect(choice.reason).toContain("Alan")
  })

  it("an EMPTY parent string is treated as no parent, not as a recipient", () => {
    expect(decideSendRecipient({ namedRecipient: null, senderParentAgentId: "" }).action).toBe(
      "refuse"
    )
  })
})

describe("a seat with a persona is addressed by name", () => {
  it("takes a bare persona name as the address whatever seat dispatched the sender", () => {
    for (const senderParentAgentId of [PARENT, OTHER, null, ""]) {
      expect(decideSendRecipient({ namedRecipient: "amy", senderParentAgentId })).toEqual({
        action: "use",
        recipient: "amy",
        origin: "named",
      })
    }
  })
})
