const nombresDias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let diasFijosMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let totalDiasAño = 365;

// Variables para navegación mensual
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentTurno = "C";
let añoGlobal = null;
let calendarioGlobal = null;

class ValoresTurnos {
    generarValores() {
        let repValor = [2, 2, 3, 4, 3, 2, 2, 5, 2, 3, 2, 5];
        let valor = ["M", "T", "N", "D", "M", "T", "N", "D", "M", "T", "N", "D"];
        let patron = [];
        let dias = 0;
        while (dias < 400000) {
            for (let iValor = 0; iValor < valor.length; iValor++) {
                for (let jRepValor = 1; jRepValor <= repValor[iValor]; jRepValor++) {
                    patron[dias] = valor[iValor];
                    dias++;
                }
            }
        }
        return patron;
    }
}

class Dia {
    constructor(nombreDia, numeroDia, numeroDiaTotal, turnoToca) {
        this.nombreDia = nombreDia;
        this.numeroDia = numeroDia;
        this.numeroDiaTotal = numeroDiaTotal;
        this.turnoToca = turnoToca;
    }
}

class Mes {
    constructor(nombreMes, numeroMes, diasTotales, dias, festivos) {
        this.nombreMes = nombreMes;
        this.numMes = numeroMes;
        this.diasTotales = diasTotales;
        this.dias = dias;
        this.festivos = festivos;
    }
}

class Año {
    constructor(numeroAño) {
        this.numeroAño = numeroAño;
        this.meses = [];
    }
    rellenaAño() {
        // Comprobar si es bisiesto
        if ((this.numeroAño % 4 == 0 && this.numeroAño % 100 != 0) || this.numeroAño % 400 == 0) {
            diasFijosMes[1] = 29;
            totalDiasAño = 366;
        } else {
            diasFijosMes[1] = 28;
            totalDiasAño = 365;
        }
        let kDiaTotal = 1;
        for (let i = 0; i < 12; i++) {
            let diasArray = [];
            for (let j = 0; j < diasFijosMes[i]; j++) {
                let fechaTemp = new Date(this.numeroAño, i, j + 1);
                let diaSemana = nombresDias[(fechaTemp.getDay() + 6) % 7];
                diasArray[j] = new Dia(diaSemana, j + 1, kDiaTotal++, "Sin meter");
            }
            this.meses[i] = new Mes(nombresMeses[i], i + 1, diasFijosMes[i], diasArray, 0);
        }
    }
}

class Calendario {
    constructor(año, turno, contenedor, añoUsuario) {
        this.año = año;
        this.turno = turno;
        this.contenedor = contenedor;
        this.añoUsuario = añoUsuario;
    }

