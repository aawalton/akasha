import { SKYSHARDS_PAGES_1 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-1/skyshards-pages-1.module.code.ts"
import { SKYSHARDS_PAGES_2 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-2/skyshards-pages-2.module.code.ts"
import { SKYSHARDS_PAGES_3 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-3/skyshards-pages-3.module.code.ts"
import { SKYSHARDS_PAGES_4 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-4/skyshards-pages-4.module.code.ts"
import { SKYSHARDS_PAGES_5 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-5/skyshards-pages-5.module.code.ts"
import { SKYSHARDS_PAGES_6 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-6/skyshards-pages-6.module.code.ts"
import { SKYSHARDS_PAGES_7 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-7/skyshards-pages-7.module.code.ts"
import { SKYSHARDS_PAGES_8 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-8/skyshards-pages-8.module.code.ts"
import { SKYSHARDS_PAGES_9 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-9/skyshards-pages-9.module.code.ts"
import { SKYSHARDS_PAGES_10 } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pages-10/skyshards-pages-10.module.code.ts"
import type {
  SkyshardPin,
  SkyshardsData,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-types/skyshards-types.module.code.ts"
import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

type MapPosition = TemperWorldSkyshard["mapPositions"][number]

const RUNS: readonly (readonly TemperWorldSkyshard[])[] = [
  SKYSHARDS_PAGES_1,
  SKYSHARDS_PAGES_2,
  SKYSHARDS_PAGES_3,
  SKYSHARDS_PAGES_4,
  SKYSHARDS_PAGES_5,
  SKYSHARDS_PAGES_6,
  SKYSHARDS_PAGES_7,
  SKYSHARDS_PAGES_8,
  SKYSHARDS_PAGES_9,
  SKYSHARDS_PAGES_10,
]

function pinAt(this: void, page: TemperWorldSkyshard, position: MapPosition): SkyshardPin {
  const kinds = position.placeKinds
  const x = position.mapX
  const y = position.mapY
  const achievementId = page.esoAchievementId
  const shardNumber = page.shardNumber
  if (kinds === undefined) return [x, y, achievementId, shardNumber]
  const first = kinds[0] as number
  const second = kinds[1]
  if (second === undefined) return [x, y, achievementId, shardNumber, first]
  return [x, y, achievementId, shardNumber, first, second]
}

function gathered(this: void): SkyshardsData {
  const data: Record<string, Record<string, SkyshardPin[]>> = {}
  for (const run of RUNS) {
    for (const page of run) {
      for (const position of page.mapPositions) {
        let folder = data[position.mapFolder]
        if (folder === undefined) {
          folder = {}
          data[position.mapFolder] = folder
        }
        let pins = folder[position.mapTile]
        if (pins === undefined) {
          pins = []
          folder[position.mapTile] = pins
        }
        pins.push(pinAt(page, position))
      }
    }
  }
  return data
}

export const SKYSHARDS_DATA: SkyshardsData = gathered()
