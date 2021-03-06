$(function () {
    var core = {
        buildTables: function (data) {
            var titles = Object.keys(data);
            titles.forEach(function (title) {
                data[title].forEach(function (chart) {
                    var container = document.createElement('div');
                    var table = document.createElement('table');
                    table.appendChild(core.addTableHead(chart));
                    table.appendChild(core.addTableBody(chart));
                    container.className = "table-container";
                    container.appendChild(core.addNavbar(title, chart.chartName));
                    container.appendChild(table);
                    $('.tables-container').append(container);
                })
            });
        },
        addNavbar: function (title, chartName) {
            var div = document.createElement('div');
            div.className = "nav-container nav-dark";
            div.innerHTML = '<span>' + title + ' - ' + chartName + '</span>';
            return div;
        },
        addTableHead: function (data) {
            var head = document.createElement('thead');
            var headRow = document.createElement('tr');
            var cells = [];
            data.chartData.forEach(function (row) {
                row.data.forEach(function (cell) {
                    for (col in cell) break;
                    cells.push(col);
                });
            });
            headRow.appendChild(this.getHeaderCell('Rows'));
            _.uniq(cells).forEach(function (d) {
                headRow.appendChild(core.getHeaderCell(d));
            });
            head.appendChild(headRow);
            return head;
        },
        getHeaderCell: function (content) {
            var th = document.createElement('th');
            th.className = "header_cells cell-gray";
            th.innerHTML = content;
            return th;
        },
        addTableBody: function (data) {
            var tbody = document.createElement('tbody');
            var colsCount = null;
            data.chartData.forEach(function (row) {
                if (!colsCount) {
                    colsCount = row.data.length;
                }
                if (colsCount == row.data.length) {
                    var rowElement = document.createElement('tr');
                    var colWidth = 100/(row.data.length+1);
                    rowElement.appendChild(core.getTableCell(false, row.row, colWidth));
                    row.data.forEach(function (cell) {
                        for (col in cell) break;
                        var tdStyle = cell.good == "True" ? "cell-green" : "cell-red";
                        rowElement.appendChild(core.getTableCell(tdStyle, cell[col], colWidth));
                    });
                    tbody.appendChild(rowElement);
                }
            });

            return tbody;
        },
        getTableCell: function (cl, content, width) {
            var td = document.createElement('td');
            if (cl) {
                td.className = cl;
            }
            td.innerHTML = content;
            td.style.cssText = 'width:'+width+'%';
            return td;
        }
    };
    var jqxhr = $.getJSON( "data.json", function(data) {
        if (data){
            data.allData.forEach(function (d) {
                core.buildTables(d);
            });
        }
    })
    .fail(function(err) {
        console.log( err );
    });
});
