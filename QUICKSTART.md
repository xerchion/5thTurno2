# 🚀 Inicio Rápido - Calendario de Turnos

¡Pon en funcionamiento tu aplicación de calendario de turnos en menos de 5 minutos!

## ⚡ Opción 1: Usar directamente

### 📦 Descarga
```bash
# Clonar repositorio
git clone https://github.com/xerchion/5thTurno2.git
cd 5thTurno2

# O descargar ZIP desde GitHub
```

### 🌐 Abrir en navegador
```bash
# Simplemente abre index.html en tu navegador
# Doble clic en el archivo o arrastrar al navegador
```

¡Listo! La aplicación funciona directamente sin servidor.

## ⚡ Opción 2: Servidor local

### Con Python
```bash
cd 5thTurno2
python -m http.server 8000
# Abrir http://localhost:8000
```

### Con Node.js
```bash
cd 5thTurno2
npx http-server -p 8000
# Abrir http://localhost:8000
```

### Con VS Code
```bash
# Instalar extensión "Live Server"
# Clic derecho en index.html → "Open with Live Server"
```

## 📱 Uso básico

### 1. Primera configuración
1. Abre la aplicación
2. Clic en "SELECCIONAR AÑO Y TURNO"
3. Elige año y turno (A, B, C, D, E)
4. Clic "Mostrar Calendario"

### 2. Navegación
- **◄ ►** junto al año: Cambiar año
- **◄ ►** junto al mes: Cambiar mes
- **A B C D E**: Cambiar turno

### 3. Interpretación de colores
- 🟢 **Verde**: Mañana (06:00-14:00)
- 🔵 **Azul**: Tarde (14:00-22:00)
- 🟣 **Morado**: Noche (22:00-06:00)
- ⚪ **Gris claro**: Libre

## 🚀 Despliegue rápido

### GitHub Pages (Gratis)
1. Sube tu código a GitHub
2. Settings → Pages
3. Source: Deploy from branch → main
4. ¡Listo! URL: `tu-usuario.github.io/5thTurno2`

### Netlify (Gratis)
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. ¡Desplegado automáticamente!

### Vercel (Gratis)
1. Ve a [vercel.com](https://vercel.com)
2. Import Git Repository
3. Conecta tu repo de GitHub
4. ¡Deploy automático!

## 🛠️ Personalización rápida

### Cambiar colores de turnos
Edita `styles.css`:
```css
.turno-M { background-color: #TU_COLOR; } /* Mañana */
.turno-T { background-color: #TU_COLOR; } /* Tarde */
.turno-N { background-color: #TU_COLOR; } /* Noche */
```

### Modificar patrones de turno
Edita `script.js` en la clase `ValoresTurnos`:
```javascript
this.turnoA = ["M","M","M","T","T","T","N","N","N","L","L","L","L","L","L"];
// Modifica según tus necesidades
```

## 🔧 Comandos útiles

```bash
# Validar JavaScript
node -c script.js

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar todos los tests
npm test
```

## 📚 Más información

- **Documentación completa**: [README.md](./README.md)
- **Guía de despliegue**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API técnica**: [docs/API.md](./docs/API.md)
- **Contribuir**: [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)

## ❓ ¿Problemas?

### La aplicación no carga
- ✅ Verifica que todos los archivos estén en la misma carpeta
- ✅ Abre la consola del navegador (F12) para ver errores

### Los colores no se ven
- ✅ Verifica que `styles.css` esté en la carpeta
- ✅ Refresca la página (Ctrl+F5)

### JavaScript no funciona
- ✅ Verifica que `script.js` esté en la carpeta
- ✅ Comprueba la consola para errores

### Más ayuda
- 🐛 [Reportar bug](https://github.com/xerchion/5thTurno2/issues)
- 💬 [Hacer pregunta](https://github.com/xerchion/5thTurno2/discussions)

---

¡En solo unos minutos tendrás tu calendario de turnos funcionando! 🎉
