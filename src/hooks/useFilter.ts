import { useMemo } from 'react'
import type { Opportunity, AudienceTag, OpportunityType, Category } from '../types'

interface UseFilterOptions {
  opportunities: Opportunity[]
  searchQuery: string
  activeAudience: AudienceTag[]
  activeTypes: OpportunityType[]
  activeCategory: Category | null
}

export function useFilter({
  opportunities,
  searchQuery,
  activeAudience,
  activeTypes,
  activeCategory,
}: UseFilterOptions): Opportunity[] {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return opportunities.filter((item) => {
      // Search: matches name OR description (case-insensitive)
      if (query) {
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Audience filter: OR within group (item must match at least one selected)
      if (activeAudience.length > 0) {
        const matchesAudience = activeAudience.some((a) =>
          item.audience.includes(a)
        )
        if (!matchesAudience) return false
      }

      // Type filter: OR within group
      if (activeTypes.length > 0) {
        if (!activeTypes.includes(item.type)) return false
      }

      // Category filter (from category cards click)
      if (activeCategory !== null) {
        if (item.category !== activeCategory) return false
      }

      return true
    })
  }, [opportunities, searchQuery, activeAudience, activeTypes, activeCategory])
}
