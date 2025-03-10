/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Realiza o login do usuário
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
 *         description: Login bem-sucedido
 *       400:
 *         description: Email ou senha inválidos
 */

/**
 * @swagger
 * /api/v1/create:
 *   post:
 *     summary: Cria um novo usuário
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
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na criação do usuário
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Retorna todos os usuários (somente admin pode acessar)
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       403:
 *         description: Acesso negado, apenas administradores
 *       404:
 *         description: Nenhum usuário encontrado
 */

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Retorna todos os filmes
 *     responses:
 *       200:
 *         description: Lista de filmes
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   get:
 *     summary: Retorna um filme específico por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do filme
 *       404:
 *         description: Filme não encontrado
 */

/**
 * @swagger
 * /api/v1/movies:
 *   post:
 *     summary: Cria um novo filme
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
 *                 type: integer
 *               poster:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   put:
 *     summary: Atualiza um filme existente
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
 *                 type: integer
 *               poster:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *       404:
 *         description: Filme não encontrado
 */

/**
 * @swagger
 * /api/v1/movies/{id}:
 *   delete:
 *     summary: Exclui um filme pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme deletado com sucesso
 *       404:
 *         description: Filme não encontrado
 */
