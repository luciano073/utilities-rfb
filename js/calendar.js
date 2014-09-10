jQuery(document).ready(function($) {
  // var f = $.flexibleHolidays(2014);
  // var f = new Holiday('hoje', 5, 4);
  // for (var i = 0; i < f.length; i++) {
  //     document.write(f[i].name + " " + f[i].date.toLocaleString() + ", ");
  // };
  $('#calendar').datepicker({
    changeYear: true,
    beforeShowDay: function(date) {
        // var auxHolidays = $.flexibleHolidays(date.getFullYear());
        // var holidays = auxHolidays.concat($.staticHolidays(date.getFullYear()));
        var holidays = $.sortStaticAndFlexHolidays(date.getFullYear());
        for (var i = 0; i < holidays.length; i++) {
            if (date.getMonth() == holidays[i].month - 1 && date.getDate() == holidays[i].day) {
              $('div#calendar').append('<h6 id="cal-holidays" class="text-danger">' + holidays[i].day 
                + ' - ' + holidays[i].name + '</h6>');
              return [true, 'holidays', holidays[i].name];
            };
        
        };
        return [true, ''];
    },
    onChangeMonthYear: function(year, month, inst) {
      
      $('h6').remove();
      
    },
    showOtherMonths: true
  });
  // $('.ui-datepicker-calendar').css('font-size', '0.8em');
});