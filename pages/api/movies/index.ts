import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req, res);
    const { search } = req.query;
    const movies = await prismadb.movie.findMany({
      where: {
        title: {
          contains: Array.isArray(search) ? search[0] : search || "",
          mode: "insensitive",
        },
      },
    });
    return res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
