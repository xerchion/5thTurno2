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
            this.año.meses[0].dias.slice(0, 5).map(d => ({dia: d.numeroDia, turno: d.turnoToca})));
            
        // Festivos fijos
        this.año.meses[0].dias[5].turnoToca = "F";
        this.año.meses[1].dias[27].turnoToca = "F";
        this.año.meses[4].dias[0].turnoToca = "F";
        this.año.meses[7].dias[14].turnoToca = "F";
        this.año.meses[9].dias[11].turnoToca = "F";
        this.año.meses[10].dias[0].turnoToca = "F";
        this.año.meses[11].dias[6].turnoToca = "F";
        this.año.meses[11].dias[8].turnoToca = "F";
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

    // Actualizar título del mes
    const monthTitle = document.querySelector('.month-title');
    if (monthTitle) {
        monthTitle.textContent = `${nombresMeses[mesNum]} ${año.numeroAño}`;
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

// Función para navegar al mes anterior
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

    switch (turno) {
        case "A":
            body.style.background = "linear-gradient(135deg, rgba(116, 185, 255, 0.3) 0%, rgba(9, 132, 227, 0.2) 100%)"; // Azul muy claro
            break;
        case "B":
            body.style.background = "linear-gradient(135deg, rgba(0, 184, 148, 0.3) 0%, rgba(0, 160, 133, 0.2) 100%)"; // Verde muy claro
            break;
        case "C":
            body.style.background = "linear-gradient(135deg, rgba(255, 118, 117, 0.3) 0%, rgba(214, 48, 49, 0.2) 100%)"; // Rojo muy claro
            break;
        case "D":
            body.style.background = "linear-gradient(135deg, rgba(160, 149, 107, 0.3) 0%, rgba(139, 115, 85, 0.2) 100%)"; // Marrón muy claro
            break;
        case "E":
            body.style.background = "linear-gradient(135deg, rgba(253, 203, 110, 0.3) 0%, rgba(225, 112, 85, 0.2) 100%)"; // Amarillo muy claro
            break;
        default:
            body.style.background = "linear-gradient(135deg, rgba(245, 247, 250, 0.8) 0%, rgba(195, 207, 226, 0.6) 100%)"; // Por defecto muy claro
    }
}

// Función principal para inicializar y mostrar el calendario
function inicializarCalendario(añoUsuario, turnoUsuario) {
    console.log('Inicializando calendario:', { añoUsuario, turnoUsuario });
    
    // Actualizar variables globales
    currentYear = añoUsuario;
    currentTurno = turnoUsuario;
    currentMonth = 0; // Comenzar con enero para pruebas
    
    console.log('Variables globales:', { currentYear, currentTurno, currentMonth });
    
    // Cambiar el gradiente según el turno
    cambiarGradienteTurno(turnoUsuario);

    // Actualizar título en la cabecera
    const turnoTitulo = document.querySelector('.turno-titulo');
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

// Función para inicializar eventos del DOM
function initializeEvents() {
    // Mostrar/ocultar el formulario al hacer clic en el botón "Cambiar Datos"
    document.getElementById('menuIcon').onclick = function () {
        document.getElementById('selector').style.display = 'block';
        document.getElementById('modalOverlay').style.display = 'block';
        // Ocultar todos los elementos excepto el nombre de la web
        document.querySelectorAll('.header-container, .cabecera, .contenedor').forEach(e => e.classList.add('oculto'));
    };

    // Cerrar ventana con el botón Cancelar
    document.getElementById('cancelarBtn').onclick = function () {
        document.getElementById('selector').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
        // Mostrar todos los elementos de nuevo
        document.querySelectorAll('.header-container, .cabecera, .contenedor').forEach(e => e.classList.remove('oculto'));
    };

    document.getElementById('modalOverlay').onclick = function () {
        document.getElementById('selector').style.display = 'none';
        this.style.display = 'none';
        // Mostrar todos los elementos de nuevo
        document.querySelectorAll('.header-container, .cabecera, .contenedor').forEach(e => e.classList.remove('oculto'));
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
            // Mostrar todos los elementos de nuevo
            document.querySelectorAll('.header-container, .cabecera, .contenedor').forEach(e => e.classList.remove('oculto'));
        }
    };

    // Event listeners para navegación del calendario
    document.getElementById('prevMonth').onclick = function() {
        previousMonth();
    };

    document.getElementById('nextMonth').onclick = function() {
        nextMonth();
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