// 🧪 Mock function to simulate validation errors when multiple required fields are missing
export const mockValidationErrorMissingFields = () => ({
  isEmpty: () => false, // ❌ Indicates that there are validation errors
  array: () => [
    {
      location: 'body',
      msg: '🎬 Title is required',
      param: 'title',
    },
    {
      location: 'body',
      msg: '⭐ Rating is required',
      param: 'rating',
    },
    {
      location: 'body',
      msg: '📝 Description is required',
      param: 'description',
    },
    {
      location: 'body',
      msg: '🎬 Director is required',
      param: 'director',
    },
    {
      location: 'body',
      msg: '🎭 Genre is required',
      param: 'genre',
    },
    {
      location: 'body',
      msg: '🌟 Stars is required',
      param: 'stars',
    },
    {
      location: 'body',
      msg: '🖼️ Poster is required',
      param: 'poster',
    },
    {
      // 📢 Custom error summary message for logging or debugging
      message:
        '🚫 Missing required movie fields: title, rating, description, director, genre, stars, poster',
    },
  ],
});

// 🧪 Mock function to simulate validation error for a single required field (title)
export const mockValidationErrorMessage = () => ({
  isEmpty: () => false, // ❌ Indicates that there is a validation error
  array: () => [
    {
      location: 'body',
      msg: '🎬 Title is required',
      param: 'title',
    },
  ],
});

// ✅ Mock function to simulate successful validation with no errors
export const mockValidationSuccess = () => ({
  isEmpty: () => true, // ✅ No validation errors present
  array: () => [], // 🔍 Returns an empty array of errors
});
