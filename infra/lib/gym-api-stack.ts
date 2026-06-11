import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const gymApiLambda = new lambda.Function(this, "GymApiLambda", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("../api/dist"),
      memorySize: 512,
      timeout: cdk.Duration.seconds(10),
      environment: {
        NODE_ENV: "production",
      },
    });

    const api = new apigateway.LambdaRestApi(this, "GymApiGateway", {
      handler: gymApiLambda,
      proxy: true,
      restApiName: "Gym Capacity API",
      deployOptions: {
        stageName: "prod",
      },
    });

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
  }
}
