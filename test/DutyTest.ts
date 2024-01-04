import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class DutyTest {
    @test
    test() {
        equal(SolarDay.fromYmd(2023, 10, 30).getLunarDay().getDuty().getName(), '闭');
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(2023, 10, 19).getLunarDay().getDuty().getName(), '建');
    }

    @test
    test2() {
        equal(SolarDay.fromYmd(2023, 10, 7).getLunarDay().getDuty().getName(), '除');
    }

    @test
    test3() {
        equal(SolarDay.fromYmd(2023, 10, 8).getLunarDay().getDuty().getName(), '除');
    }
}
