const express = require('express');
const pool = require("../db")
const utils = require("../utils")

const app = express.Router();




// Get all order statuses
app.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'SELECT * FROM order_status_tb';
      connection.query(query, (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch order statuses from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });
  
  // Create a new order status
  app.post('/', (req, res) => {
    const { status } = req.body;
  
    pool.getConnection((err, connection) => {
      if (err) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'INSERT INTO order_status_tb (status) VALUES (?)';
      connection.query(query, [status], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to create a new order status' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Order status created successfully', order_status_id: results.insertId });
      });
    });
  });
  
  // Update an order status
  app.put('/:id', (req, res) => {
    const order_status_id = req.params.id;
    const { status } = req.body;
  
    pool.getConnection((err, connection) => {
      if (err) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'UPDATE order_status_tb SET status = ? WHERE order_status_id = ?';
      connection.query(query, [status, order_status_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to update the order status' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Order status updated successfully' });
      });
    });
  });
  
  // Delete an order status
  app.delete('/:id', (req, res) => {
    const order_status_id = req.params.id;
  
    pool.getConnection((err, connection) => {
      if (err) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'DELETE FROM order_status_tb WHERE order_status_id = ?';
      connection.query(query, [order_status_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to delete the order status' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Order status deleted successfully' });
      });
    });
  });
  module.exports = app