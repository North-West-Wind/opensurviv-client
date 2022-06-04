import express from 'express';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';

dotenv.config();

const app = express();
app.use(express.static("public"));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${(<AddressInfo> server.address()).port}`);
});