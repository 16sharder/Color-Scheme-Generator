import 'dotenv/config';
import express from 'express';
import fs from "fs"
import asyncHandler from 'express-async-handler';

const app = express()

const PORT = process.env.PORT;

app.use(express.json());

function request(filepath) {
    fs.writeFile("../textfiles/path.txt", filepath, (err) => {if (err) return console.log(err)})
    return [1, 2, 3, 4, 5, 6]
}

app.post('/upload', function (req, res) {
  // Runs the function on the back end
  const colors = request(req.body.filepath)
  res.type("application/json").status(201).send(colors)
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});