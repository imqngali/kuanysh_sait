jQuery(document).ready(function () {

  jQuery('.form-group.text-center.send #submitManager').on('click', function () {
    $("#form-formcreator189").submit(function (event) {
      ym(450763, 'reachGoal', 'send_vopros');
      console.log('send_vopros');
    });
  });

  jQuery('.box-info-product #btnOrderInClick').on('click', function () {
    ym(450763, 'reachGoal', '1_klik')
    console.log('1_klik');
  });

  jQuery('.col-sm-12.form-group.text-center #submitFastOrder').on('click', function () {
    $("#modalOrderInclick form").submit(function (event) {
      ym(450763, 'reachGoal', 'send_1klik');
      console.log('send_1klik');
    });
  });

});