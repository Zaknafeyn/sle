/**
 * Created by Valik on 12.09.2014.
 */

function Gaussian(_matrix, _dimension, _displaySolution) {
    this.matrix = _matrix;
    this.displaySolution = _displaySolution;

    this.dimension = _dimension;
    this.resultVector = new Array(this.dimension);
    this.errorVector = new Array(this.dimension);
    this.rootsOrder = new Array(this.dimension);

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

    this.getMaxElementIndex = function(vector, initialIndex){
        var maxIndex = initialIndex;
        var maxElement = vector[initialIndex];
        while (maxElement == 0 && maxIndex <= this.dimension){
            maxIndex++;
            maxElement = vector[maxIndex];
        }

        for (var i=initialIndex+1; i< this.dimension; i++){
            if (Math.abs(maxElement) < Math.abs(vector[i]) && vector[i] != 0){
                maxElement = vector[i];
                maxIndex = i;
            }
        }

        return maxIndex;
    };

    this.directGauss = function () {
        for (var i = 0; i < this.dimension - 1; i++) {

            var vector = new Array(this.dimension);
            for(var i_max = i; i_max<this.dimension; i_max++){
                vector[i_max] = this.matrix[i_max][i];
            }

            var maxIndex = this.getMaxElementIndex(vector, i);
            this.exchangeCols(i, maxIndex);

            var nextRow = i+1;
            while (this.matrix[i][i] == 0 && nextRow < this.dimension)
            {
                if (nextRow > i + 1)
                {
                    this.exchangeRows(i, nextRow-1);
                }
                this.exchangeRows(i, nextRow++);
            }

            if (this.matrix[i][i] == 0)
                return 1;

            for (var j = i + 1; j < this.dimension; j++) {

                if (this.matrix[i][j] == 0) {
                    continue;
                }

                var temp = this.matrix[i][i] / this.matrix[i][j];
                for (var k = 0; k <= this.dimension; k++) {
                    this.matrix[k][j] = this.matrix[k][j] * temp - this.matrix[k][i];
                }

                this.displaySolution.addStep(this.matrix, this.dimension);
            }
        }

        return 0;

    };

    this.oldDirectGauss = function () {
        for (var i = 0; i < this.dimension - 1; i++) {

            var nextRow = i+1;
            while (this.matrix[i][i] == 0 && nextRow < this.dimension)
            {
                if (nextRow > i + 1)
                {
                    this.exchangeRows(i, nextRow-1);
                }
                this.exchangeRows(i, nextRow++);
            }

            if (this.matrix[i][i] == 0)
                return 1;

            for (var j = i + 1; j < this.dimension; j++) {

                if (this.matrix[i][j] == 0) {
                    continue;
                }

                var temp = this.matrix[i][i] / this.matrix[i][j];
                for (var k = 0; k <= this.dimension; k++) {
                    this.matrix[k][j] = this.matrix[k][j] * temp - this.matrix[k][i];
                }

                this.displaySolution.addStep(this.matrix, this.dimension);
            }
        }

        return 0;
    };

    this.exchangeCols = function(col1, col2){
        if(col1 == col2)
            return;
        if (col1 > this.dimension-1 || col2 > this.dimension-1)
            return; // error - columns are out of range

        // exchange roots order
        var temp1 = this.rootsOrder[col1];
        this.rootsOrder[col1] = this.rootsOrder[col2];
        this.rootsOrder[col2] = temp1;

        // exchange columns
        for(var i=0; i<this.dimension; i++){
            var temp2 = this.matrix[col1][i];
            this.matrix[col1][i] = this.matrix[col2][i];
            this.matrix[col2][i] = temp2;
        }
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
        var newMatrix = [];
        for (var i=0; i<= this.dimension;i++){
            newMatrix[i] = [];
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
            this.exchangeRows(0, i);
            if (i != 0) {
                this.displaySolution.addHeader("Reorder matrix. Apply direct Gaussian pass for modified matrix")
            }
            directGaussResult = this.directGauss();
        }

        if (directGaussResult != 0) {
            // impossible to solve by gaussian method
            this.displaySolution.addAlert("Impossible to calculate sle")
        }

        return directGaussResult;
    };

    this.reverseGauss = function () {
        var rootIndex = this.rootsOrder[this.dimension-1];
        this.resultVector[rootIndex] = this.roundResult(this.matrix[this.dimension][this.dimension-1] / this.matrix[this.dimension-1][this.dimension - 1]);
        for (var i = this.dimension - 2; i >= 0; i--) {

            var temp = 0;
            for (var j = i + 1; j < this.dimension; j++) {
                temp += this.matrix[j][i] * this.resultVector[this.rootsOrder[j]];
            }

            var rootIndex = this.rootsOrder[i];
            this.resultVector[rootIndex] = this.roundResult((this.matrix[this.dimension][i] - temp) / this.matrix[i][i]);
        }
    };

    this.roundResult = function(value){
        //return Math.round(value);

        var epsilon = 0.00001;

        var absValue = Math.abs(value);
        var sign = Math.round(value/absValue);

        var floorValue = Math.floor(absValue);
        var ceilValue = Math.ceil(absValue);
        //var roundValue = Math.round(absValue);

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
    };

    this.arrangeRoots = function(){
        for(var i=0; i<this.dimension; i++){
            this.rootsOrder[i] = i;
        }
    };

    this.calculate = function () {
        var originalMatrix = this.copyMatrix(this.matrix);

        // initial roots arrangements
        this.arrangeRoots();

        // direct
        this.displaySolution.addHeader("Direct Gaussian pass");
        var directResult = this.runDirectGauss();
        if (directResult != 0)
            return directResult;

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

        this.calculateErrorVector(originalMatrix);

        return 0;
    };

    this.calculateErrorVector = function(originalMatrix){
        for (var row = 0; row < this.dimension; row++) {
            this.errorVector[row] = originalMatrix[this.dimension][row];
            for (var col = 0; col < this.dimension; col++) {
                this.errorVector[row] -= originalMatrix[this.rootsOrder[col]][row] * this.resultVector[this.rootsOrder[col]];
            }
        }
    }
}