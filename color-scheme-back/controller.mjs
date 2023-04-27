import 'dotenv/config';
import express from 'express';
import fs from "fs"

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



app.post('/reset', function (req, res) {
  // Resets the given text file with write
  write(req.body.path, "")
  res.type("application/json").status(201)
})

app.post('/write', function (req, res) {
  // Runs the write function
  write(req.body.path, req.body.text)
  res.type("application/json").status(201)
})

app.post('/read', function (req, res) {
  // Runs the read function and returns the results
  const data = read(req.body.path)
  res.type("application/json").status(201).send(data)
})





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});