"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { attributesPanelCardHealth } from "akasha/temper/web/phrase/pages/attributes-panel-card-health.temper-web-phrase.ts"
import { attributesPanelCardMagicka } from "akasha/temper/web/phrase/pages/attributes-panel-card-magicka.temper-web-phrase.ts"
import { attributesPanelCardSetAll } from "akasha/temper/web/phrase/pages/attributes-panel-card-set-all.temper-web-phrase.ts"
import { attributesPanelCardStamina } from "akasha/temper/web/phrase/pages/attributes-panel-card-stamina.temper-web-phrase.ts"
import { attributesPanelCardTitle } from "akasha/temper/web/phrase/pages/attributes-panel-card-title.temper-web-phrase.ts"
import { Maximize2 } from "lucide-react"

type AttributeKey = "magicka" | "health" | "stamina"

const LABEL_OF = {
  magicka: attributesPanelCardMagicka.slug,
  health: attributesPanelCardHealth.slug,
  stamina: attributesPanelCardStamina.slug,
} as const satisfies Record<AttributeKey, string>

interface AttributesPanelCardProps {
  attributes: {
    magicka: number
    health: number
    stamina: number
  }
  onUpdate: (attributes: AttributesPanelCardProps["attributes"]) => void
  className?: string
  readOnly?: boolean
}

export function AttributesPanelCard({
  attributes,
  onUpdate,
  className,
  readOnly,
}: AttributesPanelCardProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const setAllAttributesTo = (attr: AttributeKey) => {
    onUpdate({
      magicka: attr === "magicka" ? 64 : 0,
      health: attr === "health" ? 64 : 0,
      stamina: attr === "stamina" ? 64 : 0,
    })
  }

  const updateAttribute = (attr: AttributeKey, value: number) => {
    const numValue = Math.max(0, Math.min(64, value))
    const others = (["magicka", "health", "stamina"] as const).filter((a) => a !== attr)
    const otherTotal = others.reduce((sum, a) => sum + attributes[a], 0)
    const maxValue = 64 - otherTotal

    onUpdate({
      ...attributes,
      [attr]: Math.min(numValue, maxValue),
    })
  }

  return (
    <InputPanelCard
      id="attributes"
      collapsible={true}
      title={phrase(attributesPanelCardTitle.slug)}
      className={className}
    >
      {(["magicka", "health", "stamina"] as const).map((attr) => (
        <InputPanelCard.Row key={attr} label={phrase(LABEL_OF[attr])}>
          <Input
            type="number"
            min={0}
            max={64}
            value={attributes[attr]}
            onChange={(e) => {
              const parsed = Number.parseInt(e.target.value, 10)
              updateAttribute(attr, Number.isNaN(parsed) ? 0 : parsed)
            }}
            className={`w-[198px] min-w-0 shrink ${surfaceClass(surface + 1)} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            disabled={readOnly}
          />
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 shrink-0"
            onClick={() => setAllAttributesTo(attr)}
            title={phrase(attributesPanelCardSetAll.slug, { attribute: phrase(LABEL_OF[attr]) })}
            disabled={readOnly}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </InputPanelCard.Row>
      ))}
    </InputPanelCard>
  )
}
