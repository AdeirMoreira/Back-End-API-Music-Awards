import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import { userRouter } from "./business/routes/userRouter";
import { bandRouter } from "./business/routes/bandRouter";
import { showRouter } from "./business/routes/showRouter";


app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/bands", bandRouter)
app.use("/show", showRouter)