    mesIndividualNuevo(mesTemp) {
        let mes = this.año.meses[mesTemp];
        let nuevoElemento = document.createElement("DIV");
        let gridContainer = this.contenedor.appendChild(nuevoElemento);
        gridContainer.classList.add("grid-container", `mes-fondo-${mesTemp + 1}`);
        nuevoElemento = document.createElement("DIV");
        let gridCabeceraMes = gridContainer.appendChild(nuevoElemento);
        gridCabeceraMes.classList.add("grid-item");
        gridCabeceraMes.textContent = mes.nombreMes;
        const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];
        for (let j = 0; j < diasSemana.length; j++) {
            nuevoElemento = document.createElement("DIV");
            let gridCabeceraSem = gridContainer.appendChild(nuevoElemento);
            gridCabeceraSem.classList.add("grid-item", "grid-cabecera-semana");
            gridCabeceraSem.textContent = diasSemana[j];
        }
        let diaSemanaInicioMes = nombresDias.indexOf(mes.dias[0].nombreDia);
        for (let j = 1; j <= diaSemanaInicioMes; j++) {
            nuevoElemento = document.createElement("DIV");
            let gridEnBlanco = gridContainer.appendChild(nuevoElemento);
            gridEnBlanco.classList.add("grid-item");
            gridEnBlanco.textContent = "";
            gridEnBlanco.id = ("hueco");
        }
        let fechaActual = new Date();
        let diaActual = fechaActual.getDate();
        let mesActual = fechaActual.getMonth();
        let añoActual = fechaActual.getFullYear();
        for (let i = 0; i < diasFijosMes[mesTemp]; i++) {
            let turno = mes.dias[i].turnoToca;
            let turnoLargo = "";
            switch (turno) {
                case "M": turnoLargo = "Mañana"; break;
                case "T": turnoLargo = "Tarde"; break;
                case "N": turnoLargo = "Noche"; break;
                case "D": turnoLargo = "Descanso"; break;
                case "F": turnoLargo = "Festivo"; break;
            }
            turnoLargo = turnoLargo.toLowerCase();
            nuevoElemento = document.createElement("DIV");
            let gridDiaItem = gridContainer.appendChild(nuevoElemento);
            gridDiaItem.classList.add("grid-item");
            gridDiaItem.textContent = i + 1;
            gridDiaItem.id = turnoLargo;
            if (añoActual === this.añoUsuario && mesActual === mesTemp && diaActual === i + 1) {
                gridDiaItem.classList.add("dia-actual");
            }
        }
    }

    rellenarCalendarioTurno(turno, diasInicioCalendario) {
        console.log('rellenarCalendarioTurno:', { turno, diasInicioCalendario });

        let valorTurnoInicio2022;
        switch (turno) {
            case "A": valorTurnoInicio2022 = 19 + diasInicioCalendario; break;
            case "B": valorTurnoInicio2022 = 33 + diasInicioCalendario; break;
            case "C": valorTurnoInicio2022 = 12 + diasInicioCalendario; break;
            case "D": valorTurnoInicio2022 = 26 + diasInicioCalendario; break;
            case "E": valorTurnoInicio2022 = 5 + diasInicioCalendario; break;
        }

        console.log('valorTurnoInicio2022:', valorTurnoInicio2022);

        let iTurnos = valorTurnoInicio2022;
        let patronGeneral = new ValoresTurnos();
        let patron = patronGeneral.generarValores();

        console.log('Patron generado, primeros valores:', patron.slice(iTurnos, iTurnos + 10));

        for (let iMeses = 0; iMeses < 12; iMeses++) {
            for (let iDias = 0; iDias < diasFijosMes[iMeses]; iDias++) {
                this.año.meses[iMeses].dias[iDias].turnoToca = patron[iTurnos++];
            }
        }

        console.log('Turnos asignados. Verificando enero:',
            this.año.meses[0].dias.slice(0, 5).map(d => ({ dia: d.numeroDia, turno: d.turnoToca })));

        // Festivos fijos
        this.año.meses[0].dias[5].turnoToca = "F";   // 6 de enero - Epifanía
        this.año.meses[1].dias[27].turnoToca = "F";  // 28 de febrero - Día de Andalucía
        this.año.meses[4].dias[0].turnoToca = "F";   // 1 de mayo - Día del Trabajo
        this.año.meses[7].dias[14].turnoToca = "F";  // 15 de agosto - Asunción
        this.año.meses[9].dias[11].turnoToca = "F";  // 12 de octubre - Día de la Hispanidad
        this.año.meses[10].dias[0].turnoToca = "F";  // 1 de noviembre - Todos los Santos
        this.año.meses[11].dias[5].turnoToca = "F";  // 6 de diciembre - Constitución
        this.año.meses[11].dias[7].turnoToca = "F";  // 8 de diciembre - Inmaculada
    }

    mostrarAño() {
        for (let i = 0; i < 12; i++) {
            this.mesIndividualNuevo(i);
        }
    }
}

// ===== FUNCIONES DEL CALENDARIO MODERNO =====

