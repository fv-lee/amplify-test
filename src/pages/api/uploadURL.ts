import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from "next";
import { getS3Client } from "../../common/utils/getClients";

interface Data {
  uploadURL?: String;
  error?: String;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const fileName = req.body.fileName || "name";
  const Bucket = process.env.S3_UPLOAD_BUCKET;
  const s3 = getS3Client();

  const params: PutObjectCommandInput = {
    Bucket,
    Key: fileName + ".xlsx",
    // ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  let uploadURL: String = "";
  try {
    uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "failed to fetch data" });
  }

  return res.status(200).json({ uploadURL });
};

export default handler;
