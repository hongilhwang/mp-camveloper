"use client";

import Link from "next/link";
import { Star, Download } from "lucide-react";
import { Skill, formatNumber } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  productivity: "bg-yellow-100 text-yellow-700",
  development: "bg-blue-100 text-blue-700",
  writing: "bg-purple-100 text-purple-700",
  data: "bg-green-100 text-green-700",
  devops: "bg-orange-100 text-orange-700",
  design: "bg-pink-100 text-pink-700",
  security: "bg-red-100 text-red-700",
};

const categoryLabels: Record<string, string> = {
  productivity: "생산성",
  development: "개발",
  writing: "글쓰기",
  data: "데이터",
  devops: "DevOps",
  design: "디자인",
  security: "보안",
};

interface SkillCardProps {
  skill: Skill;
  featured?: boolean;
}

export default function SkillCard({ skill, featured = false }: SkillCardProps) {
  return (
    <Link href={`/skills/${skill.id}`}>
      <div
        className={cn(
          "group bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-lg hover:border-neutral-300 transition-all duration-200 cursor-pointer h-full flex flex-col",
          featured && "ring-2 ring-[#D97706]/20"
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-600 flex items-center justify-center text-white font-bold text-lg">
            {skill.authorAvatar}
          </div>
          {featured && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700">
              Featured
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-neutral-900 text-base mb-1 group-hover:text-[#D97706] transition-colors">
            {skill.name}
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-3">
            {skill.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              categoryColors[skill.category]
            )}
          >
            {categoryLabels[skill.category]}
          </span>
          <div className="flex items-center gap-3 text-neutral-400 text-xs">
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {formatNumber(skill.stars)}
            </span>
            <span className="flex items-center gap-1">
              <Download size={12} />
              {formatNumber(skill.downloads)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
