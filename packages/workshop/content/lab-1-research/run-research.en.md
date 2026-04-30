---
title: '딥리서치 실행'
weight: 10
---

Amazon QuickSuite의 **Research** 기능을 사용하여 서비스 아이디어를 조사합니다.

## Step 1. Research 페이지 접속

:button[Amazon QuickSuite 열기]{target="\_blank" href="https://quicksight.aws.amazon.com/" variant="primary" iconName="external" iconAlign="right"}

![Amazon QuickSuite Research 페이지](/static/images/lab-1/quick-research-home.jpg)

왼쪽 사이드바에서 **Research** 메뉴로 이동한 뒤, 우측 상단의 **New research** 버튼을 클릭합니다.

## Step 2. 리서치 내용 입력

![Research objective 입력](/static/images/lab-1/quick-research-objective.jpg)

**Research objective** 입력란에 아래 내용을 붙여넣습니다. 프롬프트와 조사할 아이디어가 한 번에 포함되어 있습니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
나는 PM이고, 새로운 서비스의 UI PoC를 준비하고 있어.
백엔드 없이 모든 데이터와 API를 모킹해서 웹 UI만 프로토타입할 거야.

아래 내용을 포함해서 딥리서치해줘:

1. 해당 서비스 도메인의 주요 경쟁사 분석 (핵심 기능, UX 특징, 강점/약점)
2. 우리 서비스만의 차별화 포인트
3. 타겟 사용자와 핵심 사용 시나리오
4. UI PoC에 반드시 포함해야 할 핵심 기능 우선순위별 정렬.

리포트는 한글로 작성해줘.

조사할 주제는 다음과 같아:
당뇨환자를 대상으로 식단과 운동 프로그램을 지정해줄건데 해당 프로그램에는 칼로리와 영양성분을 포함하고 있어. 환자가 사용할 앱을 목업하고 싶어.
환자는 할당된 기간 동안 앱을 켜서 사진을 찍기만 하면 되고, 앱에서 자동으로 식단을 분석해서 히스토리를 보여주고, 칼로리와 영양성분을 분석해서 보여줘야 해. 스마트 워치에서 운동량을 추적해서 같이 보여줄 수 있어.
매일 해당 날짜의 프로그램을 얼마나 잘 지켰는지 보여주고, 또한 전체 기간에 대한 수행 여부도 쉽게 보여줄 수 있게 해줘.
:::

::alert[위 예제는 참고용입니다. 자신의 서비스 아이디어로 바꿔서 입력해도 됩니다. 아이디어를 구체적으로 작성할수록 더 좋은 리서치 결과를 얻을 수 있습니다. 예: "재고 관리 대시보드를 만들고 싶다" 보다는 "중소 이커머스 셀러를 위한 실시간 재고 현황 대시보드. 상품별 재고 수량, 입출고 이력, 재고 부족 알림 기능 포함"]{type="info"}

입력이 끝나면 우측 하단의 **Start researching** 버튼을 클릭하여 리서치를 시작합니다.

::alert[딥리서치는 약 30분 정도 소요되며, 완료되면 이메일로도 알림을 받을 수 있습니다. 조사가 진행되는 동안 [시작하기](../getting-started/) 섹션의 개발 환경 설정을 함께 진행하세요.]{type="info"}
