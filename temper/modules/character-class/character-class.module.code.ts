import {
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export const classes = tableView(() => skillCatalog().classes)
