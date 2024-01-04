import { suite, test } from '@testdeck/mocha';
import {equal} from 'assert';
import {SolarDay} from '../lib';

@suite
class DirectionTest {
    @test
    test() {
        equal(SolarDay.fromYmd(2021, 11, 13).getLunarDay().getSixtyCycle().getHeavenStem().getMascotDirection().getName(), '东南');
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(2024, 1, 1).getLunarDay().getSixtyCycle().getHeavenStem().getMascotDirection().getName(), '东南');
    }

    @test
    test2() {
        equal(SolarDay.fromYmd(2023, 11, 6).getLunarDay().getJupiterDirection().getName(), '东');
    }
}
