"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(
  undefined
)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    if (storedTheme) {
      setThemeState(storedTheme)
    }
  }, [storageKey])

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setThemeState(newTheme)
  }

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    
    let effectiveTheme = theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      effectiveTheme = mediaQuery.matches ? "dark" : "light"
      
      const handler = (e: MediaQueryListEvent) => {
        const newEffectiveTheme = e.matches ? "dark" : "light"
        root.classList.remove("light", "dark")
        root.classList.add(newEffectiveTheme)
      }
      
      mediaQuery.addEventListener("change", handler)
      
      // cleanup
      return () => mediaQuery.removeEventListener("change", handler)
    }
    
    root.classList.add(effectiveTheme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
