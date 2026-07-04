import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { getSkill, getAgent } from '@/lib/content'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export default function ItemDetail({ itemType }: { itemType: 'skill' | 'agent' }) {
  const { harnessId, skillId, agentId } = useParams<{
    harnessId: string
    skillId?: string
    agentId?: string
  }>()
  const [copied, setCopied] = useState(false)

  const item =
    itemType === 'skill'
      ? getSkill(harnessId!, skillId!)
      : getAgent(harnessId!, agentId!)

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-neutral-400">
        항목을 찾을 수 없습니다
      </div>
    )
  }

  const installCmd = `/${item.harness.namespace}:${item.id}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const typeLabel = itemType === 'skill' ? '스킬' : '에이전트'
  const typeBadge = itemType === 'skill'
    ? 'bg-blue-50 text-blue-700'
    : 'bg-violet-50 text-violet-700'
  const backHref = `/harness/${harnessId}`

  const pipeline = item.parsed?.frontmatter?.pipeline as { step?: number } | undefined

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> {item.harness.namespace} 하네스
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {item.id.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-xl font-bold text-neutral-900">{item.id}</h1>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadge}`}>
                {typeLabel}
              </span>
              {pipeline?.step !== undefined && (
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-neutral-500 font-mono">
                  파이프라인 {pipeline.step}단계
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-500 mb-4">{item.description}</p>

            {/* Install command */}
            <div className="bg-neutral-950 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <code className="text-green-400 font-mono text-sm">{installCmd}</code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-medium transition-colors shrink-0"
              >
                {copied ? (
                  <><CheckCircle2 size={12} /> 복사됨</>
                ) : (
                  <><Copy size={12} /> 복사</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MD Content */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        {item.parsed ? (
          <MarkdownRenderer content={item.parsed.content} />
        ) : (
          <p className="text-neutral-400 text-sm">내용 없음</p>
        )}
      </div>
    </div>
  )
}
