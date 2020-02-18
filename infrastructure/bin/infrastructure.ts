#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { FrontendStack } from "../lib/frontend-stack";
import { ApiStack } from "../lib/api-stack";

const app = new cdk.App();
new FrontendStack(app, "ToPlayTv-Frontend");
new ApiStack(app, "ToPlayTv-Api");
