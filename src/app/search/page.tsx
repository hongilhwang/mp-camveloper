"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import SkillCard from "@/components/SkillCard";
import { searchSkills } from "@/lib/data";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const results = query ? searchSkills(query) : [];

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Search size={20} className="text-neutral-400" />
          <h1 className="text-2xl font-bold text-neutral-900">
            &ldquo;{query}&rdquo; 검색 결과
          </h1>
        </div>
        <p className="text-neutral-500 text-sm pl-7">
          {results.length}개의 스킬을 찾았습니다
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((skill) => (
            <SkillCard key={skill.id} skill={skill} featured={skill.featured} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-400">
          <Search size={40} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium mb-2">검색 결과가 없습니다</p>
          <p className="text-sm">다른 키워드로 검색해보세요</p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Suspense fallback={<div className="text-neutral-400 py-20 text-center">로딩 중...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
