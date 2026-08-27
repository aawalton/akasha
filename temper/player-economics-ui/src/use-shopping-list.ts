"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { z } from "zod"

function listStorageKey(userId: string | null): string {
  return `temper:shopping:list:${userId}`
}

const STORAGE_SCHEMA = z.array(z.string())

function loadFromStorage(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    if (raw != null) {
      const parsed = STORAGE_SCHEMA.safeParse(JSON.parse(raw))
      if (parsed.success) return new Set(parsed.data)
    }
  } catch {}
  return new Set()
}

function saveToStorage(key: string, keys: Set<string>): undefined {
  try {
    localStorage.setItem(key, JSON.stringify([...keys]))
  } catch {}
}

export interface ShoppingList {
  keys: Set<string>
  has: (key: string) => boolean
  add: (key: string) => void
  remove: (key: string) => void
  toggle: (key: string) => void
  addAll: (keys: Iterable<string>) => void
  removeAll: (keys: Iterable<string>) => void
  clear: () => void
}

export function useShoppingList(userId: string | null): ShoppingList {
  const storageKey = listStorageKey(userId)
  const [keys, setKeys] = useState<Set<string>>(() => loadFromStorage(storageKey))

  const storageKeyRef = useRef(storageKey)
  storageKeyRef.current = storageKey

  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    setKeys(loadFromStorage(storageKey))
  }, [storageKey])

  useEffect(() => {
    saveToStorage(storageKeyRef.current, keys)
  }, [keys])

  const has = useCallback((key: string) => keys.has(key), [keys])

  const add = useCallback((key: string) => {
    setKeys((prev) => {
      if (prev.has(key)) return prev
      const next = new Set(prev)
      next.add(key)
      return next
    })
  }, [])

  const remove = useCallback((key: string) => {
    setKeys((prev) => {
      if (!prev.has(key)) return prev
      const next = new Set(prev)
      next.delete(key)
      return next
    })
  }, [])

  const toggle = useCallback((key: string) => {
    setKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const addAll = useCallback((incoming: Iterable<string>) => {
    setKeys((prev) => {
      const next = new Set(prev)
      let changed = false
      for (const key of incoming) {
        if (!next.has(key)) {
          next.add(key)
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [])

  const removeAll = useCallback((incoming: Iterable<string>) => {
    setKeys((prev) => {
      const next = new Set(prev)
      let changed = false
      for (const key of incoming) {
        if (next.delete(key)) changed = true
      }
      return changed ? next : prev
    })
  }, [])

  const clear = useCallback(() => {
    setKeys((prev) => (prev.size === 0 ? prev : new Set()))
  }, [])

  return { keys, has, add, remove, toggle, addAll, removeAll, clear }
}
