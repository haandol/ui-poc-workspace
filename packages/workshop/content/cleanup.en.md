---
title: '정리'
weight: 100
---

::alert[AWS 이벤트에서 워크숍을 진행 중이라면 이 섹션을 건너뛰어도 됩니다. Workshop Studio가 자동으로 계정 리소스를 정리합니다.]{type="info"}

자체 AWS 계정에서 워크숍을 진행한 경우, 아래 단계에 따라 생성된 리소스를 삭제하여 추가 비용 발생을 방지합니다.

## Amazon Bedrock

이 워크숍에서는 Amazon Bedrock API를 직접 호출하는 리소스를 생성하지 않습니다. Claude Code가 로컬에서 Bedrock API를 호출하므로, 워크숍 종료 후 추가 비용이 발생하지 않습니다.

## 로컬 개발 서버 종료

개발 서버가 실행 중이라면 종료합니다:

:::code{showCopyAction=true showLineNumbers=false language=bash}

# 탭 1에서 Ctrl+C

:::

## 비용 확인

[AWS Cost Explorer](https://us-east-1.console.aws.amazon.com/costmanagement/home#/cost-explorer)에서 예상치 못한 비용이 발생하지 않았는지 확인합니다.

:button[AWS Cost Explorer 열기]{target="\_blank" href="https://us-east-1.console.aws.amazon.com/costmanagement/home#/cost-explorer" variant="normal" iconName="external" iconAlign="right"}
