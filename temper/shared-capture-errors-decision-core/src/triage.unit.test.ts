import { describe, expect, it } from "bun:test"
import { classifyTriage, type Triage, type TriageInput, type TriageReason } from "./triage"

describe("classifyTriage", () => {
  const cases: ReadonlyArray<{
    name: string
    input: TriageInput
    triage: Triage
    reason: TriageReason
  }> = [
    {
      name: "loaded != deployed → stale-ram (client behind the deploy; reload clears it)",
      input: {
        attributedAddon: "TemperCrafting",
        loadedBuildId: "aaaaaaaa",
        deployedBuildId: "bbbbbbbb",
      },
      triage: "stale-ram",
      reason: "loaded-differs-from-deployed",
    },
    {
      name: "loaded == deployed → live-recurrence (on latest bytes and still crashing)",
      input: {
        attributedAddon: "TemperCrafting",
        loadedBuildId: "abc12345",
        deployedBuildId: "abc12345",
      },
      triage: "live-recurrence",
      reason: "loaded-matches-deployed",
    },
    {
      name: "lineage anchor (#13322/#13345): pre-guard loaded != guard deployed → stale-ram",
      input: {
        attributedAddon: "TemperCrafting",
        loadedBuildId: "11111111",
        deployedBuildId: "22222222",
      },
      triage: "stale-ram",
      reason: "loaded-differs-from-deployed",
    },
    {
      name: "attributable but loaded build absent (legacy/registry-less fire) → live-recurrence",
      input: {
        attributedAddon: "TemperCrafting",
        loadedBuildId: undefined,
        deployedBuildId: "abc12345",
      },
      triage: "live-recurrence",
      reason: "loaded-build-unknown",
    },
    {
      name: "attributed but no deployed build readable (external / not deployed) → unknown",
      input: {
        attributedAddon: "DolgubonsLazyWritCreator",
        loadedBuildId: "abc12345",
        deployedBuildId: undefined,
      },
      triage: "unknown",
      reason: "no-deployed-build",
    },
    {
      name: "no attributed addon and no inferred culprit → unknown",
      input: {
        attributedAddon: undefined,
        loadedBuildId: undefined,
        deployedBuildId: undefined,
      },
      triage: "unknown",
      reason: "unattributed",
    },
    {
      name: "no addon even with a stray loaded id and no inferred culprit → unknown",
      input: {
        attributedAddon: undefined,
        loadedBuildId: "abc12345",
        deployedBuildId: "abc12345",
      },
      triage: "unknown",
      reason: "unattributed",
    },
    {
      name: "Alan's proven case: CraftStoreFixed → TemperCrafting, loaded == deployed → live-recurrence",
      input: {
        attributedAddon: undefined,
        loadedBuildId: undefined,
        deployedBuildId: undefined,
        inferredCulprit: {
          addon: "TemperCrafting",
          loadedBuildId: "abc12345",
          deployedBuildId: "abc12345",
        },
      },
      triage: "live-recurrence",
      reason: "inferred-loaded-matches-deployed",
    },
    {
      name: "inferred culprit behind the deploy (loaded != deployed) → stale-ram",
      input: {
        attributedAddon: undefined,
        loadedBuildId: undefined,
        deployedBuildId: undefined,
        inferredCulprit: {
          addon: "TemperCrafting",
          loadedBuildId: "aaaaaaaa",
          deployedBuildId: "bbbbbbbb",
        },
      },
      triage: "stale-ram",
      reason: "inferred-loaded-differs-from-deployed",
    },
    {
      name: "inferred culprit, snapshot lacks its build (loaded unknown) → live-recurrence",
      input: {
        attributedAddon: undefined,
        loadedBuildId: undefined,
        deployedBuildId: undefined,
        inferredCulprit: {
          addon: "TemperCrafting",
          loadedBuildId: undefined,
          deployedBuildId: "abc12345",
        },
      },
      triage: "live-recurrence",
      reason: "inferred-loaded-build-unknown",
    },
    {
      name: "inferred culprit, no deployed build readable → unknown",
      input: {
        attributedAddon: undefined,
        loadedBuildId: undefined,
        deployedBuildId: undefined,
        inferredCulprit: {
          addon: "TemperCrafting",
          loadedBuildId: "abc12345",
          deployedBuildId: undefined,
        },
      },
      triage: "unknown",
      reason: "inferred-no-deployed-build",
    },
    {
      name: "attributed path wins over inferred when both present",
      input: {
        attributedAddon: "TemperInventory",
        loadedBuildId: "aaaaaaaa",
        deployedBuildId: "bbbbbbbb",
        inferredCulprit: {
          addon: "TemperCrafting",
          loadedBuildId: "cccccccc",
          deployedBuildId: "cccccccc",
        },
      },
      triage: "stale-ram",
      reason: "loaded-differs-from-deployed",
    },
  ]

  for (const c of cases) {
    it(`${c.triage} (${c.reason}): ${c.name}`, () => {
      const out = classifyTriage(c.input)
      expect(out.triage).toBe(c.triage)
      expect(out.reason).toBe(c.reason)
    })
  }
})
