---
name: react
namespace: react
type: harness
version: 1.0.0
description: FE 개발자를 위한 React/Next.js 개발 하네스
author: hongilhwang
skills:
  - r-develop
  - r-review
agents:
  - react
  - r-analyst
  - r-architect
  - r-inspector
  - r-planner
  - r-executor
  - r-verifier
---

# React 하네스

FE 개발 시 일관된 코드 품질과 컨벤션을 유지하기 위한 하네스.
seravie 프로젝트 기준으로 정의된 Next.js App Router 스택을 기반으로 한다.

## 기술 스택

| 항목 | 버전/선택 |
|------|----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Package Manager | npm |

## 레이어 구조

```
src/
├── app/          # 라우팅, 레이아웃, 페이지 — Next.js App Router
├── ui/           # 페이지 전용 복합 컴포넌트 (app에서만 참조)
├── components/   # 완전 독립 원자 컴포넌트 (어디서든 참조 가능)
├── hooks/        # 커스텀 훅 (사용 범위에 따라 로컬 우선)
├── utils/        # 순수 유틸리티 함수 (프레임워크 독립)
└── middleware.ts # 외부 API 호출 게이트웨이
```

**단방향 의존 규칙:** `app → ui → components`
- `components/`와 `utils/`는 프레임워크와 무관하게 독립 유지
- 역방향 참조 절대 금지

## 컴포넌트 컨벤션

### Server vs Client Component

- **기본값은 Server Component** — `"use client"` 없이 작성
- 아래 경우에만 Client Component로 전환:
  - `useState`, `useEffect` 등 React 훅 사용
  - 브라우저 이벤트 핸들러 (`onClick`, `onChange` 등)
  - 브라우저 전용 API (`window`, `localStorage` 등)
- `"use client"`는 파일 최상단 첫 줄에 명시

### Props 정의

```tsx
// ✅ 올바른 방식
type ButtonProps = Readonly<{
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}>;

export default function Button({ label, onClick, variant = "primary" }: ButtonProps) { ... }
```

```tsx
// ❌ 금지
function Button(props: any) { ... }
function Button({ label, onClick }: { label: string; onClick: () => void }) { ... } // 인라인 타입
```

### 함수형 컴포넌트

- 클래스 컴포넌트 사용 금지
- `export default function ComponentName` 형태 사용
- 컴포넌트 이름은 PascalCase, 파일명과 일치

## TypeScript 컨벤션

```tsx
// ✅ type import 명시
import type { Metadata } from "next";
import type { ReactNode } from "react";

// ✅ 타입은 로컬 배치 원칙 (같은 파일 또는 같은 디렉토리)
// 여러 파일에서 공유될 때만 types/ 디렉토리로 이동

// ✅ strict 모드 — any 사용 금지
// ✅ 옵셔널 체이닝 활용: data?.user?.name
// ✅ 비null 단언(!.) 사용 최소화
```

## 스타일링 컨벤션

- **Tailwind CSS v4만 사용** — 인라인 스타일, CSS modules, styled-components 금지
- 조건부 클래스는 `clsx` 또는 `cn` 유틸 사용
- 다크 모드: `dark:` prefix 활용
- 반응형: `sm:` `md:` `lg:` 순서 유지

```tsx
// ✅
<div className="flex items-center gap-4 px-6 py-3 sm:px-8">

// ❌
<div style={{ display: "flex", alignItems: "center" }}>
```

## Import 순서

```tsx
// 1. React / Next.js 코어
import { useState, useEffect } from "react";
import Link from "next/link";

// 2. 외부 라이브러리
import { clsx } from "clsx";

// 3. 내부 절대경로 (@/*)
import Button from "@/components/Button";
import { formatDate } from "@/utils/date";

// 4. 상대경로
import "./styles.css";

// 5. 타입 (import type)
import type { ButtonProps } from "@/components/Button";
```

## API 호출 규칙

- **클라이언트에서 외부 API 직접 호출 금지**
- 모든 외부 API 요청은 `src/middleware.ts` 경유
- Server Component에서의 fetch는 허용 (서버 사이드)

```tsx
// ✅ Server Component에서 직접 fetch
async function ProductList() {
  const data = await fetch("/api/products"); // 내부 API
  ...
}

// ❌ Client Component에서 외부 API 직접 호출
"use client";
useEffect(() => {
  fetch("https://external-api.com/data"); // 금지
}, []);
```

## 훅 배치 규칙

- 단일 컴포넌트에서만 쓰이면 → 같은 파일 내 정의
- 동일 디렉토리 내 여러 컴포넌트 → 해당 디렉토리 `hooks.ts`
- 전역 공유 필요 → `src/hooks/` 이동

## 스킬

| 스킬 | 설명 |
|------|------|
| `r-develop` | React/Next.js 컴포넌트 및 기능 코드 작성 |
| `r-review` | 코드 리뷰 — 컨벤션, 타입, 성능, 접근성 검사 |

## 에이전트 파이프라인

이슈 → 분석 → 설계 → 코드파악 → 계획 → 실행 → 검증 순서로 동작하는 6단계 파이프라인.

| 에이전트 | 단계 | 역할 |
|----------|------|------|
| `react` | — | 파이프라인 오케스트레이터 (엔트리포인트) |
| `r-analyst` | 1 | 이슈/요청 → 요구사항 문서 |
| `r-architect` | 2 | 요구사항 → 기술 청사진 |
| `r-inspector` | 3 | 현재 코드 구조·의도·영향도 분석 |
| `r-planner` | 4 | 청사진 + 코드 현황 → 기술 변경 계획 |
| `r-executor` | 5 | 계획 → 실제 코드 작성/수정 |
| `r-verifier` | 6 | 결과 코드 + 요구사항 → 최종 검증 |
