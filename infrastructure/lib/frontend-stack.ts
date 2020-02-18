import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as cloudfront from "@aws-cdk/aws-cloudfront";

export class FrontendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // TODO include deployment role in here

    const oai = new cloudfront.OriginAccessIdentity(this, "OAI");
    const siteBucket = new s3.Bucket(this, "FrontendSiteBucket", {
      bucketName: "toplay-tv",
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: false
    });
    siteBucket.grantRead(oai);

    new cloudfront.CloudFrontWebDistribution(
      this,
      "FrontendHostingDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: siteBucket,
              originAccessIdentity: oai
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ]
      }
    );
  }
}
