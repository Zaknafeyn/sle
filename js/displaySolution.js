/**
 * Created by Valik on 28.09.2014.
 */
function DisplaySolution(_solutionContainerName){
    this.solutionContainerName = _solutionContainerName;
    var stepCalc = 0;
    var html = "";

    this.clearContainer = function(){
        $(this.solutionContainerName).html("");
        //html = "";
    };

    this.showContainer = function(){
        $(this.solutionContainerName).show();
    };

    this.addHeader = function(string){
        html += '<h4>' + string + '</h4>';
        console.log("addHeader - " + string);
    };

    this.addAlert = function(string){
        html += '<h4 class="alert-danger">' + string + '</h4>';
        console.log("addAlert - " + string);
    };

    this.addStep = function(matrix, dimension){
        var stepHtml = "";

        stepHtml += '<h5>Step - ' + stepCalc++ + '</h5>';
        stepHtml += '<ul class="list-unstyled">';
        for (var row =0; row < dimension; row++){
            stepHtml += '<li><label>(' + (row + 1) + ')&nbsp;';
            for(var col = 0; col <= dimension; col++){
                stepHtml += matrix[col][row] + '&nbsp;';
            }
            stepHtml +=  '</label></li>'
        }
        stepHtml += "</ul>";

        stepHtml += "<hr>";

        html += stepHtml;

        console.log("add step" + stepCalc);
    };

    this.displaySolution = function(){

        this.clearContainer();

        html = "<h3>Solution steps</h3>" + html;
        $(this.solutionContainerName).after().html(html);
        console.log(html);

        this.showContainer();
    };
}