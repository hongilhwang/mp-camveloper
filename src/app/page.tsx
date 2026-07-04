import Link from "next/link";
import { ArrowRight, Zap, Package, Users } from "lucide-react";
import SkillCard from "@/components/SkillCard";
import { getFeaturedSkills, categories, skills } from "@/lib/data";

export default function Home() {
  const featured = getFeaturedSkills();

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-6">
            <Zap size={12} />
            Claude Code 공식 스킬 마켓플레이스
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-5 leading-tight">
            Claude를 더 강력하게 만드는
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              스킬과 플러그인
            </span>
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto mb-8">
            코드 리뷰, 보안 스캔, 자동 문서화까지 — Claude Code를 위한 검증된
            스킬을 한 곳에서 발견하고 설치하세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/browse"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white font-medium hover:bg-neutral-700 transition-colors"
            >
              전체 스킬 보기
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/browse?category=development"
              className="px-6 py-3 rounded-xl border border-neutral-200 text-neutral-700 font-medium hover:bg-neutral-100 transition-colors"
            >
              개발 스킬 탐색
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12 pt-12 border-t border-neutral-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-900">
                {skills.length}+
              </p>
              <p className="text-sm text-neutral-500">스킬</p>
            </div>
            <div className="w-px h-8 bg-neutral-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-900">500k+</p>
              <p className="text-sm text-neutral-500">총 설치 수</p>
            </div>
            <div className="w-px h-8 bg-neutral-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-900">12k+</p>
              <p className="text-sm text-neutral-500">활성 사용자</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
          카테고리 탐색
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/browse?category=${cat.id}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all text-center group"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Skills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">
            추천 스킬
          </h2>
          <Link
            href="/browse"
            className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors"
          >
            전체 보기 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((skill) => (
            <SkillCard key={skill.id} skill={skill} featured />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-2xl bg-neutral-900 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package size={20} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">
                스킬 개발자
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              나만의 스킬을 마켓플레이스에 등록하세요
            </h3>
            <p className="text-neutral-400 text-sm max-w-md">
              Claude Code 스킬을 만들고 전 세계 사용자와 공유하세요. GitHub
              레포지토리를 연결하면 자동으로 배포됩니다.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <Users size={16} />
              12k+ 사용자
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-neutral-900 font-medium text-sm hover:bg-neutral-100 transition-colors"
            >
              스킬 제출하기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
