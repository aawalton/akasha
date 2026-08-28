"use client"

import { PageLayout } from "@shared/design-layout/components/page-layout"
import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { PanelToggleProvider } from "@shared/design-layout/components/panel-toggle-provider"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { useColumnCount } from "@shared/design-layout/components/use-column-count"
import { COLUMN_WIDTH } from "@shared/design-layout/components/layout-data"
import { editorPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { PageTabsTrigger, Tabs, TabsContent, TabsList } from "@shared/design-patterns/components/tabs"
import { cn } from "@shared/design-primitives/utils/cn"
import { usePagesUIRouter } from "@shared/pages-ui/router-context"
import { extractCompanionMetadata } from "@temper/game-characters/build-metadata"
import { encodeCompanion } from "@temper/game-codec/companions/companion-codec"
import type { CompanionState } from "@temper/game-companions-core/companion-types"
import { useCompanionLifecycle, useCompanionList } from "@temper/game-companions-ui/use-companions"
import { useCompletionCompanions } from "@temper/player-completion-ui/use-completion"
import { usePlayer } from "@temper/player-profile/use-player"
import { companionUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { BarChart3, Info, ShieldHalf, Swords, User } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { CompanionAutomationPanelCard } from "@/components/companion-character/companion-automation-panel-card"
import { CompanionGeneralPanel } from "@/components/companion-character/companion-general-panel"
import { CompanionPanel } from "@/components/companion-character/companion-panel"
import { CompanionEquipmentPanel } from "@/components/companion-equipment/companion-equipment-panel"
import { GlobalCompanionBulkEditTags } from "@/components/companion-equipment/global-companion-bulk-edit-tags"
import { CompanionSkillsPanel } from "@/components/companion-skills/companion-skills-panel"
import { CompanionStatsPanel } from "@/components/companion-skills/companion-stats-panel"
import { CompanionEditorHeader } from "@/components/companions/companion-editor-header"
import { CompanionTargetPanelCard } from "@/components/companions/companion-target-panel-card"
import {
  useCompanion,
  useCompanionActions,
  useCompanionMetadata,
} from "@/components/companions/context/use-companion"
import { useCompanionPartnerBuildUrl } from "@/components/companions/use-companion-partner-build-url"
import { useCompanionSetTarget } from "@/components/companions/use-companion-set-target"
import { useCompanionUpdate } from "@/components/companions/use-companion-update"
import { SetTargetConfirmDialog } from "@/components/ui/set-target-confirm-dialog"
import { UnderConstructionDialog } from "@/components/under-construction-dialog"

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
      router.push(`${companionUrl(BuildId(newId), remixedBuild.name)}?tab=companion`)
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
