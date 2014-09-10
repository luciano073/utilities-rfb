jQuery(document).ready(function($) {
  
  $(':input', 'div#irpf').inputmask('numeric',
     {
        // numericInput: true,
        groupSeparator: '.',
        digits: 2,
        prefix: 'R$ ',
        placeholder: '0',
        autoGroup: true,
        digitsOptional: false,
        radixPoint: ',',
        rightAlign: true,
        autoUnmask: true,
        onUnMask: function(maskdeValue, unmaskedValue) {
            var str_aux = unmaskedValue.replace(/\.+/g, '');
            return Number(str_aux.replace(/,/g, '.'));
            // return unmaskedValue;
        }
        // nojumps: true
    });

  //Apura base de calculo IRPF
  $('div#irpf input:lt(5)').blur(function(e) {
    var field2 = $('div#irpf input:eq(1)').val();
    var field1 = $('div#irpf input:eq(0)').val();
    var field3 = $('div#irpf input:eq(2)').val();
    var field4 = $('div#irpf input:eq(3)').val();
    var field5 = $('div#irpf input:eq(4)').val();
    var field6 = field1 + field2 - field3 + field4 - field5;
    $('div#irpf input:eq(5)').val(field6);
    // alert(typeof(teste));
  });

  $('button#irpf-calc').click(function(e) {
    $('div#irpf input:eq(6)').val($.calcIrpf(2002, $('div#irpf input:eq(5)').val()));
  });

  
});


(function($) {
  $.calcIrpf = function(exercicio, val) {
     switch(exercicio) {
       case 2002:
         if (val <= 10800) {return 0;}
         else if(val > 10800 && val <= 21600) {
            return val * 0.15 - 1620;
         } else {
            return val * 0.275 - 4320;
         };         
         break;       
      case 2003:
        break;
    }
   
  };  
})(jQuery);
