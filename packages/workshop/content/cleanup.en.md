---
title: 'Cleanup'
weight: 100
---

::alert[If you are running this workshop at an AWS event, you can skip this section. Workshop Studio will automatically clean up the account resources.]{type="info"}

If you ran the workshop on your own AWS account, follow the steps below to delete the resources you created and avoid extra charges.

## Amazon Bedrock

This workshop does not create any resources that call Amazon Bedrock on your behalf. Claude Code calls the Bedrock API directly from your laptop, so there are no lingering costs after you finish.

## Stop the local dev server

If the dev server is still running, stop it:

:::code{showCopyAction=true showLineNumbers=false language=bash}

# In tab 1, press Ctrl+C

:::

## Check your costs

Open [AWS Cost Explorer](https://us-east-1.console.aws.amazon.com/costmanagement/home#/cost-explorer) to make sure no unexpected charges were incurred.

:button[Open AWS Cost Explorer]{target="\_blank" href="https://us-east-1.console.aws.amazon.com/costmanagement/home#/cost-explorer" variant="normal" iconName="external" iconAlign="right"}
