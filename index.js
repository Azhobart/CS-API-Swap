const express = require("express");
const model = require("./model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/pizzas", async (req, res) => {
  try {
    let pizzas = await model.pizza.find();
    res.json(pizzas);
  } catch (error) {
    console.log(error);
    res.status(400).send("get failure.");
  }
});

app.post("/pizzas", (req, res) => {
  let data = req.body;
  try {
    let new_pizza = new model.pizza({
      description: data.description,
      amount: data.amount,
      category: data.category,
    });

    let error = new_pizza.validateSync();
    if (error) {
      res.status(404).json(error);
      return;
    }

    new_pizza.save();
    res.status(201).json(new_pizza);
  } catch (error) {
    res.status(error).send("Something failed when making a pizza.");
  }
});

app.delete("/pizzas/:id", async (req, res) => {
  try {
    let is_deleted = await model.pizza.findOneAndDelete({
      _id: req.params.id,
    });
    if (!is_deleted) {
      res.status(404).send("Could not find a pizzas with that id.");
      return;
    }

    res.status(204).send("Succesful deletion.");
  } catch (error) {
    res.status(404).send("Delete failure.");
  }
});

app.get("/pizzas/:id", (req, res) => {
  model.pizza
    .findOne({ _id: req.params.id })
    .then((pizza) => {
      if (pizza) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(pizza);
      } else {
        res.status(404).send("Could not find the expense with that id.");
      }
    })
    .catch(() => {
      res.status(400).send("Request not valid.");
    });
});

app.put("/pizzas/:id", async (req, res) => {
  try {
    const updated_pizza = {
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    };
    let putexp = await model.expense.findOneAndUpdate(
      { _id: req.params.id },
      updated_pizza,
      {
        new: true,
      }
    );
    if (!putexp) {
      res.status(404).send("Could not find a pizza with that id.");
      return;
    }

    res.status(204).send("Successful put");
  } catch (error) {
    res.status(400).send("Put failure.");
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
