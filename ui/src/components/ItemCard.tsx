import { Link } from 'react-router-dom'

type ItemType = 'skill' | 'agent' | 'harness'

const typeStyle: Record<ItemType, string> = {
  skill: 'bg-blue-50 text-blue-700',
  agent: 'bg-violet-50 text-violet-700',
  harness: 'bg-amber-50 text-amber-700',
}

const typeLabel: Record<ItemType, string> = {
  skill: '스킬',
  agent: '에이전트',
  harness: '하네스',
}

interface ItemCardProps {
  type: ItemType
  name: string
  description: string
  namespace?: string
  href: string
  pipeline?: number
}

export default function ItemCard({ type, name, description, namespace, href, pipeline }: ItemCardProps) {
  return (
    <Link to={href}>
      <div className="group bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md hover:border-neutral-300 transition-all h-full flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {pipeline !== undefined && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-500 font-mono">
                {pipeline}단계
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeStyle[type]}`}>
              {typeLabel[type]}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <p className="font-medium text-neutral-900 text-sm mb-1 group-hover:text-neutral-600 transition-colors">
            {name}
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {namespace && (
          <div className="pt-2 border-t border-neutral-100">
            <span className="text-xs text-neutral-400 font-mono">/{namespace}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
