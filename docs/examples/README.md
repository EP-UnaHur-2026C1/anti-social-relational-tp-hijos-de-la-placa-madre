# Ejemplos JSON por endpoint

Archivos de referencia para probar la API con herramientas como **curl**, **Postman** o **Thunder Client**.

**URL base:** `http://localhost:3000`

## Usuarios

| Método | Endpoint | Request | Response |
|--------|----------|---------|----------|
| GET | `/usuarios` | — | [get-usuarios.response.json](./usuarios/get-usuarios.response.json) |
| GET | `/usuario/:id` | — | [get-usuario-id.response.json](./usuarios/get-usuario-id.response.json) |
| GET | `/usuario/:id/posts` | — | [get-usuario-posts.response.json](./usuarios/get-usuario-posts.response.json) |
| POST | `/usuario` | [post-usuario.request.json](./usuarios/post-usuario.request.json) | [post-usuario.response.json](./usuarios/post-usuario.response.json) |
| PUT | `/usuario/:id` | [put-usuario.request.json](./usuarios/put-usuario.request.json) | [put-usuario.response.json](./usuarios/put-usuario.response.json) |
| DELETE | `/usuario/:id` | — | [delete-usuario.response.json](./usuarios/delete-usuario.response.json) |

## Posts

| Método | Endpoint | Request | Response |
|--------|----------|---------|----------|
| GET | `/posts` | — | [get-posts.response.json](./posts/get-posts.response.json) |
| GET | `/post/:postId` | — | [get-post-id.response.json](./posts/get-post-id.response.json) |
| POST | `/post` | [post-post.request.json](./posts/post-post.request.json) | [post-post.response.json](./posts/post-post.response.json) |
| PUT | `/posts/:id` | [put-post.request.json](./posts/put-post.request.json) | [put-post.response.json](./posts/put-post.response.json) |
| DELETE | `/posts/:id` | — | [delete-post.response.json](./posts/delete-post.response.json) |

## Imágenes

| Método | Endpoint | Request | Response |
|--------|----------|---------|----------|
| GET | `/post/:postId/images` | — | [get-images.response.json](./imagenes/get-images.response.json) |
| GET | `/post/:postId/images/:imageId` | — | [get-image-id.response.json](./imagenes/get-image-id.response.json) |
| POST | `/post/:postId/images` | [post-images.request.json](./imagenes/post-images.request.json) | [post-images.response.json](./imagenes/post-images.response.json) |
| PUT | `/post/:postId/images/:imageId` | [put-image.request.json](./imagenes/put-image.request.json) | [put-image.response.json](./imagenes/put-image.response.json) |
| DELETE | `/post/:postId/images/:imageId` | — | [delete-image.response.json](./imagenes/delete-image.response.json) |
| DELETE | `/post/:postId/images` | — | [delete-all-images.response.json](./imagenes/delete-all-images.response.json) |

## Tags

| Método | Endpoint | Request | Response |
|--------|----------|---------|----------|
| GET | `/tags` | — | [get-tags.response.json](./tags/get-tags.response.json) |
| GET | `/posts/:postId/tags` | — | [get-post-tags.response.json](./tags/get-post-tags.response.json) |
| POST | `/posts/:postId/tags` | [post-post-tag.request.json](./tags/post-post-tag.request.json) | [201](./tags/post-post-tag.response-201.json) / [200](./tags/post-post-tag.response-200.json) |
| DELETE | `/posts/:postId/tags/:tagName` | — | [delete-post-tag.response.json](./tags/delete-post-tag.response.json) |

## Comentarios

| Método | Endpoint | Request | Response |
|--------|----------|---------|----------|
| GET | `/v1/posts/:post_id/comments` | — | [get-comments.response.json](./comentarios/get-comments.response.json) |
| POST | `/v1/posts/:post_id/comments` | [post-comment.request.json](./comentarios/post-comment.request.json) | [post-comment.response.json](./comentarios/post-comment.response.json) |
| PUT | `/v1/posts/:post_id/comments/:comment_id` | [put-comment.request.json](./comentarios/put-comment.request.json) | [put-comment.response.json](./comentarios/put-comment.response.json) |
| DELETE | `/v1/posts/:post_id/comments/:comment_id` | — | [delete-comment.response.json](./comentarios/delete-comment.response.json) |

## Ejemplo con curl

```bash
# Crear un usuario
curl -X POST http://localhost:3000/usuario \
  -H "Content-Type: application/json" \
  -d @docs/examples/usuarios/post-usuario.request.json

# Listar posts
curl http://localhost:3000/posts

# Crear un comentario en el post 1
curl -X POST http://localhost:3000/v1/posts/1/comments \
  -H "Content-Type: application/json" \
  -d @docs/examples/comentarios/post-comment.request.json
```
