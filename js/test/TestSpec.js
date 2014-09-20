
describe("Check passed parameters", function() {
    it("Calculates matrix", function() {
        var matrix = [[2,1],[2,3],[6,7]];
        var gaussian = new Gaussian(matrix, 2);
        expect(gaussian.dimension).toEqual(2);
        expect(gaussian.matrix).toEqual(matrix);
    });
});

describe("Check direct Gauss method", function() {
    it("Runs direct Gaussian method", function() {
        var matrix = [[2,1],[2,3],[6,7]];
        var result = [[2,0],[2,4],[6,8]];
        var gaussian = new Gaussian(matrix, 2);
        gaussian.directGauss();
        expect(gaussian.matrix).toEqual(result);
    });
});

describe("Check reverse Gauss method", function() {
    it("Runs direct Gaussian method", function() {
        var matrix = [[2,0],[2,4],[6,8]];
        var resultVector = [1,2];
        var gaussian = new Gaussian(matrix, 2);
        gaussian.reverseGauss();
        expect(gaussian.vector).toEqual(resultVector);
    });
});


describe("Control example sle 1", function() {
    it("Calculates matrix", function() {
        var matrix = [[2,1],[2,3],[6,7]];
        var result = [1, 2];
        var gaussian = new Gaussian(matrix, 2);
        expect(gaussian.validate()).toEqual(0);
        expect(gaussian.calculate()).toEqual(result);
    });
});


describe("Control example sle 2", function() {
    it("Calculates matrix", function() {
        var matrix = [[2,-3,-2],[1,-1,1],[-1,2,2],[8,-11,-3]];
        var result = [2,3,-1];
        var gaussian = new Gaussian(matrix, 3);
        expect(gaussian.validate()).toEqual(0);
        expect(gaussian.calculate()).toEqual(result);
    });
});