import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperBuildOptimization = {
  id: "01a159d5-030c-729c-9b01-a19b08594e31",
  type: "page-type/domain",
  slug: "temper-build-optimization",
  definition: "how a build that maximizes a stat is found",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "build optimization" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build is searched over every race, every class's skill lines and every piece of gear.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build may use both bars, and a buff cast on one bar holds on the other.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game shows a pet's buff only while its summon is on the bar held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build holds only what raises its target stat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each piece earns its place by the prediction dropping without that piece.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build never holds a weight or weapon type its set does not allow.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game turns class mastery off while a build holds another class's skill line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build's search compares class mastery, with all three lines its own class's, against subclassing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bonus under a condition is weighed against the condition's cost, as a drink displaces food.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A curse ultimate such as Swarming Scion counts, by the buff it grants while transformed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A buff from a trial dummy or a group counts where the capture will have that buff.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build states which buffs from a trial dummy or a group it assumes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every candidate is scored by `calculateBuildStatsByBar` or by `akasha temper build-show`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only `calculateBuildStatsByBar` takes the buffs a build assumes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build design reports every term with no verified test case, as each becomes a capture.",
    },
  ],
  createdAt: "2026-10-20T15:01:34.603Z",
  updatedAt: "2026-10-20T15:09:39.870Z",
} as const satisfies Domain
