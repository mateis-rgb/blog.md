import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import auth from "./auth";
import posts from "./posts";
import categories from "./categories";

const app = express();
const PORT = 1234;

const logger = (req: Request, res: Response, next: NextFunction) => { 
    console.log(`\u001b[33m${req.method}	${req.url}	${req.ip}\n`);
    
    next(); 
}; 

app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/api/auth", auth);
app.use("/api/post", posts);
app.use("/api/categories", categories);

app.listen(PORT, () => {
	console.log(`[server]: Api is listening at http://localhost:${PORT}`);
});