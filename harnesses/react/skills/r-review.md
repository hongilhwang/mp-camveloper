---
name: r-review
namespace: react
type: skill
version: 1.0.0
description: React/Next.js 코드 리뷰. 컨벤션, 타입, 성능, 접근성을 검사한다.
---

# r-review

React/Next.js 코드 리뷰를 진행할 때 이 스킬을 적용한다.
harness.md 컨벤션을 기준으로 코드를 검사하고 구체적인 개선안을 제시한다.

## 리뷰 진행 방식

코드를 받으면 아래 카테고리 순서로 검토한다.
문제가 없는 항목은 생략하고, 발견된 항목만 보고한다.

---

## 카테고리별 체크리스트

### 🏗 아키텍처 & 레이어

- [ ] `app → ui → components` 단방향 의존 규칙 위반 여부
  - `components/`에서 `ui/` 또는 `app/` 참조하는지 확인
  - `ui/`에서 `app/` 참조하는지 확인
- [ ] `components/`와 `utils/`가 프레임워크 의존성 없이 독립적인지
- [ ] 외부 API를 클라이언트에서 직접 호출하는지 (`middleware.ts` 경유 확인)

### ⚛️ Server / Client Component

- [ ] `"use client"` 없이 클라이언트 API 사용 (`useState`, `useEffect`, 이벤트 등)
- [ ] `"use client"`가 파일 첫 줄에 위치하는지
- [ ] Server Component로 전환 가능한 Client Component가 있는지
  - 훅/이벤트 없이 UI만 렌더링하는 컴포넌트
- [ ] `"use client"`가 prop drilling 없이 최대한 leaf 컴포넌트에 위치하는지

### 🔷 TypeScript

- [ ] `any` 타입 사용 여부 (금지)
- [ ] props에 `Readonly<{}>` 미적용
- [ ] `import type` 없이 타입만 import하는 경우
- [ ] 타입 단언(`as`, `!`) 남용 여부
- [ ] 옵셔널 체이닝(`?.`) 대신 수동 null 체크 사용 여부
- [ ] 타입/인터페이스 범위 초과 배치 (전역 공유 전에 로컬 배치했는지)

### 🎨 스타일링

- [ ] Tailwind 외 스타일링 방식 사용 (인라인 스타일, CSS modules, styled-components 등)
- [ ] 조건부 클래스를 문자열 템플릿으로 작성한 경우 (`clsx` / `cn` 사용 권장)
- [ ] 반응형 클래스 순서 (`sm:` → `md:` → `lg:`)
- [ ] 하드코딩된 색상/크기 (Tailwind 유틸리티 클래스 사용 권장)

### ⚡ 성능

- [ ] 불필요한 Client Component (Server로 전환 가능한 경우)
- [ ] 최상위 레벨에서 무거운 라이브러리 전체 import (`import _ from "lodash"` 등)
- [ ] `useEffect` 내 불필요한 의존성 또는 무한 루프 가능성
- [ ] 메모이제이션 과도 사용 (`useMemo`, `useCallback` — 실제로 필요한 경우만)
- [ ] 이미지 `<img>` 직접 사용 (Next.js `<Image>` 컴포넌트 권장)

### ♿ 접근성

- [ ] `<img>` / `<Image>` 에 `alt` 속성 누락
- [ ] 클릭 이벤트를 `<div>` / `<span>` 에 직접 부착 (`<button>` 사용 권장)
- [ ] `aria-label`, `aria-pressed`, `role` 등 ARIA 속성 누락
- [ ] 키보드 포커스 가능한 요소에 `focus:` 스타일 누락
- [ ] 색상 대비 낮은 텍스트 (WCAG 2.1 AA 기준)

### 🧹 코드 품질

- [ ] 컴포넌트 이름과 파일명 불일치
- [ ] WHAT 설명 주석 (코드 자체로 의미 전달 불가한 WHY만 주석 허용)
- [ ] 불필요한 추상화 또는 조기 최적화
- [ ] 3개 이상 반복되는 코드 (추출 검토)
- [ ] 사용하지 않는 import, 변수, 타입

---

## 리뷰 결과 형식

검토 후 아래 형식으로 보고한다:

```
## 리뷰 결과

### 🔴 필수 수정 (N건)
> 컨벤션 위반, 버그 가능성, 타입 안전성 문제

1. [카테고리] 문제 설명
   - 위치: `파일명:줄번호`
   - 현재 코드: ...
   - 수정 방법: ...

### 🟡 권장 개선 (N건)
> 성능, 접근성, 코드 품질 개선사항

1. ...

### ✅ 잘된 점
> 컨벤션을 잘 지킨 부분, 좋은 패턴

- ...
```

문제가 없을 경우: `✅ 컨벤션 이상 없음` 으로 보고한다.
