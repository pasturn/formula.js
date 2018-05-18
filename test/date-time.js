/* global suite, test */
var error = require('../lib/error');
var dateTime = require('../lib/date-time');
require('should');

describe('Date & Time', function() {
  it('DATE', function() {
    dateTime.DATE(1900, 1, 1).should.equal(1);
    dateTime.DATE(1900, 3, 2).should.equal(62);
    dateTime.DATE(1900, 1, -1).should.equal(error.num);
    dateTime.DATE('invalid').should.equal(error.value);
  });

  it('DATEVALUE', function() {
    dateTime.DATEVALUE('1/1/1900').should.equal(1);
    dateTime.DATEVALUE('12/31/9999').should.equal(2958465);
    dateTime.DATEVALUE('22-MAY-2011').should.equal(40685);
    dateTime.DATEVALUE('foo bar').should.equal(error.value);
    dateTime.DATEVALUE(1).should.equal(error.value);
  });

  it('DATESTRING', function() {
    dateTime.DATESTRING(1).should.equal('1900-01-01');
    dateTime.DATESTRING(39448).should.equal('2008-01-01');
    dateTime.DATESTRING(-1).should.equal(error.num);
    dateTime.DATESTRING('a').should.equal(error.value);
  });

  it('DAY', function() {
    dateTime.DAY(1).should.equal(1);
    dateTime.DAY(2958465).should.equal(31);
    dateTime.DAY('1').should.equal(1);
    dateTime.DAY('1/1/1900').should.equal(1);
    dateTime.DAY(new Date(1900, 0, 1)).should.equal(1);
    dateTime.DAY(-1).should.equal(error.num);
    dateTime.DAY('a').should.equal(error.value);
  });

  it('DAYS', function() {
    dateTime.DAYS(2, 1).should.equal(1);
    dateTime.DAYS('1/2/1900', '1/1/1900').should.equal(1);
    dateTime.DAYS(new Date(1900, 1, 2), new Date(1900, 1, 1)).should.equal(1);
    dateTime.DAYS('a', 1).should.equal(error.value);
    dateTime.DAYS(1, 'a').should.equal(error.value);
  });

  it('DAYS360', function() {
    dateTime.DAYS360('1/1/1901', '1/2/1901', true).should.equal(1);
    dateTime.DAYS360('1/1/1901', '12/31/1901', true).should.equal(359);
    dateTime.DAYS360('1/1/1901', '1/1/1902', true).should.equal(360);
    dateTime.DAYS360('1/1/1901', '2/1/1901', true).should.equal(30);
    dateTime.DAYS360('1/1/1901', '1/2/1901', false).should.equal(1);
    dateTime.DAYS360('1/1/1901', '12/31/1901', false).should.equal(360);
    dateTime.DAYS360('1/1/1901', '1/1/1902', false).should.equal(360);
    dateTime.DAYS360('1/1/1901', '2/1/1901', false).should.equal(30);
    dateTime.DAYS360('1/30/1901', '12/31/1901', false).should.equal(330);
    dateTime.DAYS360('1/1/1901', 'a').should.equal(error.value);
    dateTime.DAYS360('a', '1/2/1901').should.equal(error.value);
    dateTime.DAYS360('1/1/1901', '1/2/1901', 'a').should.equal(error.value);
  });

  it('EDATE', function() {
    dateTime.EDATE('1/1/1900', 0).should.equal(1);
    dateTime.EDATE('1/1/1900', 1).should.equal(32);
    dateTime.EDATE('1/1/1900', 12).should.equal(367);
    dateTime.EDATE('15-Jan-11', -1).should.equal(40527);
    dateTime.EDATE('a', 0).should.equal(error.value);
    dateTime.EDATE('1/1/1900', 'a').should.equal(error.value);
  });

  it('EOMONTH', function() {
    dateTime.EOMONTH('1/1/1900', 0).should.equal(31);
    dateTime.EOMONTH('1/1/1900', 1).should.equal(59);
    dateTime.EOMONTH('1/1/1900', 12).should.equal(397);
    dateTime.EOMONTH('1-Jan-11', -3).should.equal(40482);
    dateTime.EOMONTH('a', 0).should.equal(error.value);
    dateTime.EOMONTH('1/1/1900', 'a').should.equal(error.value);
  });

  it('HOUR', function() {
    dateTime.HOUR('1/1/1900').should.equal(0);
    dateTime.HOUR('1/1/1900 1:00').should.equal(1);
    dateTime.HOUR('1:00').should.equal(1);
    dateTime.HOUR('0.75').should.equal(18);
    dateTime.HOUR(0.75).should.equal(18);
    dateTime.HOUR(0.322916666666667).should.equal(7);
    dateTime.HOUR('a').should.equal(error.value);
  });

  it('INTERVAL', function() {
    dateTime.INTERVAL(undefined).should.equal(error.value);
    dateTime.INTERVAL(10000000).should.equal('P3M25DT17H46M40S');
    dateTime.INTERVAL('10000000').should.equal('P3M25DT17H46M40S');
  });

  it('ISODATESTRING', function() {
    dateTime.ISODATESTRING(1).should.equal(new Date('1900/01/01').toISOString());
    dateTime.ISODATESTRING(39448.375).should.equal(new Date('2008/01/01 09:00:00').toISOString());
    dateTime.ISODATESTRING(-1).should.equal(error.num);
    dateTime.ISODATESTRING('a').should.equal(error.value);
  });

  it('ISOWEEKNUM', function() {
    dateTime.ISOWEEKNUM('1/1/1901').should.equal(1);
    dateTime.ISOWEEKNUM('1/8/1901').should.equal(2);
    dateTime.ISOWEEKNUM('12/29/1901').should.equal(52);
    dateTime.ISOWEEKNUM('6/6/1902').should.equal(23);
    dateTime.ISOWEEKNUM('2012/3/9').should.equal(10);
    dateTime.ISOWEEKNUM('a').should.equal(error.value);
  });

  it('MINUTE', function() {
    dateTime.MINUTE('1/1/1901').should.equal(0);
    dateTime.MINUTE('1/1/1901 1:01').should.equal(1);
    dateTime.MINUTE('1:01').should.equal(1);
    dateTime.MINUTE(0.53125).should.equal(45);
    dateTime.MINUTE('a').should.equal(error.value);
  });

  it('MONTH', function() {
    dateTime.MONTH('1/1/1900').should.equal(1);
    dateTime.MONTH('12/1/1900').should.equal(12);
    dateTime.MONTH('15-Apr-11').should.equal(4);
    dateTime.MONTH(40648).should.equal(4);
    dateTime.MONTH('a').should.equal(error.value);
  });

  it('NETWORKDAYS', function() {
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-04').should.equal(1);
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-05').should.equal(2);
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-06').should.equal(3);
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-07').should.equal(3);
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-08').should.equal(3);
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-09').should.equal(4);
    dateTime.NETWORKDAYS('2013-12-07', '2013-12-07').should.equal(0);
    dateTime.NETWORKDAYS('2013-12-07', '2013-12-08').should.equal(0);
    dateTime.NETWORKDAYS('12/4/2013', '12/4/2013').should.equal(1);
    dateTime.NETWORKDAYS('12/4/2013', '1/4/2014', '1/1/2014').should.equal(22);
    dateTime.NETWORKDAYS('12/4/2013', '1/4/2014', ['1/1/2014', '1/2/2014', '1/3/2014']).should.equal(20);
    dateTime.NETWORKDAYS('12/4/2013', '1/4/2014', [['1/1/2014'], ['1/2/2014'], ['1/3/2014']]).should.equal(20);
    dateTime.NETWORKDAYS('a', '1/2/1900').should.equal(error.value);
    dateTime.NETWORKDAYS('1/1/1900', 'a').should.equal(error.value);
    dateTime.NETWORKDAYS('1/1/1900', '2/1/1900', 'a').should.equal(error.value);
  });

  it('NETWORKDAYS.INTL', function() {
    dateTime.NETWORKDAYS.INTL('12/4/2013', '12/5/2013').should.equal(2);
    dateTime.NETWORKDAYS.INTL('12/8/2013', '12/9/2013', 2).should.equal(0);
    dateTime.NETWORKDAYS.INTL('2/28/2006', '1/31/2006').should.equal(-21);
    dateTime.NETWORKDAYS.INTL('1/1/2006', '2/1/2006', '0010001', ['2006/1/2', '2006/1/16']).should.equal(20);
    dateTime.NETWORKDAYS.INTL('12/4/2013', '12/4/2013', -1).should.equal(error.value);
    dateTime.NETWORKDAYS.INTL('12/4/2013', '12/4/2013', 0).should.equal(error.value);
  });

  it('NOW', function() {
    dateTime.NOW().should.type('number');
  });

  it('SECOND', function() {
    dateTime.SECOND('1/1/1900').should.equal(0);
    dateTime.SECOND('1/1/1900 1:00:01').should.equal(1);
    dateTime.SECOND('1:00:29').should.equal(29);
    dateTime.SECOND(0.700208333333333).should.equal(18);
    dateTime.SECOND('a').should.equal(error.value);
  });

  it('TIME', function() {
    dateTime.TIME(0, 0, 0).should.equal(0);
    dateTime.TIME(1, 1, 1).should.approximately(0.04237268518518519, 1e-9);
    dateTime.TIME(-1, -1, -1).should.equal(error.num);
    dateTime.TIME('invalid').should.equal(error.value);
  });

  it('TIMESTRING', function() {
    dateTime.TIMESTRING(0.5).should.equal('12:00:00');
    dateTime.TIMESTRING(43237.0231481481481482).should.equal('00:33:20');
    dateTime.TIMESTRING(43237.520833333333333).should.equal('12:30:00');
    dateTime.TIMESTRING(-1).should.equal(error.num);
    dateTime.TIMESTRING('invalid').should.equal(error.value);
  });

  it('TIMEVALUE', function() {
    dateTime.TIMEVALUE('1/1/1900 00:00:00').should.equal(0);
    dateTime.TIMEVALUE('1/1/1900 12:00:00').should.approximately(0.5, 1e-9);
    dateTime.TIMEVALUE('12:00:00').should.approximately(0.5, 1e-9);
    dateTime.TIMEVALUE('a').should.equal(error.value);
  });

  it('TODAY', function() {
    dateTime.TODAY().should.type('number');
  });

  it('WEEKDAY', function() {
    dateTime.WEEKDAY('1/1/1901').should.equal(3);
    dateTime.WEEKDAY('1/1/1901', 2).should.equal(2);
    dateTime.WEEKDAY(39492).should.equal(5);
    dateTime.WEEKDAY(39492, 2).should.equal(4);
    dateTime.WEEKDAY(39492, 3).should.equal(3);
    dateTime.WEEKDAY(39492, 4).should.equal(error.value);
    dateTime.WEEKDAY(39492, 21).should.equal(error.value);
    dateTime.WEEKDAY('a').should.equal(error.value);
  });

  it('WEEKNUM', function() {
    dateTime.WEEKNUM('1/1/1900').should.equal(1);
    dateTime.WEEKNUM('2/1/1900').should.equal(5);
    dateTime.WEEKNUM('2/1/1909', 2).should.equal(6);
    dateTime.WEEKNUM('1/1/1901', 21).should.equal(1);
    dateTime.WEEKNUM(40977).should.equal(10);
    dateTime.WEEKNUM(40977,2).should.equal(11);
    dateTime.WEEKNUM('a').should.equal(error.value);
  });

  it('WORKDAY', function() {
    dateTime.WORKDAY('2008/10/1', 151).should.equal(39933);
    dateTime.WORKDAY(39722, 151).should.equal(39933);
    dateTime.WORKDAY('2008/10/1', 151, ['2008/11/26', '2008/12/4', '2009/1/21']).should.equal(39938);
    dateTime.WORKDAY('2008/10/1', 151, [['2008/11/26'], ['2008/12/4'], ['2009/1/21']]).should.equal(39938);
    dateTime.WORKDAY('a', 1, '1/2/1900').should.equal(error.value);
    dateTime.WORKDAY('1/1/1900', 'a').should.equal(error.value);
    dateTime.WORKDAY('1/1/1900', 1, 'a').should.equal(error.value);
    dateTime.WORKDAY('1/1/1900', -1).should.equal(error.num);
  });

  it('WORKDAY.INTL', function() {
    dateTime.WORKDAY.INTL('1/1/2012', 90, 11).should.equal(41013);
    dateTime.WORKDAY.INTL('1/1/2012', 30, 17).should.equal(40944);
    dateTime.WORKDAY.INTL('1/1/1900', 1, 'a').should.equal(error.value);
    dateTime.WORKDAY.INTL('1/1/1900', 1, 0).should.equal(error.value);
  });

  it('YEAR', function() {
    dateTime.YEAR('1/1/1900').should.equal(1900);
    dateTime.YEAR(39933).should.equal(2009);
    dateTime.YEAR('a').should.equal(error.value);
  });

  it('YEARFRAC', function() {
    dateTime.YEARFRAC('1/1/1900', '1/2/1900').should.approximately(0.002777777777777778, 1e-3);
    dateTime.YEARFRAC('1/31/1900', '3/31/1900', 0).should.approximately(0.16666666666666666, 1e-3);
    dateTime.YEARFRAC('1/31/1900', '2/1/1900', 0).should.approximately(0.002777777777777778, 1e-3);
    dateTime.YEARFRAC('1/30/1900', '3/31/1900', 0).should.approximately(0.16666666666666666, 1e-3);

    dateTime.YEARFRAC('1/1/1900', '1/2/1900', 1).should.approximately(0.0027397260273972603, 1e-3);
    dateTime.YEARFRAC('1/1/1904', '1/1/1905', 1).should.equal(1);
    dateTime.YEARFRAC('5/1/1903', '5/1/1904', 1).should.equal(1);
    dateTime.YEARFRAC('1/1/1904', '1/2/1904', 1).should.approximately(0.00273224043715847, 1e-3);

    dateTime.YEARFRAC('1/1/1900', '1/2/1900', 2).should.approximately(0.002777777777777778, 1e-3);
    dateTime.YEARFRAC('1/1/1900', '1/2/1900', 3).should.approximately(0.0027397260273972603, 1e-3);
    dateTime.YEARFRAC('1/1/1900', '1/2/1900', 4).should.approximately(0.002777777777777778, 1e-3);
    dateTime.YEARFRAC('a', '1/2/1900').should.equal(error.value);
    dateTime.YEARFRAC('1/1/1900', 'a').should.equal(error.value);
  });
});
