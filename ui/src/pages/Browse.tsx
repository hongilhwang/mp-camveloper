'use client'
import { useSearchParams } from 'react-router-dom'
import { getHarnesses, getAllSkills, getAllAgents } from '@/lib/content'
import ItemCard from '@/components/ItemCard'

type FilterType = 'all' | 'harness' | 'skill' | 'agent'

const tabs: { id: FilterType; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'harness', label: '하네스' },
  { id: 'skill', label: '스킬' },
  { id: 'agent', label: '에이전트' },
]

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = (searchParams.get('type') ?? 'all') as FilterType
  const query = searchParams.get('q') ?? ''

  const harnesses = getHarnesses()
  const skills = getAllSkills()
  const agents = getAllAgents()

  const matchQuery = (text: string) =>
    !query || text.toLowerCase().includes(query.toLowerCase())

  const filteredHarnesses = harnesses.filter(
    (h) => (type === 'all' || type === 'harness') && matchQuery(h.id + h.description)
  )
  const filteredSkills = skills.filter(
    (s) => (type === 'all' || type === 'skill') && matchQuery(s.id + s.description)
  )
  const filteredAgents = agents.filter(
    (a) => (type === 'all' || type === 'agent') && matchQuery(a.id + a.description)
  )

  const total = filteredHarnesses.length + filteredSkills.length + filteredAgents.length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900 mb-1">
          {query ? `"${query}" 검색 결과` : '전체 둘러보기'}
        </h1>
        <p className="text-sm text-neutral-400">{total}개 항목</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSearchParams(query ? { type: tab.id, q: query } : { type: tab.id })}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              type === tab.id
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {total === 0 && (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-base font-medium mb-1">결과가 없습니다</p>
          <p className="text-sm">다른 검색어를 시도해보세요</p>
        </div>
      )}

      {filteredHarnesses.length > 0 && (
        <section className="mb-10">
          {type === 'all' && (
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              하네스
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredHarnesses.map((h) => (
              <ItemCard
                key={h.id}
                type="harness"
                name={h.namespace}
                description={h.description}
                href={`/harness/${h.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {filteredSkills.length > 0 && (
        <section className="mb-10">
          {type === 'all' && (
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              스킬
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredSkills.map((s) => (
              <ItemCard
                key={`${s.harness.id}-${s.id}`}
                type="skill"
                name={s.id}
                description={s.description}
                namespace={s.harness.namespace}
                href={`/harness/${s.harness.id}/skill/${s.id}`}
              />
            ))}
          </div>
        </section>
      )}

      {filteredAgents.length > 0 && (
        <section className="mb-10">
          {type === 'all' && (
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
              에이전트
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredAgents.map((a) => (
              <ItemCard
                key={`${a.harness.id}-${a.id}`}
                type="agent"
                name={a.id}
                description={a.description}
                namespace={a.harness.namespace}
                href={`/harness/${a.harness.id}/agent/${a.id}`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
