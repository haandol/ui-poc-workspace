---
title: 'Environment Setup'
weight: 5
---

Prepare your AWS environment before starting the workshop. Pick the tab that matches how you are running it.

::::tabs
:::tab{label="AWS event attendee"}

If you are joining an AWS-run workshop, use the **pre-provisioned AWS account**.

## Access AWS Workshop Studio

Follow the steps below to access the Workshop Studio AWS account.

1. Open [AWS Workshop Studio](https://catalog.us-east-1.prod.workshops.aws/join/).

2. Pick your preferred sign-in method. For AWS-guided events select **Email OTP**.

![Workshop Studio sign-in](/static/images/getting-started/sign-in.png)

3. Enter your email and click **Send passcode**.

![Enter email](/static/images/getting-started/enter-email.png)

4. A one-time passcode is sent in an email titled **Verify your AWS Training and Certification**. Enter the code and click **Sign in**.

![Enter OTP](/static/images/getting-started/enter-otp.png)

5. Enter the 12-character **Event access code** provided by your event organizer and click **Next**.

![Enter access code](/static/images/getting-started/enter-access-code.png)

6. Read and accept **I agree with the terms and conditions**, then click **Join Event**.

![Terms and conditions](/static/images/getting-started/workshop-studio-tc.png)

Once you are on the event dashboard, you can see the workshop overview and the AWS account information.

## Open the AWS console

From the event dashboard, click **Open AWS Console** on the left. In the console's top right, make sure the region is **US East (N. Virginia) us-east-1**.

![Console access](/static/images/getting-started/console-access.png)

::alert[The event account credentials expire after a while. When they do, copy fresh credentials from the Workshop Studio dashboard.]{type="warning"}

:::
:::tab{label="Self-hosted"}

Run the workshop using your own (personal or team) AWS account.

## 1. Prepare an AWS account

If you do not have an AWS account yet, create one at [AWS account signup](https://portal.aws.amazon.com/billing/signup).

## 2. Enable Bedrock model access

To use Claude models via Amazon Bedrock, you must first enable model access.

1. Open the [Amazon Bedrock console](https://console.aws.amazon.com/bedrock/home?region=us-east-1#/modelaccess)
2. In the left menu click **Model access**
3. Click **Modify model access**
4. Select the following models:
   - **Anthropic > Claude Opus 4** (claude-opus-4-0-20250514)
   - **Anthropic > Claude Haiku** (claude-haiku-4-5-20251001)
5. Click **Next** → **Submit**

::alert[Model access approval can take up to a few minutes. Once the Status changes to **Access granted**, you can use them.]{type="info"}

## 3. Check IAM permissions

To let Claude Code call Bedrock you need the following IAM permissions:

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

## Next step

Once your AWS environment is ready, move on to install the required tools on the next page.
