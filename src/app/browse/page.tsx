"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import SkillCard from "@/components/SkillCard";
import { skills, categories, Category } from "@/lib/data";
import { cn } from "@/lib/utils";

type SortOption = "popular" | "stars";

function BrowseContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortOption>("popular");

  useEffect(() => {
    const cat = searchParams.get("category") as Category | null;
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = skills
    .filter((s) => selectedCategory === "all" || s.category === selectedCategory)
    .sort((a, b) => {
      if (sort === "popular") return b.downloads - a.downloads;
      return b.stars - a.stars;
    });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-1">전체 스킬</h1>
        <p className="text-neutral-500 text-sm">{filtered.length}개의 스킬을 찾았습니다</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              selectedCategory === "all"
                ? "bg-neutral-900 text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
            )}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5",
                selectedCategory === cat.id
                  ? "bg-neutral-900 text-white"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
              )}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="sm:ml-auto flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-neutral-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 bg-white text-neutral-700 focus:outline-none focus:border-neutral-400"
          >
            <option value="popular">인기순</option>
            <option value="stars">별점순</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((skill) => (
          <SkillCard key={skill.id} skill={skill} featured={skill.featured} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-lg font-medium mb-2">스킬을 찾지 못했습니다</p>
          <p className="text-sm">다른 카테고리를 선택해보세요</p>
        </div>
      )}
    </>
  );
}

export default function BrowsePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Suspense fallback={<div className="text-neutral-400 py-20 text-center">로딩 중...</div>}>
        <BrowseContent />
      </Suspense>
    </div>
  );
}
