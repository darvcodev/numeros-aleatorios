# Números Aleatorios

Un proyecto de rifa aleatoria donde los usuarios pueden cargar un archivo CSV con números y ubicaciones, luego jugar para seleccionar un ganador al azar.

## 🛠️ Tecnologías Utilizadas

- ⚛️ **React** + **Vite** - Para un desarrollo rápido y eficiente.
- ⌨️ **TypeScript** - Tipado seguro y mantenible.
- 🎨 **Tailwind CSS** - Estilos modernos y responsivos.
- 📦 **PNPM** - Gestión eficiente de paquetes.
- 🏗️ **Framer Motion** - Animaciones fluidas.
- 🎊 **Confetti** - Celebración visual del ganador.
- 📂 **PapaParse** - Procesamiento de archivos CSV.

## 🚀 Instalación y Uso

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/tu-usuario/numeros-aleatorios.git
cd numeros-aleatorios
```

### 2️⃣ Instalar dependencias

```sh
pnpm install
```

### 3️⃣ Ejecutar el servidor de desarrollo

```sh
pnpm dev
```

El proyecto estará disponible en `http://localhost:5173/`.

## 📌 Características

✅ **Carga de archivo CSV** con números y ubicaciones.
✅ **Animación de premio** con Framer Motion.
✅ **Interfaz moderna** con Tailwind CSS.
✅ **Selección aleatoria de ganador**.
✅ **Confeti al ganar** 🎊.
✅ **Botón para reiniciar la rifa**.

## 📂 Estructura del Proyecto

```
/src
 ├── components
 │   ├── Uploader.tsx       # Carga de archivos CSV
 │   ├── Shuffler.tsx       # Animación del premio
 │   ├── WinnerDisplay.tsx  # Muestra al ganador
 ├── App.tsx                # Lógica principal
 ├── main.tsx               # Punto de entrada
 ├── index.css              # Estilos globales
```

## 🎯 Cómo Jugar

1️⃣ **Cargar un archivo CSV** con números y ubicaciones.
2️⃣ **Presionar "Jugar"** para avanzar a la pantalla de premio.
3️⃣ **Presionar "Elegir Ganador"** para iniciar la animación.
4️⃣ **Ver el ganador en pantalla** y celebrar con confeti 🎉.
5️⃣ **Presionar "Nuevo Intento"** para jugar nuevamente.

## 📜 Licencia

Este proyecto está bajo la licencia MIT.

---

🚀 **Desarrollado con pasión y código limpio. ¡Diviértete jugando!** 🎲
