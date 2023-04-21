import 'dotenv/config';
import express from 'express';
import fs from "fs"
import asyncHandler from 'express-async-handler';

const app = express()

const PORT = process.env.PORT;

app.use(express.json());

function request(filepath) {
    fs.writeFile("../textfiles/path.txt", filepath, (err) => {if (err) return console.log(err)})
}

app.post('/upload', function (req, res) {
  // Runs the function on the back end
  request(req.body.filepath)
  res.type("application/json").status(201)
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});