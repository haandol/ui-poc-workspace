import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import type { Construct } from 'constructs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_DIR = path.join(__dirname, '..', 'site')

/**
 * 워크숍 사전 준비 가이드(정적 HTML)를 S3 + CloudFront 로 호스팅하는 스택.
 *
 * - S3 버킷은 비공개로 두고, CloudFront 의 Origin Access Control(OAC)로만 접근을 허용한다.
 * - `site/` 디렉터리(index.html + guide-images/)를 BucketDeployment 로 업로드하고,
 *   배포할 때마다 CloudFront 캐시를 무효화(invalidate)한다.
 */
export class GuideStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'GuideBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      // 워크숍 자료라 스택을 지우면 같이 정리되도록 한다.
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    const distribution = new cloudfront.Distribution(this, 'GuideDistribution', {
      comment: 'workshop-setup-guide static site',
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      defaultBehavior: {
        // S3OriginWithOAC: 비공개 버킷에 OAC 로 접근(권장 방식)
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        compress: true,
      },
      errorResponses: [
        // SPA 가 아니라 단일 페이지라, 404/403 시 가이드 첫 화면으로 보낸다.
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(5),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(5),
        },
      ],
    })

    new s3deploy.BucketDeployment(this, 'DeployGuide', {
      sources: [s3deploy.Source.asset(SITE_DIR)],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    })

    new CfnOutput(this, 'GuideUrl', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'Public URL of the workshop setup guide',
    })
    new CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution id (for manual invalidations)',
    })
    new CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
      description: 'Origin S3 bucket name',
    })
  }
}
