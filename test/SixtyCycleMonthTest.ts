import {suite, test} from '@testdeck/mocha';
import {SixtyCycleMonth} from '../lib';
import {equal} from 'assert';

@suite
class SolarMonthTest {
    @test
    test0() {
        const m = SixtyCycleMonth.fromIndex(2025, 0);
        equal(m.toString(), '乙巳年戊寅月');
    }
}
