import {suite, test} from '@testdeck/mocha';
import {SolarDay} from '../lib';
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
}
