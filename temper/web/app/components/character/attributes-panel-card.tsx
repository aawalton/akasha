"use client"

import { Button } from "@shared/design-primitives/components/button"
import { Input } from "@shared/design-primitives/components/input"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { capitalize } from "@shared/utils-narrow/capitalize"
import { Maximize2 } from "lucide-react"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"

type AttributeKey = "magicka" | "health" | "stamina"

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
    <InputPanelCard id="attributes" collapsible={true} title="Attributes" className={className}>
      {(["magicka", "health", "stamina"] as const).map((attr) => (
        <InputPanelCard.Row key={attr} label={capitalize(attr)}>
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
            title={`Set all 64 points to ${attr}`}
            disabled={readOnly}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </InputPanelCard.Row>
      ))}
    </InputPanelCard>
  )
}
