/**
 * Created by Valik on 12.09.2014.
 */

function Gaussian(_matrix, _dimension) {
    this.matrix = _matrix;

    this.dimension = _dimension;
    this.resultVector = new Array(this.dimension);

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

        return 0;
    };

    this.directGauss = function () {
        for (var i = 0; i < this.dimension - 1; i++) {
            for (var j = i + 1; j < this.dimension; j++) {
                var temp = this.matrix[i][i] / this.matrix[i][j];
                for (var k = 0; k <= this.dimension; k++) {
                    this.matrix[k][j] = this.matrix[k][j] * temp - this.matrix[k][i];
                }
            }
        }
    };

    this.reverseGauss = function () {
        this.resultVector[this.dimension - 1] = Math.round(this.matrix[this.dimension][this.dimension-1] / this.matrix[this.dimension-1][this.dimension - 1]);
        for (var i = this.dimension - 2; i >= 0; i--) {
            var temp = 0;
            for (var j = i + 1; j < this.dimension; j++) {
                temp += this.matrix[j][i] * this.resultVector[j];
            }
            this.resultVector[i] = Math.round((this.matrix[this.dimension][i] - temp) / this.matrix[i][i]);
        }
    };

    this.checkDirectGauss = function(){
        for(var i=0; i<this.dimension;i++){
            if (this.matrix[this.dimension][i]==0) {
                return 1;
            }
        }

        return 0; // matrix correct
    }

    this.checkReverseGauss = function(){
        return 0;
    }

    this.getResult = function() {
        return this.resultVector;
    }

    this.calculate = function () {
        // direct
        this.directGauss();

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

        return 0;
    }
}