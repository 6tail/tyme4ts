import {suite, test} from '@testdeck/mocha';
import {SolarTime} from '../lib';
import {equal} from 'assert';

@suite
class SolarTimeTest {
    @test
    test0() {
        const time: SolarTime = SolarTime.fromYmdHms(2023, 1, 1, 13, 5, 20);
        equal(time.getName(), '13:05:20');
        equal(time.next(-21).getName(), '13:04:59');
    }
}
