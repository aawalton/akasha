import type { PotionsTemplate } from "../potion-source/potion-source.module.code.ts"
import { POTIONS_CRAFTED_HEALTH } from "../potions-crafted-health/potions-crafted-health.module.code.ts"
import { POTIONS_CRAFTED_MAGICKA } from "../potions-crafted-magicka/potions-crafted-magicka.module.code.ts"
import { POTIONS_CRAFTED_OTHER } from "../potions-crafted-other/potions-crafted-other.module.code.ts"
import { POTIONS_CRAFTED_STAMINA } from "../potions-crafted-stamina/potions-crafted-stamina.module.code.ts"

const BY_ID = {
  ...POTIONS_CRAFTED_HEALTH,
  ...POTIONS_CRAFTED_MAGICKA,
  ...POTIONS_CRAFTED_STAMINA,
  ...POTIONS_CRAFTED_OTHER,
}

export const POTIONS_CRAFTED = {
  "protection-resistance-physical-resistance-spell":
    BY_ID["protection-resistance-physical-resistance-spell"],
  "fortitude-vitality-health-restore-resistance-physical":
    BY_ID["fortitude-vitality-health-restore-resistance-physical"],
  "vitality-protection-resistance-physical": BY_ID["vitality-protection-resistance-physical"],
  "vitality-stealth-detection": BY_ID["vitality-stealth-detection"],
  "endurance-fortitude-health-restore-resistance-physical-stamina-restore":
    BY_ID["endurance-fortitude-health-restore-resistance-physical-stamina-restore"],
  "expedition-vitality-protection-health-restore":
    BY_ID["expedition-vitality-protection-health-restore"],
  "endurance-fortitude-intellect-health-restore-magicka-restore-stamina-restore":
    BY_ID["endurance-fortitude-intellect-health-restore-magicka-restore-stamina-restore"],
  "endurance-expedition-intellect-magicka-restore-stamina-restore":
    BY_ID["endurance-expedition-intellect-magicka-restore-stamina-restore"],
  "endurance-expedition-heroism-stamina-restore":
    BY_ID["endurance-expedition-heroism-stamina-restore"],
  "endurance-expedition-health-restore-stamina-restore":
    BY_ID["endurance-expedition-health-restore-stamina-restore"],
  "brutality-endurance-expedition-stamina-restore":
    BY_ID["brutality-endurance-expedition-stamina-restore"],
  "brutality-endurance-savagery-stamina-restore":
    BY_ID["brutality-endurance-savagery-stamina-restore"],
  "fortitude-vitality-vanish-health-restore": BY_ID["fortitude-vitality-vanish-health-restore"],
  "fortitude-prophecy-vanish-health-restore": BY_ID["fortitude-prophecy-vanish-health-restore"],
  "fortitude-intellect-health-restore-magicka-restore-resistance-spell":
    BY_ID["fortitude-intellect-health-restore-magicka-restore-resistance-spell"],
  "intellect-magicka-restore-resistance-spell-stealth-detection":
    BY_ID["intellect-magicka-restore-resistance-spell-stealth-detection"],
  "fortitude-intellect-prophecy-health-restore-magicka-restore":
    BY_ID["fortitude-intellect-prophecy-health-restore-magicka-restore"],
  "fortitude-health-restore-resistance-physical-resistance-spell":
    BY_ID["fortitude-health-restore-resistance-physical-resistance-spell"],
  "intellect-protection-magicka-restore-resistance-spell":
    BY_ID["intellect-protection-magicka-restore-resistance-spell"],
  "vitality-heroism-health-restore": BY_ID["vitality-heroism-health-restore"],
  "endurance-intellect-magicka-restore-stamina-restore-stealth-detection":
    BY_ID["endurance-intellect-magicka-restore-stamina-restore-stealth-detection"],
  "intellect-sorcery-magicka-restore-stealth-detection":
    BY_ID["intellect-sorcery-magicka-restore-stealth-detection"],
  "endurance-savagery-stamina-restore-stealth-detection":
    BY_ID["endurance-savagery-stamina-restore-stealth-detection"],
  "endurance-intellect-heroism-magicka-restore-stamina-restore":
    BY_ID["endurance-intellect-heroism-magicka-restore-stamina-restore"],
  "endurance-fortitude-savagery-health-restore-stamina-restore":
    BY_ID["endurance-fortitude-savagery-health-restore-stamina-restore"],
  "intellect-prophecy-sorcery-magicka-restore": BY_ID["intellect-prophecy-sorcery-magicka-restore"],
  "fortitude-prophecy-savagery-health-restore": BY_ID["fortitude-prophecy-savagery-health-restore"],
  "heroism-vanish-health-restore": BY_ID["heroism-vanish-health-restore"],
  "expedition-heroism-vanish": BY_ID["expedition-heroism-vanish"],
  "expedition-vitality-heroism": BY_ID["expedition-vitality-heroism"],
  "expedition-vitality-vanish": BY_ID["expedition-vitality-vanish"],
  "expedition-heroism-health-restore": BY_ID["expedition-heroism-health-restore"],
  "expedition-intellect-prophecy-magicka-restore":
    BY_ID["expedition-intellect-prophecy-magicka-restore"],
  "expedition-intellect-protection-magicka-restore":
    BY_ID["expedition-intellect-protection-magicka-restore"],
  "expedition-vanish-health-restore": BY_ID["expedition-vanish-health-restore"],
} satisfies Record<string, PotionsTemplate>
