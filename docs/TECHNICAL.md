# � Documentación Técnica - Calendario de Turnos

Esta documentación describe la **estructura interna del código** JavaScript de la aplicación. Es útil para desarrolladores que quieran:
- Entender cómo funciona el código internamente
- Modificar o extender la aplicación
- Contribuir al proyecto
- Integrar la aplicación en otros sistemas

> **Nota**: Esta aplicación **NO tiene APIs REST** o endpoints de servidor. Es una aplicación completamente del lado del cliente (frontend-only) que funciona con JavaScript puro.

## 📚 Índice

- [Clases Principales](#-clases-principales)
- [Funciones de Navegación](#-funciones-de-navegación)
- [Funciones de Renderizado](#-funciones-de-renderizado)
- [Funciones de Inicialización](#-funciones-de-inicialización)
- [Variables Globales](#-variables-globales)
- [Constantes](#-constantes)

## 🏗️ Clases Principales

### `ValoresTurnos`
Clase que define los patrones de trabajo para cada turno.

```javascript
class ValoresTurnos {
    constructor();
}
```

**Propiedades:**
- `turnoA: string[]` - Patrón de 15 días para turno A
- `turnoB: string[]` - Patrón de 15 días para turno B
- `turnoC: string[]` - Patrón de 15 días para turno C
- `turnoD: string[]` - Patrón de 15 días para turno D
- `turnoE: string[]` - Patrón de 15 días para turno E

**Valores de turno:**
- `"M"` - Mañana (06:00 - 14:00)
- `"T"` - Tarde (14:00 - 22:00)
- `"N"` - Noche (22:00 - 06:00)
- `"L"` - Libre

### `Dia`
Representa un día individual en el calendario.

```javascript
class Dia {
    constructor(numeroDia, nombreDia, numeroMes);
}
```

**Parámetros:**
- `numeroDia: number` - Número del día (1-31)
- `nombreDia: string` - Nombre del día de la semana
- `numeroMes: number` - Número del mes (0-11)

**Propiedades:**
- `numeroDia: number` - Número del día
- `nombreDia: string` - Día de la semana
- `numeroMes: number` - Mes del año
- `turnoA: string` - Estado del turno A
- `turnoB: string` - Estado del turno B
- `turnoC: string` - Estado del turno C
- `turnoD: string` - Estado del turno D
- `turnoE: string` - Estado del turno E

### `Mes`
Representa un mes completo con todos sus días.

```javascript
class Mes {
    constructor(numeroMes, nombreMes, numeroAño);
}
```

**Parámetros:**
- `numeroMes: number` - Número del mes (0-11)
- `nombreMes: string` - Nombre del mes
- `numeroAño: number` - Año

**Propiedades:**
- `numeroMes: number` - Número del mes
- `nombreMes: string` - Nombre del mes
- `numeroAño: number` - Año
- `dias: Dia[]` - Array de días del mes

**Métodos:**
```javascript
rellenarMes() // Llena el mes con objetos Dia
```

### `Año`
Representa un año completo con todos sus meses.

```javascript
class Año {
    constructor(numeroAño);
}
```

**Parámetros:**
- `numeroAño: number` - Año a crear

**Propiedades:**
- `numeroAño: number` - Número del año
- `meses: Mes[]` - Array de 12 meses
- `esBisiesto: boolean` - Indica si es año bisiesto

**Métodos:**
```javascript
rellenaAño() // Crea todos los meses del año
calcularDiasAño() // Calcula días totales (365 o 366)
```

### `Calendario`
Clase principal que gestiona el calendario completo con turnos.

```javascript
class Calendario {
    constructor(año, turno, mes, numeroAño);
}
```

**Parámetros:**
- `año: Año` - Instancia de la clase Año
- `turno: string` - Turno a mostrar (A, B, C, D, E)
- `mes: Mes|null` - Mes específico (opcional)
- `numeroAño: number` - Número del año

**Propiedades:**
- `año: Año` - Año del calendario
- `turno: string` - Turno actual
- `mes: Mes` - Mes específico
- `numeroAño: number` - Año numérico

**Métodos:**
```javascript
rellenarCalendarioTurno(turno, diasTranscurridos)
// Rellena el calendario con los patrones de turno
// turno: string - Turno a aplicar
// diasTranscurridos: number - Días desde el inicio del patrón
```

## 🧭 Funciones de Navegación

### `previousYear()`
Navega al año anterior y actualiza el calendario.

```javascript
previousYear(): void
```

### `nextYear()`
Navega al año siguiente y actualiza el calendario.

```javascript
nextYear(): void
```

### `previousMonth()`
Navega al mes anterior y actualiza el calendario.

```javascript
previousMonth(): void
```

### `nextMonth()`
Navega al mes siguiente y actualiza el calendario.

```javascript
nextMonth(): void
```

### `previousTurno()`
Cambia al turno anterior (A → E → D → C → B → A).

```javascript
previousTurno(): void
```

### `nextTurno()`
Cambia al turno siguiente (A → B → C → D → E → A).

```javascript
nextTurno(): void
```

## 🎨 Funciones de Renderizado

### `renderModernMonth(año, mesNum, turno, diasInicioCalendario)`
Renderiza el calendario mensual con diseño moderno.

```javascript
renderModernMonth(
    año: Año,
    mesNum: number,
    turno: string,
    diasInicioCalendario: number
): void
```

**Parámetros:**
- `año: Año` - Año a renderizar
- `mesNum: number` - Número del mes (0-11)
- `turno: string` - Turno a mostrar
- `diasInicioCalendario: number` - Días transcurridos desde 2022

**Funcionalidad:**
- Crea la grilla del calendario
- Aplica colores según el turno
- Muestra días del mes anterior/siguiente
- Actualiza títulos y navegación

## ⚙️ Funciones Auxiliares

### `updateCalendarForYear()`
Actualiza el calendario completo para el año actual.

```javascript
updateCalendarForYear(): void
```

### `updateCalendarForTurno()`
Actualiza el calendario para el turno seleccionado.

```javascript
updateCalendarForTurno(): void
```

### `updateCalendarForCurrentSettings()`
Actualiza el calendario con la configuración actual.

```javascript
updateCalendarForCurrentSettings(): void
```

### `calculateDaysSince2022()`
Calcula los días transcurridos desde el 1 de enero de 2022.

```javascript
calculateDaysSince2022(): number
```

**Retorna:** Número de días transcurridos

## 🎛️ Funciones de Inicialización

### `inicializarCalendario(añoUsuario, turnoUsuario)`
Inicializa el calendario con parámetros específicos.

```javascript
inicializarCalendario(añoUsuario: number, turnoUsuario: string): void
```

**Parámetros:**
- `añoUsuario: number` - Año a mostrar
- `turnoUsuario: string` - Turno a mostrar

### `initializeYearSelector()`
Inicializa el selector de años en el modal.

```javascript
initializeYearSelector(): void
```

### `initializeEvents()`
Configura todos los event listeners del DOM.

```javascript
initializeEvents(): void
```

**Event Listeners configurados:**
- Botones de navegación
- Modal de selección
- Formulario de configuración
- Overlay del modal

### `cambiarGradienteTurno(turno)`
Cambia el fondo de la aplicación según el turno.

```javascript
cambiarGradienteTurno(turno: string): void
```

**Parámetros:**
- `turno: string` - Turno para aplicar el color

## 🔗 Variables Globales

```javascript
// Estado del calendario
let añoGlobal: Año;
let calendarioGlobal: Calendario;

// Configuración actual
let currentYear: number = new Date().getFullYear();
let currentMonth: number = new Date().getMonth();
let currentTurno: string = 'A';
```

## 📊 Constantes

```javascript
// Arrays de nombres
const NOMBRES_MESES: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const NOMBRES_DIAS: string[] = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles',
    'Jueves', 'Viernes', 'Sábado'
];

// Días por mes
const DIAS_MES: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DIAS_MES_BISIESTO: number[] = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
```

## 🎨 Clases CSS Principales

### Contenedores
- `.app-header` - Header principal de la aplicación
- `.calendar-container` - Contenedor del calendario
- `.calendar-grid` - Grilla del calendario
- `.calendar-navigation` - Navegación del calendario

### Estados de Día
- `.calendar-day` - Día base del calendario
- `.other-month` - Día de otro mes
- `.turno-M` - Turno de mañana (verde)
- `.turno-T` - Turno de tarde (azul)
- `.turno-N` - Turno de noche (morado)
- `.turno-L` - Día libre (gris claro)

### Modal
- `.modal-overlay` - Overlay del modal
- `.selector` - Contenedor del modal
- `.modal-content` - Contenido del modal

## 🔄 Flujo de Ejecución

1. **Carga inicial**: `DOMContentLoaded` → inicialización
2. **Creación de objetos**: `Año` → `Mes` → `Dia`
3. **Aplicación de turnos**: `Calendario.rellenarCalendarioTurno()`
4. **Renderizado**: `renderModernMonth()`
5. **Navegación**: Funciones de navegación → actualización

## 🐛 Depuración

### Variables útiles para debugging
```javascript
console.log('Año global:', añoGlobal);
console.log('Calendario global:', calendarioGlobal);
console.log('Estado actual:', { currentYear, currentMonth, currentTurno });
```

### Métodos de inspección
```javascript
// Verificar patrón de turnos
console.log('Patrón turno A:', new ValoresTurnos().turnoA);

// Verificar días de un mes
console.log('Días marzo 2024:', añoGlobal.meses[2].dias);
```

## 📝 Notas de Implementación

- El calendario usa base 0 para meses (Enero = 0, Diciembre = 11)
- Los patrones de turno se repiten cada 15 días
- El año base para cálculos es 2022
- Los días de la semana usan base 0 (Domingo = 0)
- El sistema es completamente client-side (no requiere servidor)

---

Esta documentación cubre toda la funcionalidad pública de la aplicación. Para detalles de implementación específicos, consulta el código fuente comentado.
