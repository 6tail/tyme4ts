import {suite, test} from '@testdeck/mocha';
import {SixtyCycleMonth, SolarTerm} from '../lib';
import {equal} from 'assert';

@suite
class SixtyCycleMonthTest {
    @test
    test0() {
        const m = SixtyCycleMonth.fromIndex(2025, 0);
        equal(m.toString(), '乙巳年戊寅月');
    }

    @test
    test1() {
        const m = SixtyCycleMonth.fromIndex(1150, 0);
        equal('庚午年戊寅月', m.toString());
        equal(0, m.getIndexInYear());
        equal('1150年1月30日', SolarTerm.fromIndex(1150, 3).getSolarDay());
        equal('庚午年戊寅月戊寅日', m.getFirstDay().toString());
    }
}
