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
    var aux = new Date(data);
    while (isUselessDay(aux)) {
      aux = new Date(aux.setDate(aux.getDate() + 1));
    }
    // return new Date(data);
    // console.log('funcion searchUsefulDay:');
    // console.log(data);
    return aux;
  };

  function awareDate(data) {
    return searchUsefulDay(data);
  }

  function countingBegin(awareDate) {
    // var begin = searchUsefulDay(awareDate);
    // var termoInicial = searchUsefulDay(awareDate);
    // var auxInicial = begin.setDate(begin.getDate() + 1);
    return searchUsefulDay(new Date(awareDate.setDate(awareDate.getDate() + 1)));
  };

  $.deadline = function(ciencia, prazo) {
    var checkType = ciencia instanceof Date;
    if (!checkType) {ciencia = $.datepicker.parseDate('dd/mm/yy', ciencia);};
    // console.log(searchUsefulDay(ciencia));
    var cienteEm = awareDate(ciencia);
    var auxDate1 = awareDate(ciencia)
    var termoInicial = countingBegin(auxDate1);
    // cienteEm = awareDate(ciencia);
    // console.log(cienteEm);
    // console.log(termoInicial);
    var auxDate = countingBegin(cienteEm);
    var contaPrazo = auxDate.setDate(auxDate.getDate() + (prazo - 1));
    var prazoFinal = searchUsefulDay(new Date (contaPrazo));
    return [termoInicial, new Date(contaPrazo), prazoFinal];
  };

  $.testFunction = function(data) {
    return $.deadline(data, 15);
  };

})(jQuery);