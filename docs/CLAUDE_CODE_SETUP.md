# Claude Code Bedrock 설정 가이드

Claude Code가 AWS Bedrock을 통해 동작하도록 환경변수를 설정합니다.

아래 두 가지 방법 중 하나를 선택하세요.

---

## 방법 A: Bedrock API 키 (권장)

1. 터미널(또는 PowerShell) 에서 `claude` 를 실행해 대화창을 엽니다.
2. 💬 대화창에 아래 슬래시 명령을 입력합니다.

   ```
   /setup-bedrock
   ```

3. Claude 가 묻는 대로 **Bedrock API 키** 를 붙여넣으면 끝입니다. 환경변수를 직접 설정할 필요가 없습니다.

---

## 방법 B: Workshop Studio 자격 증명

### Mac/Linux

1. Workshop Studio 이벤트 대시보드에서 **Get AWS CLI credentials** 클릭
2. **macOS/Linux** 탭 선택 → 표시된 내용 전체 복사 → 터미널에 붙여넣기
3. 이어서 아래도 터미널에 붙여넣기

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
```

4. `claude` 입력하여 실행

### Windows (PowerShell)

1. Workshop Studio 이벤트 대시보드에서 **Get AWS CLI credentials** 클릭
2. **Windows** 탭 선택 → 표시된 내용 전체 복사 → 터미널에 붙여넣기
3. 이어서 아래도 터미널에 붙여넣기

```powershell
$env:CLAUDE_CODE_USE_BEDROCK=1
$env:AWS_REGION="us-east-1"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="us.anthropic.claude-opus-4-7"
$env:ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
```

4. `claude` 입력하여 실행

> **참고**: Workshop Studio 자격 증명은 일정 시간 후 만료됩니다. Claude Code가 갑자기 동작하지 않으면 1~3번을 다시 해주세요.
