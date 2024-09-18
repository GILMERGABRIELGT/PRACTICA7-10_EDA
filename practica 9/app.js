// Clase Matriz con operaciones recursivas
class Matriz {
    constructor(size) {
        this.size = size;
        this.matriz1 = [];
        this.matriz2 = [];
    }

    // Método para generar las matrices
    generarMatrices() {
        this.matriz1 = this.generarMatriz('matrix1Container');
        this.matriz2 = this.generarMatriz('matrix2Container');
    }

    // Generar una matriz 2x2 y agregarla al contenedor
    generarMatriz(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';  // Limpiar la matriz anterior
        const matriz = [];

        for (let i = 0; i < this.size; i++) {
            const row = [];
            for (let j = 0; j < this.size; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.value = Math.floor(Math.random() * 10); // Valores aleatorios
                container.appendChild(input);
                row.push(input);
            }
            matriz.push(row);
        }
        return matriz;
    }

    // Obtener los valores de la matriz en forma de array de números
    obtenerValores(matriz) {
        return matriz.map(row => row.map(input => parseFloat(input.value)));
    }

    // Método recursivo para operar dos matrices
    operarRecursivo(matriz1, matriz2, operacion, i = 0, j = 0, resultado = []) {
        if (i === this.size) return resultado; // Caso base: se recorrió toda la matriz

        if (j === this.size) {
            // Al final de una fila, iniciar una nueva
            resultado.push([]);
            return this.operarRecursivo(matriz1, matriz2, operacion, i + 1, 0, resultado);
        }

        // Aplicar la operación en la posición (i, j)
        let valor;
        switch (operacion) {
            case 'sumar':
                valor = matriz1[i][j] + matriz2[i][j];
                break;
            case 'restar':
                valor = matriz1[i][j] - matriz2[i][j];
                break;
            case 'multiplicar':
                valor = matriz1[i][j] * matriz2[i][j];
                break;
            case 'dividir':
                valor = matriz2[i][j] !== 0 ? (matriz1[i][j] / matriz2[i][j]).toFixed(2) : '∞'; // Evitar división por cero
                break;
        }

        // Añadir el valor calculado a la fila actual
        resultado[i] = resultado[i] || [];
        resultado[i][j] = valor;

        // Recursividad para la siguiente celda de la matriz
        return this.operarRecursivo(matriz1, matriz2, operacion, i, j + 1, resultado);
    }

    // Mostrar los resultados en el DOM
    mostrarResultados() {
        const m1 = this.obtenerValores(this.matriz1);
        const m2 = this.obtenerValores(this.matriz2);

        const sumResult = this.operarRecursivo(m1, m2, 'sumar');
        const subtractResult = this.operarRecursivo(m1, m2, 'restar');
        const productResult = this.operarRecursivo(m1, m2, 'multiplicar');
        const divisionResult = this.operarRecursivo(m1, m2, 'dividir');

        document.getElementById('sumResult').textContent = `Suma: ${this.formatearMatriz(sumResult)}`;
        document.getElementById('subtractResult').textContent = `Resta: ${this.formatearMatriz(subtractResult)}`;
        document.getElementById('productResult').textContent = `Producto: ${this.formatearMatriz(productResult)}`;
        document.getElementById('divisionResult').textContent = `División: ${this.formatearMatriz(divisionResult)}`;
    }

    // Formatear la matriz en forma de texto
    formatearMatriz(matriz) {
        return matriz.map(row => row.join(' ')).join(' | ');
    }
}

// Crear instancia de la clase Matriz
const matriz = new Matriz(2);

// Generar las matrices al cargar la página
window.onload = () => matriz.generarMatrices();


document.getElementById('calculateBtn').addEventListener('click', () => {
    matriz.mostrarResultados();
});
