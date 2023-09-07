const express = require('express');
const pool = require("../db")
const utils = require("../utils")

const app = express.Router();




// Get all order menu items 
app.get('/', (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'SELECT * FROM order_menu_item';
      connection.query(query, (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch order menu items from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });

// Get all order menu items for specific user
app.get('/:id', (req, res) => {
  const user_id = req.params.id
  console.log(user_id)
  pool.getConnection((error, connection) => {
    if (error) {
      res.send(utils.createResult(error, results))
      // res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }

    const query = 'select dish.dish_id,dish.restaurant_id,dish.dish_type,dish.dish_name,dish.dish_price,dish.dish_image,menu.qty_ordered from order_menu_item as menu natural join dish_tb as dish where dish_id in (select dish_id from order_menu_item where user_id=?)';
    connection.query(query,[user_id] ,(error, results) => {
      connection.release();

      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to fetch order menu items from the database' });
        return;
      }
      console.log(results)
      res.send(utils.createResult(error, results))
      // res.json(results);
    });
  });
});
  
  // Create a new order menu item
  app.post('/', (req, res) => {
    
    const { user_id,dish_id, qty_ordered} = req.body;
  
    pool.getConnection((error, connection) => {
      let a = 0
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
      const query_select = 'SELECT * FROM order_menu_item where dish_id=? and user_id=?';
      connection.query(query_select, [dish_id,user_id],(error, results_select) => {
        // connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results_select))
          // res.status(500).json({ error: 'Failed to fetch order menu items from the database' });
          return;
        }
        // res.send(utils.createResult(error, results_select))
        a = Object.keys(results_select).length;
        
        // res.json(results);

        if(a==0)
        {
              const query = 'INSERT INTO order_menu_item (dish_id, qty_ordered,user_id) VALUES (?, ?, ?)';
              connection.query(query, [dish_id, qty_ordered,user_id], (error, results) => {
                connection.release();
          
                if (error) {
                  res.send(utils.createResult(error, results))
                  // res.status(500).json({ error: 'Failed to create a new order menu item' });
                  return;
                }
                res.send(utils.createResult(error, results))
                // res.json({ message: 'Order menu item created successfully', order_menu_id: results.insertId });
              });
        }
        else
        {
            const query = 'UPDATE order_menu_item SET  qty_ordered = ? WHERE dish_id = ?';
            connection.query(query, [ qty_ordered,dish_id], (error, results) => {
            connection.release();
        
              if (error) {
                res.send(utils.createResult(error, results))
                // res.status(500).json({ error: 'Failed to update the order menu item' });
                return;
              }
              res.send(utils.createResult(error, results))
              // res.json({ message: 'Order menu item updated successfully' });
            });
        }
      });
    });
  });
  
  // Update an order menu item
  app.put('/:id', (req, res) => {
    const order_menu_id = req.params.id;
    const { order_id, dish_id, qty_ordered } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'UPDATE order_menu_item SET order_id = ?, dish_id = ?, qty_ordered = ? WHERE order_menu_id = ?';
      connection.query(query, [order_id, dish_id, qty_ordered, order_menu_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to update the order menu item' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Order menu item updated successfully' });
      });
    });
  });
  
  // Delete an order menu item
  app.delete('/:id', (req, res) => {
    const dish_id = req.params.id;
    console.log("cart: "+dish_id)
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
      const query = 'DELETE FROM order_menu_item WHERE dish_id = ?';
      connection.query(query, [dish_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to delete the order menu item' });
          return;
        }
        
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Order menu item deleted successfully' });
      });
    });
  });
  module.exports = app
  