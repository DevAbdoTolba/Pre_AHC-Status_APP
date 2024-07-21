import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const response = await fetch("http://localhost:8700/get_all");
      const data = await response.json();
      // convert all _id to id
      data.forEach((item: any) => {
        item.id = item._id;
        delete item._id;
      });
      res.status(200).json(data);
    } catch (error) {
      // fake data
      const data = JSON.parse('[{"age":"2004-02-25","important":false,"level":"normal","msg":"offline","name":"John Doe","status":"open","id":"66995c281de728837b87ab70"},{"age":"2004-02-25","important":false,"level":"normal","msg":"Hello world","name":"John Doe","status":"open","id":"66995c2e1de728837b87ab71"},{"age":"2004-02-25","important":false,"level":"normal","msg":"Hello world","name":"John Doe","status":"open","id":"669a7fdf27e6ffec6c68b889"},{"age":"2004-05-15","important":true,"level":"normal","msg":"Hello world!","name":"John Doe","status":"open","id":"669a80a37ae855922419c4cd"},{"age":"2004-05-15","important":true,"level":"normal","msg":"Hello world!","name":"John Doe","status":"open","id":"669a80c5fd110591962ba1a8"},{"age":"2004-05-15","important":true,"level":"normal","msg":"Hello world!","name":"John Doe","status":"open","id":"669a814b06a63d160a16cde2"},{"age":"2004-05-15","important":true,"level":"normal","msg":"Hello world!","name":"John Doe","status":"open","id":"669a8161642a246ec563ed0f"},{"age":"2004-05-15","important":true,"level":"normal","msg":"Hello world!","name":"John Doe","status":"open","id":"669a816e642a246ec563ed11"},{"age":"2004-05-15","important":false,"level":"normal","msg":"Hello world!","name":"John Doe","status":"open","id":"669a81bd7f50e79600c978a8"},{"age":"2004-11-03","important":false,"level":"hard","msg":"Nice to meet you.","name":"Alice Smith","status":"open","id":"669a81bd7f50e79600c978a9"},{"age":"2004-07-15","important":false,"level":"easy","msg":"How does this work?","name":"Carlos Rodriguez","status":"open","id":"669a81bd7f50e79600c978aa"},{"age":"2004-04-22","important":false,"level":"hard","msg":"Ready to start the project.","name":"Emma Chen","status":"open","id":"669a81bd7f50e79600c978ab"}]')
      res.status(500).json(data);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
