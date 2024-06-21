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
        equal("入梅", d.getName());
        equal("入梅", d.getPlumRain().toString());
        equal("入梅第1天", d.toString());
    }

    @test
    test2() {
        const d = SolarDay.fromYmd(2024, 7, 6).getPlumRainDay();
        ok(d);
        equal("出梅", d.getName());
        equal("出梅", d.getPlumRain().toString());
        equal("出梅", d.toString());
    }

    @test
    test3() {
        const d = SolarDay.fromYmd(2024, 7, 5).getPlumRainDay();
        ok(d);
        equal("入梅", d.getName());
        equal("入梅", d.getPlumRain().toString());
        equal("入梅第25天", d.toString());
    }
}
