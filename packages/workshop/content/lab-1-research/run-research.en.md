---
title: '딥리서치 실행'
weight: 10
---

Amazon QuickSuite의 Quick Flow를 사용하여 서비스 아이디어를 조사합니다.

## Step 1. Quick Flow 생성

:button[Amazon QuickSuite 열기]{target="\_blank" href="https://quicksight.aws.amazon.com/" variant="primary" iconName="external" iconAlign="right"}

Amazon QuickSuite에서 **Quick Flow**를 새로 생성합니다.

![Amazon QuickSuite Quick Flow 생성](/static/images/lab-1/quicksuite-new-flow.png)

## Step 2. 리서치 프롬프트 입력

아래 프롬프트를 복사하여 Quick Flow에 붙여넣습니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
나는 PM이고, 새로운 서비스의 UI PoC를 준비하고 있어.
백엔드 없이 모든 데이터와 API를 모킹해서 웹 UI만 프로토타입할 거야.

아래 내용을 포함해서 딥리서치해줘:

1. 해당 서비스 도메인의 주요 경쟁사 분석 (핵심 기능, UX 특징, 강점/약점)
2. 우리 서비스만의 차별화 포인트
3. 타겟 사용자와 핵심 사용 시나리오
4. UI PoC에 반드시 포함해야 할 핵심 기능 추천

리포트는 한글로 작성해줘.
:::

## Step 3. 아이디어 입력

프롬프트 아래에 자신이 만들고 싶은 서비스 아이디어를 추가합니다.

아이디어를 구체적으로 작성할수록 더 좋은 리서치 결과를 얻을 수 있습니다.

| 예시 (나쁨)    | 예시 (좋음)                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| "재고 관리 앱" | "중소 이커머스 셀러를 위한 실시간 재고 현황 대시보드. 상품별 재고 수량, 입출고 이력, 재고 부족 알림 기능 포함" |
| "일정 관리 앱" | "팀 단위 프로젝트 일정 관리 도구. 칸반 보드, 마일스톤 추적, 팀원별 업무 부하 시각화 포함"                      |

::alert[딥리서치는 약 30분 정도 소요됩니다. 조사가 진행되는 동안 [시작하기](../getting-started/) 섹션의 개발 환경 설정을 함께 진행하세요.]{type="info"}
