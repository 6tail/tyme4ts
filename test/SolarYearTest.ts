import {suite, test} from '@testdeck/mocha';
import {SolarYear} from '../lib';
import {equal} from 'assert';

@suite
class SolarYearTest {
    @test
    test0() {
        equal(SolarYear.fromYear(2023).getName(), '2023年');
    }

    @test
    test1() {
        equal(SolarYear.fromYear(2023).isLeap(), false);
    }

    @test
    test2() {
        equal(SolarYear.fromYear(1500).isLeap(), true);
    }

    @test
    test3() {
        equal(SolarYear.fromYear(1700).isLeap(), false);
    }

    @test
    test4() {
        equal(SolarYear.fromYear(2023).getDayCount(), 365);
    }

    @test
    test5() {
        equal(SolarYear.fromYear(2023).next(5).getName(), '2028年');
    }

    @test
    test6() {
        equal(SolarYear.fromYear(2023).next(-5).getName(), '2018年');
    }
}
