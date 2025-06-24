# 🧩 PokeAPI-PokeGrid

Este proyecto fue desarrollado como una demostración técnica de mis habilidades en desarrollo frontend utilizando **React** y **TypeScript**, junto con un stack moderno y minimalista. El objetivo fue consumir la [PokeAPI](https://pokeapi.co/) y construir una aplicación web que permita explorar Pokémon, ver detalles y administrar favoritos, cuidando tanto el diseño como la experiencia de usuario.

## 🚀 Tecnologías Utilizadas

- **React + TypeScript** para la construcción de componentes robustos y tipados.
- **React Router** para el manejo de rutas SPA.
- **TailwindCSS** para un diseño moderno y responsive.
- **React Toastify** para notificaciones visuales.
- **Vite** como herramienta de build y entorno de desarrollo.
- **Jest + React Testing Library** para pruebas unitarias.

Me enfoqué en mantener el proyecto lo más minimalista posible, priorizando el uso nativo de React antes que incorporar múltiples librerías externas, para demostrar mis habilidades sin depender de soluciones preempaquetadas.

## ✨ Funcionalidades

- 🔍 **Listado de Pokémon** con paginación.
- 🧭 **Buscador** por nombre o ID.
- 📄 **Detalle de Pokémon** individual con información completa.
- ⭐ **Favoritos** persistentes usando `localStorage`, gestionados con React Context.
- 💬 **Feedback visual** con alertas y manejo de errores.
- 📱 **Diseño responsive**, adaptable a cualquier dispositivo.
- 🧪 **Pruebas unitarias** que validan el comportamiento de los componentes.

## 📁 Estructura del Proyecto

```
src/
├── api/         # Lógica de consumo de la API
├── components/  # Componentes reutilizables
├── contexts/    # Contextos globales con React Context
├── pages/       # Vistas principales
├── types/       # Tipos de datos en TypeScript
├── utils/       # Funciones auxiliares
tests/           # Pruebas unitarias
public/          # Recursos estáticos
```

## ⚙️ Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Benjamin-Urzua-Mar/pinflag-pokeapi.git
   cd pinflag-pokeapi
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Levanta el entorno de desarrollo:
   ```bash
   npm run dev
   ```

4. Accede en tu navegador a: [http://localhost:5173](http://localhost:5173)

## 🔧 Scripts Útiles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm test`: Ejecuta los tests unitarios.

## 🔐 Variables de Entorno

El proyecto utiliza variables de entorno para gestionar las URLs de la API, definidas en un archivo `.env`. En el entorno de desarrollo, estas se acceden mediante `import.meta.env` (gracias a Vite).
