'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, SortAsc, SortDesc, X } from 'lucide-react'

interface HistoryFilterProps {
  onFilterChange: (filters: {
    search: string;
    sortBy: 'date' | 'name' | 'sentence';
    sortOrder: 'asc' | 'desc';
  }) => void;
}

export function HistoryFilter({ onFilterChange }: HistoryFilterProps) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'sentence'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onFilterChange({ search: value, sortBy, sortOrder })
  }

  const handleSortByChange = (value: 'date' | 'name' | 'sentence') => {
    setSortBy(value)
    onFilterChange({ search, sortBy: value, sortOrder })
  }

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newOrder)
    onFilterChange({ search, sortBy, sortOrder: newOrder })
  }

  const clearSearch = () => {
    setSearch('')
    onFilterChange({ search: '', sortBy, sortOrder })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4 animate-in fade-in-50 duration-500">
      <div className="relative flex-1">
        <Input
          placeholder="Cari berdasarkan nama..."
          value={search}
          onChange={handleSearchChange}
          className="pl-9 pr-9"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 p-0"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        <Select
          value={sortBy}
          onValueChange={(value) => handleSortByChange(value as 'date' | 'name' | 'sentence')}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Urutkan berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Tanggal</SelectItem>
            <SelectItem value="name">Nama</SelectItem>
            <SelectItem value="sentence">Masa Pidana</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortOrder}
          className="aspect-square"
        >
          {sortOrder === 'asc' ? (
            <SortAsc className="h-4 w-4" />
          ) : (
            <SortDesc className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}