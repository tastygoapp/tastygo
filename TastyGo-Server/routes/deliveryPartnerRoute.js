const express = require('express');
const pool = require("../db")
const utils = require("../utils")

const app = express.Router();




// Get all delivery partners
app.get('/', (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM delivery_partner_tb', (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch delivery partners from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });
  
  app.get('/:id', (req, res) => {
    const id = req.params.id
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT concat_ws(" ",delivery_partner_first_name,delivery_partner_last_name) as delivery_partner_name FROM delivery_partner_tb where delivery_partner_id = ?',[id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch delivery partners from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });
  // Create a new delivery partner
  app.post('/', (req, res) => {
    const { delivery_partner_first_name, delivery_partner_last_name, status, city, pin } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'INSERT INTO delivery_partner_tb (delivery_partner_first_name, delivery_partner_last_name, status, city, pin) VALUES (?, ?, ?, ?, ?)';
      connection.query(query, [delivery_partner_first_name, delivery_partner_last_name, status, city, pin], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to create a new delivery partner' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Delivery partner created successfully', delivery_partner_id: results.insertId });
      });
    });
  });
  
  // Update a delivery partner
  app.put('/:id', (req, res) => {
    const delivery_partner_id = req.params.id;
    const { delivery_partner_first_name, delivery_partner_last_name, status, city, pin } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'UPDATE delivery_partner_tb SET delivery_partner_first_name = ?, delivery_partner_last_name = ?, status = ?, city = ?, pin = ? WHERE delivery_partner_id = ?';
      connection.query(query, [delivery_partner_first_name, delivery_partner_last_name, status, city, pin, delivery_partner_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to update the delivery partner' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Delivery partner updated successfully' });
      });
    });
  });
  
  // Delete a delivery partner
  app.delete('/:id', (req, res) => {
    const delivery_partner_id = req.params.id;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'DELETE FROM delivery_partner_tb WHERE delivery_partner_id = ?';
      connection.query(query, [delivery_partner_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to delete the delivery partner' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Delivery partner deleted successfully' });
      });
    });
  });
  module.exports = app
  