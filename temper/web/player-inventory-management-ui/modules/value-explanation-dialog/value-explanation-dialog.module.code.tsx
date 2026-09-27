"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type { InventoryLeafNode } from "akasha/temper/items/core/modules/inventory-node-types/inventory-node-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { valueExplanationDialogBasisMinimum } from "akasha/temper/web/phrase/pages/value-explanation-dialog-basis-minimum.temper-web-phrase.ts"
import { valueExplanationDialogBasisNone } from "akasha/temper/web/phrase/pages/value-explanation-dialog-basis-none.temper-web-phrase.ts"
import { valueExplanationDialogBasisSaleAverage } from "akasha/temper/web/phrase/pages/value-explanation-dialog-basis-sale-average.temper-web-phrase.ts"
import { valueExplanationDialogBasisSuggested } from "akasha/temper/web/phrase/pages/value-explanation-dialog-basis-suggested.temper-web-phrase.ts"
import { valueExplanationDialogListedQuantity } from "akasha/temper/web/phrase/pages/value-explanation-dialog-listed-quantity.temper-web-phrase.ts"
import { valueExplanationDialogListingSummary } from "akasha/temper/web/phrase/pages/value-explanation-dialog-listing-summary.temper-web-phrase.ts"
import { valueExplanationDialogMarketValue } from "akasha/temper/web/phrase/pages/value-explanation-dialog-market-value.temper-web-phrase.ts"
import { valueExplanationDialogMarketValueBasis } from "akasha/temper/web/phrase/pages/value-explanation-dialog-market-value-basis.temper-web-phrase.ts"
import { valueExplanationDialogMerchantValue } from "akasha/temper/web/phrase/pages/value-explanation-dialog-merchant-value.temper-web-phrase.ts"
import { valueExplanationDialogMinListing } from "akasha/temper/web/phrase/pages/value-explanation-dialog-min-listing.temper-web-phrase.ts"
import { valueExplanationDialogReplacementValue } from "akasha/temper/web/phrase/pages/value-explanation-dialog-replacement-value.temper-web-phrase.ts"
import { valueExplanationDialogSaleAverage } from "akasha/temper/web/phrase/pages/value-explanation-dialog-sale-average.temper-web-phrase.ts"
import { valueExplanationDialogSoldQuantity } from "akasha/temper/web/phrase/pages/value-explanation-dialog-sold-quantity.temper-web-phrase.ts"
import { valueExplanationDialogSuggestedPrice } from "akasha/temper/web/phrase/pages/value-explanation-dialog-suggested-price.temper-web-phrase.ts"
import { valueExplanationDialogValue } from "akasha/temper/web/phrase/pages/value-explanation-dialog-value.temper-web-phrase.ts"
import { valueExplanationDialogValueSources } from "akasha/temper/web/phrase/pages/value-explanation-dialog-value-sources.temper-web-phrase.ts"
import { formatGold } from "akasha/temper/web/player-inventory-management-ui/modules/gold-amount/gold-amount.module.code.ts"

export interface ValueExplanationData {
  itemName: string
  marketValue?: number
  replacementValue?: number
  merchantValue?: number
  saleAvg?: number
  minPrice?: number
  amountCount?: number
  saleAmountCount?: number
  suggestedPrice?: number
}

export function leafToValueData(node: InventoryLeafNode): ValueExplanationData {
  return {
    itemName: node.label,
    replacementValue: node.replacementValue,
    merchantValue: node.merchantValue,
    saleAvg: node.saleAvg,
    minPrice: node.minPrice,
    amountCount: node.amountCount,
    saleAmountCount: node.saleAmountCount,
    suggestedPrice: node.suggestedPrice,
  }
}

interface ValueExplanationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: ValueExplanationData | null
}

function formatNumber(value: number): string {
  return value.toLocaleString()
}

