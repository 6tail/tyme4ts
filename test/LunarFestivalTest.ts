import {suite, test} from '@testdeck/mocha';
import {LunarDay, LunarFestival} from '../lib';
import {equal, ok} from 'assert';

@suite
class LunarFestivalTest {
    @test
    test2() {
        const f = LunarFestival.fromIndex(2023, 0);
        ok(f);
        equal(f.next(13).toString(), '农历甲辰年正月初一 春节');
        equal(f.next(-3).toString(), '农历壬寅年十一月廿九 冬至节');
    }

    @test
    test3() {
        const f = LunarFestival.fromIndex(2023, 0);
        ok(f);
        equal(f.next(-9).toString(), '农历壬寅年三月初五 清明节');
    }

    @test
    test4() {
        const f = LunarDay.fromYmd(2010, 1, 15).getFestival();
        ok(f);
        equal(f.toString(), '农历庚寅年正月十五 元宵节');
    }

    @test
    test5() {
        const f = LunarDay.fromYmd(2021, 12, 29).getFestival();
        ok(f);
        equal(f.toString(), '农历辛丑年十二月廿九 除夕');
    }
}
