// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let data;
  fetch("http://localhost:8700/get_all")
    .then((res) => res.json())
    .then((json) => {
      data = json;
      res.status(200).json({ data: data });
    });
}
