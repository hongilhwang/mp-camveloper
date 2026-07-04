# camveloper marketplace

hongilhwang의 Claude Code 플러그인 마켓플레이스입니다.

## 마켓플레이스 등록

```
/plugin marketplace add https://github.com/hongilhwang/mp-camveloper.git
```

## 사용법

```
/plugin marketplace search <검색어>
/plugin marketplace install <이름>
/plugin marketplace list
```

## 구조

```
.claude-plugin     # 마켓플레이스 매니페스트
registry.json      # 스킬/에이전트/훅 인덱스
skills/            # 스킬 파일
agents/            # 에이전트 파일
hooks/             # 훅 파일
```
