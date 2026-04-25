# Claude Code Bedrock 설정 가이드

> **참고 문서**: https://code.claude.com/docs/en/amazon-bedrock

Claude Code를 Amazon Bedrock을 통해 사용하도록 설정합니다.

---

## 사전 조건

- [INSTALLATION.md](./INSTALLATION.md)의 1~4단계가 완료되어 있어야 합니다 (Git, Node.js, pnpm, Claude Code 설치됨)
- AWS 계정에 Bedrock 접근이 활성화되어 있어야 합니다
- Bedrock에서 사용할 Claude 모델(예: Claude Opus 4.7)에 대한 접근 권한이 필요합니다

---

## 방법 A: Workshop Studio 이벤트 자격 증명 (권장)

워크숍 이벤트에 참가 중이라면 Workshop Studio에서 제공하는 임시 자격 증명을 사용합니다.

1. Workshop Studio 이벤트 대시보드 왼쪽의 **Get AWS CLI credentials** 를 클릭합니다
2. 본인의 OS에 맞는 탭(macOS/Linux 또는 Windows)을 선택합니다
3. 표시된 환경변수 블록 전체를 복사합니다
4. 터미널에 붙여넣어 실행한 뒤, 아래 Bedrock 환경변수도 함께 설정합니다

```bash
# Mac/Linux — Workshop Studio 자격 증명 붙여넣기 후 아래 추가
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
```

```powershell
# Windows (PowerShell) — Workshop Studio 자격 증명 붙여넣기 후 아래 추가
$env:CLAUDE_CODE_USE_BEDROCK=1
$env:AWS_REGION="us-east-1"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="us.anthropic.claude-opus-4-7"
$env:ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
```

> **주의**: Workshop Studio 자격 증명은 일정 시간이 지나면 만료됩니다. 만료되면 위 과정을 다시 반복하세요.

---

## 방법 B: Bedrock API 키

Bedrock 콘솔에서 장기 API 키를 생성하여 사용합니다.

```bash
# Mac/Linux
export AWS_BEARER_TOKEN_BEDROCK=your-bedrock-api-key
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
```

```powershell
# Windows (PowerShell)
$env:AWS_BEARER_TOKEN_BEDROCK="your-bedrock-api-key"
$env:CLAUDE_CODE_USE_BEDROCK=1
$env:AWS_REGION="us-east-1"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="us.anthropic.claude-opus-4-7"
$env:ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
```

---

## 동작 확인

```bash
claude
```

정상적으로 실행되면 Bedrock을 통해 Claude Code를 사용할 수 있습니다.

> **팁**: 매번 환경변수를 설정하기 번거롭다면 셸 설정 파일(`~/.zshrc`, `~/.bashrc` 또는 PowerShell 프로필)에 추가하세요. 단, Workshop Studio 자격 증명은 임시이므로 셸 설정에 저장하지 마세요.

---

## 트러블슈팅

- **리전 문제**: `aws bedrock list-inference-profiles --region your-region`으로 모델 가용성을 확인하세요
- **"on-demand throughput isn't supported" 오류**: 모델을 inference profile ID로 지정하세요
