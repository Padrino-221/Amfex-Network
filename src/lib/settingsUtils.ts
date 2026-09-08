import type { SiteSettings } from './cms'

export function settingValue(settings: SiteSettings | null, key: string, fallback: string): string {
  const v = settings?.[key]
  return v && v.length ? v : fallback
}

export function settingRow<T extends Record<string, string>>(
  settings: SiteSettings | null,
  key: string,
  fallback: T[]
): T[] {
  const raw = settings?.[key]
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as T[]) : fallback
  } catch {
    return fallback
  }
}
