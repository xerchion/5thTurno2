# 🚀 Guía de Despliegue - Calendario de Turnos

Esta guía te ayudará a desplegar la aplicación Calendario de Turnos en diferentes plataformas de hosting.

## 📋 Preparación Previa

### Verificación del Proyecto
```bash
# 1. Verificar estructura de archivos
ls -la
# Debe contener: index.html, styles.css, script.js

# 2. Verificar sintaxis JavaScript
node -c script.js

# 3. Validar HTML (opcional)
# Usar https://validator.w3.org/
```

### Archivos Requeridos
- `index.html` - Punto de entrada
- `styles.css` - Estilos de la aplicación
- `script.js` - Lógica de la aplicación
- `README.md` - Documentación (opcional para despliegue)

## 🌐 GitHub Pages

### Método 1: Desde el Repositorio
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` o `master`
5. Folder: `/ (root)`
6. Save

**URL resultante**: `https://xerchion.github.io/5thTurno2/`

### Método 2: GitHub CLI
```bash
# Instalar GitHub CLI si no lo tienes
gh auth login
gh repo create 5thTurno2 --public --push --source=.
gh api repos/xerchion/5thTurno2/pages -X POST -F source[branch]=main -F source[path]=/
```

### Configuración Personalizada
```bash
# .github/workflows/deploy.yml (opcional)
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## ⚡ Netlify

### Método 1: Drag & Drop
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto al área de deploy
3. ¡Listo! URL automática generada

### Método 2: Git Connection
1. Conecta tu repositorio GitHub
2. Build settings:
   - Build command: `# (vacío)`
   - Publish directory: `./`
3. Deploy

### Configuración Avanzada
```toml
# netlify.toml
[build]
  publish = "./"
  command = ""

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### Variables de Entorno (si necesarias)
```bash
# En Netlify Dashboard → Site Settings → Environment Variables
NODE_ENV=production
```

## 🔺 Vercel

### Método 1: CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde la carpeta del proyecto
vercel

# Seguir las instrucciones
# Project name: 5thturno2
# Directory: ./
# Override settings: No
```

### Método 2: Git Integration
1. Ve a [vercel.com](https://vercel.com)
2. Import Git Repository
3. Selecciona tu repo
4. Framework: `Other`
5. Build and Output Settings: Default
6. Deploy

### Configuración
```json
{
  "name": "calendario-turnos",
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## 🐳 Docker (Servidor Propio)

### Dockerfile
```dockerfile
FROM nginx:alpine

# Copiar archivos de la aplicación
COPY . /usr/share/nginx/html

# Configuración personalizada de nginx (opcional)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  calendario-turnos:
    build: .
    ports:
      - "8080:80"
    volumes:
      - .:/usr/share/nginx/html
    restart: unless-stopped
```

### Comandos Docker
```bash
# Construir imagen
docker build -t calendario-turnos .

# Ejecutar contenedor
docker run -d -p 8080:80 --name calendario calendario-turnos

# Con docker-compose
docker-compose up -d
```

## 🌐 Apache/Nginx (Servidor VPS)

### Apache (.htaccess)
```apache
# .htaccess
RewriteEngine On

# Habilitar compresión
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

### Nginx
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/calendario-turnos;
    index index.html;

    # Compresión
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache headers
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 📱 PWA (Progressive Web App)

### manifest.json
```json
{
  "name": "Calendario de Turnos",
  "short_name": "Turnos",
  "description": "Calendario de turnos rotativos",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4B0082",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker
```javascript
// sw.js
const CACHE_NAME = 'calendario-turnos-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## ⚡ Optimización para Producción

### Minificación
```bash
# CSS
npm install -g clean-css-cli
cleancss -o styles.min.css styles.css

# JavaScript
npm install -g terser
terser script.js -o script.min.js -c -m

# HTML
npm install -g html-minifier
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html
```

### Configuración de Caché
```html
<!-- En index.html -->
<meta http-equiv="Cache-Control" content="public, max-age=31536000">
<link rel="stylesheet" href="styles.css?v=1.0.0">
<script src="script.js?v=1.0.0"></script>
```

## 🔍 Verificación Post-Despliegue

### Checklist de Verificación
- [ ] La página carga correctamente
- [ ] Los estilos se aplican
- [ ] JavaScript funciona
- [ ] Navegación entre meses/años
- [ ] Responsive design en móvil
- [ ] No hay errores en consola
- [ ] Rendimiento aceptable (< 3s carga)

### Herramientas de Testing
```bash
# Lighthouse (Performance, SEO, Accessibility)
npm install -g lighthouse
lighthouse https://tu-sitio.com --output html

# Google PageSpeed
# Usar: https://pagespeed.web.dev/

# GTmetrix
# Usar: https://gtmetrix.com/
```

## 🚨 Solución de Problemas

### Errores Comunes

**1. Archivos no cargan**
- Verificar rutas relativas
- Comprobar mayúsculas/minúsculas
- Revisar permisos de archivos

**2. JavaScript no funciona**
- Verificar consola del navegador
- Comprobar sintaxis con `node -c script.js`
- Validar referencias a elementos DOM

**3. CSS no se aplica**
- Verificar sintaxis CSS
- Comprobar especificidad de selectores
- Revisar media queries

### Logs de Depuración
```bash
# Netlify
netlify logs

# Vercel
vercel logs [deployment-url]

# Docker
docker logs calendario

# Nginx
sudo tail -f /var/log/nginx/error.log
```

## 📈 Monitoreo

### Analytics (Opcional)
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring
- UptimeRobot
- Pingdom
- StatusCake

---

## 🎯 URLs de Ejemplo

Una vez desplegado, tu aplicación estará disponible en URLs como:

- **GitHub Pages**: `https://xerchion.github.io/5thTurno2/`
- **Netlify**: `https://amazing-calendar-123456.netlify.app/`
- **Vercel**: `https://5thturno2.vercel.app/`
- **Dominio propio**: `https://calendario-turnos.com/`

¡Tu aplicación de Calendario de Turnos está lista para producción! 🎉
