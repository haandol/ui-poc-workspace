---
title: '환경 설정'
weight: 5
---

워크숍을 시작하기 전에 AWS 환경을 준비합니다. 참여 유형에 맞는 탭을 선택하세요.

::::tabs
:::tab{label="AWS 이벤트 참여"}

AWS 주관 워크숍에 참가 중이라면 **미리 준비된 AWS 계정**을 사용합니다.

## AWS Workshop Studio 접속

아래 단계에 따라 Workshop Studio AWS 계정에 액세스하세요.

1. [AWS Workshop Studio](https://catalog.us-east-1.prod.workshops.aws/join/)를 엽니다.

2. 선호하는 로그인 방법을 선택합니다. AWS 가이드 이벤트의 경우 **Email OTP**를 선택합니다.

![Workshop Studio 로그인](/static/images/getting-started/sign-in.png)

3. 이메일을 입력하고 **Send passcode**를 누릅니다.

![이메일 입력](/static/images/getting-started/enter-email.png)

4. 일회용 비밀번호가 **Verify your AWS Training and Certification** 제목으로 이메일에 전송됩니다. 비밀번호를 입력하고 **Sign in**을 클릭합니다.

![OTP 입력](/static/images/getting-started/enter-otp.png)

5. 이벤트 주최자로부터 받은 12자리 **Event access code**를 입력하고 **Next**를 선택합니다.

![이벤트 코드 입력](/static/images/getting-started/enter-access-code.png)

6. **I agree with the terms and conditions**를 선택하여 이용 약관을 읽고 동의한 후 **Join Event**를 선택합니다.

![이용 약관](/static/images/getting-started/workshop-studio-tc.png)

이벤트 대시보드로 이동하면 워크숍 개요와 AWS 계정 정보를 확인할 수 있습니다.

## AWS 콘솔 접속

이벤트 대시보드 좌측의 **Open AWS Console** 링크를 클릭하여 AWS 콘솔에 접속합니다. 콘솔 우측 상단에서 리전이 **US East (N. Virginia) us-east-1**인지 확인합니다.

![콘솔 접속](/static/images/getting-started/console-access.png)

::alert[이벤트 계정의 자격 증명은 일정 시간이 지나면 만료됩니다. 만료 시 Workshop Studio 대시보드에서 새 자격 증명을 복사하세요.]{type="warning"}

:::
:::tab{label="직접 운영 (Self-hosted)"}

개인 또는 팀 AWS 계정을 사용하여 워크숍을 진행합니다.

## 1. AWS 계정 준비

아직 AWS 계정이 없다면 [AWS 계정 생성](https://portal.aws.amazon.com/billing/signup)에서 계정을 만드세요.

## 2. Bedrock 모델 액세스 활성화

Amazon Bedrock에서 Claude 모델을 사용하려면 모델 액세스를 먼저 활성화해야 합니다.

1. [Amazon Bedrock 콘솔](https://console.aws.amazon.com/bedrock/home?region=us-east-1#/modelaccess)에 접속합니다
2. 좌측 메뉴에서 **Model access**를 클릭합니다
3. **Modify model access**를 클릭합니다
4. 아래 모델들을 선택합니다:
   - **Anthropic > Claude Opus 4** (claude-opus-4-0-20250514)
   - **Anthropic > Claude Haiku** (claude-haiku-4-5-20251001)
5. **Next** → **Submit**을 클릭합니다

::alert[모델 액세스 승인에 최대 몇 분이 소요될 수 있습니다. Status가 **Access granted**로 변경되면 사용 가능합니다.]{type="info"}

## 3. IAM 권한 확인

Claude Code에서 Bedrock을 호출하려면 다음 IAM 권한이 필요합니다:

:::code{showCopyAction=true showLineNumbers=false language=json}
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": [
"bedrock:InvokeModel",
"bedrock:InvokeModelWithResponseStream"
],
"Resource": "arn:aws:bedrock:us-east-1::foundation-model/\*"
}
]
}
:::

:::
::::

## 다음 단계

AWS 환경이 준비되었으면 다음 페이지에서 워크숍에 필요한 도구를 설치합니다.
