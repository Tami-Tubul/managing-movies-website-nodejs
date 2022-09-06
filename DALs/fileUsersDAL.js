const jFile = require("jsonfile")

const getUsers = () => {

    return new Promise((resolve, reject) => {

        jFile.readFile(__dirname + "/../Data/users.json", function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const saveUsers = (users) => {
    return new Promise((resolve, reject) => {
        jFile.writeFile(__dirname + "/../Data/users.json", users, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve("Done!")
            }
        })
    })
}

module.exports = { getUsers, saveUsers }