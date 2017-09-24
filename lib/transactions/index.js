const Table = require('cli-table')
const fetch = require('node-fetch')
const Preferences = require('preferences')

const table = new Table({
  head: ['Description', 'Category', 'Amount', 'Created at', 'Paid'],
})

const {
  API_ENDPOINT,
  CLI_PREFERENCES_FILE,
} = require('../config')

function getUserPreferences () {
  return new Preferences(CLI_PREFERENCES_FILE)
}

function getUserAccessToken () {
  return new Promise((resolve, reject) => {
    const preferences = getUserPreferences()

    if (!preferences.credentials || !preferences.credentials.accessToken) {
      reject(new Error("You're not authenticated yet, please login by typing 'organizze login'."))
    }

    resolve(preferences.credentials.accessToken)
  })
}

function fetchTransactionsFromOrganizze (accessToken) {
  return fetch(`${API_ENDPOINT}/transactions`, {
    method: 'GET',
    headers: { Authorization: accessToken },
  })
}

function checkForInvalidCredentials (response) {
  if (response.status === 500 || response.status === 401) {
    throw new Error("Invalid credentials, please login by typing 'organizze login'.")
  }

  return response.json()
}

function logErrors ({ message }) {
  console.log(message)
}

function transactions () {
  return getUserAccessToken()
    .then(fetchTransactionsFromOrganizze)
    .then(checkForInvalidCredentials)
    .then((transactions) => {
      // transactions.map(({ description, category_id, amount_cents, created_at, paid }) => {
      //   table.push([
      //     [description, category_id, amount_cents, created_at, paid],
      //   ])
      // })

      console.log(table.toString())
    })
    .catch(logErrors)
}

module.exports = transactions
