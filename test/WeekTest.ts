import {suite, test} from '@testdeck/mocha';
import {SolarDay, SolarWeek} from '../lib';
import {equal} from 'assert';

@suite
class WeekTest {
    @test
    test0() {
        equal(SolarDay.fromYmd(1582, 10, 1).getWeek().getName(), '一');
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(1582, 10, 15).getWeek().getName(), '五');
    }

    @test
    test2() {
        equal(SolarDay.fromYmd(2023, 10, 31).getWeek().getIndex(), 2);
    }

    @test
    test3() {
        const w = SolarWeek.fromYm(2023, 10, 0, 0);
        equal(w.getName(), '第一周');
        equal(w.toString(), '2023年10月第一周');
    }

    @test
    test5() {
        const w = SolarWeek.fromYm(2023, 10, 4, 0);
        equal(w.getName(), '第五周');
        equal(w.toString(), '2023年10月第五周');
    }

    @test
    test6() {
        const w = SolarWeek.fromYm(2023, 10, 5, 1);
        equal(w.getName(), '第六周');
        equal(w.toString(), '2023年10月第六周');
    }

    @test
    test7() {
        const w = SolarWeek.fromYm(2023, 10, 0, 0).next(4);
        equal(w.getName(), '第五周');
        equal(w.toString(), '2023年10月第五周');
    }

    @test
    test8() {
        const w = SolarWeek.fromYm(2023, 10, 0, 0).next(5);
        equal(w.getName(), '第二周');
        equal(w.toString(), '2023年11月第二周');
    }

    @test
    test9() {
        const w = SolarWeek.fromYm(2023, 10, 0, 0).next(-1);
        equal(w.getName(), '第五周');
        equal(w.toString(), '2023年9月第五周');
    }

    @test
    test10() {
        const w = SolarWeek.fromYm(2023, 10, 0, 0).next(-5);
        equal(w.getName(), '第一周');
        equal(w.toString(), '2023年9月第一周');
    }

    @test
    test11() {
        const w = SolarWeek.fromYm(2023, 10, 0, 0).next(-6);
        equal(w.getName(), '第四周');
        equal(w.toString(), '2023年8月第四周');
    }

    @test
    test12() {
        equal(SolarDay.fromYmd(1582, 10, 1).getWeek().getIndex(), 1);
    }

    @test
    test13() {
        equal(SolarDay.fromYmd(1582, 10, 15).getWeek().getIndex(), 5);
    }

    @test
    test14() {
        equal(SolarDay.fromYmd(1129, 11, 17).getWeek().getIndex(), 0);
    }

    @test
    test15() {
        equal(SolarDay.fromYmd(1129, 11, 1).getWeek().getIndex(), 5);
    }

    @test
    test16() {
        equal(SolarDay.fromYmd(8, 11, 1).getWeek().getIndex(), 4);
    }

    @test
    test17() {
        equal(SolarDay.fromYmd(1582, 9, 30).getWeek().getIndex(), 0);
    }

    @test
    test18() {
        equal(SolarDay.fromYmd(1582, 1, 1).getWeek().getIndex(), 1);
    }

    @test
    test19() {
        equal(SolarDay.fromYmd(1500, 2, 29).getWeek().getIndex(), 6);
    }

    @test
    test20() {
        equal(SolarDay.fromYmd(9865, 7, 26).getWeek().getIndex(), 3);
    }

    @test
    test21() {
        const start = 0;
        let week: SolarWeek = SolarWeek.fromYm(2024, 2, 2, start);
        equal(week.toString(), '2024年2月第三周');
        equal(week.getIndexInYear(), 6);

        week = SolarDay.fromYmd(2024, 2, 11).getSolarWeek(start);
        equal(week.toString(), '2024年2月第三周');

        week = SolarDay.fromYmd(2024, 2, 17).getSolarWeek(start);
        equal(week.toString(), '2024年2月第三周');

        week = SolarDay.fromYmd(2024, 2, 10).getSolarWeek(start);
        equal(week.toString(), '2024年2月第二周');

        week = SolarDay.fromYmd(2024, 2, 18).getSolarWeek(start);
        equal(week.toString(), '2024年2月第四周');
    }

    @test
    test22(): void {
        const start: number = 0;
        let week: SolarWeek = SolarDay.fromYmd(2024, 7, 1).getSolarWeek(start);
        equal(week.toString(), '2024年7月第一周');
        equal(week.getIndexInYear(), 26);

        week = week.next(1);
        equal(week.toString(), '2024年7月第二周');
    }
}
