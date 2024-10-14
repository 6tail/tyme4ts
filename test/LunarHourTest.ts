import {suite, test} from '@testdeck/mocha';
import {LunarHour} from '../lib';
import {equal} from 'assert';

@suite
class LunarHourTest {
    @test
    test28() {
        const h: LunarHour = LunarHour.fromYmdHms(2024, 9, 7, 10, 0, 0);
        equal(h.getMinorRen().getName(), '留连');
    }
}
