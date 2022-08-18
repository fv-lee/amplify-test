import type { NextApiRequest, NextApiResponse } from "next";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getS3Client } from "../../common/utils/getClients";

type Data = {
  data: string | any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const bucketName = process.env.S3_UPLOAD_BUCKET || "lee-testbucket";
  const file = req.body;
  const s3 = getS3Client();

  const uploadParams: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: "01/aa",
    Body: file,
  };
  console.log(bucketName);
  try {
    const result = await s3.send(new PutObjectCommand(uploadParams));
    console.log(result);
  } catch (error) {
    console.log(`tlqkf error : ${error}`);
    return res.status(400).json({ data: error });
  }

  return res.status(200).json({ data: "success" });
};

export default handler;
