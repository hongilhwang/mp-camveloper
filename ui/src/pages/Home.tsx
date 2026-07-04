import { Link } from 'react-router-dom'
import { ArrowRight, Layers, Puzzle, Bot } from 'lucide-react'
import { getHarnesses, getAllSkills, getAllAgents } from '@/lib/content'
import ItemCard from '@/components/ItemCard'

export default function Home() {
  const harnesses = getHarnesses()
  const skills = getAllSkills()
  const agents = getAllAgents()

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium mb-5">
            Claude Code 플러그인 마켓플레이스
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight mb-4 tracking-tight">
            Claude Code를 확장하는<br />
            <span className="text-neutral-400">스킬과 에이전트</span>
          </h1>
          <p className="text-base text-neutral-500 max-w-md mx-auto mb-8">
            하네스, 스킬, 에이전트를 발견하고 설치해 Claude Code 워크플로를 강화하세요.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/browse"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
            >
              둘러보기 <ArrowRight size={14} />
            </Link>
            <a
              href="https://github.com/hongilhwang/mp-camveloper"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 text-sm font-medium hover:bg-neutral-50 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-neutral-100">
            {[
              { icon: Layers, label: '하네스', count: harnesses.length },
              { icon: Puzzle, label: '스킬', count: skills.length },
              { icon: Bot, label: '에이전트', count: agents.length },
            ].map(({ icon: Icon, label, count }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon size={14} className="text-neutral-400" />
                  <span className="text-xl font-bold text-neutral-900">{count}</span>
                </div>
                <p className="text-xs text-neutral-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harnesses */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">하네스</h2>
            <p className="text-xs text-neutral-400 mt-0.5">스킬과 에이전트를 묶은 네임스페이스 패키지</p>
          </div>
          <Link to="/browse?type=harness" className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors">
            전체 <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {harnesses.map((h) => (
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

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">스킬</h2>
            <p className="text-xs text-neutral-400 mt-0.5">특정 작업을 수행하는 단일 스킬</p>
          </div>
          <Link to="/browse?type=skill" className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors">
            전체 <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {skills.map((s) => (
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

      {/* Agents */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">에이전트</h2>
            <p className="text-xs text-neutral-400 mt-0.5">복잡한 멀티스텝 작업을 처리하는 전문 에이전트</p>
          </div>
          <Link to="/browse?type=agent" className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors">
            전체 <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {agents.map((a) => (
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
    </div>
  )
}
