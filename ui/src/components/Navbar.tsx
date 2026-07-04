import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
            C
          </div>
          <span className="font-semibold text-neutral-900 text-sm hidden sm:block">
            Claude Marketplace
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-sm">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="스킬, 에이전트 검색..."
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-neutral-100 rounded-lg border border-transparent focus:border-neutral-300 focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-3 shrink-0">
          <Link to="/browse" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            둘러보기
          </Link>
          <a
            href="https://github.com/hongilhwang/mp-camveloper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-700 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  )
}
