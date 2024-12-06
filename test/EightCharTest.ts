import {suite, test} from '@testdeck/mocha';
import {
    ChildLimit, China95ChildLimitProvider, DecadeFortune,
    DefaultChildLimitProvider, DefaultEightCharProvider,
    EightChar, Fortune,
    Gender,
    HeavenStem,
    LunarHour, LunarSect2EightCharProvider,
    SixtyCycle,
    SolarTime
} from '../lib';
import {equal, ifError, ok, deepStrictEqual} from 'assert';

@suite
class EightCharTest {
    /**
     * 十神
     */
    @test
    test1() {
        // 八字
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('丙寅'),
            SixtyCycle.fromName('癸巳'),
            SixtyCycle.fromName('癸酉'),
            SixtyCycle.fromName('己未')
        );

        // 年柱
        const year: SixtyCycle = eightChar.getYear();
        // 月柱
        const month: SixtyCycle = eightChar.getMonth();
        // 日柱
        const day: SixtyCycle = eightChar.getDay();
        // 时柱
        const hour: SixtyCycle = eightChar.getHour();

        // 日元(日主、日干)
        const me: HeavenStem = day.getHeavenStem();

        // 年柱天干十神
        equal(me.getTenStar(year.getHeavenStem()).getName(), '正财');
        // 月柱天干十神
        equal(me.getTenStar(month.getHeavenStem()).getName(), '比肩');
        // 时柱天干十神
        equal(me.getTenStar(hour.getHeavenStem()).getName(), '七杀');

        // 年柱地支十神（本气)
        equal(me.getTenStar(year.getEarthBranch().getHideHeavenStemMain()).getName(), '伤官');
        // 年柱地支十神（中气)
        ok(year.getEarthBranch().getHideHeavenStemMiddle());
        equal(me.getTenStar(<HeavenStem>year.getEarthBranch().getHideHeavenStemMiddle()).getName(), '正财');
        // 年柱地支十神（余气)
        ok(year.getEarthBranch().getHideHeavenStemResidual());
        equal(me.getTenStar(<HeavenStem>year.getEarthBranch().getHideHeavenStemResidual()).getName(), '正官');

        // 日柱地支十神（本气)
        equal(me.getTenStar(day.getEarthBranch().getHideHeavenStemMain()).getName(), '偏印');
        // 日柱地支藏干（中气)
        ifError(day.getEarthBranch().getHideHeavenStemMiddle());
        // 日柱地支藏干（余气)
        ifError(day.getEarthBranch().getHideHeavenStemResidual());

