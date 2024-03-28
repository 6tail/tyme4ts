import {suite, test} from '@testdeck/mocha';
import {SolarHalfYear} from '../lib';
import {equal} from 'assert';

@suite
class SolarHalfYearTest {
    @test
    test0() {
        equal(SolarHalfYear.fromIndex(2023, 0).getName(), '上半年');
        equal(SolarHalfYear.fromIndex(2023, 0).toString(), '2023年上半年');
    }

    @test
    test1() {
        equal(SolarHalfYear.fromIndex(2023, 1).getName(), '下半年');
        equal(SolarHalfYear.fromIndex(2023, 1).toString(), '2023年下半年');
    }

    @test
    test2() {
        equal(SolarHalfYear.fromIndex(2023, 0).next(1).getName(), '下半年');
        equal(SolarHalfYear.fromIndex(2023, 0).next(1).toString(), '2023年下半年');
    }

    @test
    test3() {
        equal(SolarHalfYear.fromIndex(2023, 0).next(2).getName(), '上半年');
        equal(SolarHalfYear.fromIndex(2023, 0).next(2).toString(), '2024年上半年');
    }

    @test
    test4() {
        equal(SolarHalfYear.fromIndex(2023, 0).next(-2).getName(), '上半年');
        equal(SolarHalfYear.fromIndex(2023, 0).next(-2).toString(), '2022年上半年');
    }

    @test
    test5() {
        equal(SolarHalfYear.fromIndex(2023, 0).next(-4).toString(), '2021年上半年');
        equal(SolarHalfYear.fromIndex(2023, 0).next(-3).toString(), '2021年下半年');
    }
}
