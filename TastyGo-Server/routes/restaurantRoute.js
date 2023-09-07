
const express = require('express');
const pool = require("../db")
const utils = require("../utils")
const multer = require('multer')
const upload = multer({ dest: '../uploads' })


const app = express.Router();

// Get all restaurants
app.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM restaurant_tb', (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch restaurants from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });
  
  
  // Create a new restaurant
  app.post('/', (req, res) => {
    const { restaurant_name, restaurant_type, state, city, pin } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'INSERT INTO restaurant_tb (restaurant_name, restaurant_type, state, city, pin) VALUES (?, ?, ?, ?, ?)';
      connection.query(query, [restaurant_name, restaurant_type, state, city, pin], (error, results) => {
        connection.release();
        console.log(req.body)
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to create a new restaurant' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Restaurant created successfully', restaurant_id: results.insertId });
      });
    });
  });

  app.get("/:type", (req, res) => {
    const type = req.params.type;
    console.log(type);
    pool.getConnection((err, connection) => {
      if (err) {
        res.send(utils.createResult(error, results));
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query(
        "select * from restaurant_tb  where restaurant_type=?",
        [type],
        (error, results) => {
          connection.release();
  
          if (error) {
            res.send(utils.createResult(error, results));
            // res.status(500).json({ error: 'Failed to fetch restaurants from the database' });
            return;
          }
          res.send(utils.createResult(error, results));
          // res.json(results);
        }
      );
    });
  });

  // app.post('/images', upload.single('image'), (req, res) => {
  //   const imageName = req.file.filename
  //   const description = req.body.description
  
  //   pool.getConnection((error, connection) => {
  //     if (error) {
  //       res.send(utils.createResult(error, results))
  //       // res.status(500).json({ error: 'Failed to connect to the database' });
  //       return;
  //     }
  
  //     const query = 'INSERT INTO restaurant_tb (image) VALUES (?)';
  //     connection.query(query, [imageName], (error, results) => {
  //       connection.release();
  //       console.log(req.body)
  //       if (error) {
  //         res.send(utils.createResult(error, results))
  //         // res.status(500).json({ error: 'Failed to create a new restaurant' });
  //         return;
  //       }
  //       //res.send(utils.createResult(error, results))
  //       // res.json({ message: 'Restaurant created successfully', restaurant_id: results.insertId });
  //       console.log(description, imageName)
  //       res.send({description, imageName})
      
  //     });
  //   });
  // })
  
  // Update a restaurant
  app.put('/:id', (req, res) => {
    const restaurant_id = req.params.id;
    const { restaurant_name, restaurant_type, state, city, pin } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'UPDATE restaurant_tb SET restaurant_name = ?, restaurant_type = ?, state = ?, city = ?, pin = ? WHERE restaurant_id = ?';
      connection.query(query, [restaurant_name, restaurant_type, state, city, pin, restaurant_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to update the restaurant' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Restaurant updated successfully' });
      });
    });
  });
  
  // Delete a restaurant
  app.delete('/:id', (req, res) => {
    const restaurant_id =parseInt(req.params.id);
    
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'DELETE FROM restaurant_tb WHERE restaurant_id = ?';
      connection.query(query, [restaurant_id], (error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to delete the restaurant' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Restaurant deleted successfully' });
      });
    });
  });

  app.get('/:id', (req, res) => {
    pool.getConnection((error, connection) => {
      const id = req.params.id
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      connection.query('SELECT * FROM restaurant_tb where restaurant_id=?',[id],(error, results) => {
        connection.release();
  
        if (error) {
          res.send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch restaurants from the database' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json(results);
      });
    });
  });

  
  module.exports = app
  