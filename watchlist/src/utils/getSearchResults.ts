export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjhiOTQxM2EwYzk3NTE1YzUwNTkyZTRlY2Y5MjM0MSIsInN1YiI6IjY0ZDA1YTJhNGQ2NzkxMDBlMjQwZjE2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xbqgGX1THEkUWs4NigowqE8P8tLn8hYScBzSfL5dYmI'
    }
  };

export default async function getSearchResults() {
    try {
      const searchInputEl = document.getElementById('search-input') as HTMLInputElement
      const title = searchInputEl.value
      const filmTitle = title.trim().replace(/&/g, '%26')
  
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${filmTitle}&include_adult=false&language=en-US&page=1`, options)
      const data = await response.json()
      const searchResults = data.results.filter(result=> result.media_type != 'person')
      return searchResults
    } catch (error) {
      window.alert('Error getting results.\nCheck internet connection and try again.')
    }
}