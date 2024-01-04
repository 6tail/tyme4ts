import {suite, test} from '@testdeck/mocha';
import {LunarDay, LunarHour, LunarMonth, LunarYear, SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class NineStarTest {
    @test
    test0() {
        const nineStar = LunarYear.fromYear(1985).getNineStar();
        equal(nineStar.getName(), '六');
        equal(nineStar.toString(), '六白金');
    }

    @test
    test1() {
        const nineStar = LunarYear.fromYear(2022).getNineStar();
        equal(nineStar.toString(), '五黄土');
        equal(nineStar.getDipper().toString(), '玉衡');
    }

    @test
    test2() {
        const nineStar = LunarYear.fromYear(2033).getNineStar();
        equal(nineStar.toString(), '三碧木');
        equal(nineStar.getDipper().toString(), '天玑');
    }

    @test
    test3() {
        const nineStar = LunarMonth.fromYm(1985, 2).getNineStar();
        equal(nineStar.toString(), '四绿木');
        equal(nineStar.getDipper().toString(), '天权');
    }

    @test
    test4() {
        const nineStar = LunarMonth.fromYm(1985, 2).getNineStar();
        equal( nineStar.toString(), '四绿木');
        equal(nineStar.getDipper().toString(), '天权');
    }

    @test
    test5() {
        const nineStar = LunarMonth.fromYm(2022, 1).getNineStar();
        equal(nineStar.toString(), '二黒土');
        equal(nineStar.getDipper().toString(), '天璇');
    }

    @test
    test6() {
        const nineStar = LunarMonth.fromYm(2033, 1).getNineStar();
        equal(nineStar.toString(), '五黄土');
        equal(nineStar.getDipper().toString(), '玉衡');
    }

    @test
    test7() {
        const nineStar = SolarDay.fromYmd(1985, 2, 19).getLunarDay().getNineStar();
        equal(nineStar.toString(), '五黄土');
        equal(nineStar.getDipper().toString(), '玉衡');
    }

    @test
    test8() {
        const nineStar = LunarDay.fromYmd(2022, 1, 1).getNineStar();
        equal(nineStar.toString(), '四绿木');
        equal(nineStar.getDipper().toString(), '天权');
    }

    @test
    test9() {
        const nineStar = LunarDay.fromYmd(2033, 1, 1).getNineStar();
        equal(nineStar.toString(), '一白水');
        equal(nineStar.getDipper().toString(), '天枢');
    }

    @test
    test10() {
        const nineStar = LunarHour.fromYmdHms(2033, 1, 1, 12, 0, 0).getNineStar();
        equal(nineStar.toString(), '七赤金');
        equal(nineStar.getDipper().toString(), '摇光');
    }

    @test
    test11() {
        const nineStar = LunarHour.fromYmdHms(2011, 5, 3, 23, 0, 0).getNineStar();
        equal(nineStar.toString(), '七赤金');
        equal(nineStar.getDipper().toString(), '摇光');
    }
}
