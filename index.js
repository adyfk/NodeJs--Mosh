console.log('Before')
getUser(1, getRepositories)
console.log('After')

function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits)
}
function getCommits(repos) {
  getCommits(repo, displayCommits)
}
function displayRepositories(commits) {
  console.log(commits)
}

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
function getCommits(repos, callback) {
  setTimeout(() => {
    console.log('Calling Github API...')
    callback(['1', '2', '2'])
  }, 2000)
}
