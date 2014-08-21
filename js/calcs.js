(function($) {

  var parseDateBR = function(string) {
    //string = data no formato  dd/mm/aaaa
    var arrAux = string.split("/");
    return new Date(arrAux[2], arrAux[1] - 1, arrAux[0]);
  };

  var isUselessDay = function(data) {
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

  var searchUsefulDay = function(data) {
    while (isUselessDay(data)) {
      data.setDate(data.getDate() + 1);
    }
    return data;
  };

  $.countingBegin = function(awareDate) {
    var begin = searchUsefulDay(awareDate);
    begin.setDate(begin.getDate() + 1);
    return searchUsefulDay(begin);
  };

  $.deadline = function(data, prazo) {
    var checkType = data instanceof Date;
    if (!checkType) {data = $.datepicker.parseDate('dd/mm/yy', data);};
    var endDay = $.countingBegin(data);
    endDay.setDate(endDay.getDate() + (prazo - 1));
    return searchUsefulDay(endDay);
  };

  $.testFunction = function(data) {
    return $.deadline(data, 15);
  };

})(jQuery);