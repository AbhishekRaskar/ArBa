const express = require("express")
const { Connection } = require("./Config/db")
const { userRouter } = require("./Routes/userRoute")
const { categoryRouter } = require("./Routes/categoryRoute")




require("dotenv").config()
const cors = require("cors")

const app = express()


app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use("/category", categoryRouter)





app.listen(process.env.PORT, async () => {
    try {
        await Connection
        console.log("Connected to DB");
        console.log(`Server is running at PORT ${process.env.PORT}`);
    } catch (error) {
        console.log(error.message);
    }
})