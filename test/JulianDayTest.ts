import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class JulianDayTest {
    @test
    test() {
        equal(SolarDay.fromYmd(2023, 1, 1).getJulianDay().getSolarDay().toString(), '2023年1月1日');
    }
}
