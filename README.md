# Héroes de Dota 2 - API y Frontend

Este proyecto es una **REST API** consumida en un frontend hecho con **JavaScript Vanilla**, que muestra una lista de héroes de **Dota 2** con su información.

## 🚀 Tecnologías utilizadas

### Backend:
- **Node.js** con **Express** (Alojado en Render)
- **MySQL** (Alojado en Clever Cloud)
- **mysql2** para la conexión con la base de datos

### Frontend:
- **JavaScript Vanilla** (sin frameworks)
- **HTML y CSS**
- Alojado en la carpeta `public` del servidor Node.js

## 📦 Instalación y ejecución

### 1️⃣ Clonar el repositorio

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto con los siguientes valores:

```env
DB_HOST=tu_host_de_mysql
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
PORT=3000
```
### 4️⃣ Iniciar el servidor

npm start
El servidor correrá en http://localhost:3000/.

## 📡 Endpoints de la API


Método	Endpoint	Descripción
| Método | Endpoint        | Descripción |
|--------|----------------|-------------|
| GET    | `/`            | Obtiene la lista de todos los héroes |
| GET    | `/heroe`       | Obtiene un héroe filtrando por ciertos parámetros |
| GET    | `/lista`       | Obtiene solo los nombres de los héroes |
| GET    | `/:id`         | Obtiene la información de un héroe específico |


## 🎨 Capturas de pantalla  

<div align="center">
  <img src="https://github.com/user-attachments/assets/49c8c56d-5923-462f-a2ba-3fe60bade618" width="45%" />
  <img src="https://github.com/user-attachments/assets/902d16a3-4d8a-46a2-9b13-04d756d720df" width="45%" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/7b99e767-cda8-440b-b234-de66cc76df8f" width="45%" />
  <img src="https://github.com/user-attachments/assets/b329bb15-f7cd-409a-b73a-0e0bb0c000f4" width="45%" />
</div>

## 🌍 Demo en producción

🔗 [Render](https://dota-api-zen.onrender.com/)

## 🛠️ Autor
Jesús Sebastián Huamanculi Casavilca - GitHub
