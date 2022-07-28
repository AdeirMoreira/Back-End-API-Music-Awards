import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";


app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/bands", bandRouter)
app.use("/show", showRouter)