"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ButtonBadge } from "akasha/design/interface/badge/modules/button-badge/button-badge.module.code.tsx"
import { EditableNumber } from "akasha/design/interface/form/modules/editable-number/editable-number.module.code.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "akasha/design/interface/form/modules/input-group/input-group.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type {
  CategoryRule,
  DestinationChain,
  MoveToDestination,
  StockScope,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { bank } from "akasha/temper/items/rules/routing/core/temper-venue/pages/bank.temper-venue.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { temperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import {
  ACTION_OPTIONS,
  type ActionVariant,
  NOTHING_ACTION,
  SELL_ACTIONS,
  SELL_DESTINATION_OPTIONS,
} from "akasha/temper/web/player-inventory-management-ui/modules/action-options/action-options.module.code.ts"
import { CharacterTargetSelect } from "akasha/temper/web/player-inventory-management-ui/modules/character-target-select/character-target-select.module.code.tsx"
import { CompanionTargetSelect } from "akasha/temper/web/player-inventory-management-ui/modules/companion-target-select/companion-target-select.module.code.tsx"
import { DeconstructScopeSelect } from "akasha/temper/web/player-inventory-management-ui/modules/deconstruct-scope-select/deconstruct-scope-select.module.code.tsx"
import { DestinationCascade } from "akasha/temper/web/player-inventory-management-ui/modules/destination-cascade/destination-cascade.module.code.tsx"
import { RuleCardDestinationChain } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-destination-chain/rule-card-destination-chain.module.code.tsx"
import { useRuleCardPhrases } from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { StockScopeSelect } from "akasha/temper/web/player-inventory-management-ui/modules/stock-scope-select/stock-scope-select.module.code.tsx"
import type { DestinationOptions } from "akasha/temper/web/player-inventory-management-ui/modules/use-destination-options/use-destination-options.module.code.ts"
import { buyMaxPriceDefault } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/buy-max-price-default.temper-rule-card-phrase.ts"
import { buyMaxPriceEach } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/buy-max-price-each.temper-rule-card-phrase.ts"
import { buyShortfall } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/buy-shortfall.temper-rule-card-phrase.ts"
import { editBuyMaxPrice } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/edit-buy-max-price.temper-rule-card-phrase.ts"
import { mailRecipientLabel } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/mail-recipient-label.temper-rule-card-phrase.ts"
import { mailRecipientPlaceholder } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/mail-recipient-placeholder.temper-rule-card-phrase.ts"
import { toggleBuyShortfall } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/toggle-buy-shortfall.temper-rule-card-phrase.ts"
import { ChevronRight } from "lucide-react"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

interface RuleCardActionRowProps {
  rule: CategoryRule
  isCurrency: boolean
  displayAction: string
  actionOption: { variant: ActionVariant }
  destinationOptions: DestinationOptions
  handleActionChange: (value: string) => void
  handleDestinationChange: (value: MoveToDestination) => void
  handleSellDestinationChange: (value: CategoryRule["action"]) => void
  handleDeconstructModeChange: (mode: "for-inspiration" | "for-materials") => void
  handleStockQuantityChange: (value: number) => void
  handleStockScopeChange: (patch: {
    stockScope: StockScope
    destination: MoveToDestination
  }) => void
  handleDestinationChainChange: (next: DestinationChain | undefined) => void
  handleToggleDestinationChain: (useChain: boolean) => void
  handleBuyShortfallChange: (buyShortfall: boolean) => void
  handleBuyMaxPriceChange: (buyMaxPrice: number) => void
  handleMailRecipientChange: (handle: string) => void
}

