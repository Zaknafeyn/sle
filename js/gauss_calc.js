/**
 * Created by Valik on 12.09.2014.
 */

function Gaussian(_matrix, _dimension) {
    this.matrix = _matrix;

    this.dimension = _dimension;
    this.resultVector = new Array(this.dimension);
    this.errorVector = new Array(this.dimension);

    this.validate = function () {

        if (this.matrix.length != this.dimension+1)
            return 1;

        for(var i =0; i< this.matrix.length; i++)
        {
            if (this.matrix[i].length != this.dimension)
            return 2;
        }

        if (this.resultVector.length != this.dimension)
            return 3;

        for(var i=0; i<this.dimension;i++){
            var allZeroes = true;
            for(var j=0; j<this.dimension && allZeroes == true;j++){
                if (this.matrix[i][j] != 0)
                  allZeroes = false;
            }

            if (allZeroes == true)
            return 4; // all coeffs in single row are zero
        }

        return 0;
    };

    this.directGauss = function () {
        for (var i = 0; i < this.dimension - 1; i++) {
            for (var j = i + 1; j < this.dimension; j++) {
                if (this.matrix[i][j] == 0) { // zero division
                    return 1;
                }

                var temp = this.matrix[i][i] / this.matrix[i][j];
                for (var k = 0; k <= this.dimension; k++) {
                    this.matrix[k][j] = this.matrix[k][j] * temp - this.matrix[k][i];
                }
            }
        }

        return 0;
    };

    this.exchangeRows = function(row1, row2){
        if(row1 == row2)
            return;
        for (var i=0; i<= this.dimension; i++){
            var temp = this.matrix[i][row1];
            this.matrix[i][row1] = this.matrix[i][row2];
            this.matrix[i][row2] = temp;
        }
    };

    this.copyMatrix = function(matrix){
        var newMatrix = new Array();
        for (var i=0; i<= this.dimension;i++){
            newMatrix[i] = new Array();
            for(var j=0;j<this.dimension;j++){
                newMatrix[i][j] = matrix[i][j];
            }
        }
        return newMatrix;
    };

    this.runDirectGauss = function(){
        var reserveMatrix = this.copyMatrix(this.matrix);
        var directGaussResult = 1;
        for(var i=0; i<this.dimension-1 && directGaussResult != 0;i++){
            this.matrix = this.copyMatrix(reserveMatrix);
            /*/if (i > 1 ){
                // return back after previous exchange
                this.exchangeRows(0, i-1);
            }*/
            this.exchangeRows(0, i);

            directGaussResult = this.directGauss();
        }

        return directGaussResult;
    };

    this.reverseGauss = function () {
        this.resultVector[this.dimension - 1] = this.roundResult(this.matrix[this.dimension][this.dimension-1] / this.matrix[this.dimension-1][this.dimension - 1]);
        for (var i = this.dimension - 2; i >= 0; i--) {
            var temp = 0;
            for (var j = i + 1; j < this.dimension; j++) {
                temp += this.matrix[j][i] * this.resultVector[j];
            }
            this.resultVector[i] = this.roundResult((this.matrix[this.dimension][i] - temp) / this.matrix[i][i]);
        }
    };

    this.roundResult = function(value){
        //return Math.round(value);

        var epsilon = 0.00001;

        var absValue = Math.abs(value);
        var sign = Math.round(value/absValue);

        var floorValue = Math.floor(absValue);
        var ceilValue = Math.ceil(absValue);
        var roundValue = Math.round(absValue);

        //console.log("value = " + value + " absValue = " + absValue + " sign = " + sign + " floorValue = " + floorValue +  " ceilValue = " + ceilValue + " roundValue = " + roundValue);

        if (value == 0)
            return value;

        if (Math.abs(floorValue - absValue) < epsilon){
            //console.log("return value = " + floorValue * sign);
            return floorValue * sign; // get sign of value
        }

        if (Math.abs(ceilValue - absValue) < epsilon)
        {
            //console.log("return value = " + floorValue * sign);
            return ceilValue * sign;
        }

        //console.log("return value = " + value);
        return value;

    };

    this.checkDirectGauss = function(){
        for(var i=0; i<this.dimension;i++){
            if (this.matrix[this.dimension][i]==0) {
                return 1;
            }
        }

        return 0; // matrix correct
    };

    this.checkReverseGauss = function(){
        return 0;
    };

    this.getResult = function() {
        return this.resultVector;
    };

    this.getErrorVector = function(){
        return this.errorVector;
    }

    this.calculate = function () {
        // direct
        this.runDirectGauss();

        var directGaussValidationResult = this.checkDirectGauss();
        if (directGaussValidationResult != 0)
        {
            return directGaussValidationResult;
        }

        // reverse
        this.reverseGauss();

        var reverseGaussCheckResult = this.checkReverseGauss();
        if (reverseGaussCheckResult != 0){
            return reverseGaussCheckResult;
        }

        this.calculateErrorVector();

        return 0;
    }

    this.calculateErrorVector = function(){
        for (var row = 0; row < this.dimension; row++) {
            this.errorVector[row] = this.matrix[this.dimension][row];
            for (var col = 0; col < this.dimension; col++) {
                this.errorVector[row] -= this.matrix[col][row] * this.resultVector[col];
            }
        }
    }
}