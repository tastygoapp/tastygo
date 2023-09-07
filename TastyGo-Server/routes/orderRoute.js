const express = require('express');
const pool = require("../db")
const utils = require("../utils")

const app = express.Router();




// Get all orders
app.get('/', (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'SELECT * FROM orders_tb';
      connection.query(query, (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch orders from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });

  app.get('/details/:id',(req, res) => {
    const id = req.params.id
    console.log(id)
    pool.getConnection((error, connection) => {

      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'select ord.order_id,ord.restaurant_id,ord.order_datetime ,ord.total_amount,res.restaurant_name,res.restaurant_type,res.city,status.status,user.user_name,user.user_mobile,dev.delivery_partner_first_name from(select * from orders_tb where user_id=?) ord left join(select * from restaurant_tb) res on  ord.restaurant_id = res.restaurant_id  left join (select * from order_status_tb) status on ord.order_status_id=status.order_status_id left join(select * from user_tb) user on ord.user_id=user.user_id left join (select * from delivery_partner_tb) dev on ord.delivery_partner_id= dev.delivery_partner_id;';
      connection.query(query,[id],(error, results) => {
        console.log(results);
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch orders from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });

  // Get all orders for specific user
app.get('/:id', (req, res) => {
  const id = req.params.id
  pool.getConnection((error, connection) => {
    if (error) {
      res.send(utils.createResult(error, results))
      // res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }

    const query = 'SELECT delivery_partner_id FROM orders_tb where order_id = ?';
    connection.query(query,[id], (error, results) => {
      connection.release();

      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).jsObjecton({ error: 'Failed to fetch orders from the database' });
        return;
      }
      res.send(utils.createResult(error, results))
      // res.json(results);
    });
  });
});




  
  // Create a new order
  app.post('/', (req, res) => {
    const { user_id, restaurant_id, dish_id, user_address_id, total_amount } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
      var address_id = user_address_id
      console.log(user_address_id)
      const query = 'select delivery_partner_id from delivery_partner_tb where city = (select city from address_tb where address_id = ? ) and status = "available" limit 1;'
      connection.query(query, [address_id], (error, results) => {
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to create a new order' });
          return;
        }
        var string=JSON.stringify(results);
        var json =  JSON.parse(string);
        
        var delivery_partner_id = json[0].delivery_partner_id;
        
        const query = 'INSERT INTO orders_tb (user_id, restaurant_id, dish_id, user_address_id, total_amount,order_status_id,delivery_partner_id) VALUES (?, ?, ?, ?, ?, 2,?)';
      connection.query(query, [user_id, restaurant_id, dish_id, user_address_id, total_amount,delivery_partner_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to create a new order' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Order created successfully', order_id: results.insertId });
      });
      
      });
    });
  });
  
  // Update an order
  app.put('/:id', (req, res) => {
    const order_id = req.params.id;
    const { user_id, restaurant_id, dish_id, user_address_id, delivery_partner_id, order_status_id, order_datetime, total_amount } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'UPDATE orders_tb SET user_id = ?, restaurant_id = ?, dish_id = ?, user_address_id = ?, delivery_partner_id = ?, order_status_id = ?, order_datetime = ?, total_amount = ? WHERE order_id = ?';
      connection.query(query, [user_id, restaurant_id, dish_id, user_address_id, delivery_partner_id, order_status_id, order_datetime, total_amount, order_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to update the order' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Order updated successfully' });
      });
    });
  });
  
  // Delete an order
  app.delete('/:id', (req, res) => {
    const order_id = req.params.id;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'DELETE FROM orders_tb WHERE order_id = ?';
      connection.query(query, [order_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to delete the order' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Order deleted successfully' });
      });
    });
  });



  module.exports = app
  