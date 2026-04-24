---
title: '마무리'
weight: 90
---

워크숍을 완료했습니다! 이 워크숍에서 달성한 것들을 정리합니다.

## 완성한 것들

이 워크숍을 통해 다음을 완성했습니다:

1. **딥리서치** — Amazon QuickSuite로 서비스 도메인을 조사하고 경쟁사를 분석했습니다
2. **PRD 작성** — ALPS 형식의 구조화된 PRD 문서를 AI와 함께 작성했습니다
3. **UI PoC** — 백엔드 없이 모킹 데이터로 동작하는 웹 UI 프로토타입을 만들었습니다

## 데모 준비

만든 UI PoC를 팀에 공유할 준비를 합니다.

개발 서버가 실행 중인 상태에서 브라우저 화면을 공유하면 됩니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}
pnpm dev:web
:::

:button[http://localhost:3000 열기]{target="\_blank" href="http://localhost:3000" variant="primary" iconName="external" iconAlign="right"}

## 데모 발표 가이드

발표 시 아래 내용을 포함하면 좋습니다:

- 어떤 아이디어로 시작했는지
- 딥리서치에서 발견한 인사이트
- 구현한 핵심 Feature와 그 이유
- 만드는 과정에서 인상적이었던 점

## 다음 단계

이 워크숍에서 만든 UI PoC를 발전시키려면:

- **더 많은 Feature 추가**: PRD의 나머지 Feature를 구현합니다
- **디자인 개선**: 실제 디자인 시스템을 적용합니다
- **백엔드 연동**: 모킹 데이터를 실제 API로 교체합니다
- **사용자 테스트**: 실제 사용자에게 피드백을 받습니다
