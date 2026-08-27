/**
 * Temper Rule Templates (Generated)
 *
 * Default inventory rule set sourced from the universal pages table
 * (page type: temper-rule-template). The player enables individual rules;
 * none are active by default. Order matters — rules are evaluated
 * top-to-bottom, first-match-wins.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CategoryRule } from "../inventory-rule-types"

export const TEMPER_RULE_TEMPLATES: readonly CategoryRule[] = [
  {
    id: "gold-stock",
    title: "Stock gold",
    notes:
      "Keeps up to 1,000,000 gold on each character. Excess is deposited into the bank when visiting.",
    goal: "use",
    categoryId: "currency-gold",
    action: "stock",
    stockScope: "any-character",
    active: false,
    conditions: {"targetQuantity":1000000},
  },
  {
    id: "other-currency-bank",
    title: "Bank other currencies",
    notes:
      "Deposits alliance points, tel var stones, and writ vouchers into the bank when visiting.",
    goal: "hoard",
    categoryId: "currency",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "containers-stackable-bank",
    title: "Bank stackable containers",
    notes:
      "Deposits stackable containers (reward coffers, event boxes, etc.) in the bank. Open them later in bulk or save for events.",
    goal: "hoard",
    categoryId: "container-stackable",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "containers-open",
    title: "Open containers",
    notes:
      "Opens containers automatically. The Can Open filter skips containers on game cooldown or when transmute crystal storage is full. The Can Give Max Rewards filter skips containers during the 20-hour reward cooldown.",
    goal: "use",
    categoryId: "containers",
    action: "open",
    active: false,
    conditions: {"canOpen":"can-open","canGiveMaxRewards":"can-give-max-rewards"},
  },
  {
    id: "companion-epic-nothing",
    title: "Protect epic+ companion gear",
    notes:
      "Prevents epic (purple) quality or higher companion equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best companion gear.",
    goal: "equip",
    categoryId: "companion",
    action: "nothing",
    active: false,
    conditions: {"qualityOp":">=","maxQuality":4},
  },
  {
    id: "legendary-nothing",
    title: "Protect legendary gear",
    notes:
      "Prevents legendary (gold) quality equipment from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard your best gear.",
    goal: "equip",
    categoryId: "equipment",
    action: "nothing",
    active: false,
    conditions: {"qualityOp":">=","maxQuality":5},
  },
  {
    id: "crafted-nothing",
    title: "Protect crafted gear",
    notes:
      "Prevents crafted equipment from being affected by lower-priority rules. Useful for keeping gear you've invested materials into.",
    goal: "equip",
    categoryId: "equipment",
    action: "nothing",
    active: false,
    conditions: {"crafted":"crafted"},
  },
  {
    id: "crafted-consumables-nothing",
    title: "Protect crafted consumables",
    notes:
      "Prevents crafted food, drink, potions, poisons, and glyphs from being affected by lower-priority rules. Crafted consumables take ingredients and time to make — this keeps them safe from accidental sell or destroy rules.",
    goal: "use",
    categoryId: "consumables",
    action: "nothing",
    active: false,
    conditions: {"crafted":"crafted"},
  },
  {
    id: "reconstructed-nothing",
    title: "Protect reconstructed gear",
    notes:
      "Prevents reconstructed equipment from being affected by lower-priority rules. Reconstructed gear costs transmute crystals and set collection knowledge.",
    goal: "equip",
    categoryId: "equipment",
    action: "nothing",
    active: false,
    conditions: {"reconstructed":"reconstructed"},
  },
  {
    id: "transmuted-nothing",
    title: "Protect transmuted gear",
    notes:
      "Prevents transmuted equipment from being affected by lower-priority rules. Transmuted gear represents a transmute crystal investment.",
    goal: "equip",
    categoryId: "equipment",
    action: "nothing",
    active: false,
    conditions: {"transmuted":"transmuted"},
  },
  {
    id: "unlock-stolen",
    title: "Launder stolen unlockables",
    notes:
      "Launders stolen items that can teach something (motifs, recipes, etc.) so they can be used. Place before other unlock rules.",
    goal: "unlock",
    categoryId: "knowledge",
    action: "fence-launder",
    active: false,
    conditions: {"stolen":"stolen","canUnlock":"can-unlock"},
  },
  {
    id: "unlock-by-priority",
    title: "Use unlockables",
    notes:
      "Uses items that teach something new — motifs, recipes, style pages, furnishing plans, etc. If the current character can learn the item, it's used immediately. For recipes (character-specific knowledge), the addon checks the current character only (ESO API limitation).",
    goal: "unlock",
    categoryId: "knowledge",
    action: "use",
    destination: "character:by-priority",
    active: false,
    conditions: {"canUnlock":"can-unlock"},
  },
  {
    id: "valuable-nothing",
    title: "Protect valuable items",
    notes:
      "Prevents items with a guild store value of 10,000g or more from being affected by lower-priority rules. Place above sell and deconstruct rules to safeguard items worth trading.",
    goal: "hoard",
    categoryId: "all",
    action: "nothing",
    active: false,
    conditions: {"value":"MIN_LISTING_VALUE","valueOp":">="},
  },
  {
    id: "research-stolen",
    title: "Launder stolen researchables",
    notes:
      "Launders stolen equipment with a researchable trait so it can be submitted at a crafting station. Place before other research rules.",
    goal: "unlock",
    categoryId: "equipment",
    action: "fence-launder",
    active: false,
    conditions: {"stolen":"stolen","canResearch":"can-research"},
  },
  {
    id: "research-by-priority",
    title: "Research traits",
    notes:
      "Routes equipment with researchable traits to the character that needs them most. Characters are checked in priority order using TemperCharacters saved variable data for cross-character trait knowledge. The current character is checked first via the ESO API; others are checked via saved data.",
    goal: "unlock",
    categoryId: "equipment",
    action: "research",
    destination: "character:by-priority",
    active: false,
    conditions: {"canResearch":"can-research"},
  },
  {
    id: "ornate-sell",
    title: "Sell ornate gear",
    notes:
      "Sells equipment with the Ornate trait. Ornate items sell for more gold at merchants and have no crafting use.",
    goal: "sell",
    categoryId: "equipment",
    action: "sell",
    active: false,
    conditions: {"traits":["ornate"]},
  },
  {
    id: "inspire-stolen",
    title: "Launder stolen inspiration",
    notes:
      "Launders stolen equipment that would give useful crafting inspiration, so it can be deconstructed. Place before other inspiration rules.",
    goal: "progress",
    categoryId: "equipment",
    action: "fence-launder",
    active: false,
    conditions: {"stolen":"stolen","canInspire":"can-inspire"},
  },
  {
    id: "inspire-current",
    title: "Deconstruct for inspiration",
    notes:
      "Routes equipment for deconstruction to the highest-priority character who hasn't fully leveled the corresponding crafting skill. If the current character benefits, the item is deconstructed locally; otherwise it's routed via the bank.",
    goal: "progress",
    categoryId: "equipment",
    action: "deconstruct",
    destination: "character:by-priority",
    active: false,
    conditions: {"canInspire":"can-inspire"},
  },
  {
    id: "tasks-stolen",
    title: "Launder stolen task items",
    notes:
      "Launders stolen task-type items (writs, maps, etc.) so they can be completed or banked.",
    goal: "task",
    categoryId: "tasks",
    action: "fence-launder",
    active: false,
    conditions: {"stolen":"stolen"},
  },
  {
    id: "holiday-writs-bank",
    title: "Bank holiday writs",
    notes:
      "Stashes holiday event writs in the bank. Complete them during events for bonus rewards.",
    goal: "task",
    categoryId: "holiday-writs",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "master-writs-bank",
    title: "Bank master writs",
    notes:
      "Stashes master writs in the bank. Master writs reward writ vouchers for high-end crafting station furnishings.",
    goal: "task",
    categoryId: "master-writs",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "survey-reports-bank",
    title: "Bank survey reports",
    notes:
      "Stashes survey reports in the bank for later use. Survey reports lead to rich crafting material nodes.",
    goal: "task",
    categoryId: "survey-reports",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "treasure-maps-bank",
    title: "Bank treasure maps",
    notes:
      "Stashes treasure maps in the bank for later use. Treasure maps lead to chests with set gear.",
    goal: "task",
    categoryId: "treasure-maps",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "soul-gems-empty-bank",
    title: "Bank empty soul gems",
    notes:
      "Deposits empty (white quality) soul gems in the bank. Filled and crown soul gems are kept.",
    goal: "task",
    categoryId: "soul-gems",
    action: "move-to",
    destination: "bank",
    active: false,
    conditions: {"maxQuality":1},
  },
  {
    id: "museum-pieces-nothing",
    title: "Protect museum pieces",
    notes:
      "Prevents museum pieces from being affected by lower-priority rules. These are turn-in items for collections or achievements.",
    goal: "task",
    categoryId: "museum-pieces",
    action: "nothing",
    active: false,
  },
  {
    id: "quest-items-nothing",
    title: "Protect quest items",
    notes:
      "Prevents quest-related items from being affected by lower-priority rules. Keep them safe until the associated quest is completed.",
    goal: "task",
    categoryId: "quest-items",
    action: "nothing",
    active: false,
  },
  {
    id: "equipment-deconstruct",
    title: "Deconstruct leftover equipment",
    notes:
      "Deconstructs non-crafted equipment that wasn't caught by higher-priority rules. Place below equip, research, and inspire rules to only deconstruct what's left over.",
    goal: "hoard",
    categoryId: "equipment",
    action: "deconstruct",
    active: false,
    conditions: {"crafted":"not-crafted"},
  },
  {
    id: "glyphs-deconstruct",
    title: "Deconstruct glyphs",
    notes:
      "Deconstructs non-crafted glyphs for enchanting materials. Yields runes that can be reused in crafting.",
    goal: "hoard",
    categoryId: "glyphs",
    action: "deconstruct",
    active: false,
    conditions: {"crafted":"not-crafted"},
  },
  {
    id: "crafting-stolen",
    title: "Launder crafting materials",
    notes:
      "Launders stolen crafting materials so they can be deposited or used.",
    goal: "hoard",
    categoryId: "crafting",
    action: "fence-launder",
    active: false,
    conditions: {"stolen":"stolen"},
  },
  {
    id: "crafting-craft-bag",
    title: "Stow crafting materials",
    notes:
      "Moves crafting materials to the craft bag when visiting the bank. Requires ESO Plus or a craft bag entitlement. If you do not have ESO Plus, toggle off craft bag access in the ESO Plus panel above — the destination will be redirected to the bank automatically.",
    goal: "hoard",
    categoryId: "crafting",
    action: "move-to",
    destination: "craft-bag",
    active: false,
  },
  {
    id: "treasures-epic-stolen",
    title: "Launder epic+ treasures",
    notes:
      "Launders stolen treasures of epic quality or higher. These are worth keeping — sell them legitimately or bank for later.",
    goal: "hoard",
    categoryId: "treasures",
    action: "fence-launder",
    active: false,
    conditions: {"stolen":"stolen","qualityOp":">=","maxQuality":4},
  },
  {
    id: "tools-bank",
    title: "Bank tools",
    notes:
      "Deposits tools (lockpicks, repair kits, etc.) in the bank for safekeeping.",
    goal: "hoard",
    categoryId: "tools",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "treasures-epic-bank",
    title: "Bank epic+ treasures",
    notes:
      "Banks epic quality or higher treasures for safekeeping or later sale.",
    goal: "hoard",
    categoryId: "treasures",
    action: "move-to",
    destination: "bank",
    active: false,
    conditions: {"qualityOp":">=","maxQuality":4},
  },
  {
    id: "trophies-bank",
    title: "Bank trophies",
    notes:
      "Deposits miscellaneous trophies (keys, key fragments, toys, dungeon buff ingredients, material upgraders) in the bank for safekeeping.",
    goal: "hoard",
    categoryId: "trophies",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "alliance-war-bank",
    title: "Bank Alliance War items",
    notes:
      "Deposits Alliance War items (siege equipment, forward camps, repair kits, etc.) in the bank for safekeeping.",
    goal: "hoard",
    categoryId: "alliance-war",
    action: "move-to",
    destination: "bank",
    active: false,
  },
  {
    id: "furnishings-house-storage",
    title: "Store furniture in housing",
    notes:
      "Moves furnishings to the furniture vault (house storage) when visiting the bank. Keeps your backpack clear of bulky furniture items.",
    goal: "hoard",
    categoryId: "furnishings",
    action: "move-to",
    destination: "furniture-vault",
    active: false,
  },
  {
    id: "trash-sell",
    title: "Sell trash",
    notes:
      "Sells items categorized as trash. These have no crafting or collectible value.",
    goal: "sell",
    categoryId: "trash",
    action: "sell",
    active: false,
  },
  {
    id: "junk-sell",
    title: "Sell junk",
    notes:
      "Sells items in the junk category at a merchant.",
    goal: "sell",
    categoryId: "junk",
    action: "sell",
    active: false,
  },
  {
    id: "companion-green-sell",
    title: "Sell low-quality companion gear",
    notes:
      "Sells companion equipment of superior (blue) quality or lower. Higher-quality companion gear is preserved.",
    goal: "sell",
    categoryId: "companion",
    action: "sell",
    active: false,
    conditions: {"maxQuality":3},
  },
  {
    id: "treasures-stolen-fence",
    title: "Fence stolen treasures",
    notes:
      "Sells stolen treasures at a fence. Stolen treasures can't be sold to normal merchants.",
    goal: "sell",
    categoryId: "treasures",
    action: "fence-sell",
    active: false,
    conditions: {"stolen":"stolen"},
  },
  {
    id: "treasures-sell",
    title: "Sell common treasures",
    notes:
      "Sells treasures up to superior (blue) quality at a merchant. Higher-quality treasures are preserved for banking or guild store listing.",
    goal: "sell",
    categoryId: "treasures",
    action: "sell",
    active: false,
    conditions: {"maxQuality":3},
  },
  {
    id: "recipes-known-sell",
    title: "Sell known recipes",
    notes:
      "Sells recipes you've already learned, up to fine (green) quality. Higher-quality known recipes are preserved in case they have trade value.",
    goal: "sell",
    categoryId: "recipes",
    action: "sell",
    active: false,
    conditions: {"known":"known","maxQuality":2},
  },
  {
    id: "potions-normal-sell",
    title: "Sell basic potions",
    notes:
      "Sells normal (white) quality non-crafted potions. Crafted and higher-quality potions are kept.",
    goal: "sell",
    categoryId: "potions",
    action: "sell",
    active: false,
    conditions: {"crafted":"not-crafted","maxQuality":1},
  },
  {
    id: "poisons-normal-sell",
    title: "Sell basic poisons",
    notes:
      "Sells normal (white) quality non-crafted poisons. Crafted and higher-quality poisons are kept.",
    goal: "sell",
    categoryId: "poisons",
    action: "sell",
    active: false,
    conditions: {"crafted":"not-crafted","maxQuality":1},
  },
  {
    id: "food-normal-sell",
    title: "Sell basic food",
    notes:
      "Sells normal (white) quality non-crafted food. Crafted and higher-quality food is kept.",
    goal: "sell",
    categoryId: "food",
    action: "sell",
    active: false,
    conditions: {"crafted":"not-crafted","maxQuality":1},
  },
  {
    id: "drink-normal-sell",
    title: "Sell basic drinks",
    notes:
      "Sells normal (white) quality non-crafted drinks. Crafted and higher-quality drinks are kept.",
    goal: "sell",
    categoryId: "drink",
    action: "sell",
    active: false,
    conditions: {"crafted":"not-crafted","maxQuality":1},
  },
  {
    id: "low-quality-sell",
    title: "Sell low quality items",
    notes:
      "Sells items of fine (green) quality or lower at a merchant. Higher-quality items are preserved for other rules. Place near the bottom — items caught by higher-priority rules are unaffected.",
    goal: "sell",
    categoryId: "all",
    action: "sell",
    active: false,
    conditions: {"maxQuality":2},
  },
  {
    id: "worthless-destroy",
    title: "Destroy worthless items",
    notes:
      "Destroys normal (white) quality items that have no guild store value and no merchant value. Place at the very bottom — only items not caught by any higher-priority rule are destroyed.",
    goal: "destroy",
    categoryId: "all",
    action: "destroy",
    active: false,
    conditions: {"value":0,"maxQuality":1},
  },
] as const
