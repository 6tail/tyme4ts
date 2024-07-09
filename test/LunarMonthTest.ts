import {suite, test} from '@testdeck/mocha';
import {LunarDay, LunarMonth, SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class LunarMonthTest {
    @test
    test0() {
        equal(LunarMonth.fromYm(2359, 7).getName(), '七月');
    }

    /**
     * 闰月
     */
    @test
    test1() {
        equal(LunarMonth.fromYm(2359, -7).getName(), '闰七月');
    }

    @test
    test2() {
        equal(LunarMonth.fromYm(2023, 6).getDayCount(), 29);
    }

    @test
    test3() {
        equal(LunarMonth.fromYm(2023, 7).getDayCount(), 30);
    }

    @test
    test4() {
        equal(LunarMonth.fromYm(2023, 8).getDayCount(), 30);
    }

    @test
    test5() {
        equal(LunarMonth.fromYm(2023, 9).getDayCount(), 29);
    }

    @test
    test6() {
        equal(LunarMonth.fromYm(2023, 9).getFirstJulianDay().getSolarDay().toString(), '2023年10月15日');
    }

    @test
    test7() {
        equal(LunarMonth.fromYm(2023, 1).getSixtyCycle().getName(), '甲寅');
    }

    @test
    test8() {
        equal(LunarMonth.fromYm(2023, -2).getSixtyCycle().getName(), '丙辰');
    }

    @test
    test9() {
        equal(LunarMonth.fromYm(2023, 3).getSixtyCycle().getName(), '丁巳');
    }

    @test
    test10() {
        equal(LunarMonth.fromYm(2024, 1).getSixtyCycle().getName(), '丙寅');
    }

    @test
    test11() {
        equal(LunarMonth.fromYm(2023, 12).getSixtyCycle().getName(), '丙寅');
    }

    @test
    test12() {
        equal(LunarMonth.fromYm(2022, 1).getSixtyCycle().getName(), '壬寅');
    }

    @test
    test13() {
        equal(LunarMonth.fromYm(37, -12).getName(), '闰十二月');
    }

    @test
    test14() {
        equal(LunarMonth.fromYm(5552, -12).getName(), '闰十二月');
    }

    @test
    test15() {
        equal(LunarMonth.fromYm(2008, 11).next(1).toString(), '农历戊子年十二月');
    }

    @test
    test16() {
        equal(LunarMonth.fromYm(2008, 11).next(2).toString(), '农历己丑年正月');
    }

    @test
    test17() {
        equal(LunarMonth.fromYm(2008, 11).next(6).toString(), '农历己丑年五月');
    }

    @test
    test18() {
        equal(LunarMonth.fromYm(2008, 11).next(7).toString(), '农历己丑年闰五月');
    }

    @test
    test19() {
        equal(LunarMonth.fromYm(2008, 11).next(8).toString(), '农历己丑年六月');
    }

    @test
    test20() {
        equal(LunarMonth.fromYm(2008, 11).next(15).toString(), '农历庚寅年正月');
    }

    @test
    test21() {
        equal(LunarMonth.fromYm(2008, 12).next(-1).toString(), '农历戊子年十一月');
    }

    @test
    test22() {
        equal(LunarMonth.fromYm(2009, 1).next(-2).toString(), '农历戊子年十一月');
    }

    @test
    test23() {
        equal(LunarMonth.fromYm(2009, 5).next(-6).toString(), '农历戊子年十一月');
    }

    @test
    test24() {
        equal(LunarMonth.fromYm(2009, -5).next(-7).toString(), '农历戊子年十一月');
    }

    @test
    test25() {
        equal(LunarMonth.fromYm(2009, 6).next(-8).toString(), '农历戊子年十一月');
    }

    @test
    test26() {
        equal(LunarMonth.fromYm(2010, 1).next(-15).toString(), '农历戊子年十一月');
    }

    @test
    test27() {
        equal(LunarMonth.fromYm(2012, -4).getDayCount(), 29);
    }

    @test
    test28() {
        equal(LunarMonth.fromYm(2023, 9).getSixtyCycle().toString(), '癸亥');
    }

    @test
    test29() {
        const d: LunarDay = SolarDay.fromYmd(2023, 10, 7).getLunarDay();
        equal(d.getLunarMonth().getSixtyCycle().toString(), '壬戌');
        equal(d.getMonthSixtyCycle().toString(), '辛酉');
    }

    @test
    test30() {
        const d: LunarDay = SolarDay.fromYmd(2023, 10, 8).getLunarDay();
        equal(d.getLunarMonth().getSixtyCycle().toString(), '壬戌');
        equal(d.getMonthSixtyCycle().toString(), '壬戌');
    }

    @test
    test31() {
        const d: LunarDay = SolarDay.fromYmd(2023, 10, 15).getLunarDay();
        equal(d.getLunarMonth().getName(), '九月');
        equal(d.getLunarMonth().getSixtyCycle().toString(), '癸亥');
        equal(d.getMonthSixtyCycle().toString(), '壬戌');
    }

    @test
    test32() {
        const d: LunarDay = SolarDay.fromYmd(2023, 11, 7).getLunarDay();
        equal(d.getLunarMonth().getSixtyCycle().toString(), '癸亥');
        equal(d.getMonthSixtyCycle().toString(), '壬戌');
    }

    @test
    test33() {
        const d: LunarDay = SolarDay.fromYmd(2023, 11, 8).getLunarDay();
        equal(d.getLunarMonth().getSixtyCycle().toString(), '癸亥');
        equal(d.getMonthSixtyCycle().toString(), '癸亥');
    }

    @test
    test34() {
        // 2023年闰2月
        const m: LunarMonth = LunarMonth.fromYm(2023, 12);
        equal(m.toString(), '农历癸卯年十二月');
        equal(m.next(-1).toString(), '农历癸卯年十一月');
        equal(m.next(-2).toString(), '农历癸卯年十月');
    }

    @test
    test35() {
        // 2023年闰2月
        const m: LunarMonth = LunarMonth.fromYm(2023, 3);
        equal(m.toString(), '农历癸卯年三月');
        equal(m.next(-1).toString(), '农历癸卯年闰二月');
        equal(m.next(-2).toString(), '农历癸卯年二月');
        equal(m.next(-3).toString(), '农历癸卯年正月');
        equal(m.next(-4).toString(), '农历壬寅年十二月');
        equal(m.next(-5).toString(), '农历壬寅年十一月');
    }

    @test
    test36() {
        const d: LunarDay = SolarDay.fromYmd(1983, 2, 15).getLunarDay();
        equal(d.getLunarMonth().getSixtyCycle().toString(), '甲寅');
        equal(d.getMonthSixtyCycle().toString(), '甲寅');
    }

    @test
    test37() {
        const d: LunarDay = SolarDay.fromYmd(2023, 10, 30).getLunarDay();
        equal(d.getLunarMonth().getSixtyCycle().toString(), '癸亥');
        equal(d.getMonthSixtyCycle().toString(), '壬戌');
    }

    @test
    test38() {
        const d: LunarDay = SolarDay.fromYmd(2023, 10, 19).getLunarDay();
        equal(d.getLunarMonth().getSixtyCycle().toString(), '癸亥');
        equal(d.getMonthSixtyCycle().toString(), '壬戌');
    }

    @test
    test39() {
        const m: LunarMonth = LunarMonth.fromYm(2023, 11);
        equal(m.toString(), '农历癸卯年十一月');
        equal(m.getSixtyCycle().toString(), '乙丑');
    }

    @test
    test40() {
        equal(LunarMonth.fromYm(2018, 6).getSixtyCycle().toString(), '己未');
    }

    @test
    test41() {
        equal(LunarMonth.fromYm(2017, 12).getSixtyCycle().toString(), '甲寅');
    }

    @test
    test42() {
        equal(LunarMonth.fromYm(2018, 1).getSixtyCycle().toString(), '甲寅');
    }

    @test
    test43() {
        equal(LunarDay.fromYmd(2018, 6, 26).getMonthSixtyCycle().toString(), '庚申');
    }
}
