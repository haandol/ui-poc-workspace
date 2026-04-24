---
title: 'PDF 저장'
weight: 20
---

딥리서치가 완료되면 결과를 PDF로 다운로드하여 프로젝트 폴더에 저장합니다.

## Step 1. PDF 다운로드

Amazon Quick에서 리서치가 완료되면 **PDF로 다운로드** 버튼을 클릭합니다.

![Amazon Quick PDF 다운로드](/static/images/lab-1/quicksuite-download-pdf.png)

## Step 2. 파일명 변경

다운로드된 PDF 파일명을 **영문**으로 변경합니다.

::alert[한글 파일명이나 공백이 포함된 파일명은 Claude Code에서 인식 오류가 발생할 수 있습니다. 반드시 영문으로 변경하세요.]{type="warning"}

권장 파일명 예시: `research.pdf`

## Step 3. 프로젝트 폴더에 복사

PDF 파일을 프로젝트의 `docs/` 폴더로 복사합니다.

::::tabs
:::tab{label="Mac (드래그앤드롭)"}

Finder에서 다운로드 폴더의 PDF 파일을 아래 경로로 드래그앤드롭합니다:

```
바탕화면 > ui-poc-workspace > docs
```

:::
:::tab{label="Mac (터미널)"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cp ~/Downloads/research.pdf ~/Desktop/ui-poc-workspace/docs/
:::

:::
:::tab{label="Windows"}

파일 탐색기에서 다운로드 폴더의 PDF 파일을 아래 경로로 복사합니다:

```
바탕화면 > ui-poc-workspace > docs
```

:::
::::

복사 후 폴더 구조가 아래와 같으면 됩니다:

```
ui-poc-workspace/
└── docs/
    └── research.pdf   ← 여기에 저장
```

## 확인

Claude Code에서 파일이 정상적으로 인식되는지 확인합니다.

:::code{showCopyAction=true showLineNumbers=false language=text}
docs/ 폴더에 있는 파일 목록을 보여줘
:::

`research.pdf`가 목록에 표시되면 다음 랩으로 이동할 준비가 된 것입니다.
