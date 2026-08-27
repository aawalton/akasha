import { describe, expect, it } from "bun:test"
import { ownedByService } from "../commands/service/install.ts"

const OWNED: readonly string[] = [
  "ci-orchestrator.service",
  "monarch-poll.service",
  "monarch-poll.timer",
  "monarch-sync.service",
  "send-due-reminders.service",
  "send-due-reminders.timer",
]

describe("ownedByService", () => {
  it("takes both units the named service owns", () => {
    expect(ownedByService(OWNED, "send-due-reminders")).toEqual([
      "send-due-reminders.service",
      "send-due-reminders.timer",
    ])
  })

  it("reaches no other service, which is what stops a scoped run removing the fleet", () => {
    expect(ownedByService(OWNED, "ci-orchestrator")).toEqual(["ci-orchestrator.service"])
  })

  it("does not take a unit whose name merely begins with the slug", () => {
    expect(ownedByService(OWNED, "monarch")).toEqual([])
  })

  it("is empty where the named service has nothing installed", () => {
    expect(ownedByService(OWNED, "send-due-reminders-2")).toEqual([])
  })
})
