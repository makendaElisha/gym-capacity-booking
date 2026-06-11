#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ApiStack } from "../lib/gym-api-stack";

const app = new cdk.App();

new ApiStack(app, "GymApiStack");