// Función para renderizar un solo mes moderno
function renderModernMonth(año, mesNum, turno, diasInicioCalendario) {
    console.log('renderModernMonth llamado:', { año: año.numeroAño, mesNum, turno });

    const calendarGridWrapper = document.querySelector('.calendar-grid-wrapper');
    if (!calendarGridWrapper) {
        console.error('No se encontró .calendar-grid-wrapper');
        return;
    }

    // Actualizar título del año y del mes
    const yearTitle = document.querySelector('.year-title');
    const monthTitle = document.querySelector('.month-title');
    if (yearTitle) {
        yearTitle.textContent = año.numeroAño;
    }
    if (monthTitle) {
        monthTitle.textContent = nombresMeses[mesNum];
    }

    // Limpiar calendario anterior
    const existingGrid = document.querySelector('.calendar-grid');
    if (existingGrid) existingGrid.remove();

    // Crear nueva grilla del calendario
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    calendarGridWrapper.appendChild(calendarGrid);

    console.log('Grilla creada, agregando headers...');

    // Headers de los días de la semana
    const diasSemanaCortos = ["L", "M", "X", "J", "V", "S", "D"];
    diasSemanaCortos.forEach(dia => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = dia;
        calendarGrid.appendChild(header);
    });

    const mes = año.meses[mesNum];
    console.log('Mes obtenido:', mes.nombreMes, 'con', mes.dias.length, 'días');

    const primerDia = mes.dias[0];
    const diaSemanaInicio = nombresDias.indexOf(primerDia.nombreDia);
    console.log('Primer día:', primerDia.nombreDia, 'índice:', diaSemanaInicio);

    // Días en blanco al inicio del mes
    for (let i = 0; i < diaSemanaInicio; i++) {
        const dayBlank = document.createElement('div');
        dayBlank.className = 'calendar-day other-month';
        calendarGrid.appendChild(dayBlank);
    }

    console.log('Agregando días del mes...');
    // Días del mes actual
    mes.dias.forEach((dia, index) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = dia.numeroDia;

        if (index < 5) {
            console.log(`Día ${dia.numeroDia}: turno ${dia.turnoToca}`);
        }

        // Aplicar clase de turno
        switch (dia.turnoToca) {
            case 'M':
                dayElement.classList.add('morning');
                break;
            case 'T':
                dayElement.classList.add('afternoon');
                break;
            case 'N':
                dayElement.classList.add('night');
                break;
            case 'D':
                dayElement.classList.add('dayoff');
                break;
            case 'F':
                dayElement.classList.add('holiday');
                break;
        }

        // Marcar día actual
        const today = new Date();
        if (año.numeroAño === today.getFullYear() &&
            mesNum === today.getMonth() &&
            dia.numeroDia === today.getDate()) {
            dayElement.classList.add('today');
        }

        calendarGrid.appendChild(dayElement);
    });

    // Completar con días en blanco al final si es necesario
    const totalCells = calendarGrid.children.length;
    const cellsNeeded = Math.ceil((totalCells - 7) / 7) * 7 + 7;
    for (let i = totalCells; i < cellsNeeded; i++) {
        const dayBlank = document.createElement('div');
        dayBlank.className = 'calendar-day other-month';
        calendarGrid.appendChild(dayBlank);
    }
}

// Función para navegar al año anterior
function previousYear() {
    currentYear--;
    // Crear nuevo año si es necesario
    let diasInicioCalendario = 0;
    for (let i = 2022; i < currentYear; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
            diasInicioCalendario += 366;
        } else {
            diasInicioCalendario += 365;
        }
    }
    añoGlobal = new Año(currentYear);
    añoGlobal.rellenaAño();
    calendarioGlobal = new Calendario(añoGlobal, currentTurno, null, currentYear);
    calendarioGlobal.rellenarCalendarioTurno(currentTurno, diasInicioCalendario);

    renderModernMonth(añoGlobal, currentMonth, currentTurno, diasInicioCalendario);
}

// Función para navegar al año siguiente
function nextYear() {
    currentYear++;
    // Crear nuevo año si es necesario
    let diasInicioCalendario = 0;
    for (let i = 2022; i < currentYear; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
            diasInicioCalendario += 366;
        } else {
            diasInicioCalendario += 365;
        }
    }
    añoGlobal = new Año(currentYear);
    añoGlobal.rellenaAño();
    calendarioGlobal = new Calendario(añoGlobal, currentTurno, null, currentYear);
    calendarioGlobal.rellenarCalendarioTurno(currentTurno, diasInicioCalendario);

    renderModernMonth(añoGlobal, currentMonth, currentTurno, diasInicioCalendario);
}

