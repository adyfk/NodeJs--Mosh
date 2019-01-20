console.log('Before')
// getUser(1, user => {
//   getRepositories(user.gitHubUsername, repos => {
//     getCommits(repos[0], commits => {
//       console.log(commits)
//     })
//   })
// })

//Promise Based
// const p = getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log(commits))
//   .catch(err => console.log('Error', err))
// console.log('After')

//Async and await
async function displayCommits() {
  try {
    const user = await getUser(1)
    console.log('hai')
    const repo = await getRepositories(user.gitHubUsername)
    console.log('hai')
    const commits = await getCommits(repo[0])
    console.log('hai')
    console.log(commits)
  } catch (err) {
    console.log(err)
  }
}
displayCommits() //Async will be skip
console.log('after')

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...')
      resolve({ id: id, gitHubUsername: 'mosh' })
    }, 2000)
  })
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...')
      resolve(['repo1', 'repo2', 'repo3'])
    }, 2000)
  })
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...')
      resolve(['commit'])
    }, 2000)
  })
}
