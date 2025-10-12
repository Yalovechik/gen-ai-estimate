export enum SupportedRegion {
    EU_WEST_1 = "eu-west-1",
}

export type ModelProvider = "sagemaker" | "bedrock" | "openai" | "nexus";

export enum SupportedSageMakerModels {
    FalconLite = "FalconLite [ml.g5.12xlarge]",
    Idefics_9b = "Idefics_9b (Multimodal) [ml.g5.12xlarge]",
    Idefics_80b = "Idefics_80b (Multimodal) [ml.g5.48xlarge]",
    Llama2_13b_Chat = "Llama2_13b_Chat [ml.g5.12xlarge]",
    Mistral7b_Instruct = "Mistral7b_Instruct 0.1 [ml.g5.2xlarge]",
    Mistral7b_Instruct2 = "Mistral7b_Instruct 0.2 [ml.g5.2xlarge]",
    Mistral7b_Instruct3 = "Mistral7b_Instruct 0.3 [ml.g5.2xlarge]",
    Mixtral_8x7b_Instruct = "Mixtral_8x7B_Instruct 0.1 [ml.g5.48xlarge]",
}

export interface ModelConfig {
    provider: ModelProvider;
    name: string;
    dimensions?: number;
    default?: boolean;
}

export interface SystemConfig {
    prefix: string;
    createCMKs?: boolean;
    retainOnDelete?: boolean;
    ddbDeletionProtection?: boolean;
    vpc?: {
        vpcId?: string;
        createVpcEndpoints?: boolean;
        vpcDefaultSecurityGroup?: string;
    };
    advancedMonitoring?: boolean;
    logRetention?: number;
    certificate?: string;
    domain?: string;
    privateWebsite?: boolean;
    rateLimitPerIP?: number;
    cognitoFederation?: {
        enabled?: boolean;
        autoRedirect?: boolean;
        customProviderName?: string;
        customProviderType?: string;
        customSAML?: {
            metadataDocumentUrl?: string;
        };
        customOIDC?: {
            OIDCClient?: string;
            OIDCSecret?: string;
            OIDCIssuerURL?: string;
        };
        cognitoDomain?: string;
    };
    cfGeoRestrictEnable: boolean;
    cfGeoRestrictList: string[];
    bedrock?: {
        enabled?: boolean;
        region?: SupportedRegion;
        endpointUrl?: string;
        roleArn?: string;
        guardrails?: {
            enabled: boolean;
            identifier: string;
            version: string;
        };
        agent?: {
            enabled: boolean;
            agentId: string;
            agentVersion: string;
            agentAliasId?: string;
        };
    };
    nexus?: {
        enabled?: boolean;
        gatewayUrl?: string;
        tokenUrl?: string;
        clientId?: string;
        clientSecret?: string;
    };
    llms: {
        rateLimitPerIP?: number;
        sagemaker: SupportedSageMakerModels[];
        huggingfaceApiSecretArn?: string;
        sagemakerSchedule?: {
            enabled?: boolean;
            timezonePicker?: string;
            enableCronFormat?: boolean;
            sagemakerCronStartSchedule?: string;
            sagemakerCronStopSchedule?: string;
            daysForSchedule?: string;
            scheduleStartTime?: string;
            scheduleStopTime?: string;
            enableScheduleEndDate?: boolean;
            startScheduleEndDate?: string;
        };
    };
    rag: {
        enabled: boolean;
        deployDefaultSagemakerModels?: boolean;
        engines: {
            aurora: {
                enabled: boolean;
            };
            opensearch: {
                enabled: boolean;
            };
            kendra: {
                enabled: boolean;
                createIndex: boolean;
                external?: {
                    name: string;
                    kendraId: string;
                    region?: SupportedRegion;
                    roleArn?: string;
                }[];
                enterprise?: boolean;
            };
            knowledgeBase: {
                enabled: boolean;
                external?: {
                    name: string;
                    knowledgeBaseId: string;
                    region?: SupportedRegion;
                    roleArn?: string;
                }[];
            };
        };
        embeddingsModels: ModelConfig[];
        crossEncodingEnabled: boolean;
        crossEncoderModels: ModelConfig[];
    };
}