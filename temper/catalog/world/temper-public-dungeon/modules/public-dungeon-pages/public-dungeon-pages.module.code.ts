import { ad1 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ad1/ad1.temper-public-dungeon.ts"
import { ad2 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ad2/ad2.temper-public-dungeon.ts"
import { ad3 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ad3/ad3.temper-public-dungeon.ts"
import { ad4 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ad4/ad4.temper-public-dungeon.ts"
import { ad5 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ad5/ad5.temper-public-dungeon.ts"
import { cg } from "akasha/temper/catalog/world/temper-public-dungeon/pages/cg/cg.temper-public-dungeon.ts"
import { ch } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ch/ch.temper-public-dungeon.ts"
import { dc1 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/dc1/dc1.temper-public-dungeon.ts"
import { dc2 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/dc2/dc2.temper-public-dungeon.ts"
import { dc3 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/dc3/dc3.temper-public-dungeon.ts"
import { dc4 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/dc4/dc4.temper-public-dungeon.ts"
import { dc5 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/dc5/dc5.temper-public-dungeon.ts"
import { dg } from "akasha/temper/catalog/world/temper-public-dungeon/pages/dg/dg.temper-public-dungeon.ts"
import { ep1 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ep1/ep1.temper-public-dungeon.ts"
import { ep2 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ep2/ep2.temper-public-dungeon.ts"
import { ep3 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ep3/ep3.temper-public-dungeon.ts"
import { ep4 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ep4/ep4.temper-public-dungeon.ts"
import { ep5 } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ep5/ep5.temper-public-dungeon.ts"
import { ghb } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ghb/ghb.temper-public-dungeon.ts"
import { go } from "akasha/temper/catalog/world/temper-public-dungeon/pages/go/go.temper-public-dungeon.ts"
import { lt } from "akasha/temper/catalog/world/temper-public-dungeon/pages/lt/lt.temper-public-dungeon.ts"
import { lw } from "akasha/temper/catalog/world/temper-public-dungeon/pages/lw/lw.temper-public-dungeon.ts"
import { nk } from "akasha/temper/catalog/world/temper-public-dungeon/pages/nk/nk.temper-public-dungeon.ts"
import { oc } from "akasha/temper/catalog/world/temper-public-dungeon/pages/oc/oc.temper-public-dungeon.ts"
import { rn } from "akasha/temper/catalog/world/temper-public-dungeon/pages/rn/rn.temper-public-dungeon.ts"
import { scc } from "akasha/temper/catalog/world/temper-public-dungeon/pages/scc/scc.temper-public-dungeon.ts"
import { sh } from "akasha/temper/catalog/world/temper-public-dungeon/pages/sh/sh.temper-public-dungeon.ts"
import { si } from "akasha/temper/catalog/world/temper-public-dungeon/pages/si/si.temper-public-dungeon.ts"
import { skw } from "akasha/temper/catalog/world/temper-public-dungeon/pages/skw/skw.temper-public-dungeon.ts"
import { ssh } from "akasha/temper/catalog/world/temper-public-dungeon/pages/ssh/ssh.temper-public-dungeon.ts"
import { tu } from "akasha/temper/catalog/world/temper-public-dungeon/pages/tu/tu.temper-public-dungeon.ts"
import { vfw } from "akasha/temper/catalog/world/temper-public-dungeon/pages/vfw/vfw.temper-public-dungeon.ts"
import { vnc } from "akasha/temper/catalog/world/temper-public-dungeon/pages/vnc/vnc.temper-public-dungeon.ts"
import { woo } from "akasha/temper/catalog/world/temper-public-dungeon/pages/woo/woo.temper-public-dungeon.ts"
import { wrk } from "akasha/temper/catalog/world/temper-public-dungeon/pages/wrk/wrk.temper-public-dungeon.ts"
import { za } from "akasha/temper/catalog/world/temper-public-dungeon/pages/za/za.temper-public-dungeon.ts"
import type { TemperPublicDungeon } from "akasha/temper/catalog/world/temper-public-dungeon/temper-public-dungeon.page-type.types.ts"

const PAGES = [
  ad1,
  ad2,
  ad3,
  ad4,
  ad5,
  cg,
  ch,
  dc1,
  dc2,
  dc3,
  dc4,
  dc5,
  dg,
  ep1,
  ep2,
  ep3,
  ep4,
  ep5,
  ghb,
  go,
  lt,
  lw,
  nk,
  oc,
  rn,
  scc,
  sh,
  si,
  skw,
  ssh,
  tu,
  vfw,
  vnc,
  woo,
  wrk,
  za,
] as const satisfies readonly TemperPublicDungeon[]

type PublicDungeonPage = (typeof PAGES)[number]

export const PUBLIC_DUNGEON_PAGES: readonly PublicDungeonPage[] = [...PAGES].sort(
  (one, other) => one.displayOrder - other.displayOrder
)
