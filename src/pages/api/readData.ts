import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  return res.status(200).json({ data: "success" });
};

export default handler;
