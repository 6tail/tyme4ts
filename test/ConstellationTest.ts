import {suite, test} from '@testdeck/mocha';
import {equal} from 'assert';
import {SolarDay} from '../lib';

@suite
class ConstellationTest {
    @test
    test() {
        equal(SolarDay.fromYmd(2020, 3, 21).getConstellation().getName(), '白羊');
        equal(SolarDay.fromYmd(2020, 4, 19).getConstellation().getName(), '白羊');
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(2020, 4, 20).getConstellation().getName(), '金牛');
        equal(SolarDay.fromYmd(2020, 5, 20).getConstellation().getName(), '金牛');
    }

    @test
    test2() {
        equal(SolarDay.fromYmd(2020, 5, 21).getConstellation().getName(), '双子');
        equal(SolarDay.fromYmd(2020, 6, 21).getConstellation().getName(), '双子');
    }

    @test
    test3() {
        equal(SolarDay.fromYmd(2020, 6, 22).getConstellation().getName(), '巨蟹');
        equal(SolarDay.fromYmd(2020, 7, 22).getConstellation().getName(), '巨蟹');
    }
}
