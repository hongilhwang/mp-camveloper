import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Puzzle, Bot } from 'lucide-react'
import { getHarness } from '@/lib/content'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import ItemCard from '@/components/ItemCard'

export default function HarnessDetail() {
  const { harnessId } = useParams<{ harnessId: string }>()
  const harness = getHarness(harnessId!)

  if (!harness) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-neutral-400">
        하네스를 찾을 수 없습니다
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        to="/browse?type=harness"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> 하네스 목록
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {harness.namespace.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-neutral-900">{harness.namespace}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
                하네스
              </span>
              <span className="text-xs text-neutral-400">v{harness.version}</span>
            </div>
            <p className="text-sm text-neutral-500 mb-3">{harness.description}</p>
            <code className="text-xs bg-neutral-100 px-2 py-1 rounded font-mono text-neutral-600">
              /plugin marketplace install {harness.id}
            </code>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MD 내용 */}
        <div className="lg:col-span-2">
          {harness.parsed ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <MarkdownRenderer content={harness.parsed.content} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 text-neutral-400 text-sm">
              내용 없음
            </div>
          )}
        </div>

        {/* 사이드바 */}
        <div className="space-y-4">
          {harness.skills.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                <Puzzle size={12} /> 스킬 ({harness.skills.length})
              </div>
              <div className="space-y-2">
                {harness.skills.map((s) => (
                  <ItemCard
                    key={s.id}
                    type="skill"
                    name={s.id}
                    description={s.description}
                    href={`/harness/${harness.id}/skill/${s.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {harness.agents.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                <Bot size={12} /> 에이전트 ({harness.agents.length})
              </div>
              <div className="space-y-2">
                {harness.agents.map((a) => (
                  <ItemCard
                    key={a.id}
                    type="agent"
                    name={a.id}
                    description={a.description}
                    href={`/harness/${harness.id}/agent/${a.id}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
