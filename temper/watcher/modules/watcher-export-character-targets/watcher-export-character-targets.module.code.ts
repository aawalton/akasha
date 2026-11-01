import { stringAt } from "akasha/code/type/narrowing/modules/string-at/string-at.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { championPoints } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { slugOf } from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import {
  esoNumberOfTrait,
  traitTable,
} from "akasha/temper/catalog/gear/equipment/modules/trait-reading/trait-reading.module.code.ts"
import { targetBuildIdsOf } from "akasha/temper/items/rules/core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import {
  type BuildInterfaceHeld,
  buildInterfaceHeldOf,
  withBuildInterfaces,
} from "akasha/temper/player/character/build/modules/build-interface-expanding/build-interface-expanding.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import {
  type CharacterTarget,
  TARGET_DISCIPLINES,
  type TargetBarSlot,
  type TargetDiscipline,
  type TargetDisciplineKey,
  type TargetGear,
  type TargetStar,
} from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"
import { buildInterface } from "akasha/temper/player/character/build-interface/build-interface.page-type.ts"
import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlotItem,
} from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { setsAll } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { scribedSkills } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import {
  foodOrDrink,
  foodOrDrinkAt,
} from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import {
  mundus,
  mundusAt,
} from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import {
  CHARACTER_BUILD_PAGE_TYPE_SLUG,
  CHARACTER_PAGE_TYPE_SLUG,
  DEFAULT_PAGE_READER,
  type PageReader,
} from "akasha/temper/watcher/modules/watcher-settings-equipment/watcher-settings-equipment.module.code.ts"

const ROWS_PER_READ = 1000

const BAR_SLOTS = ["active-1", "active-2", "active-3", "active-4", "active-5", "ultimate"] as const

const NO_STAR: TargetStar = { id: 0, name: "" }

function starOf(starId: string): TargetStar {
  const star = championPoints.data[starId as keyof typeof championPoints.data]
  if (star === undefined || star.esoChampionSkillId === 0) return NO_STAR
  return { id: star.esoChampionSkillId, name: star.name }
}

function disciplineOf(build: CharacterState, discipline: TargetDisciplineKey): TargetDiscipline {
  const held = build.championPoints[discipline]
  const stars: TargetStar[] = []
  const seen = new Set<number>()
  for (const starId of [...held.slotted, ...held.passive]) {
    const star = starOf(starId)
    if (star.id === 0 || seen.has(star.id)) continue
    seen.add(star.id)
    stars.push(star)
  }
  return { discipline, slotted: held.slotted.map(starOf), stars }
}

const NO_SKILL: TargetBarSlot = { name: "", abilityId: 0 }

function barSlotOf(skillId: string): TargetBarSlot {
  const scribed = scribedSkills.data[skillId as keyof typeof scribedSkills.data]
  if (scribed !== undefined) return { name: scribed.name, abilityId: 0 }
  const skill = skills.data[skillId as keyof typeof skills.data]
  if (skill === undefined || skill.esoAbilityId === 0) return NO_SKILL
  return { name: skill.name, abilityId: skill.esoAbilityId }
}

function barOf(bar: Readonly<Record<string, string>>): readonly TargetBarSlot[] {
  return BAR_SLOTS.map((slot) => barSlotOf(bar[slot] ?? ""))
}

type TraitFamily = "armor" | "weapon" | "jewelry"

function gearOf(
  slot: string,
  item: ArmorSlotItem | JewelrySlotItem | WeaponSlotItem
): TargetGear | null {
  if (item.itemType === "empty") return null
  if (item.itemType === "weapon" && item.data.type === "no-type") return null
  const set = setsAll().data[item.data.set]
  if (set === undefined || set.esoSetId === 0) return null
  const family: TraitFamily =
    item.itemType === "weapon" ? "weapon" : item.itemType === "jewelry" ? "jewelry" : "armor"
  const traitId: string = item.data.trait
  return {
    slot,
    setId: set.esoSetId,
    setName: set.name,
    trait: esoNumberOfTrait(family, traitId),
    traitName: traitTable(family).data[traitId]?.name ?? "",
  }
}

function gearListOf(build: CharacterState): readonly TargetGear[] {
  const equipment = build.equipment
  const placed: (TargetGear | null)[] = [
    ...Object.entries(equipment.armor).map(([slot, item]) => gearOf(slot, item)),
    ...Object.entries(equipment.jewelry).map(([slot, item]) => gearOf(slot, item)),
    gearOf("primary-main-hand", equipment["primary-weapon-bar"]["main-hand"]),
    gearOf("primary-off-hand", equipment["primary-weapon-bar"]["off-hand"]),
    gearOf("backup-main-hand", equipment["backup-weapon-bar"]["main-hand"]),
    gearOf("backup-off-hand", equipment["backup-weapon-bar"]["off-hand"]),
  ]
  return placed.filter((one): one is TargetGear => one !== null)
}

