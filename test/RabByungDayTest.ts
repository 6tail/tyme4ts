import {suite, test} from '@testdeck/mocha';
import {RabByungDay, RabByungElement, SolarDay, Zodiac} from '../lib';
import {equal} from 'assert';

@suite
class RabByungDayTest {
    @test
    test0() {
        equal(SolarDay.fromYmd(1951, 1, 8).getRabByungDay().toString(), '第十六饶迥铁虎年十二月初一');
        equal(RabByungDay.fromElementZodiac(15, RabByungElement.fromName('铁'), Zodiac.fromName('虎'), 12, 1).getSolarDay().toString(), '1951年1月8日');
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(2051, 2, 11).getRabByungDay().toString(), '第十八饶迥铁马年十二月三十');
        equal(RabByungDay.fromElementZodiac(17, RabByungElement.fromName('铁'), Zodiac.fromName('马'), 12, 30).getSolarDay().toString(), '2051年2月11日');
    }

    @test
    test2() {
        equal(SolarDay.fromYmd(2025, 4, 23).getRabByungDay().toString(), '第十七饶迥木蛇年二月廿五');
        equal(RabByungDay.fromElementZodiac(16, RabByungElement.fromName('木'), Zodiac.fromName('蛇'), 2, 25).getSolarDay().toString(), '2025年4月23日');
    }

    @test
    test3() {
        equal(SolarDay.fromYmd(1951, 2, 8).getRabByungDay().toString(), '第十六饶迥铁兔年正月初二');
        equal(RabByungDay.fromElementZodiac(15, RabByungElement.fromName('铁'), Zodiac.fromName('兔'), 1, 2).getSolarDay().toString(), '1951年2月8日');
    }

    @test
    test4() {
        equal(SolarDay.fromYmd(1951, 1, 24).getRabByungDay().toString(), '第十六饶迥铁虎年十二月闰十六');
        equal(RabByungDay.fromElementZodiac(15, RabByungElement.fromName('铁'), Zodiac.fromName('虎'), 12, -16).getSolarDay().toString(), '1951年1月24日');
    }

    @test
    test5() {
        equal(SolarDay.fromYmd(1961, 6, 24).getRabByungDay().toString(), '第十六饶迥铁牛年五月十一');
        equal(RabByungDay.fromElementZodiac(15, RabByungElement.fromName('铁'), Zodiac.fromName('牛'), 5, 11).getSolarDay().toString(), '1961年6月24日');
    }

    @test
    test6() {
        equal(SolarDay.fromYmd(1952, 2, 23).getRabByungDay().toString(), '第十六饶迥铁兔年十二月廿八');
        equal(RabByungDay.fromElementZodiac(15, RabByungElement.fromName('铁'), Zodiac.fromName('兔'), 12, 28).getSolarDay().toString(), '1952年2月23日');
    }

    @test
    test7() {
        const d: SolarDay = SolarDay.fromYmd(2025, 4, 26);
        equal(d.getRabByungDay().toString(), '第十七饶迥木蛇年二月廿九');
    }

    @test
    test8() {
        const d: SolarDay = SolarDay.fromYmd(2025, 4, 25);
        equal(d.getRabByungDay().toString(), '第十七饶迥木蛇年二月廿七');
    }
}
