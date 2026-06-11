# Gym API Infrastructure (AWS CDK)

This folder contains the AWS CDK code, defining infrastructure for the Gym API backend.

The CDK stack deploys:

- a Lambda function built from `infra/lambda/index.ts`
- an API Gateway REST API that forwards requests to the Lambda
- a CloudFormation output containing the public API URL

## Prerequisites

- Node.js installed (recommended 18+)
- AWS credentials configured for the target account/region
- `npm install` run in this folder

## Files of interest

- `bin/infra.ts` — CDK app entrypoint that instantiates `ApiStack`
- `lib/api-stack.ts` — defines Lambda + API Gateway resources
- `../api/src/lambda.ts` — Fastify adapter used by the Lambda function

## Deploying

From `infra/`:

```bash
npm install
npx cdk synth
npx cdk deploy --require-approval never
```

If you only want to preview the generated CloudFormation template:

```bash
npx cdk synth
```

If you want to compare to the currently deployed stack:

```bash
npx cdk diff
```

## Notes

- The Lambda uses `@fastify/aws-lambda` to wrap your Fastify app for API Gateway.
- The function is deployed as a plain Lambda from compiled code in `../api/dist`.

## Local testing

For local development of the API itself, continue using the `api/` project normal startup:

```bash
cd ../api
npm install
npm run dev
```

The CDK stack is only needed when you want to deploy the backend to AWS.
