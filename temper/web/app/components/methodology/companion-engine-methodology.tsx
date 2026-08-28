import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardContent, CardHeader, CardTitle } from "@shared/design-primitives/components/card"
import { Heading } from "@shared/design-primitives/components/heading"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { Text } from "@shared/design-primitives/components/text"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"

function InlineCode({ children }: { children: React.ReactNode }) {
  const surface = useSurface()
  return (
    <code className={`rounded ${surfaceClass(surface + 1)} px-1.5 py-0.5 font-mono text-xs`}>
      {children}
    </code>
  )
}

function FormulaBlock({ children }: { children: React.ReactNode }) {
  const surface = useSurface()
  return (
    <div className={`rounded-lg ${surfaceClass(surface + 1)} p-3 font-mono text-xs`}>
      {children}
    </div>
  )
}
const orderedList = "list-decimal space-y-2 pl-5 text-sm/relaxed text-secondary"

function SectionCard({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <PanelCard id={id}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </PanelCard>
  )
}

export const companionEngineMethodologyPanels = [
  <SectionCard key="overview" id="methodology-overview" title="Overview">
    <Text variant="prose">
      Correctness is established through{" "}
      <strong className="text-primary">two independent validation pipelines</strong> that compare
      engine output against the live ESO game client. Each pipeline requires exact integer-level
      matches — there are no tolerance thresholds or approximate comparisons.
    </Text>
    <ol className={orderedList}>
      <li>
        <strong className="text-primary">Tooltip validation</strong> — skill descriptions,
        cooldowns, costs, and durations match game-client text exactly
      </li>
      <li>
        <strong className="text-primary">Combat hit validation</strong> — logged damage/heal values
        from real fights match engine formulas exactly
      </li>
    </ol>
    <Text variant="prose">Both are automated as test suites with zero-tolerance assertions.</Text>
  </SectionCard>,

  <SectionCard
    key="tooltip-validation"
    id="methodology-tooltip-validation"
    title="Tooltip Validation"
  >
    <div className="flex flex-col gap-3">
      <Heading>Field Validation</Heading>
      <Text variant="prose">
        For each skill with a known ability ID, the validator checks name, cooldown, cast time,
        channel duration, channeled flag, cost, and resource mechanic for exact matches.
      </Text>
      <Text variant="prose">Cooldown validation uses the formula:</Text>
      <FormulaBlock>
        round(baseCooldown * (1 + abilityCooldownMod) * 1000) === gameClientMs
      </FormulaBlock>
    </div>
    <div className="flex flex-col gap-3">
      <Heading>Description Value Validation</Heading>
      <Text variant="prose">
        Skill descriptions contain value and duration placeholders. The validator:
      </Text>
      <ol className={orderedList}>
        <li>Computes display values using the build's stats</li>
        <li>Applies buff duration modifiers to duration placeholders</li>
        <li>Substitutes placeholders into the template</li>
        <li>
          Normalizes both game text and engine text (strips ESO color codes, collapses whitespace)
        </li>
        <li>Asserts exact string equality</li>
      </ol>
      <Text variant="prose">
        The formula coefficients, damage/healing multipliers, and duration modifiers run through the
        same code paths the game uses to render tooltips, validating not just the stat values but
        their downstream effects on skill output.
      </Text>
    </div>
  </SectionCard>,

  <SectionCard
    key="combat-hit-validation"
    id="methodology-combat-hit-validation"
    title="Combat Hit Validation"
  >
    <Text variant="prose">
      An in-game addon logs every companion combat event (ability name, hit value, target, result
      type, overflow) along with the companion's build hash. The validator replays each fight
      against the engine's formulas.
    </Text>
    <Text variant="prose">
      This validates against actual combat outcomes — real damage and healing numbers produced by
      the game server, not just the client's UI calculations.
    </Text>

    <div className="flex flex-col gap-3">
      <Heading>Phase 1 — Heal Anchor</Heading>
      <Text variant="prose">
        Heals have no armor variable, making them a clean signal for validating weapon damage. The
        validator:
      </Text>
      <ol className={orderedList}>
        <li>Groups non-crit heal events by ability name</li>
        <li>Looks up the skill's coefficient from the data files</li>
        <li>
          Back-solves for weapon damage:{" "}
          <InlineCode>WD = round(observedHeal / (coefficient * tooltipHealingMult))</InlineCode>
        </li>
        <li>Confirms the inferred WD matches the engine's own computed weapon damage</li>
      </ol>
    </div>

    <div className="flex flex-col gap-3">
      <Heading>Phase 2 — Damage Scenario Matching</Heading>
      <Text variant="prose">
        Damage hits depend on target armor, which varies. The validator tests each hit against a
        matrix of known scenarios:
      </Text>
      <ul className="list-disc space-y-1 pl-5 text-secondary text-sm/relaxed">
        <li>
          <strong className="text-primary">2 base armor values:</strong> Overland (9100), Dungeon
          (18200)
        </li>
        <li>
          <strong className="text-primary">4 debuff combinations:</strong> none, Minor Breach
          (2974), Major Breach (5948), both
        </li>
      </ul>
      <Text variant="prose">The damage formula under test:</Text>
      <FormulaBlock>
        damage = round(coefficient * WD * tooltipDamageMult * (1 - min(max(0, armor - debuffs - pen)
        / 50000, 0.5)))
      </FormulaBlock>
      <Text variant="prose">
        All hits against the same target must be consistent with a single base armor value. The test
        asserts zero failed hits and zero failed weapon damage checks for every logged fight.
      </Text>
    </div>

    <div className="flex flex-col gap-3">
      <Heading>What This Proves</Heading>
      <ul className="list-disc space-y-1 pl-5 text-secondary text-sm/relaxed">
        <li>Skill coefficients are correct (extracted from game data)</li>
        <li>The armor mitigation formula matches the game (divisor 50000, cap 50%)</li>
        <li>
          Weapon damage, damage done, healing done, and penetration metrics are computed correctly
        </li>
      </ul>
    </div>
  </SectionCard>,

  <SectionCard
    key="engine-architecture"
    id="methodology-engine-architecture"
    title="Engine Architecture"
  >
    <div className="flex flex-col gap-3">
      <Heading>Metric Engine</Heading>
      <Text variant="prose">The metric engine computes stats in three passes:</Text>
      <ol className={orderedList}>
        <li>
          <strong className="text-primary">Effect extraction</strong> — gathers effects from base
          stats, armor (weight + traits), weapons (base damage + traits), jewelry (traits), and
          skill passives
        </li>
        <li>
          <strong className="text-primary">Sum-based metrics</strong> — accumulates effects by
          metric ID and effect type (integer addition or fractional-change multiplication)
        </li>
        <li>
          <strong className="text-primary">Formula metrics</strong> — evaluates a DAG of metric
          formulas in topological order, supporting metric-ref, sum, add, multiply, and divide nodes
        </li>
      </ol>
      <Text variant="prose">
        The topological sort guarantees that dependencies are computed before dependents, and the
        DAG structure prevents circular references.
      </Text>
    </div>

    <div className="flex flex-col gap-3">
      <Heading>Rotation Simulator</Heading>
      <Text variant="prose">
        The rotation simulator models companion combat behavior tick-by-tick at 0.1s resolution:
      </Text>
      <ul className="list-disc space-y-1 pl-5 text-secondary text-sm/relaxed">
        <li>
          Skill selection respects cast times, GCDs (1.0s companion, 0.7s light attack), per-skill
          cooldowns, and ultimate costs
        </li>
        <li>Buff/debuff tracking with duration-based expiry</li>
        <li>Ultimate generation (3.0/s in 8s windows triggered by light attacks)</li>
        <li>
          Light attack damage:{" "}
          <InlineCode>1.5 * WD * tooltipDamageMult * critMult * armorMult</InlineCode>
        </li>
      </ul>
    </div>

    <div className="flex flex-col gap-3">
      <Heading>Optimizer</Heading>
      <Text variant="prose">
        The optimizer uses the metric engine as a black box scoring function. It searches through:
      </Text>
      <ul className="list-disc space-y-1 pl-5 text-secondary text-sm/relaxed">
        <li>Companion + role + weapon role combinations (exhaustive)</li>
        <li>
          Skill combinations (heuristic: categorizes skills as direct damage vs boosters, prunes
          low-value combinations)
        </li>
        <li>Trait assignments (exhaustive per role)</li>
        <li>Skill ordering permutations (exhaustive: 5! = 120)</li>
      </ul>
    </div>
  </SectionCard>,

  <SectionCard
    key="performance-verification"
    id="methodology-performance-verification"
    title="Performance & Accuracy"
  >
    <Text variant="prose">
      The simulator is heavily optimized to evaluate builds near-instantly. Every optimization is
      verified against a reference score, guaranteeing identical results — speed never changes the
      numbers.
    </Text>
  </SectionCard>,

  <SectionCard key="limitations" id="methodology-limitations" title="Limitations">
    <Text variant="prose">What the validation pipelines do not cover:</Text>
    <ul className="list-disc space-y-2 pl-5 text-secondary text-sm/relaxed">
      <li>
        <strong className="text-primary">Rotation config assumptions</strong> — default parameters
        (0.5 damage frequency, 0.5 synergy rate) are estimates, not validated against gameplay
        recordings
      </li>
      <li>
        <strong className="text-primary">Average crit</strong> — the simulator uses expected-value
        crit multipliers rather than Monte Carlo sampling. This is correct in expectation but does
        not model variance.
      </li>
      <li>
        <strong className="text-primary">Buff/debuff uptime</strong> — simulated uptime depends on
        rotation config and skill selection heuristics, not actual player behavior
      </li>
      <li>
        <strong className="text-primary">Game version coupling</strong> — validation data comes from
        a specific ESO version. Game updates may change formulas or constants, requiring
        re-validation.
      </li>
    </ul>
  </SectionCard>,
]
