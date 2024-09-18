
class CuadroMagico {
    constructor(size) {
        this.size = size;
        this.matrix = [];
    }

    generarMatriz() {
        const matrixContainer = document.getElementById('matrixContainer');
        matrixContainer.innerHTML = '';
        matrixContainer.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

        this.matrix = [];

        for (let i = 0; i < this.size; i++) {
            const row = [];
            for (let j = 0; j < this.size; j++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.classList.add('matrix-input');
                input.value = Math.floor(Math.random() * 10); 
                matrixContainer.appendChild(input);
                row.push(input);
            }
            this.matrix.push(row);
        }
    }

    verificarFilas(fila = 0, sumaObjetivo = null) {
        if (fila === this.size) return true; 
        const sumaFila = this.matrix[fila].reduce((acc, input) => acc + parseInt(input.value), 0);
        if (sumaObjetivo === null) sumaObjetivo = sumaFila; 
        if (sumaFila !== sumaObjetivo) return false; 
        return this.verificarFilas(fila + 1, sumaObjetivo); 
    }

    
    verificarColumnas(columna = 0, sumaObjetivo = null) {
        if (columna === this.size) return true; 
        let sumaColumna = 0;
        for (let i = 0; i < this.size; i++) {
            sumaColumna += parseInt(this.matrix[i][columna].value);
        }
        if (sumaObjetivo === null) sumaObjetivo = sumaColumna; 
        if (sumaColumna !== sumaObjetivo) return false; 
        return this.verificarColumnas(columna + 1, sumaObjetivo); 
    }

    
    verificarDiagonales(index = 0, sumaDiagPrincipal = 0, sumaDiagSecundaria = 0) {
        if (index === this.size) return sumaDiagPrincipal === sumaDiagSecundaria; 
        sumaDiagPrincipal += parseInt(this.matrix[index][index].value);
        sumaDiagSecundaria += parseInt(this.matrix[index][this.size - index - 1].value);
        return this.verificarDiagonales(index + 1, sumaDiagPrincipal, sumaDiagSecundaria); 
    }

    
    verificarCuadroMagico() {
        const resultado = document.getElementById('result');
        const sumaObjetivo = this.matrix[0].reduce((acc, input) => acc + parseInt(input.value), 0);

        const esFilasMagicas = this.verificarFilas(0, sumaObjetivo);
        const esColumnasMagicas = this.verificarColumnas(0, sumaObjetivo);
        const esDiagonalesMagicas = this.verificarDiagonales();

        if (esFilasMagicas && esColumnasMagicas && esDiagonalesMagicas) {
            resultado.textContent = `Es un cuadro mágico. La constante mágica es ${sumaObjetivo}.`;
        } else {
            resultado.textContent = 'No es un cuadro mágico.';
        }
    }
}


let cuadroMagico;

document.getElementById('generateMatrixBtn').addEventListener('click', () => {
    const size = parseInt(document.getElementById('sizeInput').value);
    cuadroMagico = new CuadroMagico(size);
    cuadroMagico.generarMatriz();
});

document.getElementById('checkMagicSquareBtn').addEventListener('click', () => {
    if (cuadroMagico) {
        cuadroMagico.verificarCuadroMagico();
    } else {
        document.getElementById('result').textContent = 'Genera primero un cuadro.';
    }
});
