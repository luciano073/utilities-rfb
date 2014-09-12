jQuery(document).ready(function($) {
  
  $(':input', $('div#irpf')).inputmask('numeric',
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
        allowMinus: false,
        onUnMask: function(maskdeValue, unmaskedValue) {
            var str_aux = unmaskedValue.replace(/\.+/g, '');
            return Number(str_aux.replace(/,/g, '.'));
            // return unmaskedValue;
        }
        // nojumps: true
    });

  $('select#s-ex').tooltip().focus();
  $('select#s-ex').change(function(e) {
      $('span#h-year').text(' - Exercicio ' + $('select#s-ex').val());
  }).blur(function(e) {
      if ($(this).val() != 0) {
        $('div#msg').empty();
        $('div#year').removeClass('has-error');
      };
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
    var year = $('select#s-ex').val();
    if (year == 0) {
        $('div#year').addClass('has-error');
        $('div#msg').html('<span class="label label-danger">Selecione o ano!</span>');
        window.scrollTo(0,0);
        $('select#s-ex').focus();
    } else{
        $('div#year').removeClass('has-error');
        $('div#msg').empty();
        $('div#irpf input:eq(6)').val($.calcIrpf(Number(year), $('div#irpf input:eq(5)').val()));
        var impostoApurado = $('div#irpf input:eq(6)').val();
        var field8 = $('div#irpf input:eq(7)').val();        
        var field9 = $('div#irpf input:eq(8)').val();        
        var field10 = $('div#irpf input:eq(9)').val();        
        var field11 = $('div#irpf input:eq(10)').val();        
        var field12 = $('div#irpf input:eq(11)').val();        
        var field13 = $('div#irpf input:eq(12)').val();
        var field14 = impostoApurado - field8 - field9 + field10 - field11 + field12 - field13
        $('div#irpf input:eq(13)').val(field14);
        var field15 = $('div#irpf input:eq(14)').val();
        var field16 = $('div#irpf input:eq(15)').val();
        var field17 = $('div#irpf input:eq(16)').val();
        if (field14 < 0) {
            $('div#irpf input:eq(13)').addClass('credito');
            $('div#irpf input:eq(13)').removeClass('debito');
            $('div#irpf input:eq(17)').addClass('credito');
            $('div#irpf input:eq(17)').val(field17 + field14);
        } else {
           $('div#irpf input:eq(13)').addClass('debito'); 
           $('div#irpf input:eq(13)').removeClass('credito');
           $('div#irpf input:eq(17)').val(field14 - field15);
           var field18 = field14 - field15;
           if (field18 < 0) {
                $('div#irpf input:eq(17)').addClass('credito');
                $('div#irpf input:eq(17)').removeClass('debito');
           } else{
                $('div#irpf input:eq(17)').addClass('debito');
                $('div#irpf input:eq(17)').removeClass('credito');
           };

        };        
    };
  });

  $('button#irpf-clear').click(function(e) {
      location.reload();
      window.scrollTo(0,0);
  });

  
});


(function($) {
  $.calcIrpf = function(year, val) {
     switch(year) {
       case 1999:
       case 2000:
       case 2001: 
       case 2002:
         if (val <= 10800) {return 0;}
         else if(val > 10800 && val <= 21600) {
            return val * 0.15 - 1620;
         } else {
            return val * 0.275 - 4320;
         };         
         break;       
      case 2003:
      case 2004:
      case 2005:
        if (val <= 12696) {return 0;}
        else if(val > 12696 && val <= 25380) {
           return val * 0.15 - 1904.4;
        } else {
           return val * 0.275 - 5076.9;
        };   
        break;
      case 2006:
        if (val <= 13968) {return 0;}
        else if(val > 13968 && val <= 27912) {
           return val * 0.15 - 2095.2;
        } else {
           return val * 0.275 - 5584.2;
        };
      break;
      case 2007:
        if (val <= 14932.32) {return 0;}
        else if(val > 14932.32 && val <= 29958.88) {
           return val * 0.15 - 2248.85;
        } else {
           return val * 0.275 - 5993.71;
        };
      break;
      case 2008:
        if (val <= 15764.28) {return 0;}
        else if(val > 15764.28 && val <= 31501.44) {
           return val * 0.15 - 2364.64;
        } else {
           return val * 0.275 - 6302.32;
        };
      break;
      case 2009:
        if (val <= 16473.72) {return 0;}
        else if(val > 16473.72 && val <= 32919) {
           return val * 0.15 - 2471.06;
        } else {
           return val * 0.275 - 6585.93;
        };
      break;
      case 2010:
        if (val <= 17215.08) {return 0;}
        else if(val > 17215.08 && val <= 25800) {
           return val * 0.075 - 1291.13;
        } else if (val > 25800 && val <= 34400.4){
           return val * 0.15 - 3226.13;
        } else if (val > 34400.4 && val <= 42984) {
           return val * 0.225 - 5806.16;
        } else {
           return val * 0.275 - 7955.36;
        };
      break;
      case 2011:
        if (val <= 17989.80) {return 0;}
        else if(val > 17989.80 && val <= 26961) {
           return val * 0.075 - 1349.24;
        } else if (val > 26961 && val <= 35948.40){
           return val * 0.15 - 3371.31;
        } else if (val > 35948.40 && val <= 44918.28) {
           return val * 0.225 - 6067.44;
        } else {
           return val * 0.275 - 8313.35;
        };
      break;
      case 2012:
        if (val <= 18799.32) {return 0;}
        else if(val > 18799.32 && val <= 28174.20) {
           return val * 0.075 - 1409.95;
        } else if (val > 28174.20 && val <= 37566.12){
           return val * 0.15 - 3523.01;
        } else if (val > 37566.12 && val <= 46939.56) {
           return val * 0.225 - 6340.47;
        } else {
           return val * 0.275 - 8687.45;
        };
      break;
      case 2013:
        if (val <= 19645.32) {return 0;}
        else if(val > 19645.32 && val <= 29442) {
           return val * 0.075 - 1473.40;
        } else if (val > 29442 && val <= 39256.56){
           return val * 0.15 - 3681.55;
        } else if (val > 39256.56 && val <= 49051.80) {
           return val * 0.225 - 6625.79;
        } else {
           return val * 0.275 - 9078.38;
        };
      break;
      case 2014:
        if (val <= 20529.36) {return 0;}
        else if(val > 20529.36 && val <= 30766.92) {
           return val * 0.075 - 1539.70;
        } else if (val > 30766.92 && val <= 41023.08){
           return val * 0.15 - 3847.22;
        } else if (val > 41023.08 && val <= 51259.08) {
           return val * 0.225 - 6923.95; 
        } else {
           return val * 0.275 - 9486.91;
        };
      break;
      case 2015:
        if (val <= 21453.24) {return 0;}
        else if(val > 21453.24 && val <= 32151.48) {
           return val * 0.075 - 1608.99;
        } else if (val > 32151.48 && val <= 42869.16){
           return val * 0.15 - 4020.35;
        } else if (val > 42869.16 && val <=  53565.72) {
           return val * 0.225 - 7235.54; 
        } else {
           return val * 0.275 - 9913.83;
        };
      break;
    }
   
  };  
})(jQuery);
