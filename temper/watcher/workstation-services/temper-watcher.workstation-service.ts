import type { WorkstationService } from "akasha/services/workstation-services/workstation-service.page-type.ts"

export const temperWatcher = {
  id: "01a06039-9c8b-7942-a8fc-234055602831",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "temper-watcher",
  definition: "the service carrying what Alan does in the game across to the web",
  runs: ["bun temper/watcher/watcher-running/watcher-running.module.code.ts"],
  enabled: true,
  needsSecrets: true,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
    successExitStatus: 75,
    restartForceExitStatus: 75,
    startLimitIntervalSeconds: 0,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit running the worker is a simple unit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change to the worker reaches the workstation on a restart rather than on a deploy.",
    },
    {
      invariantKind: "departure",
      statement: "Exit 75 is the worker asking to start again and is counted as a clean stop.",
    },
    {
      invariantKind: "departure",
      statement: "Repeated starts are counted over no window.",
    },
    {
      invariantKind: "departure",
      statement: "A watcher failing all night keeps on.",
    },
  ],
} as const satisfies WorkstationService
