import 'dotenv/config';
import express from 'express';
import fs from "fs"
import asyncHandler from 'express-async-handler';

const app = express()

const PORT = process.env.PORT;

app.use(express.json());

function write(path, data) {
    fs.writeFile(path, data, (err,) => {if (err) return console.log(err)})
}

function read(path) {
    const data = fs.readFileSync(path, "utf-8")
    return(data)
}

app.post('/upload', function (req, res) {
  // Runs the write function with path.txt as path and filepath as data
  write("../textfiles/path.txt", req.body.filepath)
  res.type("application/json").status(201)
})

app.get('/get-colors', function (req, res) {
  // Runs the read function
  const colors = read("../textfiles/path.txt")
  res.type("application/json").status(200).send(colors)
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});