# Documentación de la API

La documentación OpenAPI (Swagger) y los ejemplos JSON para pruebas se encuentran en esta carpeta (`docs/`).

## Swagger (OpenAPI)

- **Archivo:** [`docs/swagger.yaml`](./docs/swagger.yaml)
- **Formato:** OpenAPI 3.0
- **Servidor base:** `http://localhost:3000`

Para visualizar la documentación de forma interactiva, podés importar el archivo YAML en cualquiera de estas herramientas online:

- [Swagger Editor](https://editor.swagger.io/) — pegá o importá el contenido de `docs/swagger.yaml`
- [Swagger UI](https://petstore.swagger.io/) — usá "Explore" y cargá la URL del archivo si está hosteado, o importá el YAML

## Ejemplos JSON para pruebas

En [`docs/examples/`](./docs/examples/) hay un archivo JSON por cada endpoint con ejemplos de request y/o response. Consultá el índice completo en [`docs/examples/README.md`](./docs/examples/README.md).

### Inicio rápido

1. Levantá el servidor:

   ```bash
   npm run db:reset:dev   # opcional: resetea BD con datos de prueba
   npm run dev
   ```

2. Probá un endpoint con curl:

   ```bash
   curl http://localhost:3000/usuarios
   ```

   ```bash
   curl -X POST http://localhost:3000/usuario \
     -H "Content-Type: application/json" \
     -d @docs/examples/usuarios/post-usuario.request.json
   ```

### Endpoints documentados (25)

| Recurso | Rutas |
|---------|-------|
| Usuarios | `GET/POST /usuario`, `GET/PUT/DELETE /usuario/:id`, `GET /usuario/:id/posts`, `GET /usuarios` |
| Posts | `GET /posts`, `GET /post/:postId`, `POST /post`, `PUT/DELETE /posts/:id` |
| Imágenes | CRUD en `/post/:postId/images` |
| Tags | `GET /tags`, CRUD en `/posts/:postId/tags` |
| Comentarios | CRUD en `/v1/posts/:post_id/comments` |