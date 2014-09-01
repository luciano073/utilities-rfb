jQuery(document).ready(function($) {

  

  $('button#calc').click(function(event) {
    var prazo = $('#time-deadline').val();
    var ciente = $('#aware-date').val();

    if (prazo == '' && ciente == '') {
      $('div.time, div.aware').addClass('has-error');
      // $('#s_deadline').html('<em class="text-danger">Preencha os campos em vermelho!</em>');
      $('table#t-prazos').addClass('hidden');
      $('#time-deadline').focus();
    } else if (prazo == '') {
      $('div.aware').removeClass('has-error');
      $('div.time').addClass('has-error');
      // $('#s_deadline').html('<em class="text-danger">Preencha os campos em vermelho!</em>');
      $('table#t-prazos').addClass('hidden');
      $('#time-deadline').focus(); 
    } else if (ciente == '') {
      $('div.time').removeClass('has-error');
      $('div.aware').addClass('has-error');
      // $('#s_deadline').html('<em class="text-danger">Preencha os campos em vermelho!</em>');
      $('table#t-prazos').addClass('hidden');
      $('#aware-date').focus();
    } else{
      var dCiente = $.datepicker.parseDate('dd/mm/yy', ciente);
      var feriados = $.allHolidays(dCiente.getFullYear());
      var deadline = $.deadline(ciente, prazo);

      $('div.time, div.aware').removeClass('has-error');
      // $('span#s_deadline').empty();
      // $('ul', $('div#show-holidays')).empty();
      
      // console.log(deadline[0] + '::' + deadline[1] + '::' + deadline[2]);

      $('td#p-final').html('<span class="label label-danger">' 
        + $.datepicker.formatDate('D, d M yy', deadline[2]) + '</span>');
      $('td#x-dia').html(prazo + '&#176; dia');
      $('td#r-xdia').html('<small class="text-muted">' + 
        $.datepicker.formatDate('D, d M yy', deadline[1]) + '</small> ' +
        '<span id="s-xdia" data-toggle="tooltip"></span>');
      $('td#t-inicial').html('<small class="text-muted">' + 
        $.datepicker.formatDate('D, d M yy', deadline[0]) + '</small>');
      // $('td#ciente').html($.datepicker.formatDate('D, d M yy', ciente));
      $('td#ciente').html('<small class="text-muted">' + $.datepicker.formatDate('D, d M yy', dCiente)
        + '</small> <span id="s-ciente" data-toggle="tooltip"></span>');
      $('table#t-prazos').removeClass('hidden');

      $('span#s-ciente').removeClass('glyphicon glyphicon-info-sign text-muted');
      $('span#s-xdia').removeClass('glyphicon glyphicon-info-sign text-muted');

      for (var i = 0; i < feriados.length; i++) {
        if (deadline[1].getDate() == feriados[i].date.getDate() &&
         deadline[1].getMonth() == feriados[i].date.getMonth()) {
          $('span#s-xdia').tooltip({
            placement: 'right',
            title: feriados[i].name
          }).addClass('glyphicon glyphicon-info-sign text-muted');
        };

        if (dCiente.getDate() == feriados[i].date.getDate() &&
         dCiente.getMonth() == feriados[i].date.getMonth()) {
          $('span#s-ciente').tooltip({
            placement: 'right',
            title: feriados[i].name
          }).addClass('glyphicon glyphicon-info-sign text-muted');
        };
        // $('#ul-holiday-names').append('<li class="text-right"><small>'
        //  + feriados[i].name + '</small></li>');
        // $('#ul-holiday-dates').append('<li class="text-success"><small>' +
        //  $.datepicker.formatDate('D, d M yy', feriados[i].date) + '</small></li>');
      };

      // $('div#show-holidays').removeClass('hidden');

      $('button#clear').removeClass('hidden');
    };

    // $('span#s-xdia').removeClass('glyphicon glyphicon-info-sign text-muted');
    // $('span#s-ciente').removeClass('glyphicon glyphicon-info-sign text-muted');

    // event.stopPropagation();
      
  });

  $('button#clear').click(function(event) {
    $(':text', $('#form-deadline')).val('');
    $('table#t-prazos').addClass('hidden');
    $(this).addClass('hidden');
    $('div#show-holidays').addClass('hidden');
    $('div.time, div.aware').removeClass('has-error');
  });

  // $(':input').inputmask();
  $('#aware-date').inputmask('date', 
    {
      placeholder: 'DD/MM/AAAA',
      yearrange: {minyear: 1500, maxyear: 2199}
    }).tooltip(
    {
      title: 'Informe a data da ciência.',
      placement: 'bottom'
    });

  $('#time-deadline').inputmask('integer',
   {
      // placeholder: '0',
      rightAlign: false,
      repeat: 3
    }).tooltip(
    {
      title: 'Informe o prazo do recurso.',
      placement: 'bottom'
    });

  // $('span.glyphicon-info-sign').tooltip();
});