// Función para cambiar al turno anterior
function previousTurno() {
    const turnos = ['A', 'B', 'C', 'D', 'E'];
    const currentIndex = turnos.indexOf(currentTurno);
    const newIndex = currentIndex === 0 ? turnos.length - 1 : currentIndex - 1;
    currentTurno = turnos[newIndex];

    let diasInicioCalendario = 0;
    for (let i = 2022; i < currentYear; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
            diasInicioCalendario += 366;
        } else {
            diasInicioCalendario += 365;
        }
    }

    calendarioGlobal.rellenarCalendarioTurno(currentTurno, diasInicioCalendario);

    // Actualizar título del turno
    const turnoTitulo = document.querySelector('.calendar-title .turno-titulo');
    if (turnoTitulo) turnoTitulo.textContent = `Turno ${currentTurno}`;

    renderModernMonth(añoGlobal, currentMonth, currentTurno, diasInicioCalendario);
}

// Función para cambiar al turno siguiente
function nextTurno() {
    const turnos = ['A', 'B', 'C', 'D', 'E'];
    const currentIndex = turnos.indexOf(currentTurno);
    const newIndex = currentIndex === turnos.length - 1 ? 0 : currentIndex + 1;
    currentTurno = turnos[newIndex];

    let diasInicioCalendario = 0;
    for (let i = 2022; i < currentYear; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
            diasInicioCalendario += 366;
        } else {
            diasInicioCalendario += 365;
        }
    }

    calendarioGlobal.rellenarCalendarioTurno(currentTurno, diasInicioCalendario);

    // Actualizar título del turno
    const turnoTitulo = document.querySelector('.calendar-title .turno-titulo');
    if (turnoTitulo) turnoTitulo.textContent = `Turno ${currentTurno}`;

    renderModernMonth(añoGlobal, currentMonth, currentTurno, diasInicioCalendario);
}
function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
        // Crear nuevo año si es necesario
        if (añoGlobal.numeroAño !== currentYear) {
            let diasInicioCalendario = 0;
            for (let i = 2022; i < currentYear; i++) {
                if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
                    diasInicioCalendario += 366;
                } else {
                    diasInicioCalendario += 365;
                }
            }
            añoGlobal = new Año(currentYear);
            añoGlobal.rellenaAño();
            calendarioGlobal = new Calendario(añoGlobal, currentTurno, null, currentYear);
            calendarioGlobal.rellenarCalendarioTurno(currentTurno, diasInicioCalendario);
        }
    }

    let diasInicioCalendario = 0;
    for (let i = 2022; i < currentYear; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
            diasInicioCalendario += 366;
        } else {
            diasInicioCalendario += 365;
        }
    }

    renderModernMonth(añoGlobal, currentMonth, currentTurno, diasInicioCalendario);
}

// Función para navegar al mes siguiente
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
        // Crear nuevo año si es necesario
        if (añoGlobal.numeroAño !== currentYear) {
            let diasInicioCalendario = 0;
            for (let i = 2022; i < currentYear; i++) {
                if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
                    diasInicioCalendario += 366;
                } else {
                    diasInicioCalendario += 365;
                }
            }
            añoGlobal = new Año(currentYear);
            añoGlobal.rellenaAño();
            calendarioGlobal = new Calendario(añoGlobal, currentTurno, null, currentYear);
            calendarioGlobal.rellenarCalendarioTurno(currentTurno, diasInicioCalendario);
        }
    }

    let diasInicioCalendario = 0;
    for (let i = 2022; i < currentYear; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
            diasInicioCalendario += 366;
        } else {
            diasInicioCalendario += 365;
        }
    }

    renderModernMonth(añoGlobal, currentMonth, currentTurno, diasInicioCalendario);
}

// Función para cambiar el degradado de fondo según el turno
function cambiarGradienteTurno(turno) {
    const body = document.body;
    // Siempre usar fondo blanco independientemente del turno
    body.style.background = "#ffffff";
}

