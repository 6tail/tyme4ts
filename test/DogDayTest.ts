import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal, ifError, ok} from 'assert';

@suite
class DogDayTest {
    @test
    test() {
        const d = SolarDay.fromYmd(2011, 7, 14).getDogDay();
        ok(d);
        equal(d.getName(), '初伏');
        equal(d.getDog().toString(), '初伏');
        equal(d.toString(), '初伏第1天');
    }

    @test
    test1() {
        const d = SolarDay.fromYmd(2011, 7, 23).getDogDay();
        ok(d);
        equal(d.getName(), '初伏');
        equal(d.getDog().toString(), '初伏');
        equal(d.toString(), '初伏第10天');
    }

    @test
    test2() {
        const d = SolarDay.fromYmd(2011, 7, 24).getDogDay();
        ok(d);
        equal(d.getName(), '中伏');
        equal(d.getDog().toString(), '中伏');
        equal(d.toString(), '中伏第1天');
    }

    @test
    test3() {
        const d = SolarDay.fromYmd(2011, 8, 12).getDogDay();
        ok(d);
        equal(d.getName(), '中伏');
        equal(d.getDog().toString(), '中伏');
        equal(d.toString(), '中伏第20天');
    }

    @test
    test4() {
        const d = SolarDay.fromYmd(2011, 8, 13).getDogDay();
        ok(d);
        equal(d.getName(), '末伏');
        equal(d.getDog().toString(), '末伏');
        equal(d.toString(), '末伏第1天');
    }

    @test
    test5() {
        const d = SolarDay.fromYmd(2011, 8, 22).getDogDay();
        ok(d);
        equal(d.getName(), '末伏');
        equal(d.getDog().toString(), '末伏');
        equal(d.toString(), '末伏第10天');
    }

    @test
    test6() {
        const d = SolarDay.fromYmd(2011, 7, 13).getDogDay();
        ifError(d);
    }

    @test
    test7() {
        const d = SolarDay.fromYmd(2011, 8, 23).getDogDay();
        ifError(d);
    }

    @test
    test8() {
        const d = SolarDay.fromYmd(2012, 7, 18).getDogDay();
        ok(d);
        equal(d.getName(), '初伏');
        equal(d.getDog().toString(), '初伏');
        equal(d.toString(), '初伏第1天');
    }

    @test
    test9() {
        const d = SolarDay.fromYmd(2012, 8, 5).getDogDay();
        ok(d);
        equal(d.getName(), '中伏');
        equal(d.getDog().toString(), '中伏');
        equal(d.toString(), '中伏第9天');
    }

    @test
    test10() {
        const d = SolarDay.fromYmd(2012, 8, 8).getDogDay();
        ok(d);
        equal(d.getName(), '末伏');
        equal(d.getDog().toString(), '末伏');
        equal(d.toString(), '末伏第2天');
    }
}
