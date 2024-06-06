import {suite, test} from '@testdeck/mocha';
import {SolarDay, SolarTerm} from '../lib';
import {equal} from 'assert';

@suite
class SolarTermTest {
    @test
    test0() {
        // 冬至在去年，2022-12-22 05:48:11
        const dongZhi = SolarTerm.fromName(2023, '冬至');
        equal(dongZhi.getName(), '冬至');
        equal(dongZhi.getIndex(), 0);
        // 公历日
        equal(dongZhi.getJulianDay().getSolarDay().toString(), '2022年12月22日');

        // 冬至顺推23次，就是大雪 2023-12-07 17:32:55
        const daXue = dongZhi.next(23);
        equal(daXue.getName(), '大雪');
        equal(daXue.getIndex(), 23);
        equal(daXue.getJulianDay().getSolarDay().toString(), '2023年12月7日');

        // 冬至逆推2次，就是上一年的小雪 2022-11-22 16:20:28
        const xiaoXue = dongZhi.next(-2);
        equal(xiaoXue.getName(), '小雪');
        equal(xiaoXue.getIndex(), 22);
        equal(xiaoXue.getJulianDay().getSolarDay().toString(), '2022年11月22日');

        // 冬至顺推24次，就是下一个冬至 2023-12-22 11:27:20
        const dongZhi2 = dongZhi.next(24);
        equal(dongZhi2.getName(), '冬至');
        equal(dongZhi2.getIndex(), 0);
        equal(dongZhi2.getJulianDay().getSolarDay().toString(), '2023年12月22日');
    }

    @test
    test1() {
        // 公历2023年的雨水，2023-02-19 06:34:16
        const jq = SolarTerm.fromName(2023, '雨水');
        equal(jq.getName(), '雨水');
        equal(jq.getIndex(), 4);
    }

    @test
    test2() {
        // 公历2023年的大雪，2023-12-07 17:32:55
        const jq = SolarTerm.fromName(2023, '大雪');
        equal(jq.getName(), '大雪');
        // 索引
        equal(jq.getIndex(), 23);
        // 公历
        equal(jq.getJulianDay().getSolarDay().toString(), '2023年12月7日');
        // 农历
        equal(jq.getJulianDay().getSolarDay().getLunarDay().toString(), '农历癸卯年十月廿五');
        // 推移
        equal(jq.next(5).getName(), '雨水');
    }

    @test
    test3() {
        equal(SolarDay.fromYmd(2023, 10, 10).getTerm().getName(), '寒露');
    }

    @test
    test4() {
        equal(SolarDay.fromYmd(2023, 12, 7).getTermDay().toString(), '大雪第1天');
        equal(SolarDay.fromYmd(2023, 12, 7).getTermDay().getDayIndex(), 0);

        equal(SolarDay.fromYmd(2023, 12, 8).getTermDay().toString(), '大雪第2天');
        equal(SolarDay.fromYmd(2023, 12, 21).getTermDay().toString(), '大雪第15天');

        equal(SolarDay.fromYmd(2023, 12, 22).getTermDay().toString(), '冬至第1天');
    }
}
