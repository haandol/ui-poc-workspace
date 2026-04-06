---
name: workshop-status
description: 워크숍 진행 상태를 Airtable에 공유합니다. 초기 설정(키 등록), 단계별 상태 보고, 전체 현황 조회, 진행자용 테이블 생성을 모두 포함합니다.
---

# Workshop Status Skill

Airtable MCP 서버(`airtable-mcp-server`)를 사용하여 워크숍 진행 상태를 정형적으로 관리한다.

## 워크숍 실행 단계 & 정형 마일스톤

워크숍 참여자가 실제로 거치는 실행 과정 기준으로 마일스톤을 정의한다.

| Phase      | Milestone ID    | Milestone              | 자동 판단 기준                                    |
| ---------- | --------------- | ---------------------- | ------------------------------------------------- |
| 환경설정   | SETUP-DONE      | Environment Ready      | `node_modules/` 존재 + dev server 동작            |
| 리서치     | RESEARCH-DONE   | Deep Research Done     | `docs/` 에 PDF 파일 존재                          |
| PRD        | PRD-START       | PRD Started            | ALPS 문서 Section 1 저장                          |
| PRD        | PRD-FEATURES    | PRD Features Defined   | ALPS 문서 Section 6 (Features 목록) 저장          |
| PRD        | PRD-DONE        | PRD Complete           | ALPS 문서 전체 완료 (Section 9까지)               |
| 스캐폴딩   | SCAFFOLD-DONE   | UI Scaffold Done       | `packages/web/app/layouts/` 디렉토리 존재         |
| 피쳐 개발  | F1-DONE         | F1 Complete            | Feature 1 구현 커밋                               |
| 피쳐 개발  | F2-DONE         | F2 Complete            | Feature 2 구현 커밋                               |
| 피쳐 개발  | F3-DONE         | F3 Complete            | Feature 3 구현 커밋                               |
| 피쳐 개발  | FN-DONE         | FN Complete            | Feature N 구현 커밋 (피쳐 수에 따라 확장)         |
| 완료       | DEMO-READY      | Demo Ready             | 모든 핵심 피쳐 구현, 데모 준비 완료               |

## 사전 조건

- `.mcp.json`에 airtable MCP 서버가 설정되어 있어야 한다
- `AIRTABLE_API_KEY`가 설정되어 있어야 한다 (미설정 시 setup 모드로 안내)

## 사용법 판단

사용자 입력에 따라 아래 4가지 모드 중 하나를 실행한다.

---

### Mode 1: 초기 설정 (`setup`, `설정`, `키 등록`, 키가 미설정일 때)

**절차:**

1. 사용자에게 아래 정보를 물어본다:
   - **Airtable API Key** (`pat_...`로 시작) — 진행자에게 전달받은 값
   - **닉네임** — 진행 상태 공유 시 표시될 이름 (예: "커피중독PM", "픽셀요정" 등)

2. `.mcp.json`의 airtable 서버 설정에 `env` 필드로 API Key를 직접 추가한다:

   Edit tool로 `.mcp.json`의 airtable 섹션을 수정:
   ```json
   "airtable": {
     "command": "npx",
     "args": ["-y", "airtable-mcp-server"],
     "env": {
       "AIRTABLE_API_KEY": "pat_사용자가입력한값"
     }
   }
   ```

3. 닉네임을 프로젝트 루트에 `.workshop-participant` 파일로 저장한다 (한 줄, 닉네임만).

4. 안내: "API Key가 설정되었습니다. `/mcp` 명령어를 실행하여 airtable 서버를 리로드하면 Airtable 연동이 활성화됩니다."

5. MCP 리로드 후 Airtable MCP tool (`list_bases`)로 연결을 확인한다.

6. 연결이 확인되면 SETUP-DONE 마일스톤을 자동으로 기록한다.

---

### Mode 2: 상태 보고 (기본 / 인자 있음)

현재 진행 상태를 Airtable에 정형적으로 기록한다.

**인자가 있는 경우** (예: `/workshop-status PRD-DONE`, `/workshop-status F2 완료`):
- 위 마일스톤 테이블에서 매칭되는 Milestone ID를 사용
- "F2 완료" 같은 자연어도 `F2-DONE` / `F2 Complete`로 정규화

**인자가 없는 경우** — 프로젝트 상태를 자동 판단:

1. `.workshop-participant` 파일 확인 → 없으면 setup 안내
2. 아래 순서로 가장 최근 도달한 마일스톤을 역순 판단:
   - `git log --oneline -10`에서 F1, F2... 커밋 메시지 → FN-DONE
   - `packages/web/app/layouts/` 존재? → SCAFFOLD-DONE
   - `prd/` 에 `.alps.md` 파일 존재? → PRD-DONE
   - `docs/` 에 PDF 파일 존재? → RESEARCH-DONE
   - `node_modules/` 존재? → SETUP-DONE
3. 판단된 마일스톤을 사용자에게 보여주고 확인 후 Airtable에 전송

**Airtable 기록:**

Airtable MCP tool `create_record` 사용:

```
fields:
  Participant: (.workshop-participant 에서 읽은 이름)
  Phase: "환경설정" / "리서치" / "PRD" / "스캐폴딩" / "피쳐 개발" / "완료"
  Milestone_ID: "PRD-DONE" 등
  Milestone: "PRD Complete" 등
  Timestamp: (현재 시각, ISO 8601)
  Details: (상세 정보)
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

| Field         | Type             | Description                         |
| ------------- | ---------------- | ----------------------------------- |
| Participant   | Single line text | 참여자 이름                         |
| Phase         | Single select    | 환경설정, 리서치, PRD, 스캐폴딩, 피쳐 개발, 완료 |
| Milestone_ID  | Single line text | SETUP-DONE, PRD-START 등            |
| Milestone     | Single line text | Environment Ready, PRD Started 등   |
| Timestamp     | Single line text | ISO 8601 시각                       |
| Details       | Long text        | 상세 정보                           |

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
Claude Code에서 /workshop-status setup 실행 후 위 키를 입력하세요.
키는 .mcp.json에 저장됩니다 (disposable key이므로 OK).
```

#### 권장 Airtable View

- **Grid**: Phase로 그룹, Timestamp 내림차순 → 단계별 진행 현황
- **Kanban**: Phase 기준 → 환경설정~완료 단계별 참여자 분포
- **Gallery**: Participant 기준 → 개인별 타임라인

---

## 주의사항

- API Key 미설정 시 항상 setup 모드로 안내
- Airtable 연결 실패 시 에러를 보여주되 워크숍 진행을 막지 않는다
- `.workshop-participant`는 `.gitignore`에 포함되어 커밋되지 않는다
- `.mcp.json`에 키가 포함되지만 disposable key이므로 허용한다
- 자유 형식 입력은 가장 가까운 정형 마일스톤으로 정규화한다
