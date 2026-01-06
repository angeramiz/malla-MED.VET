// Datos de los ramos y sus prerequisitos
const ramos = [
    { nombre: "Biología Celular", prereq: [], semestre: 1 },
    { nombre: "Química y Bioquímica para la Vida", prereq: ["Biología Celular"], semestre: 2 },
    { nombre: "Agentes Biológicos de Enfermedad", prereq: ["Química y Bioquímica para la Vida"], semestre: 3 },
    { nombre: "Inmunología General", prereq: ["Agentes Biológicos de Enfermedad"], semestre: 4 },
    { nombre: "Matemáticas", prereq: [], semestre: 1 },
    { nombre: "Morfología Micro y Macroscópica I", prereq: [], semestre: 1 },
    { nombre: "Morfología Micro y Macroscópica II", prereq: ["Morfología Micro y Macroscópica I"], semestre: 2 },
    { nombre: "Fisiología y Fisiopatología Veterinaria I", prereq: ["Morfología Micro y Macroscópica II"], semestre: 3 },
    { nombre: "Fisiología y Fisiopatología Veterinaria II", prereq: ["Fisiología y Fisiopatología Veterinaria I"], semestre: 4 },
    { nombre: "Bioestadística", prereq: ["Matemáticas"], semestre: 2 },
    { nombre: "Genética Animal", prereq: ["Bioestadística"], semestre: 3 },
    { nombre: "Etología y Bienestar Animal", prereq: ["Introducción a la Medicina Veterinaria"], semestre: 3 },
    { nombre: "Ecológica", prereq: ["Zoología"], semestre: 3 },
    // ... puedes agregar todos los ramos restantes siguiendo este formato
];

// Función para generar la malla
function crearMalla() {
    const contenedor = document.getElementById('malla');
    ramos.forEach(ramo => {
        const div = document.createElement('div');
        div.classList.add('ramo', 'bloqueado');
        div.id = ramo.nombre;

        div.innerHTML = `
            <div>${ramo.nombre}</div>
            <label>Promedio:</label>
            <input type="number" min="1" max="7" step="0.1" onchange="actualizarRamos('${ramo.nombre}', this.value)">
        `;
        contenedor.appendChild(div);
    });

    // Habilitar ramos sin prerequisitos
    ramos.filter(r => r.prereq.length === 0).forEach(r => {
        document.getElementById(r.nombre).classList.remove('bloqueado');
    });
}

// Función para actualizar ramos según promedio
function actualizarRamos(nombre, promedio) {
    const div = document.getElementById(nombre);
    promedio = parseFloat(promedio);

    if (promedio >= 4.0) {
        div.classList.add('aprobado');
        div.classList.remove('bloqueado');
        // Desbloquear ramos que dependan de este
        ramos.forEach(r => {
            if (r.prereq.includes(nombre)) {
                let prereqAprobados = r.prereq.every(pr => {
                    const p = document.getElementById(pr);
                    return p.classList.contains('aprobado');
                });
                if (prereqAprobados) {
                    document.getElementById(r.nombre).classList.remove('bloqueado');
                }
            }
        });
    } else {
        div.classList.remove('aprobado');
    }
}

crearMalla();

