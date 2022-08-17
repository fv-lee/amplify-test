import type { NextApiRequest, NextApiResponse } from "next";
import { Polly } from "@aws-sdk/client-polly";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import {
  ListObjectsCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

type Data = {
  data: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const identityPoolId: string = process.env.AWS_IDENTITY_POOL_ID || "";
  const region = process.env.S3_UPLOAD_REGION;
  const bucketName = process.env.S3_UPLOAD_BUCKET;

  const credentials = fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region }),
    identityPoolId,
  });

  const file = req.body;

  const s3 = new S3Client({
    region,
    credentials,
  });

  const uploadParams: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: "01/aa",
    Body: file,
  };

  const result = await s3.send(new PutObjectCommand(uploadParams));
  console.log(result);

  return res.status(200).json({ data: "success" });
};

export default handler;
