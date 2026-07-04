---
name: r-develop
namespace: react
type: skill
version: 1.0.0
description: React/Next.js 컴포넌트 및 기능 코드 작성. seravie 컨벤션 기반.
---

# r-develop

React/Next.js 코드를 작성할 때 이 스킬을 적용한다.
harness.md에 정의된 컨벤션을 항상 준수한다.

## 동작 순서

요청을 받으면 다음 순서로 진행한다:

### 1단계: 요청 분석

- 무엇을 만들어야 하는가? (컴포넌트 / 페이지 / 훅 / 유틸)
- 어느 레이어에 속하는가?
  - `app/` — 라우팅, 레이아웃, 페이지
  - `ui/` — 특정 페이지 전용 복합 컴포넌트
  - `components/` — 재사용 가능한 독립 컴포넌트
- 인터랙션이 필요한가? → Server / Client Component 결정

### 2단계: 파일 경로 제안

레이어 규칙에 따라 파일 위치를 먼저 제안한다.

```
예시:
- 버튼 컴포넌트 → src/components/Button.tsx
- 헤더 (특정 페이지용) → src/ui/Header.tsx
- 상품 목록 페이지 → src/app/products/page.tsx
- 날짜 포맷 유틸 → src/utils/date.ts
- 특정 컴포넌트 전용 훅 → 같은 파일 내 정의
```

### 3단계: 타입 먼저 정의

코드 작성 전 Props 타입부터 정의한다.

```tsx
type ComponentProps = Readonly<{
  // 필수 props
  title: string;
  // 옵셔널 props
  description?: string;
  // 이벤트 핸들러
  onAction?: () => void;
}>;
```

### 4단계: 컴포넌트 코드 작성

**Server Component 템플릿:**
```tsx
import type { ComponentProps } from "./types"; // 필요 시

type CardProps = Readonly<{
  title: string;
  description: string;
}>;

export default function Card({ title, description }: CardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 p-6">
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500">{description}</p>
    </div>
  );
}
```

**Client Component 템플릿:**
```tsx
"use client";

import { useState } from "react";

type ToggleProps = Readonly<{
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}>;

export default function Toggle({ label, defaultChecked = false, onChange }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <button
      onClick={handleChange}
      aria-pressed={checked}
      className="flex items-center gap-2 text-sm font-medium"
    >
      <span className={checked ? "text-neutral-900" : "text-neutral-400"}>{label}</span>
    </button>
  );
}
```

**훅 템플릿:**
```tsx
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

### 5단계: 체크리스트 자가 검토

코드 작성 후 스스로 확인:

- [ ] 레이어 위치가 올바른가? (`app → ui → components` 규칙)
- [ ] Client Component가 필요한지 재확인 (불필요하면 Server로)
- [ ] `"use client"` 위치가 파일 첫 줄인가?
- [ ] props가 `Readonly<{}>` 로 감싸져 있는가?
- [ ] `import type` 을 사용했는가?
- [ ] Tailwind 클래스만 사용했는가?
- [ ] 외부 API 호출이 클라이언트에서 직접 발생하지 않는가?
- [ ] 접근성 속성 (`aria-*`, `alt`) 이 적용되었는가?

## 코드 작성 원칙

- 주석은 WHY가 명확할 때만 작성 (WHAT 설명 주석 금지)
- 함수/변수명은 의미를 충분히 전달하는 이름 사용
- 불필요한 추상화 금지 — 필요할 때 추출
- 에러 처리는 시스템 경계(API, 사용자 입력)에서만
