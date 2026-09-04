"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { EditableNumber } from "@akasha/design-forms/editable-number"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@akasha/design-forms/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import type {
  CategoryRule,
  DestinationChain,
  MoveToDestination,
  StockScope,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { ChevronRight } from "lucide-react"
import {
  ACTION_OPTIONS,
  type ActionVariant,
  NOTHING_ACTION,
  SELL_ACTIONS,
  SELL_DESTINATION_OPTIONS,
} from "../action-options/action-options.module.code.ts"
import { CharacterTargetSelect } from "../character-target-select/character-target-select.module.code.tsx"
import { CompanionTargetSelect } from "../companion-target-select/companion-target-select.module.code.tsx"
import { DeconstructScopeSelect } from "../deconstruct-scope-select/deconstruct-scope-select.module.code.tsx"
import { DestinationCascade } from "../destination-cascade/destination-cascade.module.code.tsx"
import { RuleCardDestinationChain } from "../rule-card-destination-chain/rule-card-destination-chain.module.code.tsx"
import { StockScopeSelect } from "../stock-scope-select/stock-scope-select.module.code.tsx"
import type { DestinationOptions } from "../use-destination-options/use-destination-options.module.code.ts"

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
  handleMailRecipientChange,
}: RuleCardActionRowProps) {
  const useChain = rule.destinationChain !== undefined && rule.destinationChain.length > 0
  const currencyActionOptions = ACTION_OPTIONS.filter(
    (opt) => opt.value === "nothing" || opt.value === "move-to" || opt.value === "stock"
  )

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
            <SelectContent
              nullSentinel={{ value: NOTHING_ACTION.value, label: NOTHING_ACTION.label }}
              sorted
            >
              {currencyActionOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          ) : (
            <SelectContent
              nullSentinel={{ value: NOTHING_ACTION.value, label: NOTHING_ACTION.label }}
              sorted
            >
              {ACTION_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
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
                  {opt.label}
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
                Bank
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
            aria-label={
              useChain ? "Switch to single destination" : "Switch to cascading destinations"
            }
          >
            {useChain ? "Single destination" : "Cascading destinations"}
          </ButtonBadge>
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
          placeholder="PlayerName"
          value={handle}
          onChange={(e) => {
            const raw = e.target.value.replace(/^@+/, "")
            onChange(raw)
          }}
          className="h-7 px-1 text-xs"
          aria-label="Recipient account handle"
        />
      </InputGroup>
    </div>
  )
}
