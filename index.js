console.log('Before')
getUser(1, user => {
  getRepositories(user.gitHubUsername, repos => {
    console.log('Repo', repos)
  })
})
console.log('After')

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a User from DB')
    callback({ id: id, gitHubUsername: 'Adi' })
  }, 2000)
}
function getRepositories(Username, callback) {
  setTimeout(() => {
    console.log('Calling Github API...')
    callback(['repo1', 'repo2', 'repo2'])
  }, 2000)
}
