import {suite, test} from '@testdeck/mocha';
import {LunarYear} from '../lib';
import {equal} from 'assert';

@suite
class LunarYearTest {
    @test
    test0() {
        equal(LunarYear.fromYear(2023).getName(), '农历癸卯年');
    }

    @test
    test1() {
        equal(LunarYear.fromYear(2023).next(5).getName(), '农历戊申年');
    }

    @test
    test2() {
        equal(LunarYear.fromYear(2023).next(-5).getName(), '农历戊戌年');
    }

    /**
     * 农历年的干支
     */
    @test
    test3() {
        equal(LunarYear.fromYear(2020).getSixtyCycle().getName(), '庚子');
    }

    /**
     * 农历年的生肖(农历年.干支.地支.生肖)
     */
    @test
    test4() {
        equal(LunarYear.fromYear(1986).getSixtyCycle().getEarthBranch().getZodiac().getName(), '虎');
    }

    @test
    test5() {
        equal(LunarYear.fromYear(151).getLeapMonth(), 12);
    }

    @test
    test6() {
        equal(LunarYear.fromYear(2357).getLeapMonth(), 1);
    }

    @test
    test7() {
        const y = LunarYear.fromYear(2023);
        equal(y.getSixtyCycle().getName(), '癸卯');
        equal(y.getSixtyCycle().getEarthBranch().getZodiac().getName(), '兔');
    }

    @test
    test8() {
        equal(LunarYear.fromYear(1864).getTwenty().getSixty().getName(), '上元');
    }

    @test
    test9() {
        equal(LunarYear.fromYear(1923).getTwenty().getSixty().getName(), '上元');
    }

    @test
    test10() {
        equal(LunarYear.fromYear(1924).getTwenty().getSixty().getName(), '中元');
    }

    @test
    test11() {
        equal(LunarYear.fromYear(1983).getTwenty().getSixty().getName(), '中元');
    }

    @test
    test12() {
        equal(LunarYear.fromYear(1984).getTwenty().getSixty().getName(), '下元');
    }

    @test
    test13() {
        equal(LunarYear.fromYear(2043).getTwenty().getSixty().getName(), '下元');
    }

    @test
    test14() {
        equal(LunarYear.fromYear(1864).getTwenty().getName(), '一运');
    }

    @test
    test15() {
        equal(LunarYear.fromYear(1883).getTwenty().getName(), '一运');
    }

    @test
    test16() {
        equal(LunarYear.fromYear(1884).getTwenty().getName(), '二运');
    }

    @test
    test17() {
        equal(LunarYear.fromYear(1903).getTwenty().getName(), '二运');
    }

    @test
    test18() {
        equal(LunarYear.fromYear(1904).getTwenty().getName(), '三运');
    }

    @test
    test19() {
        equal(LunarYear.fromYear(1923).getTwenty().getName(), '三运');
    }

    @test
    test20() {
        equal(LunarYear.fromYear(2004).getTwenty().getName(), '八运');
    }

    @test
    test21() {
        const y = LunarYear.fromYear(1);
        equal(y.getTwenty().getName(), '六运');
        equal(y.getTwenty().getSixty().getName(), '中元');
    }

    @test
    test22() {
        const y = LunarYear.fromYear(1863);
        equal(y.getTwenty().getName(), '九运');
        equal(y.getTwenty().getSixty().getName(), '下元');
    }
}
