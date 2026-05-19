---
title: 'AI로 UI PoC 만들기 — 비개발자를 위한 Claude Code on Bedrock 워크숍'
weight: 0
---

비개발자(PM, 기획자)가 AI 도구만으로 서비스 아이디어를 실제 동작하는 웹 UI PoC로 만들어보는 워크숍입니다.

![워크숍 개요](/static/images/workshop-overview.jpg)

이 워크숍에서는 **Amazon Bedrock** 위에서 동작하는 **Claude Code**를 활용하여, 코드를 직접 작성하지 않고도 딥리서치부터 PRD 작성, 웹 프로토타입 개발까지 전 과정을 경험합니다.

> **핵심 안내**: 이 워크숍에서는 AI 도구와 **대화하듯이** 작업합니다. 진행 중 궁금한 점이 있으면 언제든 AI에게 질문하세요.

### What will I learn?

이 워크숍을 통해 다음을 배울 수 있습니다:

1. AI 코딩 도구(Claude Code)를 내 노트북에 설치하고, 다양한 보조 도구를 연결해 똑똑한 작업 환경을 갖추는 방법
2. AI와 대화하며 서비스 아이디어를 조사하고, 에이전트로 개발하기 최적화된 형태의 기획 문서로 정리하는 방법
3. 코드를 직접 작성하지 않고도, AI에게 화면을 보여주며 동작하는 웹 화면 시제품(프로토타입)을 만드는 방법

## Target audience

**200 레벨** — 개발 경험이 없는 PM, 기획자, 디자이너를 대상으로 합니다.

- 자신의 서비스 아이디어를 빠르게 시각화하고 싶은 분
- AI 도구를 활용한 프로토타이핑 워크플로우를 익히고 싶은 분
- **예상 소요 시간**: 총 약 8시간 (설치·리서치 약 4시간 + PRD·빌드 약 4시간)

### Prerequisites

이 워크숍은 프로그래밍 지식이 없어도 참여할 수 있습니다.

1. AI 리서치 도구 (예: Amazon QuickSuite)
2. Claude Code 설정
3. 자신이 PoC로 만들어보고 싶은 서비스 아이디어 (간단한 메모 수준이면 충분, 자세할수록 좋음)
4. 개인 노트북 (Mac 또는 Windows)
5. 터미널 앱 (Mac: Ghostty 또는 기본 터미널, Windows: PowerShell)
6. AWS 계정 및 Amazon Bedrock 접근 권한 (워크숍 진행자가 제공)

### AWS Account Requirements and Costs

**워크숍 이벤트에서**: 진행자가 AWS 계정을 제공합니다. 별도 비용이 발생하지 않습니다.

**자체 진행 시**: Amazon Bedrock API 호출 비용이 발생합니다. 자세한 내용은 [Amazon Bedrock 요금 페이지](https://aws.amazon.com/bedrock/pricing/)를 참고하세요. 워크숍 완료 후 [정리 섹션](./cleanup/)을 참고하여 리소스를 삭제하세요.
