import {suite, test} from '@testdeck/mocha';
import {SolarMonth} from '../lib';
import {equal} from 'assert';

@suite
class SolarMonthTest {
    @test
    test0() {
        const m = SolarMonth.fromYm(2019, 5);
        equal(m.getName(), '5月');
        equal(m.toString(), '2019年5月');
    }

    @test
    test1() {
        const m = SolarMonth.fromYm(2023, 1);
        equal(m.getWeekCount(0), 5);
        equal(m.getWeekCount(1), 6);
        equal(m.getWeekCount(2), 6);
        equal(m.getWeekCount(3), 5);
        equal(m.getWeekCount(4), 5);
        equal(m.getWeekCount(5), 5);
        equal(m.getWeekCount(6), 5);
    }

    @test
    test2() {
        const m = SolarMonth.fromYm(2023, 2);
        equal(m.getWeekCount(0), 5);
        equal(m.getWeekCount(1), 5);
        equal(m.getWeekCount(2), 5);
        equal(m.getWeekCount(3), 4);
        equal(m.getWeekCount(4), 5);
        equal(m.getWeekCount(5), 5);
        equal(m.getWeekCount(6), 5);
    }

    @test
    test3() {
        const m = SolarMonth.fromYm(2023, 10).next(1);
        equal(m.getName(), '11月');
        equal(m.toString(), '2023年11月');
    }

    @test
    test4() {
        const m = SolarMonth.fromYm(2023, 10);
        equal(m.next(2).toString(), '2023年12月');
        equal(m.next(3).toString(), '2024年1月');
        equal(m.next(-5).toString(), '2023年5月');
        equal(m.next(-9).toString(), '2023年1月');
        equal(m.next(-10).toString(), '2022年12月');
        equal(m.next(24).toString(), '2025年10月');
        equal(m.next(-24).toString(), '2021年10月');
    }
}
