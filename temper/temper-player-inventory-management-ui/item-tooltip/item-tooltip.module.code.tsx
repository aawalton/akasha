"use client"

import { convertIconPathToUrl } from "@akasha/temper-characters-equipment/get-equipment-icon"
import { EquipmentIcon } from "@akasha/temper-characters-equipment-ui/equipment-icon"
import { ESO_QUALITY_TEXT_CLASSES } from "@akasha/temper-characters-equipment-ui/eso-quality-text-classes"
import type { ItemTooltipData, SetBonusEntry } from "@akasha/temper-items-core/item-tooltip-types"

const EQUIP_TYPE_NAMES: Record<number, string> = {
  1: "Head",
  2: "Neck",
  3: "Chest",
  4: "Shoulders",
  5: "One Hand",
  6: "Two Hand",
  7: "Off Hand",
  8: "Waist",
  9: "Legs",
  10: "Feet",
  12: "Ring",
  13: "Hands",
  14: "Main Hand",
}

const WEAPON_TYPE_NAMES: Record<number, string> = {
  1: "Axe",
  2: "Hammer",
  3: "Sword",
  4: "Greatsword",
  5: "Battle Axe",
  6: "Maul",
  8: "Bow",
  9: "Restoration Staff",
  11: "Dagger",
  12: "Inferno Staff",
  13: "Ice Staff",
  14: "Shield",
  15: "Lightning Staff",
}

const ARMOR_TYPE_NAMES: Record<number, string> = {
  0: "None",
  1: "Light",
  2: "Medium",
  3: "Heavy",
}

const STYLE_NAMES: Record<number, string> = {
  1: "Aldmeri",
  2: "Daggerfall",
  3: "Ebonheart",
  4: "Ancient Elf",
  5: "Barbaric",
  6: "Primal",
  7: "Daedric",
  8: "Ancient Orc",
  9: "Dwemer",
  10: "Imperial",
  11: "Akaviri",
  12: "Breton",
  13: "Redguard",
  14: "Dunmer",
  15: "Nord",
  16: "Argonian",
  17: "Khajiit",
  18: "Bosmer",
  19: "Altmer",
  20: "Orsimer",
  21: "Trinimac",
  22: "Malacath",
  23: "Thieves Guild",
  24: "Dark Brotherhood",
  25: "Assassins League",
  26: "Morag Tong",
  27: "Abah's Watch",
  28: "Clockwork",
  29: "Dro-m'Athra",
  30: "Xivkyn",
  31: "Soul Shriven",
  32: "Hollowjack",
  33: "Order of the Hour",
  34: "Bloodforge",
  35: "Draugr",
  36: "Worm Cult",
  37: "Buoyant Armiger",
  38: "Glass",
  39: "Ebony",
  40: "Apostle",
  41: "Psijic",
  42: "Militant Ordinator",
  43: "Welkynar",
  44: "Silver Dawn",
  45: "Ashlander",
  46: "Telvanni",
  47: "Ra Gada",
  48: "Ancestral Reach",
  49: "Ancestral High Elf",
  50: "Ancestral Orc",
}

interface ItemTooltipProps {
  data: ItemTooltipData
}

