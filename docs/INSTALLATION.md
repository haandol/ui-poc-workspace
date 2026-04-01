# 개발 환경 설치 가이드

워크숍에 필요한 프로그램 설치 및 프로젝트 설정을 안내합니다.

---

## Quick Setup (권장)

프로젝트를 클론한 뒤, 셋업 스크립트 하나로 모든 환경설정을 완료할 수 있습니다.

**Mac — 원라이너 (클론 + 설치 한번에):**

```bash
curl -fsSL https://raw.githubusercontent.com/haandol/ui-poc-workspace/main/scripts/bootstrap.sh | bash
```

**Mac — 이미 클론한 경우:**

```bash
bash scripts/setup.sh
```

**Windows (PowerShell):**

```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup.ps1
```

스크립트가 자동으로 Git, Node.js, pnpm, Claude Code를 설치하고 프로젝트 의존성까지 세팅합니다.

---

## 수동 설치 (단계별)

스크립트 대신 단계별로 직접 설치하려면 아래 가이드를 따라하세요.

- **[Windows 설치 가이드](./INSTALLATION_WIN.md)**
- **[Mac 설치 가이드](./INSTALLATION_MAC.md)**
