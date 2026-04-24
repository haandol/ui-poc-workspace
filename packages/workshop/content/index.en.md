---
title: 'AI로 UI PoC 만들기 — 비개발자를 위한 Claude Code on Bedrock 워크샵'
weight: 0
---

비개발자(PM, 기획자)가 AI 도구만으로 서비스 아이디어를 실제 동작하는 웹 UI PoC로 만들어보는 워크샵입니다.

![워크샵 개요](/static/images/workshop-overview.png)

이 워크샵에서는 **Amazon Bedrock** 위에서 동작하는 **Claude Code**를 활용하여, 코드를 직접 작성하지 않고도 딥리서치부터 PRD 작성, 웹 프로토타입 개발까지 전 과정을 경험합니다.

> **핵심 안내**: 이 워크샵에서는 AI 도구와 **대화하듯이** 작업합니다. 진행 중 궁금한 점이 있으면 언제든 AI에게 질문하세요.

### What will I learn?

이 워크샵을 통해 다음을 배울 수 있습니다:

1. Amazon Bedrock을 통해 Claude Code를 설정하고 실행하는 방법
2. AI 딥리서치 도구로 서비스 아이디어를 빠르게 조사하는 방법
3. MCP(Model Context Protocol) 서버를 활용하여 AI 도구를 확장하는 방법
4. ALPS 형식의 PRD 문서를 AI와 함께 작성하는 방법
5. Claude Code로 Nuxt/Vue 기반 웹 UI를 프로토타이핑하는 방법
6. 브라우저 DevTools MCP로 AI가 화면을 직접 보고 수정하게 하는 방법
7. 백엔드 없이 모킹 데이터로 완성도 높은 UI PoC를 만드는 방법

## Target audience

**200 레벨** — 개발 경험이 없는 PM, 기획자, 디자이너를 대상으로 합니다.

- 자신의 서비스 아이디어를 빠르게 시각화하고 싶은 분
- AI 도구를 활용한 프로토타이핑 워크플로우를 익히고 싶은 분
- **예상 소요 시간**: 약 4시간 (오프닝 포함)

### Prerequisites

이 워크샵은 프로그래밍 지식이 없어도 참여할 수 있습니다.

1. 자신이 PoC로 만들어보고 싶은 서비스 아이디어 (간단한 메모 수준이면 충분)
2. 개인 노트북 (Mac 또는 Windows)
3. AWS 계정 및 Amazon Bedrock 접근 권한 (워크샵 진행자가 제공)

### AWS Account Requirements and Costs

**워크샵 이벤트에서**: 진행자가 AWS 계정을 제공합니다. 별도 비용이 발생하지 않습니다.

**자체 진행 시**: Amazon Bedrock API 호출 비용이 발생합니다. 워크샵 완료 후 [정리 섹션](./cleanup.ko-KR.md)을 참고하여 리소스를 삭제하세요.
