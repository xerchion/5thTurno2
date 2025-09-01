# 🤝 Guía de Contribución - Calendario de Turnos

¡Gracias por tu interés en contribuir al proyecto Calendario de Turnos! Esta guía te ayudará a participar de manera efectiva.

## 📋 Índice

- [Código de Conducta](#-código-de-conducta)
- [¿Cómo contribuir?](#-cómo-contribuir)
- [Configuración del entorno](#-configuración-del-entorno)
- [Proceso de desarrollo](#-proceso-de-desarrollo)
- [Estándares de código](#-estándares-de-código)
- [Proceso de Pull Request](#-proceso-de-pull-request)
- [Reportar issues](#-reportar-issues)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta para crear un ambiente acogedor y respetuoso:

- **Sé respetuoso**: Trata a todos con respeto y cortesía
- **Sé constructivo**: Proporciona feedback útil y constructivo
- **Sé paciente**: No todos tienen el mismo nivel de experiencia
- **Sé inclusivo**: Acepta diferentes puntos de vista y experiencias

## 🚀 ¿Cómo contribuir?

### Tipos de contribuciones bienvenidas:

#### 🐛 Reportar bugs
- Problemas de visualización
- Errores de cálculo en turnos
- Issues de responsive design
- Problemas de compatibilidad

#### ✨ Nuevas características
- Mejoras en la interfaz
- Nuevos patrones de turnos
- Funcionalidades adicionales
- Optimizaciones de rendimiento

#### 📖 Documentación
- Mejorar README
- Documentar funciones
- Traducir documentación
- Tutoriales y guías

#### 🎨 Diseño y UX
- Mejoras visuales
- Accesibilidad
- Themes alternativos
- Iconografía

## ⚙️ Configuración del Entorno

### Requisitos previos
```bash
# Git
git --version

# Navegador moderno
# Chrome 90+, Firefox 88+, Safari 14+

# Editor de código (recomendado)
# VS Code, WebStorm, Sublime Text
```

### Configuración inicial
```bash
# 1. Fork del repositorio en GitHub
# Click en "Fork" en https://github.com/xerchion/5thTurno2

# 2. Clonar tu fork
git clone https://github.com/TU_USUARIO/5thTurno2.git
cd 5thTurno2

# 3. Agregar upstream remote
git remote add upstream https://github.com/xerchion/5thTurno2.git

# 4. Verificar configuración
git remote -v
```

### Servidor local (opcional)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# VS Code Live Server extension
# Clic derecho → "Open with Live Server"
```

## 🔄 Proceso de Desarrollo

### 1. Crear rama de trabajo
```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear nueva rama
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
# o
git checkout -b docs/mejora-documentacion
```

### 2. Realizar cambios
```bash
# Trabajar en tu rama
# Hacer commits frecuentes y descriptivos

git add .
git commit -m "feat: agregar navegación por teclado"
# o
git commit -m "fix: corregir cálculo de años bisiestos"
# o
git commit -m "docs: actualizar guía de instalación"
```

### 3. Mantener actualizado
```bash
# Sincronizar con upstream regularmente
git fetch upstream
git rebase upstream/main
```

## 📏 Estándares de Código

### JavaScript
```javascript
// ✅ Correcto
function calculateDaysSince2022() {
    let diasInicioCalendario = 0;
    for (let i = 2022; i < currentYear; i++) {
        diasInicioCalendario += isLeapYear(i) ? 366 : 365;
    }
    return diasInicioCalendario;
}

// ❌ Evitar
function calc(y){var d=0;for(var i=2022;i<y;i++){d+=i%4==0?366:365;}return d;}
```

**Reglas JavaScript:**
- Usar `const` y `let` en lugar de `var`
- Nombres descriptivos para variables y funciones
- Comentarios JSDoc para funciones públicas
- Indentación de 4 espacios
- Punto y coma obligatorio

### HTML
```html
<!-- ✅ Correcto -->
<div class="calendar-day turno-M" data-date="2024-03-15">
    <span class="day-number">15</span>
</div>

<!-- ❌ Evitar -->
<div class=day><span>15</span></div>
```

**Reglas HTML:**
- Estructura semántica
- Atributos entre comillas
- Indentación consistente
- Accesibilidad (alt, aria-labels)

### CSS
```css
/* ✅ Correcto */
.calendar-day {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
}

.calendar-day.turno-M {
    background-color: #4CAF50;
    color: white;
}

/* ❌ Evitar */
.day{display:flex;height:40px;background:#4CAF50;}
```

**Reglas CSS:**
- Mobile-first approach
- Clases descriptivas
- Evitar !important
- Organización por componentes
- Comentarios para secciones principales

### Convenciones de nombres

#### Ramas
- `feature/descripcion-corta` - Nuevas características
- `fix/descripcion-del-bug` - Correcciones
- `docs/tema-documentacion` - Documentación
- `refactor/area-refactorizada` - Refactoring
- `style/mejoras-visuales` - Cambios de estilo

#### Commits
Usar [Conventional Commits](https://conventionalcommits.org/):

```bash
feat: agregar soporte para turnos de 6 equipos
fix: corregir cálculo en años bisiestos
docs: actualizar README con nuevas instrucciones
style: mejorar contraste de botones
refactor: simplificar función de navegación
test: agregar pruebas para clase Calendario
```

#### Variables y funciones
```javascript
// Variables: camelCase
let currentYear = 2024;
let diasInicioCalendario = 0;

// Funciones: camelCase descriptivo
function calculateDaysSince2022() {}
function updateCalendarForYear() {}

// Clases: PascalCase
class Calendario {}
class ValoresTurnos {}

// Constantes: SCREAMING_SNAKE_CASE
const NOMBRES_MESES = [...];
const DIAS_MES = [...];
```

## 🔍 Testing y Calidad

### Testing manual
```bash
# Checklist básico
- [ ] La aplicación carga sin errores
- [ ] Navegación entre meses funciona
- [ ] Cambio de turnos funciona
- [ ] Responsive design correcto
- [ ] No hay errores en consola
```

### Validación
```bash
# JavaScript
node -c script.js

# HTML (usar validator.w3.org)
# CSS (usar jigsaw.w3.org/css-validator)
```

### Performance
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:8000 --output html
```

## 📬 Proceso de Pull Request

### 1. Preparar PR
```bash
# Asegurar que la rama está actualizada
git fetch upstream
git rebase upstream/main

# Push de la rama
git push origin feature/mi-caracteristica
```

### 2. Crear Pull Request
1. Ve a tu fork en GitHub
2. Click "Compare & pull request"
3. Completa la plantilla:

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva característica
- [ ] Cambio breaking
- [ ] Documentación

## Testing
- [ ] Probado localmente
- [ ] Responsive design verificado
- [ ] Sin errores en consola

## Screenshots (si aplica)
[Agregar capturas de pantalla]

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado self-review
- [ ] He comentado código complejo
- [ ] He actualizado documentación
```

### 3. Review process
- El mantenedor revisará tu PR
- Puede solicitar cambios
- Una vez aprobado, será merged

## 🐛 Reportar Issues

### Antes de reportar
1. Buscar issues existentes
2. Verificar con versión más reciente
3. Reproducir el problema

### Template de bug report
```markdown
**Descripción del bug**
Descripción clara del problema.

**Pasos para reproducir**
1. Ir a '...'
2. Click en '...'
3. Ver error

**Comportamiento esperado**
Qué debería haber pasado.

**Screenshots**
Si aplica, agregar screenshots.

**Entorno:**
- OS: [e.g. Windows 10]
- Navegador: [e.g. Chrome 120]
- Versión: [e.g. v1.0.0]

**Información adicional**
Cualquier contexto adicional.
```

### Template de feature request
```markdown
**¿Tu feature request está relacionado con un problema?**
Descripción clara del problema.

**Descripción de la solución deseada**
Qué te gustaría que pasara.

**Alternativas consideradas**
Otras soluciones que consideraste.

**Información adicional**
Contexto adicional, mockups, etc.
```

## 🏷️ Versioning

Este proyecto sigue [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- `1.0.0` → Primera versión estable
- `1.1.0` → Nueva característica
- `1.0.1` → Bug fix

## 🎯 Roadmap

### Próximas características
- [ ] Soporte para 6 y 7 equipos
- [ ] Export a PDF/Excel
- [ ] Modo offline (PWA)
- [ ] Themes personalizables
- [ ] API para integración

### Ideas de contribución
- Internacionalización (i18n)
- Mejoras de accesibilidad
- Optimización de rendimiento
- Tests automatizados
- Documentación interactiva

## 💬 Comunidad

- **GitHub Discussions**: Para preguntas generales
- **Issues**: Para bugs y feature requests
- **Pull Requests**: Para contribuciones de código

## 🙏 Reconocimientos

¡Todos los contribuidores serán reconocidos en el README principal!

### Hall of Fame
- [xerchion](https://github.com/xerchion) - Creador original

---

¡Esperamos tu contribución! Cualquier duda, no hesites en abrir un issue o iniciar una discusión. 🚀
