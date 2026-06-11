import awsLambdaFastify from "@fastify/aws-lambda";
import app from "../../api/src/app";

const proxy = awsLambdaFastify(app);

export const handler = proxy;