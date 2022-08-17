import { AthenaClient } from "@aws-sdk/client-athena";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log("aaa");
  const athenaClient = new AthenaClient({
    region: process.env.AWS_REGION,
  });
  athenaClient.config;
  return res.status(200).json({ data: "success" });
};

export default handler;
