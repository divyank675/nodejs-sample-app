const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("<h1>'it Works, Sample app is ready to serve traffic!'</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
