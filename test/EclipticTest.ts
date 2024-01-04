import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class EclipticTest {
    @test
    test() {
        const star = SolarDay.fromYmd(2023, 10, 30).getLunarDay().getTwelveStar();
        equal(star.getName(), '天德');
        equal(star.getEcliptic().getName(), '黄道');
        equal(star.getEcliptic().getLuck().getName(), '吉');
    }

    @test
    test1() {
        const star = SolarDay.fromYmd(2023, 10, 19).getLunarDay().getTwelveStar();
        equal(star.getName(), '白虎');
        equal(star.getEcliptic().getName(), '黑道');
        equal(star.getEcliptic().getLuck().getName(), '凶');
    }

    @test
    test2() {
        const star = SolarDay.fromYmd(2023, 10, 7).getLunarDay().getTwelveStar();
        equal(star.getName(), '天牢');
        equal(star.getEcliptic().getName(), '黑道');
        equal(star.getEcliptic().getLuck().getName(), '凶');
    }

    @test
    test3() {
        const star = SolarDay.fromYmd(2023, 10, 8).getLunarDay().getTwelveStar();
        equal(star.getName(), '玉堂');
        equal(star.getEcliptic().getName(), '黄道');
        equal(star.getEcliptic().getLuck().getName(), '吉');
    }

}
