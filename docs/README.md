========================================================================
            DETALLE DE DEPENDENCIAS DEL PROYECTO (package.json)
========================================================================

El proyecto utiliza un total de 11 librerías (8 de producción y 3 de 
desarrollo) instaladas mediante npm. A continuación se detalla el 
propósito técnico de cada una dentro de la arquitectura:

------------------------------------------------------------------------
1. DEPENDENCIAS DE PRODUCCIÓN 
------------------------------------------------------------------------

* express (v5.2.1)

* sequelize (v6.37.8)

* sqlite3 (v6.0.1)

* joi (v18.2.1)

* node-cache (v5.1.2)
  - Propósito: Gestión de caché interna. Permite guardar temporalmente en 
    la memoria RAM las respuestas pesadas (como la lista de posteos) para 
    evitar consultar a SQLite en peticiones sucesivas, acelerando el backend.
  
* dotenv (v17.4.2)
  - Propósito: Manejo de variables de entorno. Carga las configuraciones 
    sensibles (como puertos, modos de ejecución o rutas de archivos) desde 
    el archivo oculto '.env' hacia el objeto global 'process.env' de Node.js.

* multer (v2.1.1)
  - Propósito: Procesamiento de archivos (Multipart/form-data). Se utiliza 
    para interceptar, procesar y guardar la subida de imágenes o archivos 
    adjuntos enviados por el cliente al servidor.

* swagger-ui-express (v5.0.1) & yamljs (v0.3.0)
  - Propósito: Documentación interactiva de la API. Swagger expone visualmente 
    los endpoints del servidor en una interfaz web (/api-docs), parseando el 
    archivo de especificaciones técnicas que se escribe en formato YAML con 
    la ayuda de 'yamljs'.


------------------------------------------------------------------------
1. DEPENDENCIAS DE DESARROLLO (Solo herramientas de trabajo local)
------------------------------------------------------------------------

* nodemon (v3.1.14)

* sequelize-cli (v6.6.5)

========================================================================
# 📖 Documentación de la API
========================================================================

La documentación OpenAPI (Swagger), la especificación de los endpoints y los ejemplos JSON para pruebas se encuentran organizados en esta sección.

========================================================================
## 🛠️ Swagger (OpenAPI)
========================================================================

- **Archivo:** [`docs/swagger.yaml`](./docs/swagger.yaml)
- **Formato:** OpenAPI 3.0
- **Servidor base:** `http://localhost:8080`

Para visualizar la documentación de forma interactiva, podés importar el archivo YAML en cualquiera de estas herramientas online:
- [Swagger Editor](https://editor.swagger.io/) — Pegá o importá el contenido de `docs/swagger.yaml`.
- [Swagger UI](https://petstore.swagger.io/) — Usá "Explore" y cargá la URL del archivo si está hosteado, o importá el YAML de forma local.

========================================================================
## 📁 Ejemplos JSON para pruebas
========================================================================

En la carpeta [`docs/examples/`](./docs/examples/) se encuentra un archivo JSON por cada endpoint con ejemplos reales de *request* y/o *response*. Consultá el índice completo y detallado en [`docs/examples/README.md`](./docs/examples/README.md).

========================================================================
## ⚙️ Portabilidad y Configuración
========================================================================

### El archivo `.env.example`
En el desarrollo profesional, nunca se deben subir credenciales ni configuraciones críticas (como puertos o rutas de bases de datos) al repositorio. Para esto se utiliza un archivo `.env` local. 

Sin embargo, para garantizar la **portabilidad** del proyecto (que cualquier desarrollador pueda clonarlo y correrlo sin adivinar qué variables faltan), se proporciona el archivo **`.env.example`** como una plantilla pública con valores genéricos de referencia.

### Configuracion del entorno:
Creá tu archivo de configuración local duplicando la plantilla integrada. Bash: cp .env.example .env

### Variables requeridas en el proyecto:
* `PORT`: Puerto en el que correrá el servidor Express (ej: `8080`).
* `DB_STORAGE`: Ruta física para el archivo de persistencia de SQLite (ej: `./src/db/database.sqlite`).
* `DB_DIALECT`: Motor de base de datos utilizado (`sqlite`).
* `NODE_ENV`: Entorno de ejecución (`development` o `production`).

========================================================================
## ESTRATEGIA DE CACHÉ DE DATOS
========================================================================

Para optimizar los tiempos de respuesta del servidor y reducir el impacto
de lecturas repetitivas en la base de datos SQLite, la API implementa un
sistema de caché en memoria (vía 'node-cache') en los endpoints de alta
demanda.

------------------------------------------------------------------------
1. CONFIGURACIÓN GENERAL
------------------------------------------------------------------------

* Mecanismo: In-Memory Caching.
* Tiempo de Vida por Defecto (TTL): 120 segundos (2 minutos).
* Clave Global de Publicaciones: 'all_posts_key'

------------------------------------------------------------------------
2. TRAZABILIDAD EN CONSOLA (Logs del Servidor)
------------------------------------------------------------------------
Cada vez que ocurre una invalidación o una lectura exitosa, el servidor 
emite alertas en la terminal para auditoría del equipo de desarrollo:

* [Cache Hit]: Datos recuperados desde la memoria para la clave: all_posts_key
* [Cache Miss]: Consultando base de datos para la clave: all_posts_key
* [Cache Cleaned]: Se borró la caché de posts por nueva publicación (POST /post)
* [Cache Cleaned]: Se purgó la caché por modificación de recurso (PUT/DELETE)

========================================================================
## 🚀 Inicio Rápido
========================================================================
1. **Clonar el proyecto e instalar las dependencias:**
   ```bash
   npm install

2. **Levantá el servidor:**

   ```bash
   npm run db:reset:dev   # Opcional: Resetea la BD e inyecta usuarios y posts de prueba
   npm run dev            # Levanta la API en el puerto configurado (ej: 8080)
   ```

3. **Probá un endpoint con curl:**

   ```bash
   curl http://localhost:8080/usuarios
   ```

   ```bash
   curl -X POST http://localhost:8080/usuario \
     -H "Content-Type: application/json" \
     -d @docs/examples/usuarios/post-usuario.request.json
   ```

