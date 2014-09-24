
describe("Check passed parameters", function() {
    it("Calculates matrix", function() {
        var matrix = [[2,1],[2,3],[6,7]];
        var gaussian = new Gaussian(matrix, 2);
        expect(2).toEqual(gaussian.dimension);
        expect(matrix).toEqual(gaussian.matrix);
    });
});

describe("Check direct Gauss method", function() {
    it("Runs direct Gaussian method", function() {
        var matrix = [[2,1],[2,3],[6,7]];
        var result = [[2,0],[2,4],[6,8]];
        var gaussian = new Gaussian(matrix, 2);
        gaussian.directGauss();
        var checkResult = gaussian.checkDirectGauss();
        expect(result).toEqual(gaussian.matrix);
        expect(0).toEqual(checkResult);
    });
});

describe("Test row exchange method", function() {
    it("Exchanges rows in a matrix", function() {
        var matrix = [[2,1],[2,3],[6,7]];
        var result = [[1,2],[3,2],[7,6]];
        var gaussian = new Gaussian(matrix, 2);
        gaussian.exchangeRows(0,1);
        expect(result).toEqual(gaussian.matrix);
    });
});

describe("Test matrix validator", function() {
    it("Return error code if one of parameter is with zero coeffs", function() {
        var matrix = [[0,0],[0,3],[6,7]];
        var gaussian = new Gaussian(matrix, 2);
        expect(4).toEqual(gaussian.validate());
    });
});

describe("Check direct Gauss method on collinear vectors", function() {
    it("Runs direct Gaussian method", function() {
        var matrix = [[2,4],[2,4],[6,12]];
        var result = [[2,0],[2,0],[6,0]];
        var gaussian = new Gaussian(matrix, 2);
        gaussian.directGauss();
        var checkResult = gaussian.checkDirectGauss();
        expect(result).toEqual(gaussian.matrix);
        expect(1).toEqual(checkResult);
    });
});

describe("Check reverse Gauss method", function() {
    it("Runs direct Gaussian method", function() {
        var matrix = [[2,0],[2,4],[6,8]];
        var resultVector = [1,2];
        var gaussian = new Gaussian(matrix, 2);
        gaussian.reverseGauss();
        expect(resultVector).toEqual(gaussian.resultVector);
    });
});

describe("Control example sle 1", function() {
    it("Calculates matrix", function() {
        var matrix = [[2,1],[2,3],[6,7]];
        var result = [1, 2];
        var gaussian = new Gaussian(matrix, 2);

        var errCode = gaussian.calculate();
        expect(0).toEqual(gaussian.validate());
        expect(0).toEqual(errCode);
        expect(result).toEqual(gaussian.getResult());
    });
});


describe("Control example sle 2", function() {
    it("Calculates matrix", function() {
        var matrix = [[2,-3,-2],[1,-1,1],[-1,2,2],[8,-11,-3]];
        var result = [2,3,-1];
        var gaussian = new Gaussian(matrix, 3);
        var validationResult = gaussian.validate();
        var errCode = gaussian.calculate();
        expect(0).toEqual(validationResult);
        expect(0).toEqual(errCode);
        expect(result).toEqual(gaussian.getResult());
    });
});

describe("Control example sle 3", function() {
    it("Calculates collinear matrix", function() {
        var matrix = [[2,4],[2,4],[6,12]];
        var gaussian = new Gaussian(matrix, 2);
        var validationResult = gaussian.validate();
        var errCode = gaussian.calculate();
        expect(0).toEqual(validationResult);
        expect(0).toEqual(gaussian.validate());
        expect(1).toEqual(errCode);
    });
});

describe("Control example sle 4", function() {
    it("Calculates sle with float roots", function() {
        var matrix = [[2,4],[1,7],[2,9]];
        var result = [0.5,1];
        var gaussian = new Gaussian(matrix, 2);
        var validationResult = gaussian.validate();
        var errCode = gaussian.calculate();
        expect(0).toEqual(validationResult);
        expect(0).toEqual(errCode);
        expect(result).toEqual(gaussian.getResult());
    });
});

describe("Control example sle 5", function() {
    it("Calculates sle with all zeros in single column", function() {
        var matrix = [[0,0],[1,7],[2,9]];
        var gaussian = new Gaussian(matrix, 2);
        var validationResult = gaussian.validate();
        expect(4).toEqual(validationResult);
    });
});

describe("Control example sle 6", function() {
    it("Calculates matrix", function() {
        var matrix = [[0,1000,-3,4],[1,3,4,0],[3,1,1,-2],[2,-5,4,-3],[-1,-2,-1,4]];
        var result = [2,3,-1,0];
        var gaussian = new Gaussian(matrix, 4);
        var errCode = gaussian.calculate();
        expect(0).toEqual(gaussian.validate());
        expect(0).toEqual(errCode);
        expect(result).toEqual(gaussian.getResult());
    });
});