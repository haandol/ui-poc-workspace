# Architecture Decision Records (ADR)

이 디렉토리는 UI PoC Workshop 프로젝트의 주요 아키텍처 결정을 기록합니다. 워크숍은 ALPS PRD에서 정의한 Feature(F1, F2, …)를 한 번에 하나씩 ADR로 변환한 뒤 구현하는 spec-driven 개발 사이클을 따릅니다.

## 디렉토리 구조

워크숍 규모에 맞춰 **플랫 구조**를 사용합니다 (카테고리 서브디렉토리 없음).

```
docs/adr/
├── README.md         # 인덱스 + 작성 규칙 (source of truth)
├── TEMPLATE.md       # ADR 템플릿
├── .mapping.json     # ALPS feature ↔ ADR ↔ code paths 매핑 (alps-writer plugin hook이 참조)
└── XXXX-fN-*.md      # 개별 ADR 파일
```

- 파일명: `XXXX-fN-kebab-case-title.md` — Feature ID(`fN`)를 파일명에 포함하여 PRD와의 추적성을 유지합니다 (예: `0001-f1-email-signup.md`).
- 번호는 디렉토리 내에서 순차 증가. split으로 빠진 번호는 결번으로 둡니다.

## 개발 사이클

```
ALPS Section 7 → /feature-to-adr → 사용자 확인 → /adr-impl → /adr-sync
```

| 명령                    | 역할                                                |
| ----------------------- | --------------------------------------------------- |
| `mcp__alps-writer__*`   | ALPS PRD 작성 (Section 1~9)                         |
| `/feature-to-adr [fN]`  | Feature를 ADR 초안으로 변환, 매핑 갱신              |
| `/adr-impl <adr-or-fN>` | ADR을 코드로 구현. PreToolUse hook이 stale ADR 경고 |
| `/adr-sync [fN]`        | 코드와 ADR drift 검증·정정                          |
| `/adr-rollup <fN>`      | 같은 Feature의 진화 체인을 단일 ADR로 통합          |

워크숍 흐름에서는 보통 한 번에 하나의 Feature(F1, F2, …)만 진행하므로 `/feature-to-adr f1` → 사용자 승인 → `/adr-impl f1` 순서입니다.

## Status

| Status     | 의미                                                  |
| ---------- | ----------------------------------------------------- |
| Proposed   | 검토 중. 아직 합의되지 않은 결정                      |
| Accepted   | 합의 완료. 구현 여부와 무관하게 결정이 확정           |
| Deprecated | 더 이상 유효하지 않음. 대체 ADR 없이 폐기             |
| Superseded | `Superseded by [ADR XXXX](link)` 형태로 후속 ADR 명시 |

`Implemented`, `Done`, `Completed` 등은 무효. 구현 진행 상태는 `Accepted (Phase 1 완료)`처럼 괄호로 부연합니다.

## 작성 규칙

ADR은 **아키텍처 결정**(Context, Decision, Consequences)을 기록하는 문서입니다. 코드를 변경할 때마다 ADR을 같이 고쳐야 하는 부담을 줄이기 위해 **구현 세부사항은 ADR에 포함하지 않습니다.**

### 리트머스 테스트

> "이 값/세부사항이 코드에서 바뀌면, 아키텍처 결정 자체가 바뀌는가?"
> **NO** → ADR에 넣지 않는다. **YES** → ADR에 유지한다.

### 코드 참조 깊이 — 폴더 단위까지만

ADR 안에서 코드를 가리킬 때는 **폴더(디렉토리) 단위**까지만 허용합니다.

- 허용: `packages/web/app/components/`, `packages/web/app/composables/`
- 금지: `packages/web/app/components/LoginForm.vue`, 줄 번호 인용

본문, 표, Mermaid 다이어그램 모두에 동일하게 적용됩니다.

### 다이어그램 내 코드 참조

Mermaid 안에서도 함수명·메서드 호출 대신 동작을 서술합니다.

- Bad: `useAuth().signIn(email, password)`
- Good: `이메일/비밀번호로 로그인 시도`

### 포함하지 않는 것

| 금지                     | 예시                                        |
| ------------------------ | ------------------------------------------- |
| 파일 경로 또는 그 이하   | `packages/web/app/components/LoginForm.vue` |
| 코드 스니펫              | TS 인터페이스, 함수 시그니처, Vue 템플릿    |
| 구현 상수/튜닝값         | `MAX_ITEMS = 10`                            |
| CSS 클래스명             | `bg-primary`, `flex-col`                    |
| 마이그레이션/운영 명령어 | `npx nx generate ...`                       |
| 전체 API JSON 응답 예시  | 20줄짜리 응답                               |

### 유지하는 것

- 문제 배경과 동기 (WHY)
- 결정 요약과 대안 비교
- 컴포넌트 간 관계 (개념 수준)
- 페이지 라우팅 구조와 상태 관리 전략 (Pinia store 구조 등)
- 행동 규칙·상태 전이
- 시스템 간 연동 방식
- Mermaid 다이어그램 (sequenceDiagram / stateDiagram / flowchart)
- Consequences (긍정/부정/리스크)

## 한국어 작성

ADR 본문은 한국어로 작성합니다. 기술 용어, 코드 식별자, 영문 고유명사는 원어 그대로 씁니다.

## ALPS ↔ ADR 매핑

`docs/adr/.mapping.json`이 Feature ↔ ADR ↔ 코드 경로의 single source of truth입니다. PreToolUse hook(`alps-writer` plugin)이 이 파일을 읽어, 코드 수정 대상이 매핑된 ADR보다 새로우면 stderr 경고를 출력합니다 (워크숍 기본은 warn 모드, block 안 함).

이 워크숍에서는 카테고리 대신 **Feature ID(`fN`)를 카테고리 키**로 사용합니다.

```json
{
  "alpsDocument": "docs/prd/<doc>.alps.xml",
  "categories": {
    "f1": {
      "feature": "Email Sign Up",
      "alpsFeatureId": "F1",
      "codePaths": ["packages/web/app/pages/sign*", "packages/web/app/composables/useAuth*"],
      "adrs": ["docs/adr/0001-f1-email-signup.md"]
    }
  }
}
```

매핑은 `/feature-to-adr` 실행 시 자동으로 갱신됩니다. 없을 때 `/adr-sync`는 사용자에게 `codePaths`를 직접 묻습니다.

## ADR 목록

(아직 등록된 ADR 없음. `/feature-to-adr f1`로 첫 ADR을 생성하세요.)

## 명명 규칙

- 파일명: `XXXX-fN-kebab-case-title.md` (예: `0001-f1-email-signup.md`)
- 번호는 순차 증가
- Feature ID는 PRD Section 6의 ID와 일치
- 제목은 명확하고 간결하게

## 참고

- [ADR GitHub](https://adr.github.io/)
- alps-writer / adr-writer plugins: https://github.com/haandol/alps-writer-plugins
