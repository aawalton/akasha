import type { Command } from "@akasha/command-system/command"

export const temperUpstreamDataVerify = {
  id: "01a0603c-c1da-7a8b-ad5e-79907918ed2a",
  pageTypeSlug: "command",
  slug: "temper-upstream-data-verify",
  definition: "the command ruling whether a ported upstream library's data still matches upstream",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "<library>", takes: "which upstream library's port is ruled on" }],
  helpNotes: [
    "the libraries it carries are housing, lib-map-data, lib-treasure and lib-zone.",
    "the comparison is leaf for leaf rather than file for file.",
    "a difference refuses the call and names where the two part.",
    "a library this does not carry is refused by name.",
    "an upstream file this cannot find refuses the call, because a run over an absent upstream reports whatever a clean run reports.",
    "the upstream is the third-party library a live ESO install carries, which our own deployed addons overwrite.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The comparison is leaf for leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A difference refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names where the two part.",
    },
    {
      invariantKind: "departure",
      statement: "An upstream file that is not on this workstation refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The report says how many leaves agreed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
} as const satisfies Command
