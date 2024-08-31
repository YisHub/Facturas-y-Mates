var tblProducts;
var vents = {
  items: {
    cli: '',
    date_joined: '',
    subtotal: 0.00,
    iva: 0.00,
    total: 0.00,
    products: []
  },
  calculate_invoice: function () {

    var subtotal = 0.00;
    var iva = $('input[name="iva"]').val();
    $.each(this.items.products, function (pos, dict) {

      dict.subtotal = dict.cant * parseFloat(dict.pvp);
      subtotal += dict.subtotal;

    });
    this.items.subtotal = subtotal;
    this.items.iva = this.items.subtotal * iva;
    this.items.total = this.items.subtotal + this.items.iva;

    $('input[name="subtotal"]').val(this.items.subtotal.toFixed(2));
    $('input[name="ivacalc"]').val(this.items.iva.toFixed(2));
    $('input[name="total"]').val(this.items.total.toFixed(2));

  },
  add: function (item) {
    this.items.products.push(item);
    this.list();

  },
  list: function () {
    this.calculate_invoice();
    tblProducts = $('#tblProducts').DataTable({
      responsive: true,
      autoWidth: false,
      destroy: true,
      deferRender: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-AR.json'
      },
      data: this.items.products,
      columns: [
        { "data": "id" },
        { "data": "name" },
        { "data": "cat.name" },
        { "data": "pvp" },
        { "data": "cant" },
        { "data": "subtotal" },
      ],
      columnDefs: [
        {
          targets: [0],
          class: 'text-center',
          orderable: false,
          render: function (data, type, row) {
            return '<a rel="remove" type="button" class="btn btn-danger btn-xs "><i class="fas fa-trash-alt"></i></a>';
          }
        },
        {
          targets: [-3],
          class: 'text-center',
          orderable: false,
          render: function (data, type, row) {
            return '$' + parseFloat(data).toFixed(2);
          }
        },
        {
          targets: [-2],
          class: 'text-center',
          orderable: false,
          render: function (data, type, row) {
            return '<input type="text" name="cant" class="form-control form-control-sm input-sm" autocomplete="off" value="' + row.cant + '" >';
          }
        },
        {
          targets: [-1],
          class: 'text-center',
          orderable: false,
          render: function (data, type, row) {
            return '$' + parseFloat(data).toFixed(2);
          }
        },
      ],
      rowCallback(row, data, displayNum, displayIndex, dataIndex) {
        $(row).find('input[name="cant"]').TouchSpin({
          min: 1,
          max: 1000000,
          step: 1
        });
      },
      initComplete: function (settings, json) {

      }
    });
  }
}

function formatRepo(repo) {
  if (repo.loading) {
    return repo.text;
  }

  var option = $(
    `<div class="wrapper container">
      <div class="row">
        <div class="col-lg-12 text-left shadow-sm">
          <img src="${repo.image}" style="width: 100px; height: 100px; margin-right: 20px;" class="img-thumbnail rounded float-start">
          <p style="margin-bottom: 0;">
            <b>Nombre:</b> ${repo.name}<br>
            <b>Categoria:</b> ${repo.cat.name}<br>
            <b>PVP:</b> <span class="badge bg-warning">$${repo.pvp}</span>
          </p>
        </div>
      </div>
    </div>`
  );

  return option;

}

$(function () {
  $('.btnRemoveAll').hide();
  $('.select2').select2({
    theme: 'bootstrap-5',
    language: 'es',
    placeholder: "Seleccione el cliente",
  });

  // date sale
  if ($('input[name="action"]').val() === 'edit') {

    var input_datejoined = $('input[name="date_joined"]');

    input_datejoined.datetimepicker({
      useCurrent: false,
      format: 'YYYY-MM-DD',
      locale: 'es',
      keepOpen: false,
    });

    input_datejoined.datetimepicker('date', input_datejoined.val());

  } else {
    $('#date_joined').datetimepicker({
      format: 'YYYY-MM-DD',
      date: moment().format("LL"),
      locale: 'es',
      //minDate: moment().format("YYYY-MM-DD")
    });
  }

  $('.btnRemoveAll').on('click', function () {
    if (vents.items.products.length === 0) return false;
    alert_action('Alerta!', 'Estas a punto de eliminar todos los items ¿deseas continuar?', function () {
      vents.items.products = [];
      vents.list();
      $('.btnRemoveAll').hide();
    })
  })

  // event cant
  $('#tblProducts tbody')
    .on('click', 'a[rel="remove"]', function () {
      var tr = tblProducts.cell($(this).closest('td, li')).index();
      //console.log("El valor de tr.row afuera es de " + tr.row);
      alert_action('Alerta!', 'Estas a punto de eliminar un producto de la lista ¿deseas continuar?', function () {
        //console.log("El valor de tr.row adentro es de " + tr.row);
        vents.items.products.splice(tr.row, 1);
        vents.list();
        if (vents.items.products.length === 0) {
          $('.btnRemoveAll').hide(); // Ocultar el botón cuando no hay productos
        }
      })
    })
    .on('change', 'input[name="cant"]', function () {
      console.clear();
      var cant = parseInt($(this).val());
      var tr = tblProducts.cell($(this).closest('td, li')).index();
      var data = tblProducts.row(tr.row).data();
      vents.items.products[tr.row].cant = cant;
      vents.calculate_invoice();
      $('td:eq(5)', tblProducts.row(tr.row).node()).html('$' + vents.items.products[tr.row].subtotal.toFixed(2));
    })
  // iva
  $("input[name='iva']").TouchSpin({
    min: 0,
    max: 100,
    step: 0.01,
    decimals: 2,
    boostat: 5,
    maxboostedstep: 10,
    postfix: '%'
  }).on('change', function () {
    vents.calculate_invoice();
  }).val(0.21);
  // event submit
  // Función para manejar el envío del formulario 
  $('form').on('submit', function (e) {
    e.preventDefault();
    if (vents.items.products.length === 0) {
      message_error('Tiene que tener al menos un producto en su lista');
      return false;
    }

    vents.items.date_joined = $('input[name="date_joined"]').val();
    vents.items.cli = $('select[name="cli"]').val();
    var parameters = new FormData()
    parameters.append('action', $('input[name="action"]').val());
    parameters.append('vents', JSON.stringify(vents.items));

    submit_with_ajax(window.location.pathname, 'Alerta!', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
      location.href = '/erp/sale/list/';
    })
  })

  //vents.list();

  // search products 2
  $('select[name="search"]').select2({
    theme: "bootstrap-5",
    allowClear: true,
    ajax: {
      delay: 250,
      type: 'POST',
      url: window.location.pathname,
      data: function (params) {
        var queryParameters = {
          term: params.term,
          action: 'search_products'
        }
        return queryParameters;
      },
      processResults: function (data) {
        return {
          results: data
        };
      },
    },
    placeholder: 'Ingrese una descripción del producto',
    minimumInputLength: 1,
    templateResult: formatRepo,
  }).on('select2:select', function (e) {
    var data = e.params.data;
    data.cant = 1;
    data.subtotal = 0.00;
    vents.add(data);
    $(this).val('').trigger('change');
  })
})
