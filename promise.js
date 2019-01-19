const p = new Promise((resolve, reject) => {
  //Kick off some async work
  //  resolve(1) //valuee to p
  //reject(new Error('Message'))
  setTimeout(() => {
    //resolve(1)    //pending => resolved,fullfilled
    reject(new Error('Error')) //pending => Reject
  }, 2000)
})
p.then(result => console.log('Result ' + result)).catch(err =>
  console.log(err.message)
)
