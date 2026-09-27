"use client"

import {
  numberAt,
  textAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import { gearTypeNames } from "akasha/temper/catalog/gear/equipment/modules/gear-type-names/gear-type-names.module.code.ts"
import { temperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.ts"
import type {
  ItemTooltipData,
  SetBonusEntry,
} from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import { convertIconPathToUrl } from "akasha/temper/player/character/characters-equipment/modules/get-equipment-icon/get-equipment-icon.module.code.ts"
import { EquipmentIcon } from "akasha/temper/web/characters-equipment-ui/modules/equipment-icon/equipment-icon.module.code.tsx"
import { ESO_QUALITY_TEXT_CLASSES } from "akasha/temper/web/characters-equipment-ui/modules/eso-quality-text-classes/eso-quality-text-classes.module.code.ts"
import { EsoMarkupText } from "akasha/temper/web/modules/eso-markup-text/eso-markup-text.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { itemTooltipArmor } from "akasha/temper/web/phrase/pages/item-tooltip-armor.temper-web-phrase.ts"
import { itemTooltipBound } from "akasha/temper/web/phrase/pages/item-tooltip-bound.temper-web-phrase.ts"
import { itemTooltipCooldown } from "akasha/temper/web/phrase/pages/item-tooltip-cooldown.temper-web-phrase.ts"
import { itemTooltipCp } from "akasha/temper/web/phrase/pages/item-tooltip-cp.temper-web-phrase.ts"
import { itemTooltipDamage } from "akasha/temper/web/phrase/pages/item-tooltip-damage.temper-web-phrase.ts"
import { itemTooltipGold } from "akasha/temper/web/phrase/pages/item-tooltip-gold.temper-web-phrase.ts"
import { itemTooltipLevel } from "akasha/temper/web/phrase/pages/item-tooltip-level.temper-web-phrase.ts"
import { itemTooltipPerfected } from "akasha/temper/web/phrase/pages/item-tooltip-perfected.temper-web-phrase.ts"
import { itemTooltipSetSize } from "akasha/temper/web/phrase/pages/item-tooltip-set-size.temper-web-phrase.ts"
import { itemTooltipStolen } from "akasha/temper/web/phrase/pages/item-tooltip-stolen.temper-web-phrase.ts"
import { itemTooltipTrait } from "akasha/temper/web/phrase/pages/item-tooltip-trait.temper-web-phrase.ts"
import { itemTooltipUnavailable } from "akasha/temper/web/phrase/pages/item-tooltip-unavailable.temper-web-phrase.ts"
import { itemTooltipUnique } from "akasha/temper/web/phrase/pages/item-tooltip-unique.temper-web-phrase.ts"
import { itemTooltipUniqueEquipped } from "akasha/temper/web/phrase/pages/item-tooltip-unique-equipped.temper-web-phrase.ts"
import { itemTooltipUse } from "akasha/temper/web/phrase/pages/item-tooltip-use.temper-web-phrase.ts"
import { useMemo } from "react"

const EVERY_STYLE = 500

function useStyleTitles(): ReadonlyMap<number, string> {
  const pages = usePages({ pageTypeSlug: temperMotifStyle.slug, limit: EVERY_STYLE })
  const titles = useMemo(() => {
    const byId = new Map<number, string>()
    for (const row of pages.rows) {
      const id = numberAt(row, "esoItemStyleId")
      const title = textAt(row, "title")
      if (id !== null && title !== null) byId.set(id, title)
    }
    return byId
  }, [pages.rows])
  if (pages.error !== null) throw pages.error
  return titles
}

interface ItemTooltipProps {
  data: ItemTooltipData
}

export function ItemTooltip({ data }: ItemTooltipProps) {
  const { referenceData, quality, bound, stolen } = data
  const phrase = usePhrase()
  const styleTitles = useStyleTitles()

  if (!referenceData) {
    return (
      <div style={TOOLTIP_STYLE}>
        <p style={{ color: "var(--secondary)", fontSize: "13px" }}>
          {phrase(itemTooltipUnavailable.slug)}
        </p>
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
    merchantValue,
  } = referenceData

  const iconUrl = convertIconPathToUrl(icon)
  const qualityClass = ESO_QUALITY_TEXT_CLASSES[quality]

  const gearNames = gearTypeNames()
  const typeLineParts: string[] = []
  if (armorType !== 0) {
    const armorLabel = gearNames.armorTypes.get(armorType)
    if (armorLabel != null) typeLineParts.push(armorLabel)
  }
  if (weaponType !== 0) {
    const weaponLabel = gearNames.weaponTypes.get(weaponType)
    if (weaponLabel != null) typeLineParts.push(weaponLabel)
  }
  if (equipType !== 0) {
    const equipLabel = gearNames.equipTypes.get(equipType)
    if (equipLabel != null) typeLineParts.push(equipLabel)
  }
  if (style !== 0) {
    const styleName = styleTitles.get(style)
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
              {isUnique && <span style={BADGE_STYLE}>{phrase(itemTooltipUnique.slug)}</span>}
              {isUniqueEquipped && (
                <span style={BADGE_STYLE}>{phrase(itemTooltipUniqueEquipped.slug)}</span>
              )}
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
          {bound && (
            <span style={{ color: "var(--secondary)", fontSize: "12px" }}>
              {phrase(itemTooltipBound.slug)}
            </span>
          )}
          {stolen && (
            <span style={{ color: "var(--red)", fontSize: "12px" }}>
              {phrase(itemTooltipStolen.slug)}
            </span>
          )}
        </div>
      )}

      {}
      {(weaponPower > 0 || armorRating > 0 || requiredLevel > 0 || requiredCp > 0) && (
        <div style={{ marginBottom: "6px" }}>
          {weaponPower > 0 && (
            <p style={STAT_LINE_STYLE}>
              <span style={STAT_LABEL_STYLE}>{phrase(itemTooltipDamage.slug)}</span>
              <span style={STAT_VALUE_STYLE}>{weaponPower}</span>
            </p>
          )}
          {armorRating > 0 && (
            <p style={STAT_LINE_STYLE}>
              <span style={STAT_LABEL_STYLE}>{phrase(itemTooltipArmor.slug)}</span>
              <span style={STAT_VALUE_STYLE}>{armorRating}</span>
            </p>
          )}
          {requiredLevel > 0 && (
            <p style={STAT_LINE_STYLE}>
              <span style={STAT_LABEL_STYLE}>{phrase(itemTooltipLevel.slug)}</span>
              <span style={STAT_VALUE_STYLE}>{requiredLevel}</span>
            </p>
          )}
          {requiredCp > 0 && (
            <p style={STAT_LINE_STYLE}>
              <span style={STAT_LABEL_STYLE}>{phrase(itemTooltipCp.slug)}</span>
              <span style={STAT_VALUE_STYLE}>{requiredCp}</span>
            </p>
          )}
        </div>
      )}

      {}
      {enchantHeader !== "" && (
        <div style={{ marginBottom: "6px" }}>
          <p style={SECTION_HEADER_STYLE}>
            <EsoMarkupText text={enchantHeader.toUpperCase()} />
          </p>
          {enchantDescription !== "" && (
            <p style={DESCRIPTION_STYLE}>
              <EsoMarkupText text={enchantDescription} />
            </p>
          )}
        </div>
      )}

      {}
      {hasOnUseAbility && abilityHeader !== "" && (
        <div style={{ marginBottom: "6px" }}>
          <p style={{ color: "var(--secondary)", fontSize: "12px", margin: 0 }}>
            <span style={{ color: "var(--primary)", fontWeight: "bold" }}>
              {phrase(itemTooltipUse.slug)}{" "}
            </span>
            <EsoMarkupText text={abilityHeader} />
          </p>
          {abilityDescription !== "" && (
            <p style={DESCRIPTION_STYLE}>
              <EsoMarkupText text={abilityDescription} />
            </p>
          )}
          {abilityCooldown > 0 && (
            <p style={{ color: "var(--tertiary)", fontSize: "11px", margin: "2px 0 0" }}>
              {phrase(itemTooltipCooldown.slug, { seconds: abilityCooldown })}
            </p>
          )}
        </div>
      )}

      {}
      {traitDescription !== "" && traitType !== 0 && (
        <div style={{ marginBottom: "6px" }}>
          <p style={SECTION_HEADER_STYLE}>{phrase(itemTooltipTrait.slug)}</p>
          <p style={DESCRIPTION_STYLE}>
            <EsoMarkupText text={traitDescription} />
          </p>
        </div>
      )}

      {}
      {hasSet && setName !== "" && (
        <div style={{ marginBottom: "6px" }}>
          <div style={DIVIDER_STYLE} />
          {}
          <p style={{ ...SECTION_HEADER_STYLE, marginBottom: "4px" }}>
            <EsoMarkupText text={setName} />{" "}
            {phrase(itemTooltipSetSize.slug, { count: setMaxEquip })}
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
                <EsoMarkupText text={bonus.description} />
                {bonus.isPerfected && (
                  <span style={{ color: "var(--secondary)", marginLeft: "4px" }}>
                    {phrase(itemTooltipPerfected.slug)}
                  </span>
                )}
              </p>
            ))}
        </div>
      )}

      {}
      {flavorText !== "" && (
        <div style={{ marginBottom: "6px" }}>
          <div style={DIVIDER_STYLE} />
          <p style={FLAVOR_TEXT_STYLE}>
            <EsoMarkupText text={flavorText} />
          </p>
        </div>
      )}

      {}
      {merchantValue > 0 && <div style={{ ...DIVIDER_STYLE, marginBottom: "4px" }} />}
      {merchantValue > 0 && (
        <p style={{ color: "var(--secondary)", fontSize: "12px", margin: 0 }}>
          <span style={{ color: "var(--yellow)" }}>{phrase(itemTooltipGold.slug)} </span>
          {merchantValue.toLocaleString()}
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
  borderTop: "1px solid var(--surface-4)",
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
