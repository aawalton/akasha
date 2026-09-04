import type { Command } from "@akasha/command-system/command"

export const auditEsoTypingsFresh = {
  id: "01a0685d-f8fa-7053-bb0f-5165c5bbb41a",
  pageTypeSlug: "command",
  slug: "audit-eso-typings-fresh",
  definition:
    "the command reading which committed game artifacts are stamped behind the clone they came from",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--repo-root <path>",
      takes: "the checkout the committed artifacts are read from",
    },
    {
      said: "--eso-doc <path>",
      takes: "the documentation file the clone's API version is read from",
    },
    {
      said: "--json",
      takes: "give the reading as one line of JSON rather than as the report a person reads",
    },
  ],
  helpNotes: [
    "this needs two trees at once: the committed artifacts under `akasha/temper`, and the `~/esoui` clone they were generated from.",
    "every clone-derived artifact carries a line naming the command that rebuilds it and a stamp of the API version it was built at; the clone carries its own version in its documentation header.",
    "where the two disagree the committed artifact describes an API the game has moved past, and the fix is to run the command the artifact's own provenance line names.",
    "this was the drift arm of the freshness check and could not stay a check: the clone sits outside the repository the check ran in, so an identical tree got a pass or a failure depending on a file under the home directory that no reading of the change under test would show.",
    "worse, the pipeline never had the clone at all, so that arm quietly dropped to a weaker committed-only comparison on every pipeline run and still printed green.",
    "what stayed a check is the arm a change under test can answer: that every clone-derived artifact carries a stamp, and that the stamps agree with each other.",
    "this reports and never refuses on a finding, because a stale stamp may want the artifact rebuilt or may want the clone updated first, and only a reading tells which.",
    "it refuses only where the comparison could not be made at all, which is the condition the check had to swallow and this one may state.",
    "an artifact carrying no stamp is set aside and named apart, there being nothing on it to compare; the check is what reports those.",
    "the denominator is the artifacts compared, which is the population found less those set aside.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading needs the clone and the checkout at once.",
    },
    {
      invariantKind: "departure",
      statement: "A finding is reported rather than refused, and a run with findings still passes.",
    },
    {
      invariantKind: "departure",
      statement: "A comparison that could not be made refuses rather than reading as no drift.",
    },
    {
      invariantKind: "departure",
      statement: "An artifact carrying no stamp is set aside and named apart from the comparison.",
    },
    {
      invariantKind: "departure",
      statement: "The denominator is the artifacts compared rather than the artifacts found.",
    },
    {
      invariantKind: "departure",
      statement: "A finding names the command that rebuilds the artifact.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes an artifact or the clone.",
    },
  ],
} as const satisfies Command
