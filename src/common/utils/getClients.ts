import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

const identityPoolId: string = process.env.IDENTITY_POOL_ID || "";
const region = process.env.S3_UPLOAD_REGION;
const Bucket = process.env.S3_UPLOAD_BUCKET;

export const getS3Client = (): S3Client => {
  const credentials = fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region }),
    identityPoolId,
  });

  const client = new S3Client({
    region,
    credentials,
  });

  return client;
};
