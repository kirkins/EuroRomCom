var wordList;

$.getJSON( "../../data/completely-pan-romance.json", function(json) {
  wordList = json;
  buildHtmlTable('#excelDataTable');
});

// Builds the HTML Table out of wordList.
function buildHtmlTable(selector) {
  var columns = addAllColumnHeaders(wordList, selector);

  for (var i = 0; i < wordList.length; i++) {
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = wordList[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    $(selector).append(row$);
  }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(wordList, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');

  for (var i = 0; i < wordList.length; i++) {
    var rowHash = wordList[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }
  $(selector).append(headerTr$);

  return columnSet;
}
