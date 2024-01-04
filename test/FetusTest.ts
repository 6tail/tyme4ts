import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class FetusTest {
    @test
    test() {
        equal(SolarDay.fromYmd(2021, 11, 13).getLunarDay().getFetusDay().getName(), '碓磨厕 外东南');
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(2021, 11, 12).getLunarDay().getFetusDay().getName(), '占门碓 外东南');
    }

    @test
    test2() {
        equal(SolarDay.fromYmd(2011, 11, 12).getLunarDay().getFetusDay().getName(), '厨灶厕 外西南');
    }

}
