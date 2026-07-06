# Feedback del Trabajo Práctico

## Integrantes

Integrantes identificados a partir de los commits del repositorio:

- **Franco** (`Franco2912`)
- **Nicolás Diorio**
- **Nicolás** (`Nicolas389`)
- **Joel** (`joelalan13`)
- **Luca Nehuén** (`lucanehuen`)

> Se observa trabajo repartido entre los integrantes del equipo. 👏

---

## Resumen General

¡Excelente trabajo! 🎉 Es una de las entregas más completas y cuidadas del conjunto. Cumple el MVP de `ENUNCIADO.md`, está muy bien organizada (controllers / services / middlewares / routers / schemas / models) y suma **dos bonus muy bien resueltos**: la **caché en memoria** (con invalidación exhaustiva en cada cambio) y el **upload de imágenes** (descarga, reemplazo y borrado de archivos). También resolvieron seguidores y prepararon una documentación excepcional (Swagger + ejemplos request/response por endpoint + seeders).

Hay **un** punto importante a corregir: la regla de los comentarios antiguos quedó modelada pero no se aplica (y con un umbral fijo de 60 días). Es un ajuste acotado sobre un trabajo que, en todo lo demás, está muy por encima del promedio.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas + capa de servicios (caché, imágenes). |
| Modelado        |   ✅   | Relaciones completas, `nickName` único, followers, `onDelete: CASCADE`. |
| Validaciones    |   ✅   | Joi genérico + chequeo de existencia de FKs en comentarios. |
| Middlewares     |   ✅   | `validateExistsModel(Modelo, param)` genérico y reutilizable. |
| API REST        |   ✅   | CRUD + relaciones (imágenes, tags) + endpoints muy completos. |
| Configuración   |   ⚠️   | Puerto y motor por `.env`; la regla de meses está fija (Obs. 1). |
| Documentación   |   ✅   | Swagger, ejemplos por endpoint, seeders, `.env.example`. |

---

## Fortalezas

### 1. Caché en memoria muy bien implementada 🚀
**Ubicación:** `src/services/cache.service.js`, `src/controllers/post.controllers.js`, `src/controllers/comment.controller.js`

Es la implementación de caché más completa que vimos: encapsulan `node-cache` en un servicio, exponen cabeceras `X-Cache: HIT/MISS`, y —lo más importante— **invalidan la caché en cada operación** que cambia los datos (crear/editar/borrar posts, imágenes, tags y comentarios borran las claves correspondientes). Eso evita el problema clásico de servir datos viejos. 👏

### 2. Gestión de imágenes completa 📷
**Ubicación:** `src/controllers/post.controllers.js`, `src/services/postimages.services.js`

Implementaron descarga de imágenes a partir de URL, reemplazo (borrando el archivo viejo), borrado individual y borrado masivo, todo sirviéndolas como estáticas. Además, `actualizarFechaPost_` actualiza el `updatedAt` del post cuando cambian sus imágenes/tags/comentarios: un detalle muy fino para reflejar que el post fue modificado.

### 3. Modelado robusto con borrado en cascada 🗃️
**Ubicación:** `src/db/models/`

- `nickName` definido como **único**.
- Relaciones completas: 1:M (User→Post, User→Comment, Post→PostImage, Post→Comment), N:M (Post↔Tag) y la reflexiva de **seguidores** (`Follows`), todas con `onDelete: CASCADE` para mantener la integridad al borrar.
- En `unlinkTag` incluso eliminan los tags “huérfanos” (los que ya no están en ningún post). Muy buen criterio.

### 4. Middlewares genéricos y validación de integridad ♻️🛡️
**Ubicación:** `src/middlewares/genericMiddleware.js`, `src/controllers/comment.controller.js`

`validateExistsModel(Modelo, paramName)` valida formato + existencia para cualquier modelo y deja la instancia en `req.modelo`. Y al crear un comentario verifican que el usuario exista antes (integridad referencial). 

### 5. Documentación sobresaliente 📚
**Ubicación:** `docs/swagger.yaml`, `docs/examples/`, `src/db/seeders/`, `.env.example`

Además de Swagger, armaron ejemplos de request/response en JSON para **cada** endpoint (posts, comentarios, imágenes, tags, followers), seeders para datos de prueba y un `.env.example` que contempla el paso a PostgreSQL. Es un nivel de documentación muy superior a lo pedido. 🌟

---

## Observaciones

### 1. La regla de los comentarios antiguos no se aplica (y el umbral está fijo en 60 días)

**Estado:** ❌  **Severidad:** 🔴 Crítico
**Ubicación:** `src/db/models/comment.js` (`visible`), `src/controllers/post.controllers.js` y `src/controllers/comment.controller.js`

**Descripción:**
El enunciado pide que los comentarios más antiguos que X meses (configurable por entorno, ej. 6) **no se muestren** en la visualización de los posts. El modelo tiene un atributo virtual `visible`, pero hay dos problemas:

1. **No se usa en ningún lado.** Buscando en todo `src`, `visible` solo aparece en su definición; ni `getAllPosts`, ni `getPostById`, ni `getCommentsByPost` filtran por él. Los comentarios se devuelven todos.
2. **El umbral está fijo en 60 días** dentro del getter (`const diasDisponibles = 60`), que no son 6 meses ni sale de una variable de entorno.

```js
// comment.js
const diasDisponibles = 60 // <- fijo, ~2 meses, no configurable
// ...nunca se filtra por `visible` al traer comentarios
```

**Impacto:**
La regla de negocio central del trabajo hoy no tiene efecto: un comentario viejo se sigue mostrando. Es lo único de fondo que falta en una entrega que, por lo demás, está muy completa.

**Recomendación:**
Leer los meses del entorno y filtrar por fecha al traer los comentarios (como el atributo es virtual, conviene filtrar en la consulta). Por ejemplo, en los `include` de los posts y en `getCommentsByPost`:

```js
const meses = Number(process.env.MESES ?? 6);
const limite = new Date();
limite.setMonth(limite.getMonth() - meses);
// where: { idPost: post_id, createdAt: { [Op.gte]: limite } }
```

Y usar ese mismo valor (`process.env.MESES`) en el getter de `visible`, para que modelo y consulta queden alineados.

---

### 2. Detalles menores (para una próxima pasada)

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada

- Hay dos middlewares de existencia muy parecidos: `validateExistsModel` (el que realmente usan en los routers) y `validarById` (que no aparece referenciado). Conviene dejar uno solo para evitar confusión.
- Las rutas mezclan singular y plural (`/post/:id` vs `/posts/:postId/tags`). Unificar el criterio (por ejemplo, siempre `/posts`) mejora la prolijidad y previsibilidad de la API.

---

## Conclusión

Es una entrega de muy alto nivel: arquitectura con capa de servicios, caché ejemplar, gestión de imágenes completa, modelado con borrado en cascada y una documentación excepcional. Se nota muchísimo trabajo y atención al detalle. 🌟

El único punto de fondo es **conectar la regla de los comentarios** (filtrar por fecha en la lectura y leer los meses del entorno); ya tienen casi todo lo necesario. Con ese cambio, el TP queda redondo. ¡Felicitaciones por el trabajo del equipo! 🚀
