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

3. **인증 방법 선택** 화면이 뜨면 **`2` 를 눌러** `Bedrock API key (bearer token)` 를 선택하고 Enter 를 누릅니다.

   ![Auth method - Bedrock API key](./workshop-assets/setup-bedrock/cc-1.png)

4. **Bedrock API key** 입력 화면에서 워크숍 진행자에게 전달받은 API 키를 붙여넣고 Enter 를 누릅니다.

   ![Paste Bedrock API key](./workshop-assets/setup-bedrock/cc-2.png)

5. **AWS region** 입력 화면이 뜨면 반드시 `us-west-2` 를 입력하고 Enter 를 누릅니다. (Claude Code 는 `~/.aws/config` 가 아니라 `AWS_REGION` 환경변수를 읽기 때문에, 프로필에 리전이 있더라도 여기에서 명시적으로 지정해야 합니다.)

   ![AWS region us-west-2](./workshop-assets/setup-bedrock/cc-3.png)

6. **모델 버전 핀 고정** 화면이 뜨면 **`2` 를 눌러** `Pin the working models with 1M context` 를 선택하고 Enter 를 누르면 끝입니다. 환경변수를 직접 설정할 필요가 없습니다.

   ![Pin model versions](./workshop-assets/setup-bedrock/cc-4.png)

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