export function ItemTooltip({ data }: ItemTooltipProps) {
  const { referenceData, quality, bound, stolen } = data

  if (!referenceData) {
    return (
      <div style={TOOLTIP_STYLE}>
        <p style={{ color: "var(--secondary)", fontSize: "13px" }}>Item data unavailable</p>
      </div>
    )
  }

  const {
    name,
    icon,
    equipType,
    weaponType,
    armorType,
    style,
    isUnique,
    isUniqueEquipped,
    weaponPower,
    armorRating,
    requiredLevel,
    requiredCp,
    enchantHeader,
    enchantDescription,
    hasOnUseAbility,
    abilityHeader,
    abilityDescription,
    abilityCooldown,
    traitDescription,
    traitType,
    hasSet,
    setName,
    setMaxEquip,
    setBonuses,
    flavorText,
    value,
  } = referenceData

  const iconUrl = convertIconPathToUrl(icon)
  const qualityClass = ESO_QUALITY_TEXT_CLASSES[quality]

  const typeLineParts: string[] = []
  if (armorType !== 0) {
    const armorLabel = ARMOR_TYPE_NAMES[armorType]
    if (armorLabel != null && armorLabel !== "None") typeLineParts.push(armorLabel)
  }
  if (weaponType !== 0) {
    const weaponLabel = WEAPON_TYPE_NAMES[weaponType]
    if (weaponLabel != null) typeLineParts.push(weaponLabel)
  }
  if (equipType !== 0) {
    const equipLabel = EQUIP_TYPE_NAMES[equipType]
    if (equipLabel != null) typeLineParts.push(equipLabel)
  }
  if (style !== 0) {
    const styleName = STYLE_NAMES[style]
    if (styleName != null) typeLineParts.push(styleName)
  }

  const typeLine = typeLineParts.join(" — ")

  return (
    <div style={TOOLTIP_STYLE}>
      {}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        {iconUrl != null && (
          <div
            style={{
              width: "48px",
              height: "48px",
              flexShrink: 0,
              border: "1px solid var(--secondary)",
            }}
          >
            <EquipmentIcon primarySrc={iconUrl} alt={name} size={48} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className={qualityClass}
            style={{ fontSize: "15px", fontWeight: "bold", lineHeight: 1.2, margin: 0 }}
          >
            {name}
          </p>
          {(isUnique || isUniqueEquipped) && (
            <div style={{ display: "flex", gap: "4px", marginTop: "3px" }}>
              {isUnique && <span style={BADGE_STYLE}>Unique</span>}
              {isUniqueEquipped && <span style={BADGE_STYLE}>Unique-Equipped</span>}
            </div>
          )}
        </div>
      </div>

      {}
      {typeLine !== "" && (
        <p style={{ ...SECTION_HEADER_STYLE, marginBottom: "6px" }}>{typeLine}</p>
      )}

      <div style={DIVIDER_STYLE} />

      {}
      {(bound || stolen) && (
        <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
          {bound && <span style={{ color: "var(--secondary)", fontSize: "12px" }}>Bound</span>}
          {stolen && <span style={{ color: "var(--red)", fontSize: "12px" }}>Stolen</span>}
        </div>
      )}

      {}
      {(weaponPower > 0 || armorRating > 0 || requiredLevel > 0 || requiredCp > 0) && (
        <div style={{ marginBottom: "6px" }}>
          {weaponPower > 0 && (
            <p style={STAT_LINE_STYLE}>
              <span style={STAT_LABEL_STYLE}>Weapon Power</span>
              <span style={STAT_VALUE_STYLE}>{weaponPower}</span>
            </p>
          )}
          {armorRating > 0 && (
            <p style={STAT_LINE_STYLE}>
              <span style={STAT_LABEL_STYLE}>Armor Rating</span>
              <span style={STAT_VALUE_STYLE}>{armorRating}</span>
            </p>
          )}
          {requiredLevel > 0 && (
            <p style={STAT_LINE_STYLE}>
              <span style={STAT_LABEL_STYLE}>Requires Level</span>
              <span style={STAT_VALUE_STYLE}>{requiredLevel}</span>
            </p>
          )}
          {requiredCp > 0 && (
            <p style={STAT_LINE_STYLE}>
              <span style={STAT_LABEL_STYLE}>Requires CP</span>
              <span style={STAT_VALUE_STYLE}>{requiredCp}</span>
            </p>
          )}
        </div>
      )}

      {}
      {enchantHeader !== "" && (
        <div style={{ marginBottom: "6px" }}>
          <p style={SECTION_HEADER_STYLE}>{enchantHeader.toUpperCase()}</p>
          {enchantDescription !== "" && <p style={DESCRIPTION_STYLE}>{enchantDescription}</p>}
        </div>
      )}

      {}
      {hasOnUseAbility && abilityHeader !== "" && (
        <div style={{ marginBottom: "6px" }}>
          <p style={{ color: "var(--secondary)", fontSize: "12px", margin: 0 }}>
            <span style={{ color: "var(--primary)", fontWeight: "bold" }}>Use: </span>
            {abilityHeader}
          </p>
          {abilityDescription !== "" && <p style={DESCRIPTION_STYLE}>{abilityDescription}</p>}
          {abilityCooldown > 0 && (
            <p style={{ color: "var(--tertiary)", fontSize: "11px", margin: "2px 0 0" }}>
              Cooldown: {abilityCooldown}s
            </p>
          )}
        </div>
      )}

      {}
      {traitDescription !== "" && traitType !== 0 && (
        <div style={{ marginBottom: "6px" }}>
          <p style={SECTION_HEADER_STYLE}>TRAIT</p>
          <p style={DESCRIPTION_STYLE}>{traitDescription}</p>
        </div>
      )}

      {}
      {hasSet && setName !== "" && (
        <div style={{ marginBottom: "6px" }}>
          <div style={DIVIDER_STYLE} />
          {}
          <p style={{ ...SECTION_HEADER_STYLE, marginBottom: "4px" }}>
            {setName} ({setMaxEquip}-piece set)
          </p>
          {Array.isArray(setBonuses) &&
            setBonuses.map((bonus: SetBonusEntry, index: number) => (
              <p
                key={index}
                style={{
                  fontSize: "12px",
                  color: "var(--tertiary)",
                  margin: "2px 0",
                  paddingLeft: "4px",
                }}
              >
                <span style={{ color: "var(--tertiary)" }}>({bonus.numRequired})</span>{" "}
                {bonus.description}
                {bonus.isPerfected && (
                  <span style={{ color: "var(--secondary)", marginLeft: "4px" }}>[Perfected]</span>
                )}
              </p>
            ))}
        </div>
      )}

      {}
      {flavorText !== "" && (
        <div style={{ marginBottom: "6px" }}>
          <div style={DIVIDER_STYLE} />
          <p style={FLAVOR_TEXT_STYLE}>{flavorText}</p>
        </div>
      )}

      {}
      {value > 0 && <div style={{ ...DIVIDER_STYLE, marginBottom: "4px" }} />}
      {value > 0 && (
        <p style={{ color: "var(--secondary)", fontSize: "12px", margin: 0 }}>
          <span style={{ color: "var(--yellow)" }}>Gold: </span>
          {value.toLocaleString()}
        </p>
      )}
    </div>
  )
}

const TOOLTIP_STYLE: React.CSSProperties = {
  backgroundColor: "var(--surface-0)",
  border: "1px solid var(--secondary)",
  color: "var(--secondary)",
  padding: "10px 12px",
  maxWidth: "320px",
  minWidth: "200px",
  fontFamily: "inherit",
  fontSize: "13px",
}

const SECTION_HEADER_STYLE: React.CSSProperties = {
  color: "var(--primary)",
  fontSize: "11px",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: 0,
}

const DESCRIPTION_STYLE: React.CSSProperties = {
  color: "var(--secondary)",
  fontSize: "12px",
  margin: "2px 0 0",
}

const STAT_LINE_STYLE: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  margin: "2px 0",
}

const STAT_LABEL_STYLE: React.CSSProperties = {
  color: "var(--secondary)",
  fontSize: "12px",
}

const STAT_VALUE_STYLE: React.CSSProperties = {
  color: "var(--primary)",
  fontSize: "12px",
  fontWeight: "bold",
}

const DIVIDER_STYLE: React.CSSProperties = {
  borderTop: "1px solid #3A3A3A",
  margin: "6px 0",
}

const FLAVOR_TEXT_STYLE: React.CSSProperties = {
  color: "var(--tertiary)",
  fontSize: "12px",
  fontStyle: "italic",
  margin: "2px 0 0",
}

const BADGE_STYLE: React.CSSProperties = {
  backgroundColor: "var(--surface-1)",
  border: "1px solid var(--secondary)",
  color: "var(--secondary)",
  fontSize: "10px",
  padding: "1px 4px",
  borderRadius: "2px",
}
