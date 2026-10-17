import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const ttcClient = {
  id: "01a06829-0194-7e8a-b87b-1e6e9ea4fe59",
  type: "page-type/service-workstation",
  slug: "ttc-client",
  definition: "the service keeping Tamriel Trade Centre prices current inside the game's prefix",

  enabled: true,
  needsSecrets: false,
  systemd: {
    after: ["graphical-session.target"],
    partOf: "graphical-session.target",
    wantedBy: "graphical-session.target",
    restart: "always",
    restartDelaySeconds: 10,
    stops: ["-/usr/bin/systemctl --user stop app-flatpak-com.github.Matoking.protontricks-*.scope"],
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The client is started again after any exit, since closing the game ends it cleanly.",
    },
  ],
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-10-17T22:34:57.559Z",
} as const satisfies ServiceWorkstation
