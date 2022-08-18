import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { Workbook } from "exceljs";
import type { NextApiRequest, NextApiResponse } from "next";
import internal from "stream";
import { getS3Client } from "../../common/utils/getClients";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const Bucket = process.env.S3_UPLOAD_BUCKET;
  console.log("tlqkfshadk");
  const s3Client = getS3Client();
  const params: GetObjectCommandInput = {
    Bucket,
    Key: "data.xlsx",
  };
  const getCommand = new GetObjectCommand(params);
  const wb = new Workbook();

  try {
    const file = await s3Client.send(getCommand);
    const stream = file.Body as internal.Stream;
    await wb.xlsx.read(stream);
    console.log(wb.worksheets);
    const buffer = (await wb.xlsx.writeBuffer()) as Buffer;

    const putParams: PutObjectCommandInput = {
      Bucket,
      Key: "output.xlsx",
      Body: buffer,
    };
    const putCommand = new PutObjectCommand(putParams);
    const result = await s3Client.send(putCommand);
    console.log(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "tlqkf" });
  }

  return res.status(200).json({ data: "success" });
};

export default handler;
