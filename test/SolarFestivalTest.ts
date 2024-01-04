import {suite, test} from '@testdeck/mocha';
import {SolarDay, SolarFestival} from '../lib';
import {equal, ifError, ok} from 'assert';

@suite
class SolarFestivalTest {
    @test
    test2() {
        const f = SolarFestival.fromIndex(2023, 0);
        ok(f);

        const f1 = f.next(13);
        ok(f1);
        equal(f1.toString(), '2024年5月1日 五一劳动节');

        const f2 = f.next(-3);
        ok(f2);
        equal(f2.toString(), '2022年8月1日 八一建军节');
    }

    @test
    test3() {
        const f = SolarFestival.fromIndex(2023, 0);
        ok(f);

        const f1 = f.next(-9);
        ok(f1);
        equal(f1.toString(), '2022年3月8日 三八妇女节');
    }

    @test
    test4() {
        const f = SolarDay.fromYmd(2010, 1, 1).getFestival();
        ok(f);
        equal(f.toString(), '2010年1月1日 元旦');
    }

    @test
    test5() {
        const f = SolarDay.fromYmd(2021, 5, 4).getFestival();
        ok(f);
        equal(f.toString(), '2021年5月4日 五四青年节');
    }

    @test
    test6() {
        const f = SolarDay.fromYmd(1939, 5, 4).getFestival();
        ifError(f);
    }
}
