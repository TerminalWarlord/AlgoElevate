import express, { Request, Response } from "express";

const app = express();


app.use(express.json());

app.post("/execute", async (req: Request, res: Response) => {

})


app.listen(process.env.PORT || 3002);
