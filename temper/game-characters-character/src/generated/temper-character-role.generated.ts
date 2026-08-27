/**
 * Temper Character Roles (Generated)
 *
 * ESO build roles (playstyles) sourced from the universal pages table
 * (page type: temper-character-role).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { RoleTemplate } from "../roles"

const ROLE_DATA = {
  "no-role": { id: "no-role" as const, name: "No Role" },
  "dps": { id: "dps" as const, name: "DPS" },
  "tank": { id: "tank" as const, name: "Tank" },
  "healer": { id: "healer" as const, name: "Healer" },
  "pvp": { id: "pvp" as const, name: "PvP" },
  "solo": { id: "solo" as const, name: "Solo" },
} satisfies Record<string, RoleTemplate>

export const roles = createDataFile<RoleTemplate>()(ROLE_DATA)
