import {suite, test} from '@testdeck/mocha';
import {RabByungElement, RabByungYear, Zodiac} from '../lib';
import {equal} from 'assert';

@suite
class RabByungYearTest {
    @test
    test0() {
        const y: RabByungYear = RabByungYear.fromElementZodiac(0, RabByungElement.fromName('火'), Zodiac.fromName('兔'));
        equal(y.getName(), '第一饶迥火兔年');
        equal(y.getSolarYear().getName(), '1027年');
        equal(y.getSixtyCycle().getName(), '丁卯');
        equal(y.getLeapMonth(), 10);
    }

    @test
    test1() {
        equal(RabByungYear.fromYear(1027).getName(), '第一饶迥火兔年');
    }

    @test
    test2() {
        equal(RabByungYear.fromYear(2010).getName(), '第十七饶迥铁虎年');
    }

    @test
    test3() {
        equal(RabByungYear.fromYear(1961).getName(), '第十六饶迥铁牛年');
    }

    @test
    test4() {
        equal(RabByungYear.fromYear(2043).getLeapMonth(), 5);
        equal(RabByungYear.fromYear(2044).getLeapMonth(), 0);
    }
}
