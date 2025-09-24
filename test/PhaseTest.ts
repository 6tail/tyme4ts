import {suite, test} from '@testdeck/mocha';
import {LunarDay, Phase, SolarDay, SolarTime} from '../lib';
import {equal} from 'assert';

@suite
class PhaseTest {
    @test
    test() {
        equal(Phase.fromName(2025, 7, '下弦月').getSolarTime().toString(), '2025年9月14日 18:32:57');
    }

    @test
    test1() {
        equal(Phase.fromIndex(2025, 7, 6).getSolarTime().toString(), '2025年9月14日 18:32:57');
    }

    @test
    test2() {
        equal(Phase.fromIndex(2025, 7, 8).getSolarTime().toString(), '2025年9月22日 03:54:07');
    }

    @test
    test3() {
        equal(SolarDay.fromYmd(2025, 9, 21).getPhase().toString(), '残月');
    }

    @test
    test4() {
        equal(LunarDay.fromYmd(2025, 7, 30).getPhase().toString(), '残月');
    }

    @test
    test5() {
        equal(SolarTime.fromYmdHms(2025, 9, 22, 4, 0, 0).getPhase().toString(), '蛾眉月');
    }

    @test
    test6() {
        equal(SolarTime.fromYmdHms(2025, 9, 22, 3, 0, 0).getPhase().toString(), '残月');
    }

    @test
    test7() {
        equal(SolarDay.fromYmd(2023, 9, 15).getPhaseDay().toString(), '新月第1天');
    }

    @test
    test8() {
        equal(SolarDay.fromYmd(2023, 9, 17).getPhaseDay().toString(), '蛾眉月第2天');
    }

    @test
    test9() {
        equal(SolarTime.fromYmdHms(2025, 9, 22, 3, 54, 7).getPhase().toString(), '新月');
    }

    @test
    test10() {
        equal(SolarTime.fromYmdHms(2025, 9, 22, 3, 54, 6).getPhase().toString(), '残月');
    }

    @test
    test11() {
        equal(SolarTime.fromYmdHms(2025, 9, 22, 3, 54, 8).getPhase().toString(), '蛾眉月');
    }
}
