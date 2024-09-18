// Clase Matriz que contiene la lógica del programa
class Matriz {
    constructor(matrix) {
        this.matrix = matrix;
    }

    // Método para generar la tabla en HTML
    generarTabla() {
        const table = document.getElementById('matrix');
        this.matrix.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    // Método para contar los ceros en cada renglón
    contarCeros() {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';  // Limpiar resultados anteriores

        this.matrix.forEach((row, index) => {
            const zeroCount = row.filter(num => num === 0).length;
            resultDiv.innerHTML += `Renglón ${index + 1}: ${zeroCount} ceros<br>`;
        });
    }
}

// Crear una instancia de la clase Matriz con los datos proporcionados
const matriz = new Matriz([
    [0, 2, 5, 7, 6],
    [0, 0, 0, 3, 8],
    [2, 9, 6, 3, 4],
    [1, 5, 6, 1, 4],
    [0, 9, 2, 5, 0]
]);

// Generar la tabla al cargar la página
window.onload = () => matriz.generarTabla();

// Agregar evento al botón para contar los ceros
document.getElementById('countZerosBtn').addEventListener('click', () => matriz.contarCeros());
