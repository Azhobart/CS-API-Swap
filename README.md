AT http://localhost:8080

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve all pizza orders| GET   | /pizzas
Create new pizza order| POST   | /pizzas 
Delete pizza order| DELETE  | /pizzas/(id)
Update pizza order| PUT  | /pizzas/(id)

POST also returns the created pizza order

## A pizza order consists of five fields:
   Name                           | Type | required | description
----------------------------------|------|----------|------------
amount | Number | yes | The amount of pizzas ordered.
top0 | String | yes | The first topping.
top1 | String | no | The second topping.
top2 | String | no | The third topping.
top3 | String | no | The fourth topping.
   
