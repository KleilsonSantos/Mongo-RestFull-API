/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: 🔐 User login
 *     description: Allows users to log in using their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: ✅ Login successful
 *       400:
 *         description: ❌ Invalid email or password
 */

/**
 * @swagger
 * /api/v1/create:
 *   post:
 *     summary: 🆕 Create a new user
 *     description: Allows registration of a new user with a role (admin/user).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: ✅ User created successfully
 *       400:
 *         description: ❌ Error creating user
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: 👥 Get all users (Admin only)
 *     description: Returns a list of all registered users. Only accessible by admin users.
 *     responses:
 *       200:
 *         description: 📋 List of users
 *       403:
 *         description: ❌ Access denied, admin only
 *       404:
 *         description: ❌ No users found
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: 🔍 Get user by ID
 *     description: Fetches user details by their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ✅ User details retrieved
 *       404:
 *         description: ❌ User not found
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: ✏️ Update user details
 *     description: Modifies an existing user's details like email, password, or role.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: ✅ User updated successfully
 *       404:
 *         description: ❌ User not found
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: 🗑️ Delete a user
 *     description: Removes a user from the system by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ✅ User deleted successfully
 *       404:
 *         description: ❌ User not found
 */

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: 🎬 Get all movies
 *     description: Fetches a list of all available movies.
 *     responses:
 *       200:
 *         description: 🎞️ List of movies retrieved
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   get:
 *     summary: 🔍 Get movie by ID
 *     description: Fetches details of a specific movie using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ✅ Movie details retrieved
 *       404:
 *         description: ❌ Movie not found
 */

/**
 * @swagger
 * /api/v1/movies:
 *   post:
 *     summary: 🎬 Add a new movie
 *     description: Creates a new movie entry with details like title, description, director, etc.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               director:
 *                 type: string
 *               genre:
 *                 type: string
 *               rating:
 *                 type: number
 *                 format: float
 *               stars:
 *                 type: array
 *                 items:
 *                   type: string
 *               poster:
 *                 type: string
 *     responses:
 *       201:
 *         description: ✅ Movie added successfully
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   put:
 *     summary: ✏️ Update movie details
 *     description: Updates the details of an existing movie.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               director:
 *                 type: string
 *               genre:
 *                 type: string
 *               rating:
 *                 type: number
 *                 format: float
 *               stars:
 *                 type: array
 *                 items:
 *                   type: string
 *               poster:
 *                 type: string
 *     responses:
 *       200:
 *         description: ✅ Movie updated successfully
 *       404:
 *         description: ❌ Movie not found
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   delete:
 *     summary: 🗑️ Delete a movie
 *     description: Removes a movie entry from the database by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ✅ Movie deleted successfully
 *       404:
 *         description: ❌ Movie not found
 */
