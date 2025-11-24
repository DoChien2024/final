import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  placeholder?: string
}

export default function SearchBar({ 
  value, 
  onChange, 
  onSubmit,
  placeholder = 'Search' 
}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
        />
      </div>
    </form>
  )
}
