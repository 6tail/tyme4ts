import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class SixStarTest {
    @test
    test0() {
        equal(SolarDay.fromYmd(2020, 4, 23).getLunarDay().getSixStar().getName(), '佛灭');
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(2021, 1, 15).getLunarDay().getSixStar().getName(), '友引');
    }

    @test
    test2() {
        equal(SolarDay.fromYmd(2017, 1, 5).getLunarDay().getSixStar().getName(), '先胜');
    }

    @test
    test3() {
        equal(SolarDay.fromYmd(2020, 4, 10).getLunarDay().getSixStar().getName(), '友引');
    }

    @test
    test4() {
        equal(SolarDay.fromYmd(2020, 6, 11).getLunarDay().getSixStar().getName(), '大安');
    }

    @test
    test5() {
        equal(SolarDay.fromYmd(2020, 6, 1).getLunarDay().getSixStar().getName(), '先胜');
    }

    @test
    test6() {
        equal(SolarDay.fromYmd(2020, 12, 8).getLunarDay().getSixStar().getName(), '先负');
    }

    @test
    test8() {
        equal(SolarDay.fromYmd(2020, 12, 11).getLunarDay().getSixStar().getName(), '赤口');
    }
}