export function ValueExplanationDialog({ open, onOpenChange, data }: ValueExplanationDialogProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  if (!data) return null

  const ev = data.marketValue
  const rc = data.replacementValue
  const mv = data.merchantValue
  const displayValue =
    ev !== undefined || mv !== undefined || rc !== undefined
      ? Math.max(ev ?? 0, mv ?? 0, rc ?? 0)
      : undefined
  const source: "market" | "replacement" | "merchant" =
    displayValue !== undefined
      ? rc !== undefined && rc >= (ev ?? 0) && rc >= (mv ?? 0)
        ? "replacement"
        : mv !== undefined && (ev === undefined || mv > ev)
          ? "merchant"
          : "market"
      : "market"

  const suggested = data.suggestedPrice
  const sa = data.saleAvg
  const n = data.minPrice
  const ac = data.amountCount
  const sac = data.saleAmountCount
  const hasListingData = suggested !== undefined || sa !== undefined || n !== undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{data.itemName}</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className="space-y-2">
            <Text className="font-medium text-primary text-sm">
              {phrase(valueExplanationDialogValueSources.slug)}
            </Text>
            <div className={`rounded-md ${surfaceClass(surface + 1)} p-3`}>
              <table className="w-full text-sm">
                <tbody>
                  {displayValue !== undefined && (
                    <Row
                      label={phrase(valueExplanationDialogValue.slug)}
                      value={formatGold(displayValue)}
                      active
                    />
                  )}
                  <Row
                    label={phrase(valueExplanationDialogMarketValue.slug)}
                    value={ev !== undefined ? formatGold(ev) : "—"}
                    active={source === "market" && displayValue !== undefined}
                  />
                  <Row
                    label={phrase(valueExplanationDialogReplacementValue.slug)}
                    value={rc !== undefined ? formatGold(rc) : "—"}
                    active={source === "replacement" && displayValue !== undefined}
                  />
                  <Row
                    label={phrase(valueExplanationDialogMerchantValue.slug)}
                    value={mv !== undefined ? formatGold(mv) : "—"}
                    active={source === "merchant" && displayValue !== undefined}
                  />
                </tbody>
              </table>
            </div>
          </div>

          {hasListingData && (
            <div className="space-y-2">
              <Text className="font-medium text-primary text-sm">
                {phrase(valueExplanationDialogListingSummary.slug)}
              </Text>
              <div className={`rounded-md ${surfaceClass(surface + 1)} p-3`}>
                <table className="w-full text-sm">
                  <tbody>
                    <Row
                      label={phrase(valueExplanationDialogSuggestedPrice.slug)}
                      value={suggested !== undefined ? formatGold(suggested) : "—"}
                    />
                    <Row
                      label={phrase(valueExplanationDialogSaleAverage.slug)}
                      value={sa !== undefined ? formatGold(sa) : "—"}
                    />
                    <Row
                      label={phrase(valueExplanationDialogMinListing.slug)}
                      value={n !== undefined ? formatGold(n) : "—"}
                    />
                    <Row
                      label={phrase(valueExplanationDialogListedQuantity.slug)}
                      value={ac !== undefined ? formatNumber(ac) : "—"}
                    />
                    <Row
                      label={phrase(valueExplanationDialogSoldQuantity.slug)}
                      value={sac !== undefined ? formatNumber(sac) : "—"}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {}
          <div className="space-y-2">
            <Text className="font-medium text-primary text-sm">
              {phrase(valueExplanationDialogMarketValueBasis.slug)}
            </Text>
            <div className={`rounded-md ${surfaceClass(surface + 1)} p-3`}>
              <Text className="text-tertiary text-xs">
                {suggested !== undefined
                  ? phrase(valueExplanationDialogBasisSuggested.slug, {
                      price: formatGold(suggested),
                    })
                  : sa !== undefined
                    ? phrase(valueExplanationDialogBasisSaleAverage.slug, {
                        price: formatGold(sa),
                      })
                    : n !== undefined
                      ? phrase(valueExplanationDialogBasisMinimum.slug, { price: formatGold(n) })
                      : phrase(valueExplanationDialogBasisNone.slug)}
              </Text>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

function Row({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <tr>
      <td className="py-0.5 text-secondary text-sm">{label}</td>
      <td
        className={`py-0.5 text-right font-mono text-sm ${active ? "font-semibold text-accent" : "text-primary"}`}
      >
        {value}
      </td>
    </tr>
  )
}
