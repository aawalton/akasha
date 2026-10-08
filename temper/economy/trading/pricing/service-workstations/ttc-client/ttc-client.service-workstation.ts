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
    restart: "on-failure",
    restartDelaySeconds: 10,
    stops: ["-/usr/bin/systemctl --user stop app-flatpak-com.github.Matoking.protontricks-*.scope"],
  },
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceWorkstation
