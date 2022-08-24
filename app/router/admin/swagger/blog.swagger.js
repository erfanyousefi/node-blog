/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   header
 *                  -   description
 *                  -   author
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  header:
 *                      type: string
 *                      description: the header of blog
 *                  description:
 *                      type: string
 *                      description: the text of blog
 *                  author:
 *                      type: string
 *                      description: the author of blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  header:
 *                      type: string
 *                      description: the header of text of blog
 *                  description:
 *                      type: string
 *                      description: the text of blog
 *                  author:
 *                      type: string
 *                      description: the author of blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */ 


/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [ Blog(AdminPanel)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success - get array of blogs
 */
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [ Blog(AdminPanel)]
 *          summary: create Blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: created
 */
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [ Blog(AdminPanel)]
 *          summary: update  Blog document by id 
 *          consumes: 
 *              -   multipart/form-data
 *          parameters:
 *              -   in: path
 *                  required: true
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/BlogUpdate'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          summary: get blog by ID and populate this field 
 *          tags: [ Blog(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          summary: remove blog by ID 
 *          tags: [ Blog(AdminPanel) ]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
