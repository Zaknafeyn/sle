/**
 * Created by Valik on 9/21/14.
 */

var currentDimension = 0;

function setDimension(_dimension) {
    currentDimension = _dimension;
}

function getDimension(){
    return currentDimension;
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
        rowHtml += '<input class="form-control" style="width: 10px;" type="text" id="text_' + _rowNum + '_' + i +'" /><label>x<sub>'+ (_rowNum+1) + (i+1) +'</sub></label>';
        if (i != _dimension - 1)
        {
            rowHtml += '<label>&nbsp;+&nbsp;</label>'
        }
    }

    rowHtml += '<label>&nbsp;=&nbsp;</label><input class="form-control" style="width: 10px;" type="text" id="text_' + _rowNum + '_result" />';

    equationRowDiv.after().html(rowHtml);

    return equationRowDiv;
}

function changeSelectedMenu(_activeLinkNum){
    var menuAnchors = document.getElementById("left-menu").getElementsByTagName("a");
    for (var i=0; i<menuAnchors.length; i++){
        if (menuAnchors[i].tagName.toLowerCase() == "a"){
            console.log(menuAnchors[i]);
            console.log(menuAnchors[i].className);
            menuAnchors[i].className = 'list-group-item';
        }
    }

    menuAnchors[_activeLinkNum].className = 'list-group-item active';
}

function getInputsAndCalculate(){
    alert("Current dimension is:" + getDimension());
}