import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SystemConfig } from './shared/types';

interface InfrastructureStackProps extends cdk.StackProps {
  config: SystemConfig
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: InfrastructureStackProps) {
    super(scope, id, {
      description: 'AWS LLM CHATBOT',
      ...props
    });


  }
}
