import {suite, test} from '@testdeck/mocha';
import {LunarDay, LunarFestival, SolarDay} from '../lib';
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

    @test
    test6() {
        const f = SolarDay.fromYmd(2025, 12, 21).getLunarDay().getFestival();
        ok(f);
        equal(f.toString(), '农历乙巳年十一月初二 冬至节');
    }

    @test
    test7() {
        const ITERATIONS = 10;

        console.log('Starting benchmark...');

        let start = performance.now();
        let matchCount = 0;
        for (let i = 0; i < ITERATIONS; i++) {
            const year = 2024 + i;
            for (let m = 1; m <= 12; m++) {
                for (let d = 1; d <= 29; d++) {
                    const festival = LunarFestival.fromYmd(year, m, d);
                    if (festival) matchCount++;
                }
            }
        }
        let end = performance.now();
        console.log(`Total time: ${(end - start).toFixed(2)}ms`);
    }
}