export function RuleCardActionRow({
  rule,
  isCurrency,
  displayAction,
  actionOption,
  destinationOptions,
  handleActionChange,
  handleDestinationChange,
  handleSellDestinationChange,
  handleDeconstructModeChange,
  handleStockQuantityChange,
  handleStockScopeChange,
  handleDestinationChainChange,
  handleToggleDestinationChain,
  handleBuyShortfallChange,
  handleBuyMaxPriceChange,
  handleMailRecipientChange,
}: RuleCardActionRowProps) {
  const useChain = rule.destinationChain !== undefined && rule.destinationChain.length > 0
  const buying = rule.buyShortfall === true
  const currencyActionOptions = ACTION_OPTIONS.filter(
    (opt) => opt.value === "nothing" || opt.value === "move-to" || opt.value === "stock"
  )
  const actionTitles = useKeyedTitles(temperItemAction.slug)
  const venues = useKeyedTitles(temperVenue.slug)
  const phrases = useRuleCardPhrases()
  const nothingSentinel = {
    value: NOTHING_ACTION.value,
    label: titleIn(actionTitles, NOTHING_ACTION.value),
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <Select value={displayAction} onValueChange={handleActionChange}>
          <SelectTrigger hideChevron>
            <Badge variant={actionOption.variant} className="shrink-0">
              <SelectValue />
              {displayAction === "stock" && (
                <EditableNumber
                  value={rule.conditions?.targetQuantity ?? (isCurrency ? 10000 : 200)}
                  max={isCurrency ? 99999999 : 99999}
                  prefix=" x"
                  onChange={handleStockQuantityChange}
                  stopPropagation
                />
              )}
            </Badge>
          </SelectTrigger>
          {isCurrency ? (
            <SelectContent nullSentinel={nothingSentinel} sorted>
              {currencyActionOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {titleIn(actionTitles, opt.value)}
                </SelectItem>
              ))}
            </SelectContent>
          ) : (
            <SelectContent nullSentinel={nothingSentinel} sorted>
              {ACTION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {titleIn(actionTitles, opt.value)}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>

        {}
        {!isCurrency && SELL_ACTIONS.has(rule.action) && (
          <Select value={rule.action} onValueChange={handleSellDestinationChange}>
            <SelectTrigger hideChevron>
              <Badge variant={actionOption.variant} className="shrink-0">
                <SelectValue />
              </Badge>
            </SelectTrigger>
            <SelectContent>
              {SELL_DESTINATION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {titleIn(venues, opt.venue)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {}
        {rule.action === "move-to" &&
          (isCurrency ? (
            <div className="flex items-center gap-1">
              <ChevronRight className="size-3 text-tertiary" />
              <Badge variant={actionOption.variant} className="shrink-0">
                {titleIn(venues, bank.key)}
              </Badge>
            </div>
          ) : (
            <DestinationCascade
              destination={rule.destination ?? "bank"}
              options={destinationOptions}
              onChange={handleDestinationChange}
              variant={actionOption.variant}
            />
          ))}

        {}
        {rule.action === "stock" && !useChain && (
          <StockScopeSelect
            stockScope={rule.stockScope}
            destination={rule.destination}
            onChange={handleStockScopeChange}
            variant={actionOption.variant}
          />
        )}

        {}
        {!isCurrency && rule.action === "stock" && (
          <ButtonBadge
            variant={useChain ? "accent" : "elevation-muted"}
            onClick={() => handleToggleDestinationChain(!useChain)}
            aria-label={titleIn(
              phrases,
              useChain ? "switch-to-single-destination" : "switch-to-cascading-destinations"
            )}
          >
            {titleIn(phrases, useChain ? "single-destination" : "cascading-destinations")}
          </ButtonBadge>
        )}

        {!isCurrency && rule.action === "stock" && (
          <ButtonBadge
            variant={buying ? "accent" : "elevation-muted"}
            onClick={() => handleBuyShortfallChange(!buying)}
            aria-pressed={buying}
            aria-label={titleIn(phrases, toggleBuyShortfall.key)}
          >
            {titleIn(phrases, buyShortfall.key)}
          </ButtonBadge>
        )}

        {!isCurrency && rule.action === "stock" && buying && (
          <Badge
            variant="elevation-muted"
            className="shrink-0"
            title={titleIn(phrases, editBuyMaxPrice.key)}
          >
            <EditableNumber
              value={rule.buyMaxPrice ?? 0}
              max={99999999}
              prefix="≤ "
              format={(price) =>
                price === 0
                  ? titleIn(phrases, buyMaxPriceDefault.key)
                  : `${price}${titleIn(phrases, buyMaxPriceEach.key)}`
              }
              onChange={handleBuyMaxPriceChange}
              stopPropagation
            />
          </Badge>
        )}

        {}
        {!isCurrency &&
          (rule.action === "character-equip" ||
            rule.action === "use" ||
            rule.action === "research") && (
            <CharacterTargetSelect
              action={rule.action}
              destination={rule.destination}
              onChange={handleDestinationChange}
              variant={actionOption.variant}
            />
          )}

        {}
        {!isCurrency && rule.action === "companion-equip" && (
          <CompanionTargetSelect
            destination={rule.destination}
            onChange={handleDestinationChange}
            variant={actionOption.variant}
          />
        )}

        {}
        {!isCurrency && rule.action === "mail" && (
          <MailRecipientInput destination={rule.destination} onChange={handleMailRecipientChange} />
        )}

        {}
        {!isCurrency && rule.action === "deconstruct" && (
          <DeconstructScopeSelect
            conditions={rule.conditions}
            destination={rule.destination}
            onModeChange={handleDeconstructModeChange}
            onTargetChange={handleDestinationChange}
            variant={actionOption.variant}
          />
        )}
      </div>

      {}
      {!isCurrency && rule.action === "stock" && useChain && (
        <RuleCardDestinationChain
          chain={rule.destinationChain}
          destinationOptions={destinationOptions}
          onChange={handleDestinationChainChange}
        />
      )}
    </div>
  )
}

function MailRecipientInput({
  destination,
  onChange,
}: {
  destination: MoveToDestination | undefined
  onChange: (handle: string) => void
}) {
  const phrases = useRuleCardPhrases()
  const handle = destination?.startsWith("mail:") ? destination.slice(5) : ""

  return (
    <div className="flex items-center gap-1">
      <ChevronRight className="size-3 text-tertiary" />
      <InputGroup className="h-7 w-40 rounded-md bg-transparent shadow-none ring-1 ring-border">
        <InputGroupAddon align="inline-start" className="pl-2 text-tertiary text-xs">
          @
        </InputGroupAddon>
        <InputGroupInput
          type="text"
          placeholder={titleIn(phrases, mailRecipientPlaceholder.key)}
          value={handle}
          onChange={(e) => {
            const raw = e.target.value.replace(/^@+/, "")
            onChange(raw)
          }}
          className="h-7 px-1 text-xs"
          aria-label={titleIn(phrases, mailRecipientLabel.key)}
        />
      </InputGroup>
    </div>
  )
}
