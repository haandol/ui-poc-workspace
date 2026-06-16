#!/usr/bin/env tsx
import { App } from 'aws-cdk-lib'
import { GuideStack } from '../lib/guide-stack.ts'

const app = new App()

new GuideStack(app, 'WorkshopGuideStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    // CloudFront 배포 자체는 글로벌이지만, 스택은 어느 리전에 배포해도 무방합니다.
    region: process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
  description: 'Static hosting for the non-tech UI PoC workshop setup guide (S3 + CloudFront)',
})

app.synth()
