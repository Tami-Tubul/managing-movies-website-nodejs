const axios = require("axios")

const getAllMovies = () => {
    return axios.get("https://api.tvmaze.com/shows")
}

module.exports = {getAllMovies}