---
name: workshop-status
description: 워크숍 진행 상태를 Airtable에 공유합니다. 초기 설정(키 등록), 단계별 상태 보고, 전체 현황 조회, 진행자용 테이블 생성을 모두 포함합니다.
---

# Workshop Status Skill

Airtable MCP 서버(`airtable-mcp-server`)를 사용하여 워크숍 진행 상태를 정형적으로 관리한다.

## 워크숍 실행 단계 & 정형 마일스톤

워크숍 참여자가 실제로 거치는 실행 과정 기준으로 마일스톤을 정의한다.

| Phase     | Milestone ID  | Milestone            | 기록 방식                                        |
| --------- | ------------- | -------------------- | ------------------------------------------------ |
| 환경설정  | SETUP-DONE    | Environment Ready    | setup 모드에서 기록                              |
| 리서치    | RESEARCH-DONE | Deep Research Done   | **hook 자동** — `pdf-reader` 가 `docs/` PDF 읽음 |
| PRD       | PRD-START     | PRD Started          | **hook 자동** — `alps-writer` Section 1 저장     |
| PRD       | PRD-FEATURES  | PRD Features Defined | **hook 자동** — `alps-writer` Section 6 저장     |
| PRD       | PRD-DONE      | PRD Complete         | **hook 자동** — `alps-writer` export 호출        |
| 스캐폴딩  | SCAFFOLD-DONE | UI Scaffold Done     | 랩 3 시작 시 Claude가 기록 (`start-dev-server`)  |
| 피쳐 개발 | F1-DONE       | F1 Complete          | Feature 1 구현 완료 보고 시 Claude가 기록        |
| 피쳐 개발 | F2-DONE       | F2 Complete          | Feature 2 구현 완료 보고 시 Claude가 기록        |
| 피쳐 개발 | FN-DONE       | FN Complete          | Feature N 구현 완료 보고 시 Claude가 기록        |
| 완료      | DEMO-READY    | Demo Ready           | 사용자가 명시적으로 보고                         |

### 저널 파일 `.work-status`

모든 마일스톤은 프로젝트 루트의 `.work-status` 에 append-only 로 기록된다. 한 줄당 `MILESTONE_ID<TAB>ISO8601` 포맷. 이 파일은 `.gitignore` 에 포함되어 참여자 로컬에만 존재한다.

- Hook (`scripts/workshop-hook.mjs`)이 PostToolUse 로 자동 기록 + Airtable 전송
- Skill 도 기록 전에 이 파일을 확인해 **중복 전송 방지**
- 템플릿: `.work-status.template` (setup 시 Skill이 복사 생성)

## Airtable 연결 정보

- **Base ID**: `appRMKLzA13xbxrZE`
- **Table ID**: `tbloe5rOJpVy5tYpP` (테이블명: Progress)
- **필드 매핑** (Airtable 실제 필드명 → 용도):
  - `Name` → 참여자 이름 (Participant)
  - `Phase` → 단계 (Single Select)
  - `Milestone_ID` → 마일스톤 ID
  - `Milestone` → 마일스톤 표시명
  - `Timestamp` → ISO 8601 시각
  - `Notes` → 상세 정보 (Details)

## 사전 조건

- `.mcp.json`에 airtable MCP 서버가 설정되어 있어야 한다
- `AIRTABLE_API_KEY`가 설정되어 있어야 한다 (미설정 시 setup 모드로 안내)

## 사용법 판단

사용자 입력에 따라 아래 4가지 모드 중 하나를 실행한다.

---

### Mode 1: 초기 설정 (`setup`, `설정`, `키 등록`, 키가 미설정일 때)

**절차:**

1. 사용자에게 아래 세 가지를 **한 번에** 물어본다 (개별 질문 금지, 한 메시지로 요청):
   - **Airtable API Key** (`pat...`로 시작) — 진행자에게 전달받은 값
   - **FAL_KEY** — 이미지 생성용 fal.ai API 키 (진행자에게 전달받은 값)
   - **닉네임** — 진행 상태 공유 시 표시될 이름

   사용자에게 보여줄 안내 예시:

   ```
   아래 세 가지를 번호와 함께 입력해주세요 (줄바꿈: Mac Shift+Enter / Windows Ctrl+Enter):
   1. Airtable API Key  2. FAL_KEY  3. 닉네임

   예)
   1. patXXXXXX
   2. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:xxxxxxxx
   3. 커피중독PM
   ```

   **중요**: AskUserQuestion 도구나 팝업 UI를 사용하지 않는다. 일반 텍스트 메시지로 질문하고, 사용자가 채팅으로 답변하면 파싱한다.

2. `.mcp.json`은 이미 환경변수 참조 방식(`${AIRTABLE_API_KEY}`, `${FAL_KEY}`)으로 설정되어 있으므로 **읽거나 수정하지 않는다**. 만약 사용자가 `.mcp.json`에 문제가 있다고 보고할 때만 확인한다.

