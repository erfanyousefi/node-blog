/**
 * @swagger
 *  /blogs:
 *      get:
 *          tags: [ HomePage]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 */
/**
 * @swagger
 *  /blogs/{id}:
 *      get:
 *          summary: get blog by ID 
 *          tags: [ HomePage ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */