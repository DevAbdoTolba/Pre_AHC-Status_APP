import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await fetch(`http://localhost:8700/get/${id}`);
      const data = await response.json();
      // convert _id to id
      data.id = data._id;
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch item with id ${id}` });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
