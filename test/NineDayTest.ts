import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
import {equal, ifError, ok} from 'assert';

@suite
class NineDayTest {
    @test
    test() {
        const d = SolarDay.fromYmd(2020, 12, 21).getNineDay();
        ok(d);
        equal(d.getName(), '一九');
        equal(d.getNine().toString(), '一九');
        equal(d.toString(), '一九第1天');
    }

    @test
    test1() {
        const d = SolarDay.fromYmd(2020, 12, 22).getNineDay();
        ok(d);
        equal(d.getName(), '一九');
        equal(d.getNine().toString(), '一九');
        equal(d.toString(), '一九第2天');
    }

    @test
    test2() {
        const d = SolarDay.fromYmd(2020, 1, 7).getNineDay();
        ok(d);
        equal(d.getName(), '二九');
        equal(d.getNine().toString(), '二九');
        equal(d.toString(), '二九第8天');
    }

    @test
    test3() {
        const d = SolarDay.fromYmd(2021, 1, 6).getNineDay();
        ok(d);
        equal(d.getName(), '二九');
        equal(d.getNine().toString(), '二九');
        equal(d.toString(), '二九第8天');
    }

    @test
    test4() {
        const d = SolarDay.fromYmd(2021, 1, 8).getNineDay();
        ok(d);
        equal(d.getName(), '三九');
        equal(d.getNine().toString(), '三九');
        equal(d.toString(), '三九第1天');
    }

    @test
    test5() {
        const d = SolarDay.fromYmd(2021, 3, 5).getNineDay();
        ok(d);
        equal(d.getName(), '九九');
        equal(d.getNine().toString(), '九九');
        equal(d.toString(), '九九第3天');
    }

    @test
    test6() {
        const d = SolarDay.fromYmd(2021, 7, 5).getNineDay();
        ifError(d);
    }
}