function mundusOf(build: CharacterState): CharacterTarget["mundus"] {
  const id = build.character.mundusStone
  if (!mundus().has(id)) return undefined
  const stone = mundusAt(id)
  if (stone.esoMundusId === 0) return undefined
  return { name: stone.name, abilityId: stone.esoMundusId }
}

function foodOf(build: CharacterState): CharacterTarget["food"] {
  const id = build.consumables.foodOrDrink
  if (!foodOrDrink().has(id)) return undefined
  const food = foodOrDrinkAt(id)
  if (food.itemId === 0 || food.abilityId === null) return undefined
  return { name: food.name, abilityId: food.abilityId, itemId: food.itemId }
}

export function characterTargetOf(
  build: CharacterState,
  title: string,
  buildId: string
): CharacterTarget {
  const mundusTarget = mundusOf(build)
  const foodTarget = foodOf(build)
  return {
    buildId,
    title,
    attributes: { ...build.character.attributes },
    champion: TARGET_DISCIPLINES.map((discipline) => disciplineOf(build, discipline)),
    bars: {
      primary: barOf(build.skills["primary-skill-bar"]),
      backup: barOf(build.skills["backup-skill-bar"]),
    },
    ...(mundusTarget === undefined ? {} : { mundus: mundusTarget }),
    ...(foodTarget === undefined ? {} : { food: foodTarget }),
    gear: gearListOf(build),
  }
}

export async function compileCharacterTargets(
  accountPage: string,
  reader: PageReader = DEFAULT_PAGE_READER,
  catalogsRead: () => Promise<unknown> = () => Promise.all([loadSkillCatalog(), loadSetCatalog()])
): Promise<Record<string, readonly CharacterTarget[]>> {
  const characters = await reader.collect({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: accountPage }],
    pageSize: ROWS_PER_READ,
  })
  const targets: Record<string, readonly CharacterTarget[]> = {}
  let catalogs: Promise<unknown> | null = null
  const readCatalogs = (): Promise<unknown> => (catalogs ??= catalogsRead())
  for (const character of characters) {
    const esoCharacterId = stringAt(character, "esoCharacterId")
    if (esoCharacterId === null) continue
    const listed: CharacterTarget[] = []
    const named = {
      targetBuildId: stringAt(character, "targetBuildId"),
      targetBuildIds: stringsIn(character["targetBuildIds"]),
    }
    for (const buildId of targetBuildIdsOf(named)) {
      const target = await targetOf(buildId, reader, readCatalogs)
      if (target !== null) listed.push(target)
    }
    if (listed.length > 0) targets[esoCharacterId] = listed
  }
  return targets
}

async function targetOf(
  buildId: string,
  reader: PageReader,
  readCatalogs: () => Promise<unknown>
): Promise<CharacterTarget | null> {
  const build = await reader.get({
    pageTypeSlug: CHARACTER_BUILD_PAGE_TYPE_SLUG,
    where: [{ key: "id", eq: buildId }],
    select: ["buildHash", "title", "buildInterfaces"],
  })
  const hash = build === null ? null : stringAt(build, "buildHash")
  if (build === null || hash === null) return null
  await readCatalogs()
  const decoded = decodeBuild(buildHash(hash))
  if (decoded === null) return null
  const held = await interfacesOf(stringsIn(build["buildInterfaces"]), reader)
  return characterTargetOf(
    withBuildInterfaces(decoded, held),
    stringAt(build, "title") ?? "",
    buildId
  )
}

const INTERFACE_KEYS = [
  "passiveLines",
  "passiveLineCategories",
  "leftOutPassives",
  "interfacePassives",
  "everyPassiveStar",
  "slottedStars",
]

async function interfacesOf(
  named: readonly string[],
  reader: PageReader
): Promise<readonly BuildInterfaceHeld[]> {
  const held: BuildInterfaceHeld[] = []
  for (const address of named) {
    const page = await reader.get({
      pageTypeSlug: buildInterface.slug,
      where: [{ key: "slug", eq: slugOf(address) }],
      select: INTERFACE_KEYS,
    })
    if (page === null)
      throw new Error(`a build includes \`${address}\`, which is no build interface`)
    held.push(buildInterfaceHeldOf(page))
  }
  return held
}