3. 프로젝트 로컬 설정 `.claude/settings.local.json`에 API Key 환경변수들을 등록한다:

   `.claude/settings.local.json` 파일을 읽어서 `env` 필드에 `AIRTABLE_API_KEY`와 `FAL_KEY`를 추가한다.
   - 파일이 없으면 새로 생성한다
   - 이미 `env` 필드가 있으면 해당 키만 추가/교체한다
   - 다른 기존 설정은 건드리지 않는다
   - 이 파일은 `.gitignore`에 등록되어 있어 커밋되지 않는다

   ```json
   {
     "env": {
       "AIRTABLE_API_KEY": "pat_사용자가입력한값",
       "FAL_KEY": "사용자가입력한값"
     }
   }
   ```

4. 닉네임을 프로젝트 루트에 `.workshop-participant` 파일로 저장한다 (한 줄, 닉네임만).

5. `.work-status` 가 없으면 `.work-status.template` 을 복사해 생성한다 (없으면 빈 헤더만 있는 파일 생성).

6. 안내: "API Key가 설정되었습니다. `/mcp` 명령어를 실행하여 airtable, asset-generator 서버 옆의 🔄 reconnect를 눌러주세요."

7. MCP 리로드 후 Airtable MCP tool (`list_bases`)로 연결을 확인한다.

8. `list_bases` 결과에서 Base ID (예: `appXXXXXXXX`)를 추출하여 `.claude/settings.local.json`의 `env`에 `AIRTABLE_BASE_ID`를 추가 저장한다. 이 값은 `scripts/workshop-hook.mjs`가 PostToolUse hook에서 Airtable에 자동 전송할 때 사용한다.

9. 연결이 확인되면 SETUP-DONE 마일스톤을 **확인 없이 바로 기록**한다 (`.work-status` append + Airtable upsert). 기록 후 결과만 알려준다.

---

### Mode 2: 상태 보고 (기본 / 인자 있음)

현재 진행 상태를 Airtable에 정형적으로 기록한다.

**인자가 있는 경우** (예: `/workshop-status PRD-DONE`, `/workshop-status F2 완료`):

- 위 마일스톤 테이블에서 매칭되는 Milestone ID를 사용
- "F2 완료" 같은 자연어도 `F2-DONE` / `F2 Complete`로 정규화

**인자가 없는 경우** — 프로젝트의 현재 실제 상태를 판단하여 즉시 기록한다:

1. `.workshop-participant` 파일 확인 → 없으면 setup 안내
2. 프로젝트 파일시스템을 검사하여 **현재 실제로 달성된 마일스톤**을 판단한다:
   - `docs/` 에 PDF 또는 리서치 결과물이 존재 → `RESEARCH-DONE`
   - ALPS 문서가 존재하고 Section 1 이상 작성됨 → `PRD-START`
   - ALPS 문서에 Section 6 (Features) 이 작성됨 → `PRD-FEATURES`
   - ALPS export 완료 (마크다운 PRD 파일 존재) → `PRD-DONE`
   - `packages/web/src/` 에 컴포넌트/페이지 파일이 존재하고 dev server 실행 가능 → `SCAFFOLD-DONE`
   - Feature 구현 코드가 존재 → 해당 `F{N}-DONE`
   - 사용자가 "데모 준비 끝" 선언 → `DEMO-READY`
3. 사용자의 최근 발화도 참고한다:
   - "F2 끝났어" / "F2 구현 완료" → `F2-DONE`
   - "dev server 띄웠어" → `SCAFFOLD-DONE`
   - "데모 준비 끝" → `DEMO-READY`
4. `.work-status` 에 이미 있는 마일스톤이면 중복 전송하지 않고 알림만 표시
5. **절대 사용자에게 어떤 마일스톤을 기록할지 묻지 않는다** — 판단 즉시 기록하고 결과만 알려준다
6. **다음 단계를 예측해서 기록하지 않는다** — 오직 현재 달성된 상태만 기록한다

### 자동 트리거 규약 (Claude 가 수동 호출해야 하는 경우)

아래 상황에서는 사용자가 `/workshop-status` 를 치지 않아도 **Claude 가 먼저 이 스킬을 실행**한다. hook으로 잡히지 않는 마일스톤 전용 규약이다.

- 사용자가 랩 3의 dev 서버 기동 단계를 막 마치고 첫 Feature 구현을 요청했을 때 → `SCAFFOLD-DONE`
- Feature 구현 태스크를 완료하고 참여자에게 결과를 보고한 직후 (F1~FN) → 해당 `F{N}-DONE`
- 사용자가 "데모 준비 끝났어" 류의 완료 선언을 했을 때 → `DEMO-READY`

