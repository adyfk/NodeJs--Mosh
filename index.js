const express = require('express')
const app = express()

// app.post()
// app.put()
// app.delete()
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/api', (req, res) => {
  res.send([1, 2, 3, 4, 5, 6, 8])
})

// app.listen(3000, () => console.log('Listening On board'))
app.listen(3000)
