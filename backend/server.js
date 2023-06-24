const express = require('express')
const path = require('path')
const port = process.env.PORT || 3111
const app = express()

// Routes
app.get('/hello', (req, res) => {
    res.json({message: 'Hello World from the Backend'})
})

// Allows req.body to be used
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`Server started on port ${port}`))