이미 저널에 있으면 skip. 참여자가 명시적으로 "상태 공유하지 마" 라고 하면 이번 세션 동안 자동 트리거를 멈춘다.

### 기록 절차 (저널 + Airtable)

1. `.work-status` 에 해당 `MILESTONE_ID` 가 이미 있는지 확인 → 있으면 skip
2. `.work-status` 에 `MILESTONE_ID<TAB>ISO8601` 한 줄 append
3. Airtable upsert (baseId: `appRMKLzA13xbxrZE`, tableId: `tbloe5rOJpVy5tYpP`):
   - `search_records` 로 참여자 이름 검색
   - 있으면 `update_records`, 없으면 `create_record`

```
fields:
  Name: (.workshop-participant 에서 읽은 이름)
  Phase: "환경설정" / "리서치" / "PRD" / "스캐폴딩" / "피쳐 개발" / "완료"
  Milestone_ID: "PRD-DONE" 등
  Milestone: "PRD Complete" 등
  Timestamp: (현재 시각, ISO 8601)
  Notes: (상세 정보)
```

전송 후: "진행 상태가 공유되었습니다: [Phase] — [Milestone]"

---

### Mode 3: 전체 현황 조회 (`현황`, `status`, `다른 사람`, `전체`)

**절차:**

1. `list_records`로 Progress 테이블의 전체 레코드를 가져온다
2. 참여자별로 가장 최근 마일스톤을 정리하여 표로 보여준다:

```
| 참여자   | Phase     | Milestone        | 시간   |
| -------- | --------- | ---------------- | ------ |
| 커피중독PM | 피쳐 개발 | F2 Complete      | 14:35  |
| 픽셀요정   | PRD       | PRD Features     | 14:20  |
| 야근탈출러 | 환경설정  | Env Ready        | 13:50  |
```

3. 단계별 요약도 보여준다:
   - "환경설정: 1명 / PRD: 1명 / 피쳐 개발: 1명"

---

### Mode 4: 진행자 안내 (`진행자`, `facilitator`, `테이블 만들기`)

**안내 & 자동 생성 지원:**

진행자가 원하면 Airtable MCP의 `create_table` tool로 직접 테이블을 생성해준다.

#### Progress 테이블 스키마

| Field        | Type             | Description                                      |
| ------------ | ---------------- | ------------------------------------------------ |
| Participant  | Single line text | 참여자 이름                                      |
| Phase        | Single select    | 환경설정, 리서치, PRD, 스캐폴딩, 피쳐 개발, 완료 |
| Milestone_ID | Single line text | SETUP-DONE, PRD-START 등                         |
| Milestone    | Single line text | Environment Ready, PRD Started 등                |
| Timestamp    | Single line text | ISO 8601 시각                                    |
| Details      | Long text        | 상세 정보                                        |

Phase (Single Select) 옵션:

- `환경설정` — 셋업 스크립트 실행, dev server 확인
- `리서치` — 딥리서치 실행, PDF 다운로드
- `PRD` — ALPS 문서 작성
- `스캐폴딩` — UI 뼈대 생성
- `피쳐 개발` — F1, F2, ... 구현
- `완료` — 데모 준비 완료

#### API Token 생성

1. https://airtable.com/create/tokens 접속
2. **Create new token** → Scopes: `schema.bases:read`, `data.records:read`, `data.records:write`
3. Access: 해당 Base 선택
4. 생성된 토큰 (`pat_...`)을 참여자에게 전달

#### 참여자에게 전달할 내용

```
Airtable API Key: pat_xxxxx
FAL_KEY: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:xxxxxxxx
Claude Code에서 /workshop-status setup 실행 후 위 키들을 입력하세요.
키는 .claude/settings.local.json에 환경변수로 저장됩니다 (git에 커밋되지 않음).
```

#### 권장 Airtable View

- **Grid**: Phase로 그룹, Timestamp 내림차순 → 단계별 진행 현황
- **Kanban**: Phase 기준 → 환경설정~완료 단계별 참여자 분포
- **Gallery**: Participant 기준 → 개인별 타임라인

---

## 주의사항

- API Key 미설정 시 항상 setup 모드로 안내
- Airtable 연결 실패 시 에러를 보여주되 워크숍 진행을 막지 않는다
- `.workshop-participant`, `.work-status`는 `.gitignore`에 포함되어 커밋되지 않는다
- `.mcp.json`에는 `${AIRTABLE_API_KEY}` 환경변수 참조만 포함하고, 실제 키는 `.claude/settings.local.json`의 `env`에 저장한다
- 자유 형식 입력은 가장 가까운 정형 마일스톤으로 정규화한다
- 기록 전 반드시 `.work-status` 저널에서 중복 여부를 확인하고, 중복이면 Airtable 에도 전송하지 않는다 (hook 과 skill 양쪽 모두)
