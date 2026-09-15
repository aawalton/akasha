"use client"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "akasha/design/interface/design-interfaces-primitives/modules/alert/alert.module.code.tsx"
import { TriangleAlert } from "lucide-react"

export function InventoryRulesUnread({ said }: { said: string }) {
  return (
    <div className="flex flex-col gap-6">
      <Alert variant="destructive">
        <TriangleAlert />
        <AlertTitle>Your rules went unread, so none of them are shown</AlertTitle>
        <AlertDescription>
          <p>
            Nothing has been changed and nothing has been saved. The rules already compiled into the
            game are the ones still running. This page stays shut until the rule below is mended,
            because showing the rest without it would leave out a rule you wrote.
          </p>
          <p className="font-mono text-xs">{said}</p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
