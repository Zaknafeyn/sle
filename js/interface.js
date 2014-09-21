/**
 * Created by Valik on 9/21/14.
 */

var currentDimension = 0;

function resetInterface(){
    // hide results
    $("#solutionPlaceholder").hide();

    var menuAnchors = document.getElementById("left-menu").getElementsByTagName("a");
    for (var i=0; i<menuAnchors.length; i++){
        if (menuAnchors[i].tagName.toLowerCase() == "a"){
            menuAnchors[i].className = 'list-group-item';
        }
    }
}

function setDimension(_dimension) {
    currentDimension = _dimension;
}

function getDimension(){
    return currentDimension;
}

function getTextBoxCoeffId(row, col){
    return "text_" + row + "_" + col;
}

function getTextBoxResultId(row){
    return "text_" + row + "_result";
}

function arrangeMatrix(_dimension, _containerName){
    console.log(_dimension);

    setDimension(_dimension);

    // display button
    $("#calcButtonPlaceholder").show();

    // change selected menu
    changeSelectedMenu(_dimension-2);
    // build form

    // remove old matrix
    $(_containerName).html('');
    // build new matrix


    for(var i=0; i<_dimension; i++) {
        var row = equationRow(_dimension, i);
        row.appendTo(_containerName);
    }
}

function equationRow(_dimension, _rowNum) {
    var equationRowDiv = $(document.createElement('div'))
        .attr({'id': 'equationRowDiv' + _rowNum,
              'class': 'form-inline'});

    var rowHtml = "("+(_rowNum+1)+")&nbsp;&nbsp;";

    for (var i = 0; i<_dimension; i++) {
        rowHtml += '<input class="form-control" maxlength="5" style="width: 80px;" type="text" id="' + getTextBoxCoeffId(_rowNum, i) + '" />'+
            '<label>x<sub>' + (i+1) +'</sub></label>';
        if (i != _dimension - 1)
        {
            rowHtml += '<label>&nbsp;+&nbsp;</label>'
        }
    }

    rowHtml += '<label>&nbsp;=&nbsp;</label><input class="form-control" maxlength="5" style="width: 80px;" type="text" id="' + getTextBoxResultId(_rowNum) + '" />';

    equationRowDiv.after().html(rowHtml);

    return equationRowDiv;
}

function changeSelectedMenu(_activeLinkNum){
    // reset interface each time when navigate to another menu item
    resetInterface();

    var menuAnchors = document.getElementById("left-menu").getElementsByTagName("a");

    menuAnchors[_activeLinkNum].className = 'list-group-item active';
}

function getInputsAndCalculate(){
    var dimension = getDimension();
    var matrix = new Array(dimension+1);
    var freeCoeffVector = new Array(dimension);

    for(var i=0;i<dimension; i++){ // i iterates cols
        var coeffs = new Array(dimension);
        for(var j=0; j<dimension;j++){  // j iterates rows
            coeffs[j] = document.getElementById(getTextBoxCoeffId(j, i)).value;
        }
        matrix[i] = coeffs;
        freeCoeffVector[i] = document.getElementById(getTextBoxResultId(i)).value;
    }

    matrix[dimension] = freeCoeffVector;

    var matrixCalc = new Gaussian(matrix, dimension);
    var result = matrixCalc.calculate();

    displayResults(result, "#solutionPlaceholder")
}

function displayResults(resultVector, containerName){

    $(containerName).show();
    // clean container
    $(containerName).html("");
    var html = "<h3>Results</h3>";
    html += '<ul class="list-unstyled">';
    for(var i = 0; i < resultVector.length; i++){
        html += '<li><label>x<sub>' + (i+1) + '</sub>&nbsp;=&nbsp;' + resultVector[i] + '</label></li>';
    }
    html += "</ul>";

    $(containerName).after().html(html);
}