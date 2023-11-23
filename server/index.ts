import express from "express"
import cors from "cors"

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
   res.json({ message: "Get from server" })
})

app.post("/", (req, res) => {
   const body = req.body
   res.json({ message: `Post from server`, body })
})

app.listen(port, () => {
   console.log(`server listening at http://localhost:${port}`)
})
