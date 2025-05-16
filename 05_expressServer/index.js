// creatong a server in express
import express from "express";
const app = express();
const port = 3000;

//route handler 
/*
app.get("/", (req, res) => {
  res.send("Hello from Vaibhav!");
});

app.get("/ice-tea", (req, res) => {
  res.send("What ice tea would you prefer?");
});

app.get("/twitter", (req, res) => {
  res.send("vaibhav.com");
});
*/

app.use(express.json()); 
//middleware to parse incoming JSON string to JS object -- necessary

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  console.log('post')
  const { name, price } = req.body; //destructuring object data
  const newTea = { 
    id: nextId++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  res.status(200).send(tea);
});

// update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(tea);
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  // console.log('delete')
  const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }

  teaData.splice(index, 1);
  res.status(204).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

//collection of all requests mapped with routes and response becomes an API