        // 指定任意天干的十神
        equal(me.getTenStar(HeavenStem.fromName('丙')).getName(), '正财');
    }

    /**
     * 地势(长生十二神)
     */
    @test
    test2() {
        // 八字
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('丙寅'),
            SixtyCycle.fromName('癸巳'),
            SixtyCycle.fromName('癸酉'),
            SixtyCycle.fromName('己未')
        );

        // 年柱
        const year: SixtyCycle = eightChar.getYear();
        // 月柱
        const month: SixtyCycle = eightChar.getMonth();
        // 日柱
        const day: SixtyCycle = eightChar.getDay();
        // 时柱
        const hour: SixtyCycle = eightChar.getHour();

        // 日元(日主、日干)
        const me: HeavenStem = day.getHeavenStem();

        // 年柱地势
        equal(me.getTerrain(year.getEarthBranch()).getName(), '沐浴');
        // 月柱地势
        equal(me.getTerrain(month.getEarthBranch()).getName(), '胎');
        // 日柱地势
        equal(me.getTerrain(day.getEarthBranch()).getName(), '病');
        // 时柱地势
        equal(me.getTerrain(hour.getEarthBranch()).getName(), '墓');
    }

    /**
     * 胎元/胎息/命宫
     */
    @test
    test3() {
        // 八字
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('癸卯'),
            SixtyCycle.fromName('辛酉'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('癸酉')
        );

        // 胎元
        const taiYuan: SixtyCycle = eightChar.getFetalOrigin();
        equal(taiYuan.getName(), '壬子');
        // 胎元纳音
        equal(taiYuan.getSound().getName(), '桑柘木');
    }

    /**
     * 胎息
     */
    @test
    test4() {
        // 八字
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('癸卯'),
            SixtyCycle.fromName('辛酉'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('癸酉')
        );

        // 胎息
        const taiXi: SixtyCycle = eightChar.getFetalBreath();
        equal(taiXi.getName(), '甲寅');
        // 胎息纳音
        equal(taiXi.getSound().getName(), '大溪水');
    }

    /**
     * 命宫
     */
    @test
    test5() {
        // 八字
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('癸卯'),
            SixtyCycle.fromName('辛酉'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('癸酉')
        );

        // 命宫
        const mingGong: SixtyCycle = eightChar.getOwnSign();
        equal(mingGong.getName(), '癸亥');
        // 命宫纳音
        equal(mingGong.getSound().getName(), '大海水');
    }

    /**
     * 身宫
     */
    @test
    test6() {
        // 八字
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('癸卯'),
            SixtyCycle.fromName('辛酉'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('癸酉')
        );

        // 身宫
        const shenGong: SixtyCycle = eightChar.getBodySign();
        equal(shenGong.getName(), '己未');
        // 身宫纳音
        equal(shenGong.getSound().getName(), '天上火');
    }

    /**
     * 地势(长生十二神)
     */
    @test
    test7() {
        // 八字
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('乙酉'),
            SixtyCycle.fromName('戊子'),
            SixtyCycle.fromName('辛巳'),
            SixtyCycle.fromName('壬辰')
        );

        // 日干
        const me: HeavenStem = eightChar.getDay().getHeavenStem();
        // 年柱地势
        equal(me.getTerrain(eightChar.getYear().getEarthBranch()).getName(), '临官');
        // 月柱地势
        equal(me.getTerrain(eightChar.getMonth().getEarthBranch()).getName(), '长生');
        // 日柱地势
        equal(me.getTerrain(eightChar.getDay().getEarthBranch()).getName(), '死');
        // 时柱地势
        equal(me.getTerrain(eightChar.getHour().getEarthBranch()).getName(), '墓');
    }

    /**
     * 公历时刻转八字
     */
    @test
    test8() {
        const eightChar: EightChar = SolarTime.fromYmdHms(2005, 12, 23, 8, 37, 0).getLunarHour().getEightChar();
        equal(eightChar.getYear().getName(), '乙酉');
        equal(eightChar.getMonth().getName(), '戊子');
        equal(eightChar.getDay().getName(), '辛巳');
        equal(eightChar.getHour().getName(), '壬辰');
    }

    @test
    test9() {
        const eightChar: EightChar = SolarTime.fromYmdHms(1988, 2, 15, 23, 30, 0).getLunarHour().getEightChar();
        equal(eightChar.getYear().getName(), '戊辰');
        equal(eightChar.getMonth().getName(), '甲寅');
        equal(eightChar.getDay().getName(), '辛丑');
        equal(eightChar.getHour().getName(), '戊子');
    }

    /**
     * 童限测试
     */
    @test
    test11() {
        const childLimit: ChildLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(2022, 3, 9, 20, 51, 0), Gender.MAN);
        equal(childLimit.getYearCount(), 8);
        equal(childLimit.getMonthCount(), 9);
        equal(childLimit.getDayCount(), 2);
        equal(childLimit.getHourCount(), 10);
        equal(childLimit.getMinuteCount(), 26);
        equal(childLimit.getEndTime().toString(), '2030年12月12日 07:17:00');
    }

    /**
     * 童限测试
     */
    @test
    test12() {
        const childLimit: ChildLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(2018, 6, 11, 9, 30, 0), Gender.WOMAN);
        equal(childLimit.getYearCount(), 1);
        equal(childLimit.getMonthCount(), 9);
        equal(childLimit.getDayCount(), 10);
        equal(childLimit.getHourCount(), 1);
        equal(childLimit.getMinuteCount(), 42);
        equal(childLimit.getEndTime().toString(), '2020年3月21日 11:12:00');
    }

    /**
     * 大运测试
     */
    @test
    test13() {
        // 童限
        const childLimit: ChildLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(1983, 2, 15, 20, 0, 0), Gender.WOMAN);
        // 八字
        equal(childLimit.getEightChar().toString(), '癸亥 甲寅 甲戌 甲戌');
        // 童限年数
        equal(childLimit.getYearCount(), 6);
        // 童限月数
        equal(childLimit.getMonthCount(), 2);
        // 童限日数
        equal(childLimit.getDayCount(), 18);
        // 童限结束(即开始起运)的公历时刻
        equal(childLimit.getEndTime().toString(), '1989年5月4日 18:24:00');
        // 童限开始(即出生)的农历年干支
        equal(childLimit.getStartTime().getLunarHour().getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getName(), '癸亥');
        // 童限结束(即开始起运)的农历年干支
        equal(childLimit.getEndTime().getLunarHour().getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getName(), '己巳');

        // 第1轮大运
        const decadeFortune: DecadeFortune = childLimit.getStartDecadeFortune();
        // 开始年龄
        equal(decadeFortune.getStartAge(), 7);
        // 结束年龄
        equal(decadeFortune.getEndAge(), 16);
        // 开始年
        equal(decadeFortune.getStartLunarYear().getYear(), 1989);
        // 结束年
        equal(decadeFortune.getEndLunarYear().getYear(), 1998);
        // 干支
        equal(decadeFortune.getName(), '乙卯');
        // 下一大运
        equal(decadeFortune.next(1).getName(), '丙辰');
        // 上一大运
        equal(decadeFortune.next(-1).getName(), '甲寅');
        // 第9轮大运
        equal(decadeFortune.next(8).getName(), '癸亥');

        // 小运
        const fortune: Fortune = childLimit.getStartFortune();
        // 年龄
        equal(fortune.getAge(), 7);
        // 农历年
        equal(fortune.getLunarYear().getYear(), 1989);
        // 干支
        equal(fortune.getName(), '辛巳');

        // 流年
        equal(fortune.getLunarYear().getSixtyCycle().getName(), '己巳');
    }

    @test
    test14() {
        // 童限
        const childLimit: ChildLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(1992, 2, 2, 12, 0, 0), Gender.MAN);
        // 八字
        equal(childLimit.getEightChar().toString(), '辛未 辛丑 戊申 戊午');
        // 童限年数
        equal(childLimit.getYearCount(), 9);
        // 童限月数
        equal(childLimit.getMonthCount(), 0);
        // 童限日数
        equal(childLimit.getDayCount(), 9);
        // 童限结束(即开始起运)的公历时刻
        equal(childLimit.getEndTime().toString(), '2001年2月11日 18:58:00');
        // 童限开始(即出生)的农历年干支
        equal(childLimit.getStartTime().getLunarHour().getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getName(), '辛未');
        // 童限结束(即开始起运)的农历年干支
        equal(childLimit.getEndTime().getLunarHour().getLunarDay().getLunarMonth().getLunarYear().getSixtyCycle().getName(), '辛巳');

        // 第1轮大运
        const decadeFortune: DecadeFortune = childLimit.getStartDecadeFortune();
        // 开始年龄
        equal(decadeFortune.getStartAge(), 10);
        // 结束年龄
        equal(decadeFortune.getEndAge(), 19);
        // 开始年
        equal(decadeFortune.getStartLunarYear().getYear(), 2001);
        // 结束年
        equal(decadeFortune.getEndLunarYear().getYear(), 2010);
        // 干支
        equal(decadeFortune.getName(), '庚子');
        // 下一大运
        equal(decadeFortune.next(1).getName(), '己亥');

        // 小运
        const fortune: Fortune = childLimit.getStartFortune();
        // 年龄
        equal(fortune.getAge(), 10);
        // 农历年
        equal(fortune.getLunarYear().getYear(), 2001);
        // 干支
        equal(fortune.getName(), '戊申');
        // 小运推移
        equal(fortune.next(2).getName(), '丙午');
        equal(fortune.next(-2).getName(), '庚戌');

        // 流年
        equal(fortune.getLunarYear().getSixtyCycle().getName(), '辛巳');
    }

    @test
    test15() {
        equal(SolarTime.fromYmdHms(2018, 8, 8, 8, 8, 0).getLunarHour().getEightChar().toString(), '戊戌 庚申 壬申 甲辰');
    }

    @test
    test16() {
        // 童限
        const childLimit: ChildLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(1990, 3, 15, 10, 30, 0), Gender.MAN);
        // 八字
        equal(childLimit.getEightChar().toString(), '庚午 己卯 己卯 己巳');
        // 童限年数
        equal(childLimit.getYearCount(), 6);
        // 童限月数
        equal(childLimit.getMonthCount(), 11);
        // 童限日数
        equal(childLimit.getDayCount(), 23);
        // 童限结束(即开始起运)的公历时刻
        equal(childLimit.getEndTime().toString(), '1997年3月11日 00:22:00');

        // 小运
        const fortune: Fortune = childLimit.getStartFortune();
        // 年龄
        equal(fortune.getAge(), 8);
    }

    @test
    test17() {
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('己丑'),
            SixtyCycle.fromName('戊辰'),
            SixtyCycle.fromName('戊辰'),
            SixtyCycle.fromName('甲子')
        );
        equal(eightChar.getOwnSign().getName(), '丁丑');
    }

    @test
    test18() {
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('戊戌'),
            SixtyCycle.fromName('庚申'),
            SixtyCycle.fromName('丁亥'),
            SixtyCycle.fromName('丙午')
        );
        equal(eightChar.getOwnSign().getName(), '乙卯');
    }

    @test
    test19() {
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('甲子'),
            SixtyCycle.fromName('壬申'),
            SixtyCycle.fromName('庚子'),
            SixtyCycle.fromName('乙亥')
        );
        equal(eightChar.getOwnSign().getName(), '甲戌');
    }

    @test
    test20() {
        const eightChar: EightChar = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(2024, 1, 29, 9, 33, 0), Gender.MAN).getEightChar();
        equal(eightChar.getOwnSign().getName(), '癸亥');
        equal(eightChar.getBodySign().getName(), '己未');
    }

    @test
    test21() {
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('辛亥'),
            SixtyCycle.fromName('乙未'),
            SixtyCycle.fromName('庚子'),
            SixtyCycle.fromName('甲辰')
        );
        equal(eightChar.getBodySign().getName(), '庚子');
    }

    @test
    test22() {
        equal(ChildLimit.fromSolarTime(SolarTime.fromYmdHms(1990, 1, 27, 0, 0, 0), Gender.MAN).getEightChar().getBodySign().getName(), '丙寅');
    }

    @test
    test23() {
        equal(ChildLimit.fromSolarTime(SolarTime.fromYmdHms(2019, 3, 7, 8, 0, 0), Gender.MAN).getEightChar().getOwnSign().getName(), '甲戌');
    }

    @test
    test24() {
        equal(ChildLimit.fromSolarTime(SolarTime.fromYmdHms(2019, 3, 27, 2, 0, 0), Gender.MAN).getEightChar().getOwnSign().getName(), '丁丑');
    }

    @test
    test25() {
        equal(LunarHour.fromYmdHms(1994, 5, 20, 18, 0, 0).getEightChar().getOwnSign().getName(), '丙寅');
    }

    @test
    test26() {
        equal(SolarTime.fromYmdHms(1986, 5, 29, 13, 37, 0).getLunarHour().getEightChar().getBodySign().getName(), '己丑');
    }

    @test
    test27() {
        equal(SolarTime.fromYmdHms(1994, 12, 6, 2, 0, 0).getLunarHour().getEightChar().getBodySign().getName(), '乙丑');
    }

    @test
    test28() {
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('辛亥'),
            SixtyCycle.fromName('丁酉'),
            SixtyCycle.fromName('丙午'),
            SixtyCycle.fromName('癸巳')
        );
        equal(eightChar.getOwnSign().getName(), '辛卯');
    }

    @test
    test29() {
        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('丙寅'),
            SixtyCycle.fromName('庚寅'),
            SixtyCycle.fromName('辛卯'),
            SixtyCycle.fromName('壬辰')
        );
        equal(eightChar.getOwnSign().getName(), '己亥');
        equal(eightChar.getBodySign().getName(), '乙未');
    }

    @test
    test30() {
        equal(new EightChar('壬子', '辛亥', '壬戌', '乙巳').getBodySign().getName(), '乙巳');
    }

    @test
    test31() {
        // 采用元亨利贞的起运算法
        ChildLimit.provider = new China95ChildLimitProvider();
        // 童限
        const childLimit: ChildLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(1986, 5, 29, 13, 37, 0), Gender.MAN);
        // 童限年数
        equal(childLimit.getYearCount(), 2);
        // 童限月数
        equal(childLimit.getMonthCount(), 7);
        // 童限日数
        equal(childLimit.getDayCount(), 0);
        // 童限时数
        equal(childLimit.getHourCount(), 0);
        // 童限分数
        equal(childLimit.getMinuteCount(), 0);
        // 童限结束(即开始起运)的公历时刻
        equal(childLimit.getEndTime().toString(), '1988年12月29日 13:37:00');

        // 为了不影响其他测试用例，恢复默认起运算法
        ChildLimit.provider = new DefaultChildLimitProvider();
    }

    @test
    test46() {
        LunarHour.provider = new LunarSect2EightCharProvider();

        const eightChar: EightChar = new EightChar(
            SixtyCycle.fromName('壬寅'),
            SixtyCycle.fromName('丙午'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('丙子')
        );
        const timeList: string[] = [];
        eightChar.getSolarTimes(1900, 2024).forEach(time => {
            timeList.push(time.toString());
        })
        deepStrictEqual(timeList, ['1962年6月30日 23:00:00', '2022年6月15日 23:00:00']);

        LunarHour.provider = new DefaultEightCharProvider();
    }
}
