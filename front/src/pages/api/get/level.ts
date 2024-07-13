import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { level } = req.query;

  if (req.method === "GET") {
    try {
      const response = await fetch(`http://localhost:8700/get_level/${level}`);
      const data = await response.json();
      data.forEach((item: any) => {
        item.id = item._id;
        delete item._id;
      });
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to fetch items with level ${level}` });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
