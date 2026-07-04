export type Category =
  | "productivity"
  | "development"
  | "writing"
  | "data"
  | "devops"
  | "design"
  | "security";

export interface Skill {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  author: string;
  authorAvatar: string;
  category: Category;
  tags: string[];
  stars: number;
  downloads: number;
  version: string;
  featured: boolean;
  installCommand: string;
  preview?: string;
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "productivity", label: "생산성", icon: "⚡" },
  { id: "development", label: "개발", icon: "💻" },
  { id: "writing", label: "글쓰기", icon: "✍️" },
  { id: "data", label: "데이터", icon: "📊" },
  { id: "devops", label: "DevOps", icon: "🚀" },
  { id: "design", label: "디자인", icon: "🎨" },
  { id: "security", label: "보안", icon: "🔒" },
];

export const skills: Skill[] = [
  {
    id: "code-reviewer",
    name: "Code Reviewer",
    description: "PR과 코드 변경사항을 자동으로 리뷰하고 개선점을 제안합니다.",
    longDescription:
      "PR이 열리거나 코드가 변경될 때 자동으로 코드 품질, 보안, 성능을 분석합니다. SOLID 원칙, 코드 커버리지, 잠재적 버그를 감지하고 구체적인 개선 방안을 제시합니다.",
    author: "anthropic",
    authorAvatar: "A",
    category: "development",
    tags: ["code", "review", "pr", "quality"],
    stars: 4821,
    downloads: 98420,
    version: "2.1.0",
    featured: true,
    installCommand: "/install code-reviewer",
  },
  {
    id: "git-helper",
    name: "Git Helper",
    description: "커밋 메시지 작성, 브랜치 전략, 머지 충돌 해결을 도와줍니다.",
    longDescription:
      "Conventional Commits 형식으로 커밋 메시지를 자동 생성하고, 브랜치 전략을 제안하며, 복잡한 머지 충돌을 단계별로 해결합니다.",
    author: "gitpro",
    authorAvatar: "G",
    category: "development",
    tags: ["git", "commit", "branch", "merge"],
    stars: 3204,
    downloads: 67890,
    version: "1.4.2",
    featured: true,
    installCommand: "/install git-helper",
  },
  {
    id: "doc-writer",
    name: "Doc Writer",
    description: "코드베이스를 분석해 README, API 문서, JSDoc을 자동 생성합니다.",
    longDescription:
      "소스 코드를 파싱하여 함수, 클래스, API 엔드포인트를 자동으로 문서화합니다. Markdown, OpenAPI, JSDoc 등 다양한 형식을 지원합니다.",
    author: "docsai",
    authorAvatar: "D",
    category: "writing",
    tags: ["docs", "readme", "jsdoc", "api"],
    stars: 2150,
    downloads: 45300,
    version: "1.2.1",
    featured: true,
    installCommand: "/install doc-writer",
  },
  {
    id: "sql-wizard",
    name: "SQL Wizard",
    description: "자연어로 SQL 쿼리를 작성하고 성능을 최적화합니다.",
    longDescription:
      "자연어 설명을 SQL로 변환하고, 기존 쿼리의 실행 계획을 분석해 인덱스 추가, 쿼리 재작성 등 최적화 방안을 제안합니다. PostgreSQL, MySQL, SQLite 지원.",
    author: "datacraft",
    authorAvatar: "S",
    category: "data",
    tags: ["sql", "database", "query", "optimization"],
    stars: 1890,
    downloads: 38720,
    version: "3.0.0",
    featured: false,
    installCommand: "/install sql-wizard",
  },
  {
    id: "deploy-sentinel",
    name: "Deploy Sentinel",
    description: "배포 파이프라인을 모니터링하고 이상 징후를 즉시 알립니다.",
    longDescription:
      "CI/CD 파이프라인의 각 단계를 추적하고, 빌드 실패, 테스트 오류, 배포 지연을 감지합니다. Slack, Email 알림 통합 및 자동 롤백 트리거를 지원합니다.",
    author: "cloudops",
    authorAvatar: "C",
    category: "devops",
    tags: ["deploy", "ci", "cd", "monitoring"],
    stars: 1654,
    downloads: 29400,
    version: "1.8.3",
    featured: false,
    installCommand: "/install deploy-sentinel",
  },
  {
    id: "security-scan",
    name: "Security Scan",
    description: "코드의 보안 취약점을 OWASP Top 10 기준으로 스캔합니다.",
    longDescription:
      "SAST(정적 분석) 기법으로 SQL Injection, XSS, CSRF 등 OWASP Top 10 취약점을 탐지합니다. CVE 데이터베이스와 연동해 의존성 취약점도 함께 검사합니다.",
    author: "securelab",
    authorAvatar: "S",
    category: "security",
    tags: ["security", "owasp", "vulnerability", "sast"],
    stars: 2980,
    downloads: 52100,
    version: "2.5.1",
    featured: true,
    installCommand: "/install security-scan",
  },
  {
    id: "ui-designer",
    name: "UI Designer",
    description: "설명만으로 Tailwind CSS 컴포넌트와 UI 레이아웃을 생성합니다.",
    longDescription:
      "디자인 요구사항을 텍스트로 입력하면 접근성(WCAG 2.1)을 준수하는 Tailwind CSS 컴포넌트를 생성합니다. 다크 모드, 반응형 레이아웃, 애니메이션도 자동 처리합니다.",
    author: "uxcraft",
    authorAvatar: "U",
    category: "design",
    tags: ["ui", "tailwind", "component", "design"],
    stars: 3421,
    downloads: 71500,
    version: "1.6.0",
    featured: false,
    installCommand: "/install ui-designer",
  },
  {
    id: "test-writer",
    name: "Test Writer",
    description: "함수와 컴포넌트에 대한 단위 테스트를 자동으로 작성합니다.",
    longDescription:
      "코드를 분석해 Jest, Vitest, Pytest 등 프레임워크에 맞는 테스트 케이스를 생성합니다. 엣지 케이스, 경계값, 에러 케이스를 포함한 포괄적인 테스트 스위트를 만들어 줍니다.",
    author: "testcraft",
    authorAvatar: "T",
    category: "development",
    tags: ["test", "jest", "vitest", "unit"],
    stars: 2670,
    downloads: 58900,
    version: "2.2.4",
    featured: false,
    installCommand: "/install test-writer",
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "CSV, JSON 데이터를 분석하고 인사이트와 시각화 코드를 생성합니다.",
    longDescription:
      "데이터 파일을 업로드하면 통계 분석, 이상치 탐지, 상관관계 분석을 자동으로 수행합니다. Pandas, Matplotlib, Plotly 코드를 생성하고 주요 인사이트를 요약합니다.",
    author: "datacraft",
    authorAvatar: "D",
    category: "data",
    tags: ["data", "csv", "pandas", "visualization"],
    stars: 1420,
    downloads: 31200,
    version: "1.3.2",
    featured: false,
    installCommand: "/install data-analyst",
  },
  {
    id: "k8s-helper",
    name: "K8s Helper",
    description: "Kubernetes 매니페스트 작성과 클러스터 트러블슈팅을 도와줍니다.",
    longDescription:
      "Deployment, Service, Ingress 등 Kubernetes 리소스 YAML을 자동 생성합니다. 파드 상태 분석, 로그 해석, 네트워크 정책 디버깅을 지원합니다.",
    author: "cloudops",
    authorAvatar: "K",
    category: "devops",
    tags: ["kubernetes", "k8s", "docker", "container"],
    stars: 2210,
    downloads: 44600,
    version: "1.9.1",
    featured: false,
    installCommand: "/install k8s-helper",
  },
  {
    id: "refactor-pro",
    name: "Refactor Pro",
    description: "레거시 코드를 현대적인 패턴으로 자동 리팩토링합니다.",
    longDescription:
      "콜백 헬을 async/await으로, 클래스형을 함수형 컴포넌트로, CommonJS를 ESM으로 변환합니다. 디자인 패턴 적용과 코드 중복 제거도 자동으로 처리합니다.",
    author: "codelab",
    authorAvatar: "R",
    category: "development",
    tags: ["refactor", "legacy", "modernize", "patterns"],
    stars: 1980,
    downloads: 40300,
    version: "2.0.0",
    featured: false,
    installCommand: "/install refactor-pro",
  },
  {
    id: "content-writer",
    name: "Content Writer",
    description: "블로그 포스트, 기술 문서, 릴리즈 노트를 빠르게 작성합니다.",
    longDescription:
      "SEO 최적화된 블로그 포스트, 기술 문서, 릴리즈 노트를 작성합니다. 코드 변경사항에서 자동으로 CHANGELOG를 생성하고, 마케팅 카피도 지원합니다.",
    author: "writeai",
    authorAvatar: "W",
    category: "writing",
    tags: ["blog", "docs", "changelog", "seo"],
    stars: 1340,
    downloads: 28700,
    version: "1.1.3",
    featured: false,
    installCommand: "/install content-writer",
  },
];

export function getSkillById(id: string): Skill | undefined {
  return skills.find((s) => s.id === id);
}

export function getSkillsByCategory(category: Category): Skill[] {
  return skills.filter((s) => s.category === category);
}

export function getFeaturedSkills(): Skill[] {
  return skills.filter((s) => s.featured);
}

export function searchSkills(query: string): Skill[] {
  const q = query.toLowerCase();
  return skills.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.includes(q))
  );
}

export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}
