"use client"

import { COLUMN_WIDTH } from "@akasha/design-layout/layout-data"
import { PageLayout } from "@akasha/design-layout/page-layout"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { PanelToggleProvider } from "@akasha/design-layout/panel-toggle-provider"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { editorPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { useColumnCount } from "@akasha/design-layout/use-column-count"
import { PageTabsTrigger, Tabs, TabsContent, TabsList } from "@akasha/design-patterns/tabs"
import { cn } from "@akasha/design-primitives/cn"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { extractCompanionMetadata } from "@akasha/temper-build-metadata/build-metadata"
import { companionUrl } from "@akasha/temper-build-support/build-url"
import { encodeCompanion } from "@akasha/temper-companion-codec/companion-codec"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import {
  useCompanionLifecycle,
  useCompanionList,
} from "@akasha/temper-companions-ui/use-companions"
import { buildId as toBuildId } from "@akasha/temper-formula-framework/branded-id"
import { useCompletionCompanions } from "@akasha/temper-player-completion-ui/use-completion"
import { usePlayer } from "@akasha/temper-player-profile/use-player"
import { BarChart3, Info, ShieldHalf, Swords, User } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { CompanionAutomationPanelCard } from "../companion-automation-panel-card/companion-automation-panel-card.module.code.tsx"
import { CompanionEditorHeader } from "../companion-editor-header/companion-editor-header.module.code.tsx"
import { CompanionEquipmentPanel } from "../companion-equipment-panel/companion-equipment-panel.module.code.tsx"
import { CompanionGeneralPanel } from "../companion-general-panel/companion-general-panel.module.code.tsx"
import { CompanionPanel } from "../companion-panel/companion-panel.module.code.tsx"
import { CompanionSkillsPanel } from "../companion-skills-panel/companion-skills-panel.module.code.tsx"
import { CompanionStatsPanel } from "../companion-stats-panel/companion-stats-panel.module.code.tsx"
import { CompanionTargetPanelCard } from "../companion-target-panel-card/companion-target-panel-card.module.code.tsx"
import { GlobalCompanionBulkEditTags } from "../global-companion-bulk-edit-tags/global-companion-bulk-edit-tags.module.code.tsx"
import { SetTargetConfirmDialog } from "../set-target-confirm-dialog/set-target-confirm-dialog.module.code.tsx"
import { UnderConstructionDialog } from "../under-construction-dialog/under-construction-dialog.module.code.tsx"
import {
  useCompanion,
  useCompanionActions,
  useCompanionMetadata,
} from "../use-companion/use-companion.module.code.ts"
import { useCompanionPartnerBuildUrl } from "../use-companion-partner-build-url/use-companion-partner-build-url.module.code.ts"
import { useCompanionSetTarget } from "../use-companion-set-target/use-companion-set-target.module.code.ts"
import { useCompanionUpdate } from "../use-companion-update/use-companion-update.module.code.ts"

const EDITOR_TAB_LABELS: Record<string, string> = {
  general: "General",
  companion: "Companion",
  equipment: "Equipment",
  skills: "Skills",
  stats: "Stats",
}

interface CompanionEditorContentProps {
  initialTab?: string
}

export function CompanionEditorContent({ initialTab }: CompanionEditorContentProps) {
  const build = useCompanion()
  const router = usePagesUIRouter()
  const { buildId, isOwner, visibility, name, description, updateMeta } = useCompanionMetadata()
  const readOnly = !isOwner || visibility === "live"
  const nameReadOnly = !isOwner
  const { updateCompanion, updateEquipment, updateSkills, updateTarget, setCompanionWithCleanup } =
    useCompanionActions()
  const { remix } = useCompanionLifecycle()
  const { isAuthenticated } = usePlayer()
  const { companions: completionCompanions } = useCompletionCompanions()
  const { builds: companionBuilds } = useCompanionList()

  const [activeTab, setActiveTab] = useState(initialTab ?? "general")
  const [underConstructionFeature, setUnderConstructionFeature] = useState<string | null>(null)

  const {
    setTargetEntities,
    pendingConfirmEntity,
    isSettingTarget,
    handleSetTarget,
    handleSetTargetConfirm,
    clearPendingConfirm,
  } = useCompanionSetTarget({ buildId, companionId: build.companion.id })

  const [isRemixing, setIsRemixing] = useState(false)

  const handleRemix = async () => {
    if (isRemixing) return
    setIsRemixing(true)
    try {
      const remixedBuild: CompanionState = { ...build, name: `${build.name} (Copy)` }
      const newBuildHash = encodeCompanion(remixedBuild)
      const newBuildMetadata = extractCompanionMetadata(remixedBuild)
      const newId = crypto.randomUUID()
      await remix({ sourceId: buildId, newId, newBuildHash, newBuildMetadata })
      router.push(`${companionUrl(toBuildId(newId), remixedBuild.name)}?tab=companion`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remix build")
    } finally {
      setIsRemixing(false)
    }
  }

  const columnCount = useColumnCount()
  const cols = columnCount ?? 1

  const completionCompanion = completionCompanions.find(
    (entity) => entity.targetBuildId === buildId
  )

  useEffect(() => {
    if (cols >= 2 && activeTab === "stats") {
      setActiveTab("general")
    }
  }, [cols, activeTab])

  const handleCompanionUpdate = useCompanionUpdate(
    build,
    updateCompanion,
    updateEquipment,
    setCompanionWithCleanup
  )

  const mainColumnCount: 1 | 2 = cols >= 3 ? 2 : 1

  const { partnerBuildUrl, browseHref } = useCompanionPartnerBuildUrl(
    visibility,
    buildId,
    build.companion.id,
    completionCompanions,
    companionBuilds
  )

  return (
    <PageLayout skeleton={editorPageSkeleton({ initialTab, defaultTab: "companion" })}>
      <PageLayout.Header>
        <CompanionEditorHeader
          name={name}
          nameReadOnly={nameReadOnly}
          visibility={visibility}
          partnerBuildUrl={partnerBuildUrl}
          isOwner={isOwner}
          readOnly={readOnly}
          browseHref={browseHref}
          isAuthenticated={isAuthenticated}
          isSettingTarget={isSettingTarget}
          hasSetTargetEntities={setTargetEntities.length > 0}
          onUpdateMeta={updateMeta}
          onSetTarget={handleSetTarget}
          onRemix={handleRemix}
          remixDisabled={isRemixing}
        />
      </PageLayout.Header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        syncUrl
        syncStorage="temper:companion-editor:tab"
      >
        <PageLayout.Tabs>
          <TabsList
            className={cn(
              "grid h-18 w-full rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg",
              cols >= 2 ? "grid-cols-4" : "grid-cols-5"
            )}
          >
            <PageTabsTrigger value="general" icon={<Info />} label="General" />
            <PageTabsTrigger value="companion" icon={<User />} label="Companion" />
            <PageTabsTrigger value="equipment" icon={<ShieldHalf />} label="Equipment" />
            <PageTabsTrigger value="skills" icon={<Swords />} label="Skills" />
            <PageTabsTrigger
              value="stats"
              icon={<BarChart3 />}
              label="Stats"
              className={cols >= 2 ? "hidden" : undefined}
            />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <div className="flex flex-col gap-6">
            <PageTabHeader
              title={EDITOR_TAB_LABELS[activeTab] ?? activeTab}
              subtitle={
                activeTab === "equipment" && !readOnly ? (
                  <GlobalCompanionBulkEditTags
                    equipment={build.equipment}
                    onUpdate={updateEquipment}
                  />
                ) : undefined
              }
            />
            {(() => {
              const tabContent = (
                <div data-view-only={readOnly || undefined} className="w-full">
                  <TabsContent value="general">
                    <PanelToggleProvider active={activeTab === "general"}>
                      <CompanionGeneralPanel
                        buildId={buildId}
                        buildName={name}
                        buildDescription={description}
                        onUpdateMeta={updateMeta}
                        columnCount={mainColumnCount}
                        readOnly={readOnly}
                        buildFieldsReadOnly={!isOwner}
                      />
                    </PanelToggleProvider>
                  </TabsContent>

                  <TabsContent value="companion">
                    <PanelToggleProvider active={activeTab === "companion"}>
                      <ResponsiveColumns columnCount={mainColumnCount}>
                        <CompanionPanel
                          companion={build.companion}
                          onUpdateCompanion={handleCompanionUpdate}
                          readOnly={readOnly}
                          roleReadOnly={visibility === "target"}
                        />
                        <CompanionTargetPanelCard
                          target={build.target}
                          onUpdate={updateTarget}
                          readOnly={readOnly}
                        />
                        {completionCompanion && !readOnly && (
                          <CompanionAutomationPanelCard
                            companionId={completionCompanion.companionId}
                          />
                        )}
                      </ResponsiveColumns>
                    </PanelToggleProvider>
                  </TabsContent>

                  <TabsContent value="equipment">
                    <PanelToggleProvider active={activeTab === "equipment"}>
                      <CompanionEquipmentPanel
                        equipment={build.equipment}
                        onUpdate={updateEquipment}
                        columnCount={mainColumnCount}
                        readOnly={readOnly}
                      />
                    </PanelToggleProvider>
                  </TabsContent>

                  <TabsContent value="skills">
                    <PanelToggleProvider active={activeTab === "skills"}>
                      <CompanionSkillsPanel
                        companionId={build.companion.id}
                        skills={build.skills}
                        equipment={build.equipment}
                        onUpdate={updateSkills}
                        columnCount={mainColumnCount}
                        readOnly={readOnly}
                      />
                    </PanelToggleProvider>
                  </TabsContent>
                </div>
              )

              if (cols >= 2) {
                return (
                  <div className="flex gap-6">
                    <div className="min-w-0 flex-1">{tabContent}</div>
                    <div className="shrink-0" style={{ width: COLUMN_WIDTH }}>
                      <CompanionStatsPanel columnCount={1} />
                    </div>
                  </div>
                )
              }

              if (activeTab === "stats") {
                return <CompanionStatsPanel columnCount={1} />
              }

              return tabContent
            })()}
          </div>
        </PageLayout.Content>
      </Tabs>

      <UnderConstructionDialog
        featureName={underConstructionFeature ?? ""}
        open={underConstructionFeature !== null}
        onOpenChange={(open) => !open && setUnderConstructionFeature(null)}
      />

      <SetTargetConfirmDialog
        open={pendingConfirmEntity !== null}
        onOpenChange={(open) => !open && clearPendingConfirm()}
        entityName={pendingConfirmEntity?.name ?? ""}
        onConfirm={handleSetTargetConfirm}
      />
    </PageLayout>
  )
}
