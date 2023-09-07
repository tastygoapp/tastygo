const express = require('express');
const pool = require("../db")
const utils = require("../utils")
const app = express.Router();
const path = require('path')

const multer = require('multer')

const storage = multer.diskStorage({
  destination : (req,file,cb) =>{
    cb(null,'../uploads')
  },
  filename : (req,file,cb) =>
  {
    console.log("image = ",`${Date.now()+path.extname(file.originalname)}`)
    cb(null,`${Date.now()+path.extname(file.originalname)}`)
  }
})


const upload  = multer({storage})

app.get('/', (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      res.send(utils.createResult(error, results))
      // res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }

    connection.query('SELECT * FROM user_tb', (error, results) => {
      connection.release();

      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to fetch users from the database' });
        return;
      }
      res.send(utils.createResult(error, results))
    });
  });
});

app.post('/login', (req, res) => {
    const { user_email, user_password } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.status(500).send(utils.createResult(error))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
  
      const query = 'SELECT * FROM user_tb WHERE user_email = ? and user_password = ?';
      connection.query(query, [user_email,user_password], (error, results) => {
        connection.release();
  
        if (error) {
          res.status(500).send(utils.createResult(error, results))
          // res.status(500).json({ error: 'Failed to fetch user from the database' });
          return;
        }
  
        if (results.length === 0) {
          res.status(401).send(utils.createResult(error, results))
          // res.status(401).json({ error: 'Invalid email or password' });
          return;
        }
        res.send(utils.createResult(error, results))
        // res.json({ message: 'Login successful', user_id: user.user_id });
      });
    });
  });

  app.post('/login/admin', (req, res) => {
    const { user_email, user_password } = req.body;
  
    pool.getConnection((error, connection) => {
      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to connect to the database' });
        return;
      }
      const query_role = 'SELECT * FROM user_tb WHERE user_email = ? and user_password = ? and role="admin"';
      connection.query(query_role, [user_email,user_password], (error, results_select) => {
        connection.release();
        res.send(utils.createResult(error, results_select)) 
      });
    });
  });

  app.post("/uploads",upload.single("image"),(req,res) => {
    console.log(req.body)
    res.send("uploaded")
  })
  

// Create a new user
app.post('/', (req, res) => {
  console.log("request")
  const { first_name, last_name, user_name, user_email, user_mobile, user_password } = req.body;
  console.log(req.body)
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err)
      res.send(utils.createResult(err, results))
      // res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }

    const query = 'INSERT INTO user_tb (first_name, last_name, user_name, user_email, user_mobile, user_password) VALUES (?, ?, ?, ?, ?, ?)';
    console.log(query)
    connection.query(query, [first_name, last_name, user_name, user_email, user_mobile, user_password], (error, results) => {
      console.log(results)
      connection.release();

      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to create a new user' });
        return;
      }

      res.send(utils.createResult(error, results))
      // res.json({ message: 'User created successfully', user_id: results.insertId });
    });
  });
});

// Update a user
app.put('/:id', (req, res) => {
  const user_id = req.params.id;
  const { first_name, last_name, user_name, user_email, user_mobile, user_password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      res.send(utils.createResult(error, results))
      // res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }

    const query = 'UPDATE user_tb SET first_name = ?, last_name = ?, user_name = ?, user_email = ?, user_mobile = ?, user_password = ? WHERE user_id = ?';
    connection.query(query, [first_name, last_name, user_name, user_email, user_mobile, user_password, user_id], (error, results) => {
      connection.release();

      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to update the user' });
        return;
      }
      res.send(utils.createResult(error, results))
      // res.json({ message: 'User updated successfully' });
    });
  });
});

// Delete a user
app.delete('/:id', (req, res) => {
  const user_id = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      res.send(utils.createResult(error, results))
      // res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }

    const query = 'DELETE FROM user_tb WHERE user_id = ?';
    connection.query(query, [user_id], (error, results) => {
      connection.release();

      if (error) {
        res.send(utils.createResult(error, results))
        // res.status(500).json({ error: 'Failed to delete the user' });
        return;
      }
      res.send(utils.createResult(error, results))
      // res.json({ message: 'User deleted successfully' });
    });
  });
});




module.exports = app
