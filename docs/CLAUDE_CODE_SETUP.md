# Claude Code Bedrock 설정 가이드

> **참고 문서**: https://code.claude.com/docs/en/amazon-bedrock

Claude Code를 Amazon Bedrock을 통해 사용하도록 설정합니다.

---

## 사전 조건

- [INSTALLATION.md](./INSTALLATION.md)의 1~4단계가 완료되어 있어야 합니다 (Git, Node.js, pnpm, Claude Code 설치됨)
- AWS 계정에 Bedrock 접근이 활성화되어 있어야 합니다
- Bedrock에서 사용할 Claude 모델(예: Claude Opus 4.7)에 대한 접근 권한이 필요합니다
- 적절한 IAM 권한이 설정되어 있어야 합니다

---

## 1. AWS 자격 증명 설정

아래 방법 중 하나를 선택하여 AWS 자격 증명을 설정합니다.

**방법 A: AWS SSO 프로필 (권장)**

```bash
# Mac/Linux
aws sso login --profile=<your-profile-name>
export AWS_PROFILE=your-profile-name
```

```powershell
# Windows (PowerShell)
aws sso login --profile=<your-profile-name>
$env:AWS_PROFILE="your-profile-name"
```

**방법 B: 환경변수 (Access Key)**

```bash
# Mac/Linux
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-access-key
export AWS_SESSION_TOKEN=your-session-token
```

```powershell
# Windows (PowerShell)
$env:AWS_ACCESS_KEY_ID="your-access-key-id"
$env:AWS_SECRET_ACCESS_KEY="your-secret-access-key"
$env:AWS_SESSION_TOKEN="your-session-token"
```

**방법 C: Bedrock API 키**

```bash
# Mac/Linux
export AWS_BEARER_TOKEN_BEDROCK=your-bedrock-api-key
```

```powershell
# Windows (PowerShell)
$env:AWS_BEARER_TOKEN_BEDROCK="your-bedrock-api-key"
```

---

## 2. Bedrock 환경변수 설정

터미널에서 아래 환경변수를 설정합니다:

```bash
# Mac/Linux
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
```

```powershell
# Windows (PowerShell)
$env:CLAUDE_CODE_USE_BEDROCK=1
$env:AWS_REGION="us-east-1"
```

---

## 3. 모델 버전 고정 (권장)

모델 별칭(sonnet, opus 등)을 그대로 사용하면 Anthropic이 새 모델을 출시할 때 문제가 생길 수 있습니다. 아래와 같이 특정 모델 버전을 고정하세요:

```bash
# Mac/Linux
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
```

```powershell
# Windows (PowerShell)
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="us.anthropic.claude-opus-4-7"
$env:ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
```

> Application Inference Profile ARN을 사용할 수도 있습니다:
>
> ```bash
> # Mac/Linux
> export ANTHROPIC_MODEL='arn:aws:bedrock:us-east-1:your-account-id:application-inference-profile/your-model-id'
> ```
>
> ```powershell
> # Windows (PowerShell)
> $env:ANTHROPIC_MODEL="arn:aws:bedrock:us-east-1:your-account-id:application-inference-profile/your-model-id"
> ```

---

## 4. Claude Code 실행 확인

```bash
claude
```

정상적으로 실행되면 Bedrock을 통해 Claude Code를 사용할 수 있습니다.

> **팁**: 매번 환경변수를 설정하기 번거롭다면 셸 설정 파일에 추가하세요:
>
> - **Mac/Linux**: `~/.zshrc` 또는 `~/.bashrc`에 아래 내용 추가
>
> ```bash
> export CLAUDE_CODE_USE_BEDROCK=1
> export AWS_REGION=us-east-1
> export AWS_PROFILE=your-profile-name
> export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-7'
> export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
> ```
>
> - **Windows**: PowerShell 프로필 파일에 아래 내용 추가 (프로필 경로 확인: `echo $PROFILE`)
>
> ```powershell
> $env:CLAUDE_CODE_USE_BEDROCK=1
> $env:AWS_REGION="us-east-1"
> $env:AWS_PROFILE="your-profile-name"
> $env:ANTHROPIC_DEFAULT_OPUS_MODEL="us.anthropic.claude-opus-4-7"
> $env:ANTHROPIC_SMALL_FAST_MODEL="us.anthropic.claude-haiku-4-5-20251001-v1:0"
> ```

---

## 관리자용: IAM 권한

> **참고**: 이 섹션은 워크숍 참석자가 아닌 **AWS 관리자**를 위한 내용입니다. 참석자는 관리자에게 권한을 요청하세요.

AWS 관리자가 아래 IAM 정책을 사용자에게 부여해야 합니다:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowModelAndInferenceProfileAccess",
      "Effect": "Allow",
      "Action": ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream", "bedrock:ListInferenceProfiles"],
      "Resource": [
        "arn:aws:bedrock:*:*:inference-profile/*",
        "arn:aws:bedrock:*:*:application-inference-profile/*",
        "arn:aws:bedrock:*:*:foundation-model/*"
      ]
    },
    {
      "Sid": "AllowMarketplaceSubscription",
      "Effect": "Allow",
      "Action": ["aws-marketplace:ViewSubscriptions", "aws-marketplace:Subscribe"],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:CalledViaLast": "bedrock.amazonaws.com"
        }
      }
    }
  ]
}
```

---

## 트러블슈팅

- **리전 문제**: `aws bedrock list-inference-profiles --region your-region`으로 모델 가용성을 확인하세요
- **"on-demand throughput isn't supported" 오류**: 모델을 inference profile ID로 지정하세요
- **자격 증명 만료**: `aws sso login`으로 다시 로그인하세요
