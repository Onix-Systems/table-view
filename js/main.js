$(function () {
    $(".dropdown-button").dropdown();
    var jqxhr = $.getJSON( "data.json", function(data) {
            if (data){
                $("#dropdown1").empty();
                $('.dropdown-button span').html(data.titleList[0]);

                data.titleList.forEach(function (d) {
                    var list = document.createElement('li');
                    list.innerHTML = "<a href='javascript:void(0)' data-title='"+ d +"'>"+ d +"</a>";
                    $("#dropdown1").append(list);
                });

                $("#dropdown1 a").on('click',function () {
                    $('.dropdown-button span').html($(this).data('title'));
                    buildTable($(this).data('title'), data)
                });

                buildTable(data.titleList[0], data)
            }
        })
        .fail(function(err) {
            console.log( err );
        });

    function buildTable (table_name, data) {
        var table_data =  _.find(data.allData, table_name),
            table_head = $('table thead tr'),
            table_body = $('table tbody'),
            col = '',
            col_count = table_data[table_name][0].data.length + 1,
            col_width = 100/col_count;
            cols_names = [];

        $("table thead tr, table tbody").empty();

        var th = document.createElement('th');
        th.innerHTML = 'Rows';
        table_head.append(th);
        
        table_data[table_name].forEach(function (d,i) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.style.cssText = 'width:'+col_width+'%';
            td.innerHTML = d.row;
            tr.appendChild(td);
            table_body.append(tr);
            d.data.forEach(function (row_data) {
                for (col in row_data) break;
                cols_names.push(col);
                var td = document.createElement('td');
                td.className = row_data.good == "True" ? "blue accent-2" : "red accent-2";
                td.style.cssText = 'width:'+col_width+'%';
                td.innerHTML = row_data[col];
                table_body.find('tr:last-child').append(td);
            })
        });

        _.uniq(cols_names).forEach(function (d,i) {
            table_head.append('<th class="header_cells">'+ d +'</th>');
        });
    }
});
