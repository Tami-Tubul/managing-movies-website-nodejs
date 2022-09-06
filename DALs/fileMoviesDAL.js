const jFile = require("jsonfile")


const getNewMovies = () => {

    return new Promise((resolve, reject) => {

        jFile.readFile(__dirname + "/../Data/newMovies.json", function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}


const saveMovie = (newMovie) => {

    return new Promise((resolve, reject) => {

        jFile.writeFile(__dirname + "/../Data/newMovies.json", newMovie, function (err) {

            if (err) {
                reject(err)
            }

            else {
                resolve("Created!")
            }
        })
    })

}


module.exports = { getNewMovies, saveMovie }