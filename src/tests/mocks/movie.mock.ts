// ✅ Response after deleting a movie 🎬
export const responseDeleted = [
  '✅ Movie deleted:', // Success message
  {
    _id: '1',
    title: 'Movie 1',
    description: 'Description 1',
    director: 'Director 1',
    genre: 'Action',
    poster: 'poster1.jpg',
    rating: 8.5,
    stars: ['Actor 1', 'Actor 2'], // Cast
  },
];

// ✅ Response after updating a movie 🎞️
export const updatedMovie = [
  '✅ Movie updated:', // Success message
  {
    _id: '1',
    title: 'Movie 10',
    rating: 10,
    description: 'Description 10',
    director: 'Director 10',
    genre: 'Action',
    stars: ['Actor 10', 'Actor 20'],
    poster: 'poster2.jpg',
  },
];

// 🎬 Example of a movie object
export const movieExample = {
  _id: '1',
  title: 'Movie 1',
  description: 'Description 1',
  director: 'Director 1',
  genre: 'Action',
  poster: 'poster1.jpg',
  rating: 8.5,
  stars: ['Actor 1', 'Actor 2'],
};

// ✅ Successful response after creating a movie 🆕
export const responseCreateMovie = {
  data: {
    movie: {
      _id: '1',
      description: 'Description 1',
      director: 'Director 1',
      genre: 'Action',
      poster: 'poster1.jpg',
      rating: 8.5,
      stars: ['Actor 1', 'Actor 2'],
      title: 'Movie 1',
    },
  },
  message: 'Movie created with success! 🎉', // Success message
};

// ✅ Movie creation payload sent to the API 🛠️
export const creatingMovie = [
  '✅ Creating movie', // Action description
  {
    description: 'Description 1',
    director: 'Director 1',
    genre: 'Action',
    poster: 'poster1.jpg',
    rating: 8.5,
    stars: ['Actor 1', 'Actor 2'],
    title: 'Movie 1',
  },
];

// 🎥 Example of the response body when retrieving all movies
export const responseBody = {
  data: {
    movies: [
      {
        description: 'Description 1',
        director: 'Director 1',
        genre: 'Action',
        poster: 'poster1.jpg',
        rating: 8.5,
        stars: ['Actor 1', 'Actor 2'],
        title: 'Movie 1',
      },
    ],
  },
};

// 📡 Request information logs and messages 📊

export const requestCreatingMovie = '📡 Request: POST /api/v1/movies | Status: 201'; // Movie creation success
export const requestValidationError = '📡 Request: POST /api/v1/movies | Status: 400'; // Validation error

// ❌ Error messages related to movie creation and validation
export const responseMissingMovie =
  '❌ Missing movie fields: title, rating, description, director, genre, stars, poster'; // Required fields missing
export const responseCreateMovieError = '❌ Error creating movie'; // Internal error during creation

// ✅ Request and response logs for retrieving movies
export const responseAllMovies = '📡 Request: GET /api/v1/movies | Status: 200'; // Success fetching all movies
export const responseMovieNotFound = '📡 Request: GET /api/v1/movies | Status: 404'; // Movie not found
export const responseMovieError = '📡 Request: GET /api/v1/movies | Status: 500'; // Server error

// ✅ Response when fetching a movie by ID
export const responseMovieById = '✅ Getting movie by id'; // Fetch success
export const responseMovieByIdNotFound = '❌ Movie not found'; // ID not found
export const responseMovieByIdError = '❌ Error getting movie by id'; // Error during fetch

// ✅ Response messages for update and delete operations
export const responseUpdateMovie = '✅ Movie updated:'; // Update success
export const responseUpdateMovieError = '❌ Error updating movie by id'; // Update error

export const responseDeleteMovie = '✅ Movie deleted:'; // Delete success
export const responseDeleteMovieNotFound = '❌ Movie not found'; // Movie to delete not found
export const responseDeleteMovieError = '❌ Error deleting movie'; // Delete error

// ✅ Validation feedback
export const responseValidationSuccess = '✅ Validation success'; // Input valid
export const responseValidationFailure = '❌ Validation error'; // Input invalid
