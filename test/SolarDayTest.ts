import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class SolarDayTest {
    @test
    test0() {
        equal(SolarDay.fromYmd(2023, 1, 1).getName(), '1日');
        equal(SolarDay.fromYmd(2023, 1, 1).toString(), '2023年1月1日');
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(2000, 2, 29).getName(), '29日');
        equal(SolarDay.fromYmd(2000, 2, 29).toString(), '2000年2月29日');
    }

    @test
    test2() {
        equal(SolarDay.fromYmd(2023, 1, 1).getIndexInYear(), 0);
        equal(SolarDay.fromYmd(2023, 12, 31).getIndexInYear(), 364);
        equal(SolarDay.fromYmd(2020, 12, 31).getIndexInYear(), 365);
    }

    @test
    test3() {
        equal(SolarDay.fromYmd(2023, 1, 1).subtract(SolarDay.fromYmd(2023, 1, 1)), 0);
        equal(SolarDay.fromYmd(2023, 1, 2).subtract(SolarDay.fromYmd(2023, 1, 1)), 1);
        equal(SolarDay.fromYmd(2023, 1, 1).subtract(SolarDay.fromYmd(2023, 1, 2)), -1);
        equal(SolarDay.fromYmd(2023, 2, 1).subtract(SolarDay.fromYmd(2023, 1, 1)), 31);
        equal(SolarDay.fromYmd(2023, 1, 1).subtract(SolarDay.fromYmd(2023, 2, 1)), -31);
        equal(SolarDay.fromYmd(2024, 1, 1).subtract(SolarDay.fromYmd(2023, 1, 1)), 365);
        equal(SolarDay.fromYmd(2023, 1, 1).subtract(SolarDay.fromYmd(2024, 1, 1)), -365);
        equal(SolarDay.fromYmd(1582, 10, 15).subtract(SolarDay.fromYmd(1582, 10, 4)), 1);
    }

    @test
    test4() {
        equal(SolarDay.fromYmd(1582, 10, 15).next(-1).toString(), '1582年10月4日');
    }

    @test
    test5() {
        equal(SolarDay.fromYmd(2000, 2, 28).next(2).toString(), '2000年3月1日');
    }

    @test
    test6() {
        equal(SolarDay.fromYmd(2020, 5, 24).getLunarDay().toString(), '农历庚子年闰四月初二');
    }

    @test
    test7() {
        equal(SolarDay.fromYmd(2020, 5, 24).subtract(SolarDay.fromYmd(2020, 4, 23)), 31);
    }

    @test
    test8() {
        equal(SolarDay.fromYmd(16, 11, 30).getLunarDay().toString(), '农历丙子年十一月十二');
    }

    @test
    test9() {
        equal(SolarDay.fromYmd(2023, 10, 27).getTerm().toString(), '霜降');
    }

    @test
    test10() {
        equal(SolarDay.fromYmd(2023, 10, 27).getPhenologyDay().toString(), '豺乃祭兽第4天');
    }

    @test
    test11() {
        equal(SolarDay.fromYmd(2023, 10, 27).getPhenologyDay().getPhenology().getThreePhenology().toString(), '初候');
    }

    @test
    test22() {
        equal('甲辰', SolarDay.fromYmd(2024, 2, 10).getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getName());
    }

    @test
    test23() {
        equal('癸卯', SolarDay.fromYmd(2024, 2, 9).getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getName());
    }
}
