import {suite, test} from '@testdeck/mocha';
import {LunarDay} from '../lib';
import {equal} from 'assert';

@suite
class LunarDayTest {
    @test
    test1() {
        equal(LunarDay.fromYmd(0, 11, 18).getSolarDay().toString(), '1年1月1日');
    }

    @test
    test2() {
        equal(LunarDay.fromYmd(9999, 12, 2).getSolarDay().toString(), '9999年12月31日');
    }

    @test
    test3() {
        equal(LunarDay.fromYmd(1905, 1, 1).getSolarDay().toString(), '1905年2月4日');
    }

    @test
    test4() {
        equal(LunarDay.fromYmd(2038, 12, 29).getSolarDay().toString(), '2039年1月23日');
    }

    @test
    test5() {
        equal(LunarDay.fromYmd(1500, 1, 1).getSolarDay().toString(), '1500年1月31日');
    }

    @test
    test6() {
        equal(LunarDay.fromYmd(1500, 12, 29).getSolarDay().toString(), '1501年1月18日');
    }

    @test
    test7() {
        equal(LunarDay.fromYmd(1582, 9, 18).getSolarDay().toString(), '1582年10月4日');
    }

    @test
    test8() {
        equal(LunarDay.fromYmd(1582, 9, 19).getSolarDay().toString(), '1582年10月15日');
    }

    @test
    test9() {
        equal(LunarDay.fromYmd(2019, 12, 12).getSolarDay().toString(), '2020年1月6日');
    }

    @test
    test10() {
        equal(LunarDay.fromYmd(2033, -11, 1).getSolarDay().toString(), '2033年12月22日');
    }

    @test
    test11() {
        equal(LunarDay.fromYmd(2021, 6, 7).getSolarDay().toString(), '2021年7月16日');
    }

    @test
    test12() {
        equal(LunarDay.fromYmd(2034, 1, 1).getSolarDay().toString(), '2034年2月19日');
    }

    @test
    test13() {
        equal(LunarDay.fromYmd(2033, 12, 1).getSolarDay().toString(), '2034年1月20日');
    }

    @test
    test14() {
        equal(LunarDay.fromYmd(7013, -11, 4).getSolarDay().toString(), '7013年12月24日');
    }

    @test
    test15() {
        equal(LunarDay.fromYmd(2023, 8, 24).getSixtyCycle().toString(), '己亥');
    }

    @test
    test16() {
        equal(LunarDay.fromYmd(1653, 1, 6).getSixtyCycle().toString(), '癸酉');
    }

    @test
    test17() {
        equal(LunarDay.fromYmd(2010, 1, 1).next(31).toString(), '农历庚寅年二月初二');
    }

    @test
    test18() {
        equal(LunarDay.fromYmd(2012, 3, 1).next(60).toString(), '农历壬辰年闰四月初一');
    }

    @test
    test19() {
        equal(LunarDay.fromYmd(2012, 3, 1).next(88).toString(), '农历壬辰年闰四月廿九');
    }

    @test
    test20() {
        equal(LunarDay.fromYmd(2012, 3, 1).next(89).toString(), '农历壬辰年五月初一');
    }

    @test
    test21() {
        equal(LunarDay.fromYmd(2020, 4, 1).getSolarDay().toString(), '2020年4月23日');
    }

    @test
    test22() {
        equal(LunarDay.fromYmd(2024, 1, 1).getLunarMonth().getLunarYear().getSixtyCycle().getName(), '甲辰');
    }

    @test
    test23() {
        equal(LunarDay.fromYmd(2023, 12, 30).getLunarMonth().getLunarYear().getSixtyCycle().getName(), '癸卯');
    }

    /**
     * 二十八宿
     */
    @test
    test24() {
        const star = LunarDay.fromYmd(2020, 4, 13).getTwentyEightStar();
        equal(star.getZone().getName(), '南');
        equal(star.getZone().getBeast().getName(), '朱雀');
        equal(star.getName(), '翼');
        equal(star.getSevenStar().getName(), '火');
        equal(star.getAnimal().getName(), '蛇');
        equal(star.getLuck().getName(), '凶');

        equal(star.getLand().getName(), '阳天');
        equal(star.getLand().getDirection().getName(), '东南');
    }

    @test
    test25() {
        const star = LunarDay.fromYmd(2023, 9, 28).getTwentyEightStar();
        equal(star.getZone().getName(), '南');
        equal(star.getZone().getBeast().getName(), '朱雀');
        equal(star.getName(), '柳');
        equal(star.getSevenStar().getName(), '土');
        equal(star.getAnimal().getName(), '獐');
        equal(star.getLuck().getName(), '凶');

        equal(star.getLand().getName(), '炎天');
        equal(star.getLand().getDirection().getName(), '南');
    }

    @test
    test26() {
        const lunar: LunarDay = LunarDay.fromYmd(2005, 11, 23);
        equal(lunar.getLunarMonth().getSixtyCycle().getName(), '戊子');
        equal(lunar.getMonthSixtyCycle().getName(), '戊子');
    }

    @test
    test27() {
        const lunar: LunarDay = LunarDay.fromYmd(2024, 1, 1);
        equal(lunar.next(31).toString(), '农历甲辰年二月初三');
    }
}
