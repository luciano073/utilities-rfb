(function($) {

  var parseDateBR = function(string) {
    //string = data no formato  dd/mm/aaaa
    var arrAux = string.split("/");
    return new Date(arrAux[2], arrAux[1] - 1, arrAux[0]);
  };

  function isUselessDay(data) {
    if (data.getDay() == 0 || data.getDay() == 6) {return true;};

    var holidays = $.allHolidays(data.getFullYear());
    /*console.log(data);*/
    for (var i = 0; i < holidays.length; i++) {
      if (data.getDate() == holidays[i].date.getDate() && data.getMonth() == holidays[i].date.getMonth()) {
        return true;
      };
    };
    return false;
  };

  function searchUsefulDay(data) {
    while (isUselessDay(data)) {
      data = new Date(data.setDate(data.getDate() + 1));
    }
    // return new Date(data);
    return data;
  };

  function countingBegin(awareDate) {
    var begin = searchUsefulDay(awareDate);
    // var termoInicial = searchUsefulDay(awareDate);
    var auxInicial = begin.setDate(begin.getDate() + 1);
    return searchUsefulDay(new Date(auxInicial));
  };

  $.deadline = function(data, prazo) {
    var checkType = data instanceof Date;
    if (!checkType) {data = $.datepicker.parseDate('dd/mm/yy', data);};
    var termoInicial = countingBegin(data);
    var auxDate = countingBegin(data);
    var contaPrazo = auxDate.setDate(auxDate.getDate() + (prazo - 1));
    var prazoFinal = searchUsefulDay(new Date (contaPrazo));
    return [termoInicial, new Date(contaPrazo), prazoFinal];
  };

  $.testFunction = function(data) {
    return $.deadline(data, 15);
  };

})(jQuery);