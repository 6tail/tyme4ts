import {suite, test} from '@testdeck/mocha';
import {LegalHoliday} from '../lib';
import {equal, ifError, ok} from 'assert';

@suite
class LegalHolidayTest {
    @test
    test() {
        const d = LegalHoliday.fromYmd(2011, 5, 1);
        ok(d);
        equal(d.toString(), '2011年5月1日 劳动节(休)');

        const d1 = d.next(1);
        ok(d1);
        equal(d1.toString(), '2011年5月2日 劳动节(休)');

        const d2 = d.next(2);
        ok(d2);
        equal(d2.toString(), '2011年6月4日 端午节(休)');

        const d3 = d.next(-1);
        ok(d3);
        equal(d3.toString(), '2011年4月30日 劳动节(休)');

        const d4 = d.next(-2);
        ok(d4);
        equal(d4.toString(), '2011年4月5日 清明节(休)');
    }

    @test
    test3() {
        const d = LegalHoliday.fromYmd(2001, 12, 29);
        ok(d);
        equal(d.toString(), '2001年12月29日 元旦节(班)');

        ifError(d.next(-1));
    }

    @test
    test4() {
        const d = LegalHoliday.fromYmd(2022, 10, 5);
        ok(d);
        equal(d.toString(), '2022年10月5日 国庆节(休)');

        const d1 = d.next(-1);
        ok(d1);
        equal(d1.toString(), '2022年10月4日 国庆节(休)');

        const d2 = d.next(1);
        ok(d2);
        equal(d2.toString(), '2022年10月6日 国庆节(休)');
    }

    @test
    test5() {
        const d = LegalHoliday.fromYmd(2010, 10, 1);
        ok(d);
        equal(d.toString(), '2010年10月1日 国庆节(休)');
    }
}
