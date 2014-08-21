(function($) {
  
  function Holiday(name, day, month, year) {
    this.name = name;
    this.month = month;
    this.day = day;
    this.date = new Date(year, this.month -1, this.day);
  }

  var pascoa = function(year) {
    var diaPascoa;
    var mesPascoa;
    var c, n, m, k, i, j, l, d;
    
    //Calcula data da Páscoa segundo o algoritimo de "J. M. Oudin"
    
    c = year % 19;
    n = Math.floor(year / 100);
    k = (n - Math.floor(n/4) - Math.floor((8 * n) / 25) + 19 * c + 15) % 30;
    i = k - Math.floor(k/28) * (1 - Math.floor(k/28) * Math.floor(29 / (k+1)) * Math.floor((21 - c) / 11));
    j = (year + Math.floor(year/4) + i + 2 - n + Math.floor(n/4)) % 7;
    l = i - j;
    m = 3 + Math.floor((l+40)/44);
    d = l + 28 - (31 * Math.floor(m/4));

    diaPascoa = d;
    mesPascoa = m;

    return new Date(year, mesPascoa-1, diaPascoa);

  };

  $.dayOffs = function(year) {
    var dayoffs = [];
    var pascoaDate = pascoa(year)

    //Vespera de Carnaval (48 dias antes da Pascoa)
    pascoaDate.setDate(pascoaDate.getDate() - 48);
    dayoffs.push(new Holiday('Véspera de Carnaval', pascoaDate.getDate(), pascoaDate.getMonth()+1, year));
    //Quarta-Feira de Cinzas
    dayoffs.push(new Holiday('Quarta-Feira de Cinzas', pascoaDate.getDate()+2 , pascoaDate.getMonth()+1 , year));
    dayoffs.push(new Holiday('Véspera de Natal', 24, 12, year));
    dayoffs.push(new Holiday('Véspera de Ano Novo', 31, 12, year));

    return dayoffs;

  };
  
  $.staticHolidays = function(year) {
    // holidays fixos
    var holidays = [];
    holidays.push(new Holiday('Confraternização Mundial', 1, 1, year));
    holidays.push(new Holiday('Tiradentes', 21, 4, year));
    holidays.push(new Holiday('Dia do Trabalho', 1, 5, year));
    holidays.push(new Holiday('Padroeira de Goiânia', 24, 5, year));
    holidays.push(new Holiday('Dia da Independência', 7, 9, year));
    holidays.push(new Holiday('Nossa Senhora Aparecida', 12, 10, year));
    holidays.push(new Holiday('Aniversário de Goiânia', 24, 10, year));
    holidays.push(new Holiday('Finados', 2, 11, year));
    holidays.push(new Holiday('Proclamação da República', 15, 11, year));
    holidays.push(new Holiday('Natal', 25, 12, year));

    return holidays;

  };

  $.flexibleHolidays = function(year) {
    var flexHolidays = [];
    var auxDate = pascoa(year);
    var monthPascoa = auxDate.getMonth();
    var dayPascoa = auxDate.getDate();


    //Terça de Carnaval 47 dias antes da pascoa
    auxDate.setDate(dayPascoa - 47);
    flexHolidays.push(new Holiday('Carnaval', auxDate.getDate(), auxDate.getMonth()+1, year));

    //Sexta-Feira Santa
    auxDate.setMonth(monthPascoa);
    auxDate.setDate(dayPascoa - 2);
    flexHolidays.push(new Holiday('Sexta-Feira Santa', auxDate.getDate(), auxDate.getMonth()+1, year));

    //Corpus Christi 60 dias depois da pascoa
    auxDate.setMonth(monthPascoa);
    auxDate.setDate(dayPascoa + 60);
    flexHolidays.push(new Holiday('Corpus Christi', auxDate.getDate(), auxDate.getMonth()+1, year));

    return flexHolidays.sort(function(a, b) {
        return a.date - b.date;
    });
  };

  $.allHolidays = function(year) {
      var sHolidays = $.staticHolidays(year);
      var fHolidays = $.flexibleHolidays(year);
      var dHolidays = $.dayOffs(year);
      var aHolidays = sHolidays.concat(fHolidays, dHolidays);
      return aHolidays.sort(function(a, b) {
        return a.date - b.date;
      });
  };

})(jQuery);
