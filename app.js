import express from "express"
import cookieParser from "cookie-parser";
import connectdb from "./database/db.js";
import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRoute from "./routes/subscription.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";


const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

connectdb(); 

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subs', subscriptionRoute)
app.use('/api/v1/workflows', workflowRouter)


app.use(errorMiddleware);

app.get('/', function (req, res){
    res.send("hii");
});

console.log("jii");


app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
})

export default app;