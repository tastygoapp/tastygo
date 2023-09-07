const express = require('express');
const pool = require("../db")
const utils = require("../utils")

const app = express.Router();




// Get all dishes
app.get('/', (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM dish_tb', (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch dishes from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });

  app.get('/dish/:id', (req, res) => {
    const restaurant_id = req.params.id 
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM dish_tb where dish_id=?', [restaurant_id], (error,results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch dishes from the database' });
          return;
        }
        console.log(results)
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });

app.get('/restaurant/:id', (req, res) => {
    const restaurant_id = req.params.id 
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM dish_tb where restaurant_id=?', [restaurant_id], (error,results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch dishes from the database' });
          return;
        }
        console.log(results)
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });

  app.get('/user/:id', (req, res) => {
    const user_id = req.params.id 
    console.log(user_id)
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM dish_tb where dish_id in (SELECT dish_id FROM orders_tb where user_id = ?)', [user_id], (error,results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch dishes from the database' });
          return;
        }

        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });  
  
  // Create a new dish
  app.post('/', (req, res) => {
    const { restaurant_id, dish_type, dish_name, dish_price } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'INSERT INTO dish_tb (restaurant_id, dish_type, dish_name, dish_price) VALUES (?, ?, ?, ?)';
      connection.query(query, [restaurant_id, dish_type, dish_name, dish_price], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to create a new dish' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Dish created successfully', dish_id: results.insertId });
      });
    });
  });
  
  // Update a dish
  app.put('/:id', (req, res) => {
    const dish_id = req.params.id;
    const { restaurant_id, dish_type, dish_name, dish_price } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'UPDATE dish_tb SET restaurant_id = ?, dish_type = ?, dish_name = ?, dish_price = ? WHERE dish_id = ?';
      connection.query(query, [restaurant_id, dish_type, dish_name, dish_price, dish_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to update the dish' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Dish updated successfully' });
      });
    });
  });
  
  // Delete a dish
  app.delete('/:id', (req, res) => {
    const dish_id = req.params.id;
    console.log("in delete dish")
    
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'DELETE FROM dish_tb WHERE dish_id = ?';
      connection.query(query, [dish_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to delete the dish' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Dish deleted successfully' });
      });
    });
  });
  module.exports = app
  