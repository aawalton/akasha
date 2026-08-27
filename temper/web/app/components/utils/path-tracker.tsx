"use client"

import { useLayoutRouter } from "@shared/design-layout/router-context"
import { useEffect } from "react"

const LAST_PATH_KEY = "eso-build-editor-last-path"

export function PathTracker() {
  const { pathname, searchParams } = useLayoutRouter()

  useEffect(() => {
    if (pathname !== "/" && !pathname.startsWith("/auth") && !pathname.startsWith("/sign-")) {
      const fullPath =
        searchParams.toString() !== "" ? `${pathname}?${searchParams.toString()}` : pathname
      localStorage.setItem(LAST_PATH_KEY, fullPath)
    }
  }, [pathname, searchParams])

  return null
}

export function getLastPath(): string | null {
  if (typeof window === "undefined") return null
  const path = localStorage.getItem(LAST_PATH_KEY)
  return path
}

export function clearLastPath() {
  if (typeof window === "undefined") return
  localStorage.removeItem(LAST_PATH_KEY)
}
