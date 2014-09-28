/**
 * Created by Valik on 28.09.2014.
 */
function DisplaySolution(_solutionContainerName){
    this.solutionContainerName = _solutionContainerName;
    var stepCalc = 0;
    var html = "";

    this.clearContainer = function(){
        $(this.solutionContainerName).html("");
    };

    this.showContainer = function(){
        $(this.solutionContainerName).show();
    };

    this.addHeader = function(string){
        html += '<h4>' + string + '</h4>'
    };

    this.addAlert = function(string){
        html += '<h4 class="alert-danger">' + string + '</h4>'
    };

    this.addText = function(string){
        html += '<label>' + string + '<label>'
    };

    this.addStep = function(matrix, dimension){
        html += '<h5>Step - ' + stepCalc++ + '</h5>';
        html += '<ul class="list-unstyled">';
        for (var row =0; row < dimension; row++){
            html += '<li><label>(' + (row + 1) + ')&nbsp;';
            for(var col = 0; col <= dimension; col++){
                html += matrix[col][row] + '&nbsp;';
            }
            html +=  '</label></li>'
        }
        html += "</ul>";

        html += "<hr>";
    };

    this.displaySolution = function(){
        this.clearContainer();

        var html = "<h3>Results</h3>" + html;
        $(this.solutionContainerName).after().html(html);

        this.showContainer();
    };
}