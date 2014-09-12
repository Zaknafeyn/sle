/**
 * Created by Valik on 12.09.2014.
 */
/*
function  gauss(matrixCoeff, vectorEquationResults) {
    for(var i = 0; i< matrixCoeff.length; i++) {
        var a = matrixCoeff[i][i];
        for (var j = i+1; j < matrixCoeff.length; j++){
            var b = matrixCoeff[j][i];
            for (var k=i; k< matrixCoeff.length + 1; k++){
                matrixCoeff[j][k] = matrixCoeff[i][k] * b - matrixCoeff[j][k] * a;
            }
        }
    }

    for (var i = matrixCoeff)
}*/

function Gaussian(matrix) {
    var matrix = matrix;

    var dimention = matrix.length;
    var vector = new Array(dimention);

    this.validate = function () {
        if (matrix.length != dimention)
            return 1;

        if (vector.length != dimention)
            return 1;

        return 0;
    }

    var directGauss = function () {
        for (var i = 0; i < dimention - 1; i++) {
            var a = matrix[i][i];
            for (var j = i + 1; j < dimention; j++) {
                var temp = matrix[i][i] / matrix[j][i];
                for (var k = 0; k <= dimention; k++) {
                    matrix[j][k] = matrix[j][k] * temp - matrix[i][k];
                }
            }
        }
    }

    var reverseGauss = function () {
        vector[dimention - 1] = matrix [dimention - 1][dimention] / matrix [dimention - 1][dimention - 1];
        for (var i = dimention - 2; i >= 0; i--) {
            var temp = 0;
            for (var j = i + 1; j < dimention; j++) {
                temp += matrix[i][j] * vector[j];
            }
            vector[i] = (matrix[i][dimention] - temp) / matrix[i][i];
        }
    }

    this.calculate = function () {
        // direct
        directGauss();

        // reverse
        reverseGauss();

    }
}