import { expect, test } from "bun:test"
import { readSkillHealing } from "akasha/temper/player/character/stat/modules/skill-healing/skill-healing.module.code.ts"

const BURNING_EMBERS =
  "Slash your foe with a fiery claw, dealing |cffffff4038|r Flame Damage and an additional |cffffff11425|r Flame Damage over |cffffff10|r seconds.\n\nYou heal for |cffffff4291|r Health from the initial hit and |cffffff644|r Health each subsequent tick, scaling off your Max Health.\n\nThe initial hit always applies the Burning status effect."

const BRAWLER =
  "Focus your strength into a mighty swing, dealing |cffffff6401|r Physical Damage to enemies in front of you.\n\nYou also gain a damage shield that absorbs |cffffff6381|r damage for |cffffff6|r seconds. Each enemy hit increases the damage shield's strength by |cffffff50|r%, up to |cffffff300|r%."

const FLAME_LASH =
  "Lash an enemy with flame, dealing |cffffff8076|r Flame Damage and healing for |cffffff2514|r Health.\n\nActivating again consumes a stack to deal |cffffff15931|r Flame Damage to your target and all nearby enemies and heals for |cffffff10063|r Health."

const FIRE_KEEPER =
  "Throw out a purifying flame, filling a large area with warmth for |cffffff15|r seconds. This fire heals you and your allies at the target location for |cffffff1414|r Health every |cffffff1|r second. This healing increases by |cffffff50|r% if you are in the area."

const HEART_OF_FLAME =
  "Let the fire within draw heat to your heart, restoring |cffffff15|r% of your missing Health and |cffffff15|r% of your missing Magicka and Stamina every |cffffff2|r seconds over |cffffff4|r seconds."

test("a heal on the initial hit and at each tick is read as both, ticking every 2 seconds", () => {
  expect(readSkillHealing(BURNING_EMBERS)).toEqual({
    direct: 4291,
    shield: 0,
    tick: 644,
    tickSeconds: 2,
    unread: [],
  })
})

test("a damage shield is read, and its growth per enemy is kept as unread", () => {
  const read = readSkillHealing(BRAWLER)
  expect(read.shield).toBe(6381)
  expect(read.direct).toBe(0)
  expect(read.unread).toEqual([
    "Each enemy hit increases the damage shield's strength by 50%, up to 300%.",
  ])
})

test("only the first heal counts, so a heal on a later activation does not", () => {
  const read = readSkillHealing(FLAME_LASH)
  expect(read.direct).toBe(2514)
  expect(read.unread).toEqual([])
})

test("a heal every so many seconds is read as a tick at that interval", () => {
  const read = readSkillHealing(FIRE_KEEPER)
  expect(read.tick).toBe(1414)
  expect(read.tickSeconds).toBe(1)
  expect(read.unread).toEqual(["This healing increases by 50% if you are in the area."])
})

test("healing from missing health is no shape read here, so it is kept as unread", () => {
  const read = readSkillHealing(HEART_OF_FLAME)
  expect(read.direct + read.shield + read.tick).toBe(0)
  expect(read.unread.length).toBe(1)
})

test("a skill naming no healing reads as none", () => {
  expect(readSkillHealing("Deals |cffffff9021|r Flame Damage.")).toEqual({
    direct: 0,
    shield: 0,
    tick: 0,
    tickSeconds: 2,
    unread: [],
  })
})
