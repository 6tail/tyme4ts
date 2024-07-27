import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal, ifError, ok} from 'assert';

@suite
class PlumRainDayTest {
    @test
    test0() {
        const d = SolarDay.fromYmd(2024, 6, 10).getPlumRainDay();
        ifError(d);
    }

    @test
    test1() {
        const d = SolarDay.fromYmd(2024, 6, 11).getPlumRainDay();
        ok(d);
        equal(d.getName(), '入梅');
        equal(d.getPlumRain().toString(), '入梅');
        equal(d.toString(), '入梅第1天');
    }

    @test
    test2() {
        const d = SolarDay.fromYmd(2024, 7, 6).getPlumRainDay();
        ok(d);
        equal(d.getName(), '出梅');
        equal(d.getPlumRain().toString(), '出梅');
        equal(d.toString(), '出梅');
    }

    @test
    test3() {
        const d = SolarDay.fromYmd(2024, 7, 5).getPlumRainDay();
        ok(d);
        equal(d.getName(), '入梅');
        equal(d.getPlumRain().toString(), '入梅');
        equal(d.toString(), '入梅第25天');
    }
}
