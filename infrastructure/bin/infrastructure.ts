#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Aspects } from "aws-cdk-lib";
import { AwsSolutionsChecks } from "cdk-nag";
import { getConfig } from './config';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const config = getConfig();
const app = new cdk.App();

const env = {
  account: 33,
  region: 'eu-west-1'
};

new InfrastructureStack(app, `${config.prefix}InfrastructureStack`, {
  config,
  ...env
})

Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }))
