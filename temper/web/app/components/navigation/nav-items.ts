import type { AppNavItem } from "@shared/design-layout/types/nav-types"
import {
  BookCheck,
  BookOpen,
  Handshake,
  Home,
  Keyboard,
  Library,
  ListChecks,
  Package,
  Rocket,
  Settings,
  ShoppingCart,
  Swords,
} from "lucide-react"

export const primaryNavItems: AppNavItem[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "Home",
    href: "/home",
    icon: Home,
  },
  {
    id: "watcher",
    label: "Get Started",
    shortLabel: "Start",
    href: "/watcher",
    icon: Rocket,
  },
  {
    id: "characters",
    label: "Character Builds",
    shortLabel: "Character Builds",
    href: "/character-builds",
    icon: Swords,
  },
  {
    id: "companions",
    label: "Companion Builds",
    shortLabel: "Companion Builds",
    href: "/companion-builds",
    icon: Handshake,
  },
  {
    id: "completion",
    label: "Completion",
    shortLabel: "Completion",
    href: "/completion",
    icon: ListChecks,
  },
  {
    id: "inventory",
    label: "Inventory",
    shortLabel: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    id: "shopping",
    label: "Shopping",
    shortLabel: "Shopping",
    href: "/shopping",
    icon: ShoppingCart,
  },
  {
    id: "catalog",
    label: "Catalog",
    shortLabel: "Catalog",
    href: "/catalog",
    icon: Library,
  },
]

export const resourcesNavItem: AppNavItem = {
  id: "resources",
  label: "Resources",
  shortLabel: "Resources",
  icon: BookOpen,
  children: [
    {
      id: "methodology",
      label: "Methodology",
      shortLabel: "Methods",
      href: "/methodology",
      icon: BookCheck,
    },
    {
      id: "keyboard-shortcuts",
      label: "Keyboard Shortcuts",
      shortLabel: "Shortcuts",
      href: "/keyboard-shortcuts",
      icon: Keyboard,
    },
  ],
}

export const settingsNavItem: AppNavItem = {
  id: "settings",
  label: "Settings",
  shortLabel: "Settings",
  href: "/settings",
  icon: Settings,
}
