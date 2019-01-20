const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async Operator 1...')
    resolve(1)
  })
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async Operator 1...')
    resolve(2)
  })
})

Promise.all([p1, p2]).then(result => console.log(result)) //retunr array , if 1 reject all will be lose
Promise.race([p1, p2]).then(result => console.log(result)) //return firstfullfill
