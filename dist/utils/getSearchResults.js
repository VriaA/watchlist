/*FETCHES DATA FROM THE OMDB USING THE OMDB API BY PASSING IN THE FOLLOWING QUERIES;
A UNIQUE API KEY GOTTEN FROM THE OMDB API WEBSITE, THE MOVIE TITLE AND THE YEAR GOTTEN FROM THE DOM */
//SAVES THE SEARCH RESULTS TO LOCAL STORAGE

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhiOTQxM2EwYzk3NTE1YzUwNTkyZTRlY2Y5MjM0MSIsInN1YiI6IjY0ZDA1YTJhNGQ2NzkxMDBlMjQwZjE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xbqgGX1THEkUWs4NigowqE8P8tLn8hYScBzSfL5dYmI'
    }
  };

export default async function getSearchResults() {
    try {
      const searchInputEl = document.getElementById('search-input')
      const title = searchInputEl.value
      const filmTitle = title.trim().replace(/&/g, '%26')
  
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${filmTitle}&include_adult=false&language=en-US&page=1`, options)
      const data = await response.json()
      const searchResults = data.results.filter(result=> result.media_type != 'person')
      if(searchResults) {
          sessionStorage.setItem('results', JSON.stringify(searchResults))
      }
    } catch (error) {
      window.alert('Check internet connection and try again.')
    }
}