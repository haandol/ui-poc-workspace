---
title: 'Save the PDF'
weight: 20
---

Once the deep research is done, download the result as a PDF and save it into the project folder.

## Step 1. Review the research result

Research completes in about 30 minutes and you can get an email notification. In the Research list, click the completed item to open the result page.

## Step 2. Download the PDF

![Amazon QuickSuite Research PDF download](/static/images/lab-1/quick-research-download-pdf.jpg)

On the research result page, click the **Share** button in the top right and choose **Download PDF** from the dropdown.

## Step 3. Rename the file

Rename the downloaded PDF to something **in plain ASCII**.

::alert[File names with non-ASCII characters or spaces can cause recognition errors in Claude Code. Rename them to plain ASCII.]{type="warning"}

Recommended file name: `research.pdf`

## Step 4. Copy into the project folder

Copy the PDF into the project's `docs/` folder.

::::tabs
:::tab{label="Mac (drag & drop)"}

In Finder, drag the PDF from your Downloads folder into:

```
Desktop > ui-poc-workspace > docs
```

:::
:::tab{label="Mac (terminal)"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cp ~/Downloads/research.pdf ~/Desktop/ui-poc-workspace/docs/
:::

:::
:::tab{label="Windows"}

In File Explorer, copy the PDF from your Downloads folder into:

```
Desktop > ui-poc-workspace > docs
```

:::
::::

After copying, the folder structure should look like this:

```
ui-poc-workspace/
└── docs/
    └── research.pdf   ← save it here
```

## Verify

Check that Claude Code recognizes the file:

:::code{showCopyAction=true showLineNumbers=false language=text}
List the files in the docs/ folder.
:::

If `research.pdf` shows up in the list, Lab 1 is complete. Move on to the next lab.

::alert[If you set up the Airtable integration, the `RESEARCH-DONE` milestone is recorded automatically the moment Claude Code reads the PDF. No extra action needed.]{type="info"}
