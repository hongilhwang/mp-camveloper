import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Download, Tag, ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import { getSkillById, skills, formatNumber, categories } from "@/lib/data";
import CopyButton from "./CopyButton";

export function generateStaticParams() {
  return skills.map((s) => ({ id: s.id }));
}

const categoryColors: Record<string, string> = {
  productivity: "bg-yellow-100 text-yellow-700",
  development: "bg-blue-100 text-blue-700",
  writing: "bg-purple-100 text-purple-700",
  data: "bg-green-100 text-green-700",
  devops: "bg-orange-100 text-orange-700",
  design: "bg-pink-100 text-pink-700",
  security: "bg-red-100 text-red-700",
};

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = getSkillById(id);
  if (!skill) notFound();

  const catLabel =
    categories.find((c) => c.id === skill.category)?.label ?? skill.category;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/browse"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        전체 스킬로 돌아가기
      </Link>

      <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-6">
        <div className="flex items-start gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
            {skill.authorAvatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h1 className="text-2xl font-bold text-neutral-900">
                {skill.name}
              </h1>
              {skill.featured && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  Featured
                </span>
              )}
            </div>
            <p className="text-neutral-500 text-sm mb-3">
              by{" "}
              <span className="font-medium text-neutral-700">
                {skill.author}
              </span>{" "}
              · v{skill.version}
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1.5">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <strong className="text-neutral-700">
                  {formatNumber(skill.stars)}
                </strong>{" "}
                stars
              </span>
              <span className="flex items-center gap-1.5">
                <Download size={14} />
                <strong className="text-neutral-700">
                  {formatNumber(skill.downloads)}
                </strong>{" "}
                설치
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[skill.category]}`}
              >
                {catLabel}
              </span>
            </div>
          </div>
        </div>

        <p className="text-neutral-600 leading-relaxed mb-6">
          {skill.longDescription}
        </p>

        {/* Install */}
        <div className="bg-neutral-900 rounded-xl p-4">
          <p className="text-xs text-neutral-400 mb-2 font-medium uppercase tracking-wide">
            설치 명령어
          </p>
          <div className="flex items-center justify-between gap-3">
            <code className="text-green-400 font-mono text-sm">
              {skill.installCommand}
            </code>
            <CopyButton text={skill.installCommand} />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
          <Tag size={14} />
          태그
        </h2>
        <div className="flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
