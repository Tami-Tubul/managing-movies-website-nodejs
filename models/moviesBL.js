const fileMoviesDal = require("../DALs/fileMoviesDAL")
const wsMoviesDal = require("../DALs/wsMoviesDAL")

const saveNewMovie = async (newMovie) => {

    let data = await fileMoviesDal.getNewMovies()
    let movies = data.newMovies;

    //if newMoovies.json file is empty
    if (movies.length == 0) {

        let resp = await wsMoviesDal.getAllMovies()
        let allMovies = resp.data;

        let lastMovie = allMovies.reduce((x, y) => {
            if (y.id > x.id) {
                x = y
            }
            return x;
        })
        newMovie.id = parseInt(lastMovie.id) + 1;


    }

    else {
        let lastNewMovieID = movies[movies.length - 1].id + 1;
        newMovie.id = lastNewMovieID;
    }


    movies.push(newMovie)
    let updatedMovies = { "newMovies": movies }

    let status = await fileMoviesDal.saveMovie(updatedMovies)
    return status;
}


const searchMovies = async (obj) => {

    let respWs = await wsMoviesDal.getAllMovies()
    let Movies = respWs.data;

    let resFile = await fileMoviesDal.getNewMovies()
    let newMovies = resFile.newMovies;

    // איחוד כל הסרטים למערך אחד
    let allMovies = Movies.concat(newMovies)

    //פילטור לפי תוצאות החיפוש
    let filteredMovies = allMovies.filter(x => (obj.name == "" ? x.name : x.name == obj.name) && (obj.language == "" ? x.language : x.language == obj.language) && (obj.genres == "" ? x.genres : x.genres.find(y => y == obj.genres)))

    //בניית מערך המורכב מכל הסרטים העונים על החיפוש ולכל סרט מערך של סרטים מאותו זאנר
    let resultMovies = filteredMovies.map(mov => {
        let sameGen = allMovies.filter(x => x.genres.find(y => y == (mov.genres.find(z => z)) && x != mov)) // כל הסרטים מאותו זאנר של אותו סרט ולא כולל הסרט עצמו
        mov.sameGenre = sameGen;

        return mov;
    })



    return resultMovies;

}


const getMovieById = async (id) => {

    let respWs = await wsMoviesDal.getAllMovies()
    let Movies = respWs.data;

    let resFile = await fileMoviesDal.getNewMovies()
    let newMovies = resFile.newMovies;

    // איחוד כל הסרטים למערך אחד
    let allMovies = Movies.concat(newMovies)

    let movie = allMovies.find(mov => mov.id == id)

    return movie;
}


module.exports = { saveNewMovie, searchMovies, getMovieById }