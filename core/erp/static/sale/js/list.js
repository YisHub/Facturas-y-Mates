var tblSale;

function format(d) {
    var html = '<table class="table table-sm">';
    html += '<thead>';
    html += '<tr><th scope="col">Producto</th>';
    html += '<th scope="col">Categoría</th>';
    html += '<th scope="col">PVP</th>';
    html += '<th scope="col">Cantidad</th>';
    html += '<th scope="col">Subtotal</th>';
    html += '</thead>';
    html += '<tbody>';
    $.each(d.det, function (key, value) {
        html += '<tr>'
        html += '<td>' + value.prod.name + '</td>'
        html += '<td>' + value.prod.cat.name + '</td>'
        html += '<td>' + value.price + '</td>'
        html += '<td>' + value.cant + '</td>'
        html += '<td>' + value.subtotal + '</td>'
        html += '</tr>';
    });
    html += '</tbody>';
    return html;
}

$(function () {
    tblSale = $('#data').DataTable({
        //responsive: true,
        scrollX: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-AR.json'
        },
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {
                'action': 'searchdata'
            },
            dataSrc: ""
        },
        columns: [
            {
                class: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: ''
            },
            { "data": "id" },
            { "data": "cli" },
            { "data": "date_joined" },
            { "data": "subtotal" },
            { "data": "iva" },
            { "data": "total" },
            { "data": "id" },
        ],
        columnDefs: [

            {
                targets: [-2, -3, -4],
                class: 'text-center',
                render: function (data, type, row) {
                    return '$' + parseFloat(data).toFixed(2);
                }
            },
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = '<a href="/erp/product/update/' + row.id + '/" class="btn btn-warning btn-xs btn-flat"><i class="fas fa-edit"></i></a> ';
                    buttons += '<a href="/erp/sale/delete/' + row.id + '/" type="button" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a> ';
                    buttons += '<a rel="details" class="btn btn-success btn-xs btn-flat"><i class="fas fa-search"></i></a>';
                    return buttons;
                }
            },
            {
                targets: [-8],
                orderable: false,
            },
        ],
        initComplete: function (settings, json) {

        }
    })
        .on('click', 'tbody td.dt-control', function () {
            let tr = event.target.closest('tr');
            let row = tblSale.row(tr);
            let idx = detailRows.indexOf(tr.id);

            if (row.child.isShown()) {
                tr.classList.remove('details');
                row.child.hide();
                detailRows.splice(idx, 1);
            }
            else {
                tr.classList.add('details');
                row.child(format(row.data())).show();
                if (idx === -1) {
                    detailRows.push(tr.id);
                }
            }
        })


    const detailRows = [];

    $('#data tbody')
        .on('click', 'a[rel="details"]', function () {
            var tr = tblSale.cell($(this).closest('td, li')).index();
            var data = tblSale.row(tr.row).data();

            $('#tblDet').DataTable({
                //responsive: true,
                scrollX: true,
                destroy: true,
                deferRender: true,
                language: {
                    url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-AR.json'
                },
                ajax: {
                    url: window.location.pathname,
                    type: 'POST',
                    data: {
                        'action': 'search_details_prod',
                        'id': data.id
                    },
                    dataSrc: ""
                },
                columns: [
                    { "data": "prod.name" },
                    { "data": "prod.cat.name" },
                    { "data": "price" },
                    { "data": "cant" },
                    { "data": "subtotal" },
                ],
                columnDefs: [

                    {
                        targets: [-1, -3],
                        class: 'text-center',
                        render: function (data, type, row) {
                            return '$' + parseFloat(data).toFixed(2);
                        }
                    },
                    {
                        targets: [-2],
                        class: 'text-center',
                        render: function (data, type, row) {
                            return data;
                        }
                    },
                ],
                initComplete: function (settings, json) {

                }
            })

            $('#myModalDet').modal('show');

        })


});