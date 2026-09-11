import type { TemperZone } from "akasha/temper/catalog/temper-world/temper-zones/temper-zone.page-type.types.ts"

export const telvanniPeninsula = {
  id: "019e17d9-43a1-7d0a-aef5-a83b28bee512",
  type: "temper-zone",
  slug: "telvanni-peninsula",
  title: "Telvanni Peninsula",
  dropsScripts: true,
  isDlc: true,
} as const satisfies TemperZone
