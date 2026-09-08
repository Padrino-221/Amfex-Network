import type { SiteSettings } from './cms'

export interface SocialLink {
  platform: string
  url: string
}

export function getSocialLinks(settings: SiteSettings | null): SocialLink[] {
  const raw = settings?.['social_links']
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed
          .filter((s: unknown) => typeof (s as Record<string, unknown>).url === 'string' && ((s as Record<string, string>).url ?? '').trim())
          .map((s: Record<string, string>) => ({ platform: s.platform || 'Link', url: s.url.trim() }))
      }
    } catch {
      // fall through
    }
  }
  return []
}
