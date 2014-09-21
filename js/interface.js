/**
 * Created by Valik on 9/21/14.
 */
function arrangeMatrix(_dimension, _containerName){
    console.log(_dimension);

    // change selected menu
    changeSelectedMenu(_dimension-2);
    // build form

    // remove old matrix
    $(_containerName).html('');
    // build new matrix


    var row = equationRow(_dimension, 0);
    row.appendTo(_containerName);

    var newEquationsDiv = $(document.createElement('div'))
        .attr("id", 'EquationsDiv');

    newEquationsDiv.after().html('<label>Textbox #' + ' : </label>' +
        '<input type="text" name="textbox' +
        '" id="textbox' + '" value="" >');

    /*
    $(_containerName).appendTo().html(newEquationsDiv);

    newEquationsDiv.appendTo(_containerName);
    */
        //html('<h1>SLE rank: ' + _dimension + '</h1>');
}

function equationRow(_dimension, _rowNum) {

    var equationRowDiv = $(document.createElement('div'))
        .attr('id', 'equationRowDiv' + _rowNum,
              'class', 'form-inline');

    var rowHtml = "("+_rowNum+")&nbsp;";

    for (var i = 0; i<_dimension; i++) {
        rowHtml += '<label>x11</label><input class="form-control" style="width: 10px;" type="text" id="text' + _rowNum + i +'" />'
    }

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