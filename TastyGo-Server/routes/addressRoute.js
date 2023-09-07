const express = require('express');
const pool = require("../db")
const utils = require("../utils")
const app = express.Router();

// Get all addresses
app.get('/', (req, res) => {
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM address_tb', (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch addresses from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });

  app.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM address_tb where user_id=?',[user_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch addresses from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });
  
  // Create a new address
  app.post('/', (req, res) => {
    const { state, city, pin, user_id } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'INSERT INTO address_tb (state, city, pin, user_id) VALUES (?, ?, ?, ?)';
      connection.query(query, [state, city, pin, user_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to create a new address' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Address created successfully', address_id: results.insertId });
      });
    });
  });
  
  // Update an address
  app.put('/:id', (req, res) => {
    const address_id = req.params.id;
    const { state, city, pin, user_id } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'UPDATE address_tb SET state = ?, city = ?, pin = ?, user_id = ? WHERE address_id = ?';
      connection.query(query, [state, city, pin, user_id, address_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to update the address' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Address updated successfully' });
      });
    });
  });
  
  // Delete an address
  app.delete('/:id', (req, res) => {
    const address_id = req.params.id;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'DELETE FROM address_tb WHERE address_id = ?';
      connection.query(query, [address_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to delete the address' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Address deleted successfully' });
      });
    });
  });
  module.exports = app
  