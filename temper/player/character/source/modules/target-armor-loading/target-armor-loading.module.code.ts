import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { heldReading } from "akasha/page/service/modules/held-reading/held-reading.module.code.ts"
import { temperTargetArmor } from "akasha/temper/catalog/effect/temper-target-armor/temper-target-armor.page-type.ts"
import {
  holdTargetArmors,
  targetArmorsOf,
} from "akasha/temper/player/character/source/modules/target-armors/target-armors.module.code.ts"

const EVERY = 50

const TARGET_ARMOR_KEYS: readonly string[] = ["slug", "key", "title", "armor", "defaultTarget"]

async function readTargetArmors(): Promise<ReturnType<typeof holdTargetArmors>> {
  const { rows } = await getPages({
    pageTypeSlug: temperTargetArmor.slug,
    select: [...TARGET_ARMOR_KEYS],
    limit: EVERY,
  })
  return holdTargetArmors(targetArmorsOf(rows))
}

const kept = heldReading([temperTargetArmor.slug], readTargetArmors)

export async function loadTargetArmors(): Promise<ReturnType<typeof holdTargetArmors>> {
  return await kept()
}
