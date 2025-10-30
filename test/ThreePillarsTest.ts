import {suite, test} from '@testdeck/mocha';
import {deepStrictEqual, equal} from 'assert';
import {SolarDay, ThreePillars} from '../lib';

@suite
class ThreePillarsTest {
    @test
    test() {
        const threePillars: ThreePillars = new ThreePillars('甲戌', '甲戌', '甲戌');
        const dayList: string[] = [];
        threePillars.getSolarDays(1, 2200).forEach(day => {
            dayList.push(day.toString());
        })
        deepStrictEqual(dayList, [
            '14年10月17日',
            '194年11月1日',
            '254年10月17日',
            '434年11月1日',
            '494年10月17日',
            '674年11月1日',
            '734年10月17日',
            '794年10月2日',
            '974年10月17日',
            '1034年10月2日',
            '1214年10月17日',
            '1274年10月2日',
            '1454年10月17日',
            '1514年10月2日',
            '1694年10月27日',
            '1754年10月13日',
            '1934年10月30日',
            '1994年10月15日',
            '2174年10月31日',
        ]);
    }

    @test
    test1() {
        equal(SolarDay.fromYmd(1034, 10, 2).getSixtyCycleDay().getThreePillars().getName(), '甲戌 甲戌 甲戌');
    }
}
