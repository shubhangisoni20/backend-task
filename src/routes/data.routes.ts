import { Request, Response, Router } from "express";

const router = Router();

const exampleData: string[] = [];

interface DataBody {
  data: string;
}

router.post("/data", (req: Request & { body: DataBody }, res: Response) => {
  const { data } = req.body;
  exampleData.push(data);
  const msg = {
    status: "200 OK",
    message: exampleData,
  };
  res.json(msg);
});

router.get("/data", (req: Request, res: Response) => {
  const msg = {
    status: "200 OK",
    message: exampleData,
  };
  res.json(msg);
});

export { router };
