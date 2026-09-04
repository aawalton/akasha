import type { Reagent } from "../potion-types/potion-types.module.code.ts"

export function buildReagentsById(
  traitNames: (this: void, key: string) => string
): Record<number, Reagent> {
  return {
    [30165]: {
      traits: {
        [traitNames("Ravage Health")]: false,
        [traitNames("Lower Spell Crit")]: false,
        [traitNames("Lower Weapon Crit")]: false,
        [traitNames("Invisible")]: false,
      },
      itemId: 30165,
    },
    [30158]: {
      traits: {
        [traitNames("Increase Spell Power")]: false,
        [traitNames("Restore Magicka")]: false,
        [traitNames("Lower Spell Resist")]: false,
        [traitNames("Spell Crit")]: false,
      },
      itemId: 30158,
    },
    [30155]: {
      traits: {
        [traitNames("Ravage Stamina")]: false,
        [traitNames("Lower Weapon Power")]: false,
        [traitNames("Restore Health")]: false,
        [traitNames("Reduce Speed")]: false,
      },
      itemId: 30155,
    },
    [30152]: {
      traits: {
        [traitNames("Lower Spell Resist")]: false,
        [traitNames("Ravage Health")]: false,
        [traitNames("Increase Spell Power")]: false,
        [traitNames("Ravage Magicka")]: false,
      },
      itemId: 30152,
    },
    [30162]: {
      traits: {
        [traitNames("Increase Weapon Power")]: false,
        [traitNames("Restore Stamina")]: false,
        [traitNames("Lower Armor")]: false,
        [traitNames("Weapon Crit")]: false,
      },
      itemId: 30162,
    },
    [30148]: {
      traits: {
        [traitNames("Ravage Magicka")]: false,
        [traitNames("Lower Spell Power")]: false,
        [traitNames("Restore Health")]: false,
        [traitNames("Invisible")]: false,
      },
      itemId: 30148,
    },
    [30149]: {
      traits: {
        [traitNames("Lower Armor")]: false,
        [traitNames("Ravage Health")]: false,
        [traitNames("Increase Weapon Power")]: false,
        [traitNames("Ravage Stamina")]: false,
      },
      itemId: 30149,
    },
    [30161]: {
      traits: {
        [traitNames("Restore Magicka")]: false,
        [traitNames("Increase Spell Power")]: false,
        [traitNames("Ravage Health")]: false,
        [traitNames("Detection")]: false,
      },
      itemId: 30161,
    },
    [30160]: {
      traits: {
        [traitNames("Increase Spell Resist")]: false,
        [traitNames("Restore Health")]: false,
        [traitNames("Lower Spell Power")]: false,
        [traitNames("Restore Magicka")]: false,
      },
      itemId: 30160,
    },
    [30154]: {
      traits: {
        [traitNames("Lower Spell Power")]: false,
        [traitNames("Ravage Magicka")]: false,
        [traitNames("Increase Spell Resist")]: false,
        [traitNames("Detection")]: false,
      },
      itemId: 30154,
    },
    [30157]: {
      traits: {
        [traitNames("Restore Stamina")]: false,
        [traitNames("Increase Weapon Power")]: false,
        [traitNames("Ravage Health")]: false,
        [traitNames("Speed")]: false,
      },
      itemId: 30157,
    },
    [30151]: {
      traits: {
        [traitNames("Ravage Health")]: false,
        [traitNames("Ravage Magicka")]: false,
        [traitNames("Ravage Stamina")]: false,
        [traitNames("Stun")]: false,
      },
      itemId: 30151,
    },
    [30164]: {
      traits: {
        [traitNames("Restore Health")]: false,
        [traitNames("Restore Magicka")]: false,
        [traitNames("Restore Stamina")]: false,
        [traitNames("Unstoppable")]: false,
      },
      itemId: 30164,
    },
    [30159]: {
      traits: {
        [traitNames("Weapon Crit")]: false,
        [traitNames("Reduce Speed")]: false,
        [traitNames("Detection")]: false,
        [traitNames("Unstoppable")]: false,
      },
      itemId: 30159,
    },
    [30163]: {
      traits: {
        [traitNames("Increase Armor")]: false,
        [traitNames("Restore Health")]: false,
        [traitNames("Lower Weapon Power")]: false,
        [traitNames("Restore Stamina")]: false,
      },
      itemId: 30163,
    },
    [30153]: {
      traits: {
        [traitNames("Spell Crit")]: false,
        [traitNames("Speed")]: false,
        [traitNames("Invisible")]: false,
        [traitNames("Unstoppable")]: false,
      },
      itemId: 30153,
    },
    [30156]: {
      traits: {
        [traitNames("Lower Weapon Power")]: false,
        [traitNames("Ravage Stamina")]: false,
        [traitNames("Increase Armor")]: false,
        [traitNames("Lower Weapon Crit")]: false,
      },
      itemId: 30156,
    },
    [30166]: {
      traits: {
        [traitNames("Restore Health")]: false,
        [traitNames("Spell Crit")]: false,
        [traitNames("Weapon Crit")]: false,
        [traitNames("Stun")]: false,
      },
      itemId: 30166,
    },
    [77581]: {
      traits: {
        [traitNames("Lower Armor")]: false,
        [traitNames("Lower Weapon Crit")]: false,
        [traitNames("Detection")]: false,
        [traitNames("Vitality")]: false,
      },
      itemId: 77581,
    },
    [77583]: {
      traits: {
        [traitNames("Lower Spell Resist")]: false,
        [traitNames("Increase Armor")]: false,
        [traitNames("Protection")]: false,
        [traitNames("Vitality")]: false,
      },
      itemId: 77583,
    },
    [77584]: {
      traits: {
        [traitNames("Reduce Speed")]: false,
        [traitNames("Invisible")]: false,
        [traitNames("Sustained Restore Health")]: false,
        [traitNames("Defile")]: false,
      },
      itemId: 77584,
    },
    [77585]: {
      traits: {
        [traitNames("Restore Health")]: false,
        [traitNames("Lower Spell Crit")]: false,
        [traitNames("Sustained Restore Health")]: false,
        [traitNames("Vitality")]: false,
      },
      itemId: 77585,
    },
    [77587]: {
      traits: {
        [traitNames("Ravage Stamina")]: false,
        [traitNames("Vulnerability")]: false,
        [traitNames("Creeping Ravage Health")]: false,
        [traitNames("Vitality")]: false,
      },
      itemId: 77587,
    },
    [77589]: {
      traits: {
        [traitNames("Ravage Magicka")]: false,
        [traitNames("Speed")]: false,
        [traitNames("Vulnerability")]: false,
        [traitNames("Sustained Restore Health")]: false,
      },
      itemId: 77589,
    },
    [77590]: {
      traits: {
        [traitNames("Ravage Health")]: false,
        [traitNames("Protection")]: false,
        [traitNames("Creeping Ravage Health")]: false,
        [traitNames("Defile")]: false,
      },
      itemId: 77590,
    },
    [77591]: {
      traits: {
        [traitNames("Increase Spell Resist")]: false,
        [traitNames("Increase Armor")]: false,
        [traitNames("Protection")]: false,
        [traitNames("Defile")]: false,
      },
      itemId: 77591,
    },
    [139019]: {
      traits: {
        [traitNames("Sustained Restore Health")]: false,
        [traitNames("Speed")]: false,
        [traitNames("Vitality")]: false,
        [traitNames("Protection")]: false,
      },
      itemId: 139019,
    },
    [139020]: {
      traits: {
        [traitNames("Increase Spell Resist")]: false,
        [traitNames("Reduce Speed")]: false,
        [traitNames("Vulnerability")]: false,
        [traitNames("Defile")]: false,
      },
      itemId: 139020,
    },
    [150731]: {
      traits: {
        [traitNames("Sustained Restore Health")]: false,
        [traitNames("Restore Stamina")]: false,
        [traitNames("Heroism")]: false,
        [traitNames("Defile")]: false,
      },
      itemId: 150731,
    },
    [150789]: {
      traits: {
        [traitNames("Heroism")]: false,
        [traitNames("Vulnerability")]: false,
        [traitNames("Invisible")]: false,
        [traitNames("Vitality")]: false,
      },
      itemId: 150789,
    },
    [150671]: {
      traits: {
        [traitNames("Restore Magicka")]: false,
        [traitNames("Heroism")]: false,
        [traitNames("Lower Weapon Crit")]: false,
        [traitNames("Speed")]: false,
      },
      itemId: 150671,
    },
    [150669]: {
      traits: {
        [traitNames("Timidity")]: false,
        [traitNames("Ravage Magicka")]: false,
        [traitNames("Restore Stamina")]: false,
        [traitNames("Detection")]: false,
      },
      itemId: 150669,
    },
    [150670]: {
      traits: {
        [traitNames("Timidity")]: false,
        [traitNames("Ravage Health")]: false,
        [traitNames("Restore Magicka")]: false,
        [traitNames("Protection")]: false,
      },
      itemId: 150670,
    },
    [150672]: {
      traits: {
        [traitNames("Timidity")]: false,
        [traitNames("Spell Crit")]: false,
        [traitNames("Creeping Ravage Health")]: false,
        [traitNames("Restore Health")]: false,
      },
      itemId: 150672,
    },
  }
}
