import { characterEquip } from "akasha/temper/player/progress/temper-item-action/pages/character-equip.temper-item-action.ts"
import { companionEquip } from "akasha/temper/player/progress/temper-item-action/pages/companion-equip.temper-item-action.ts"
import { deconstruct } from "akasha/temper/player/progress/temper-item-action/pages/deconstruct.temper-item-action.ts"
import { destroy } from "akasha/temper/player/progress/temper-item-action/pages/destroy.temper-item-action.ts"
import { fenceLaunder } from "akasha/temper/player/progress/temper-item-action/pages/fence-launder.temper-item-action.ts"
import { fenceSell } from "akasha/temper/player/progress/temper-item-action/pages/fence-sell.temper-item-action.ts"
import { list } from "akasha/temper/player/progress/temper-item-action/pages/list.temper-item-action.ts"
import { lock } from "akasha/temper/player/progress/temper-item-action/pages/lock.temper-item-action.ts"
import { mail } from "akasha/temper/player/progress/temper-item-action/pages/mail.temper-item-action.ts"
import { moveTo } from "akasha/temper/player/progress/temper-item-action/pages/move-to.temper-item-action.ts"
import { nothing } from "akasha/temper/player/progress/temper-item-action/pages/nothing.temper-item-action.ts"
import { open } from "akasha/temper/player/progress/temper-item-action/pages/open.temper-item-action.ts"
import { refine } from "akasha/temper/player/progress/temper-item-action/pages/refine.temper-item-action.ts"
import { research } from "akasha/temper/player/progress/temper-item-action/pages/research.temper-item-action.ts"
import { sell } from "akasha/temper/player/progress/temper-item-action/pages/sell.temper-item-action.ts"
import { stock } from "akasha/temper/player/progress/temper-item-action/pages/stock.temper-item-action.ts"
import { unlock } from "akasha/temper/player/progress/temper-item-action/pages/unlock.temper-item-action.ts"
import { use } from "akasha/temper/player/progress/temper-item-action/pages/use.temper-item-action.ts"
import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const ITEM_ACTION_PAGES = [
  nothing,
  lock,
  unlock,
  moveTo,
  stock,
  characterEquip,
  companionEquip,
  deconstruct,
  refine,
  destroy,
  fenceLaunder,
  fenceSell,
  list,
  mail,
  research,
  sell,
  use,
  open,
] as const satisfies readonly TemperItemAction[]
