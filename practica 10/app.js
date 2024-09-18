// Clase MatrizGaussJordan para invertir una matriz
class MatrizGaussJordan {
    constructor(size) {
        this.size = size;
        this.matrix = [];
    }

    // Método para generar la matriz que el usuario llenará
    generarMatriz() {
        const matrixContainer = document.getElementById('matrixContainer');
        matrixContainer.innerHTML = '';  // Limpiar la matriz anterior
        matrixContainer.style.gridTemplateColumns = `repeat(${this.size * 2}, 1fr)`; // Ajustar el tamaño de la cuadrícula

        this.matrix = [];

        for (let i = 0; i < this.size; i++) {
            const row = [];
            for (let j = 0; j < this.size; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.classList.add('matrix-input');
                matrixContainer.appendChild(input);
                row.push(input);
            }
            // Añadir la parte de la matriz identidad (1 en la diagonal y 0 en los demás lugares)
            for (let j = 0; j < this.size; j++) {
                const identityInput = document.createElement('input');
                identityInput.type = 'number';
                identityInput.value = (i === j) ? 1 : 0; // Matriz identidad
                identityInput.disabled = true;
                matrixContainer.appendChild(identityInput);
                row.push(identityInput);
            }
            this.matrix.push(row);
        }

        // Habilitar el botón de Gauss-Jordan
        document.getElementById('gaussJordanBtn').disabled = false;
    }

    // Obtener los valores de la matriz ingresados por el usuario y la identidad
    obtenerValores() {
        return this.matrix.map(row => row.map(input => parseFloat(input.value)));
    }

    // Método recursivo para hacer pivote 1 y hacer ceros en la columna
    gaussJordanRecursivo(matriz, i = 0) {
        let n = matriz.length;

        // Caso base: cuando se ha procesado toda la matriz
        if (i === n) return matriz;

        // Hacer que el pivote sea 1 dividiendo la fila por el pivote
        let pivote = matriz[i][i];
        if (pivote === 0) {
            alert("No se puede aplicar Gauss-Jordan: pivote igual a 0.");
            return;
        }

        for (let j = 0; j < matriz[i].length; j++) {
            matriz[i][j] = matriz[i][j] / pivote;
        }

        // Hacer ceros en la columna del pivote
        this.hacerCeros(matriz, i);

        // Llamada recursiva para la siguiente fila
        return this.gaussJordanRecursivo(matriz, i + 1);
    }

    // Método recursivo para hacer ceros en la columna del pivote
    hacerCeros(matriz, filaPivote, k = 0) {
        if (k === matriz.length) return;

        if (k !== filaPivote) {
            let factor = matriz[k][filaPivote];
            for (let j = 0; j < matriz[k].length; j++) {
                matriz[k][j] = matriz[k][j] - factor * matriz[filaPivote][j];
            }
        }

        // Llamada recursiva para la siguiente fila
        this.hacerCeros(matriz, filaPivote, k + 1);
    }

    // Aplicar el método Gauss-Jordan
    aplicarGaussJordan() {
        let matriz = this.obtenerValores();
        matriz = this.gaussJordanRecursivo(matriz);  // Aplicar la eliminación Gauss-Jordan
        this.mostrarResultado(matriz);  // Mostrar la identidad y la inversa
    }

    // Mostrar el resultado de la matriz después de aplicar Gauss-Jordan
    mostrarResultado(matriz) {
        const identityContainer = document.getElementById('identityContainer');
        const inverseContainer = document.getElementById('inverseContainer');
        identityContainer.innerHTML = '';  // Limpiar el resultado anterior
        inverseContainer.innerHTML = '';  // Limpiar la inversa anterior

        // Mostrar la matriz identidad resultante
        matriz.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.textContent = row.slice(0, this.size).map(value => value.toFixed(2)).join('  ');
            identityContainer.appendChild(rowElement);
        });

        // Mostrar la matriz inversa resultante
        matriz.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.textContent = row.slice(this.size).map(value => value.toFixed(2)).join('  ');
            inverseContainer.appendChild(rowElement);
        });
    }
}

// Crear instancia de la clase MatrizGaussJordan
let matrizGaussJordan;

// Evento para generar la matriz al hacer clic en el botón
document.getElementById('generateMatrixBtn').addEventListener('click', () => {
    const size = parseInt(document.getElementById('sizeInput').value);
    matrizGaussJordan = new MatrizGaussJordan(size);
    matrizGaussJordan.generarMatriz();
});

// Evento para aplicar Gauss-Jordan al hacer clic en el botón
document.getElementById('gaussJordanBtn').addEventListener('click', () => {
    matrizGaussJordan.aplicarGaussJordan();
});