// Función principal para inicializar y mostrar el calendario
function inicializarCalendario(añoUsuario, turnoUsuario) {
    console.log('Inicializando calendario:', { añoUsuario, turnoUsuario });

    // Actualizar variables globales
    currentYear = añoUsuario;
    currentTurno = turnoUsuario;
    currentMonth = new Date().getMonth(); // Mes actual en lugar de enero

    console.log('Variables globales:', { currentYear, currentTurno, currentMonth });

    // Cambiar el gradiente según el turno
    cambiarGradienteTurno(turnoUsuario);

    // Actualizar título en la cabecera del calendario
    const turnoTitulo = document.querySelector('.calendar-title .turno-titulo');
    if (turnoTitulo) turnoTitulo.textContent = `Turno ${turnoUsuario}`;

    // Borrar calendarios anteriores si existen
    document.querySelectorAll('.cabecera, .contenedor').forEach(e => e.remove());

    // Calcular días desde 2022
    let diasInicioCalendario = 0;
    for (let i = 2022; i < añoUsuario; i++) {
        if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
            diasInicioCalendario += 366;
        } else {
            diasInicioCalendario += 365;
        }
    }

    console.log('Días desde 2022:', diasInicioCalendario);

    // Crear año y calendario globales
    añoGlobal = new Año(añoUsuario);
    añoGlobal.rellenaAño();
    console.log('Año global creado:', añoGlobal);

    calendarioGlobal = new Calendario(añoGlobal, turnoUsuario, null, añoUsuario);
    calendarioGlobal.rellenarCalendarioTurno(turnoUsuario, diasInicioCalendario);
    console.log('Calendario global creado');

    // Renderizar el mes actual
    renderModernMonth(añoGlobal, currentMonth, turnoUsuario, diasInicioCalendario);
}

// Función para inicializar el selector de años
function initializeYearSelector() {
    const añoActual = new Date().getFullYear();
    const añoSelect = document.getElementById('añoSelect');

    // Limpiar opciones existentes
    añoSelect.innerHTML = '';

    for (let y = añoActual - 1; y <= añoActual + 10; y++) {
        let opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        añoSelect.appendChild(opt);
    }
    añoSelect.value = añoActual;
}

// Función para mostrar/ocultar la leyenda
function toggleLegendVisibility() {
    const legendIndicators = document.getElementById('legendIndicators');
    const toggleBtn = document.getElementById('toggleLegend');
    const toggleText = toggleBtn.querySelector('.legend-toggle-text');
    const toggleIcon = toggleBtn.querySelector('.legend-toggle-icon');

    if (legendIndicators.classList.contains('show')) {
        // Ocultar leyenda
        legendIndicators.classList.remove('show');
        toggleText.textContent = 'Leyenda';
        toggleBtn.classList.remove('expanded');
    } else {
        // Mostrar leyenda
        legendIndicators.classList.add('show');
        toggleText.textContent = 'Leyenda';
        toggleBtn.classList.add('expanded');
    }
}// Función para inicializar eventos del DOM
function initializeEvents() {
    // Cerrar ventana con el botón Cancelar
    document.getElementById('cancelarBtn').onclick = function () {
        document.getElementById('selector').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
    };

    document.getElementById('modalOverlay').onclick = function () {
        document.getElementById('selector').style.display = 'none';
        this.style.display = 'none';
    };

    // Manejar el envío del formulario
    document.getElementById('calForm').onsubmit = function (e) {
        e.preventDefault();
        const año = parseInt(document.getElementById('añoSelect').value, 10);
        const turno = document.getElementById('turnoInput').value;
        const añoActual = new Date().getFullYear();

        if (año >= 2022 && año <= añoActual + 10 && ["A", "B", "C", "D", "E"].includes(turno)) {
            inicializarCalendario(año, turno);
            document.getElementById('selector').style.display = 'none';
            document.getElementById('modalOverlay').style.display = 'none';
        }
    };

    // Event listeners para navegación del calendario
    document.getElementById('prevYear').onclick = function () {
        previousYear();
    };

    document.getElementById('nextYear').onclick = function () {
        nextYear();
    };

    document.getElementById('prevMonth').onclick = function () {
        previousMonth();
    };

    document.getElementById('nextMonth').onclick = function () {
        nextMonth();
    };

    document.getElementById('prevTurno').onclick = function () {
        previousTurno();
    };

    document.getElementById('nextTurno').onclick = function () {
        nextTurno();
    };

    // Event listener para toggle de leyenda
    document.getElementById('toggleLegend').onclick = function () {
        toggleLegendVisibility();
    };
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    let fechaActual = new Date();
    let añoActual = fechaActual.getFullYear();
    let turnoUsuario = "C";

    // Inicializar selector de años
    initializeYearSelector();

    // Inicializar eventos
    initializeEvents();

    // Establecer gradiente inicial
    cambiarGradienteTurno(turnoUsuario);

    // Mostrar calendario inicial
    inicializarCalendario(añoActual, turnoUsuario);
});