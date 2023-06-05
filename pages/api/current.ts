import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const { currentUser } = await serverAuth(req, res);
  res.status(200).json(currentUser);
  try {
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
