import {suite, test} from '@testdeck/mocha';
import {JulianDay, Phenology, SolarDay, SolarTime} from '../lib';
import {equal} from 'assert';

@suite
class PhenologyTest {
    @test
    test0() {
        const solarDay = SolarDay.fromYmd(2020, 4, 23);
        // 七十二候
        const phenology = solarDay.getPhenologyDay();
        // 三候
        const threePhenology = phenology.getPhenology().getThreePhenology();
        equal(solarDay.getTerm().getName(), '谷雨');
        equal(threePhenology.getName(), '初候');
        equal(phenology.getName(), '萍始生');
        // 该候的第5天
        equal(phenology.getDayIndex(), 4);
    }

    @test
    test1() {
        const solarDay = SolarDay.fromYmd(2021, 12, 26);
        // 七十二候
        const phenology = solarDay.getPhenologyDay();
        // 三候
        const threePhenology = phenology.getPhenology().getThreePhenology();
        equal(solarDay.getTerm().getName(), '冬至');
        equal(threePhenology.getName(), '二候');
        equal(phenology.getName(), '麋角解');
        // 该候的第1天
        equal(phenology.getDayIndex(), 0);
    }

    @test
    test2() {
        const p: Phenology = Phenology.fromIndex(2026, 1);
        const jd: JulianDay = p.getJulianDay();
        equal(p.getName(), '麋角解');
        equal(jd.getSolarDay().toString(), '2025年12月26日');
        equal(jd.getSolarTime().toString(), '2025年12月26日 20:49:39');
    }

    @test
    test3() {
        const p: Phenology = SolarDay.fromYmd(2025, 12, 26).getPhenology();
        const jd: JulianDay = p.getJulianDay();
        equal(p.getName(), '麋角解');
        equal(jd.getSolarDay().toString(), '2025年12月26日');
        equal(jd.getSolarTime().toString(), '2025年12月26日 20:49:39');
    }

    @test
    test4() {
        equal(SolarTime.fromYmdHms(2025, 12, 26, 20, 49, 38).getPhenology().getName(), '蚯蚓结');
        equal(SolarTime.fromYmdHms(2025, 12, 26, 20, 49, 39).getPhenology().getName(), '麋角解');
    }
}
