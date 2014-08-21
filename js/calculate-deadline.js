jQuery(document).ready(function($) {

  

  $('button#calc').click(function(event) {
    var prazo = $('#time-deadline').val();
    var ciente = $('#aware-date').val();

    if (prazo == '' && ciente == '') {
      $('div.time, div.aware').addClass('has-error');
      $('#s_deadline').html('<em class="text-danger">Preencha os campos em vermelho!</em>');
      $('#time-deadline').focus();
    } else if (prazo == '') {
      $('div.aware').removeClass('has-error');
      $('div.time').addClass('has-error');
      $('#s_deadline').html('<em class="text-danger">Preencha os campos em vermelho!</em>');
      $('#time-deadline').focus(); 
    } else if (ciente == '') {
      $('div.time').removeClass('has-error');
      $('div.aware').addClass('has-error');
      $('#s_deadline').html('<em class="text-danger">Preencha os campos em vermelho!</em>');
      $('#aware-date').focus();
    } else{
      $('div.time, div.aware').removeClass('has-error');
      $('span#s_deadline').empty();
      var deadline = $.deadline(ciente, prazo);
      $("#s_deadline").html('<strong>[</strong> Prazo final: <span class="text-danger"> <strong>'
       + $.datepicker.formatDate('D, d M yy', deadline) + '</strong></span> <strong>]</strong>');
    };

    // event.stopPropagation();
      
  });

  $('button#clear').click(function(event) {
    $(':text', $('#form_deadline')).val('');
    $('span#s_deadline').empty();
    $('div.time, div.aware').removeClass('has-error');
  });

  $(':input').inputmask();
  $('#time-deadline').inputmask('integer',
   {
      // placeholder: '0',
      rightAlign: false,
      repeat: 3
    });
});