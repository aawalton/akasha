import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const temperMemoryReading = {
  id: "01a15590-a44d-7ba0-b358-ed0c4ef0b3da",
  type: "page-type/service-workstation",
  slug: "temper-memory-reading",
  definition: "the service landing the build readings and fights the game holds, as they happen",
  enabled: true,
  needsSecrets: false,
  systemd: {
    after: ["page-service.service"],
    wants: ["page-service.service"],
    restart: "on-failure",
    restartDelaySeconds: 10,
    startLimitIntervalSeconds: 0,
  },
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to the game or attaches to the game as a debugger.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here is part of the watcher or of any add-on, and nothing here is sent away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's memory is looked at every second while the game runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's globals are found again at most every fifteen seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search finding a global's name with no string for it is followed at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The globals are found again where they no longer read, and once a minute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global that a search misses is kept while it still reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "While the globals kept still read, a search looks only where they were found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every region is searched only once a global kept no longer reads, or after a write.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The characters' saved variables are written by a reload and by other writers alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "After that file is written, four searches look past the globals held then.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global those searches do not replace is kept while it still reads.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Each new reading of a bar replaces the last in the game, so a slow look loses it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A look queues what it found to land and goes on without waiting for the landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A look that fails is said in the log and the next look goes on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop asked during a search ends that search before its next chunk is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search a stop ended keeps nothing it found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop lands what is queued before the service ends, for at most five seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service reaches every page over page-service rather than over the checkout.",
    },
  ],
  createdAt: "2026-10-19T19:08:25.036Z",
  updatedAt: "2026-10-21T12:23:12.483Z",
} as const satisfies ServiceWorkstation
