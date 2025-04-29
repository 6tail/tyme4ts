import {suite, test} from '@testdeck/mocha';
import {RabByungMonth} from '../lib';
import {deepStrictEqual, equal} from 'assert';

@suite
class RabByungMonthTest {
    @test
    test0() {
        equal(RabByungMonth.fromYm(1950, 12).toString(), '第十六饶迥铁虎年十二月');
    }

    @test
    test1() {
        deepStrictEqual(RabByungMonth.fromYm(2025, 2).getMissDays(), [5, 28]);
    }
}
