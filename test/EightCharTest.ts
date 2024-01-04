import {suite, test} from '@testdeck/mocha';
import {ChildLimit, EightChar, Gender, HeavenStem, SixtyCycle, SolarTime} from '../lib';
import {equal, ifError, ok} from 'assert';

@suite
class EightCharTest {
    /**
     * 十神
     */
    @test
    test1() {
        // 八字
        const eightChar = new EightChar(
            SixtyCycle.fromName('丙寅'),
            SixtyCycle.fromName('癸巳'),
            SixtyCycle.fromName('癸酉'),
            SixtyCycle.fromName('己未')
        );

        // 年柱
        const year = eightChar.getYear();
        // 月柱
        const month = eightChar.getMonth();
        // 日柱
        const day = eightChar.getDay();
        // 时柱
        const hour = eightChar.getHour();

        // 日元(日主、日干)
        const me = day.getHeavenStem();

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
        const eightChar = new EightChar(
            SixtyCycle.fromName('丙寅'),
            SixtyCycle.fromName('癸巳'),
            SixtyCycle.fromName('癸酉'),
            SixtyCycle.fromName('己未')
        );

        // 年柱
        const year = eightChar.getYear();
        // 月柱
        const month = eightChar.getMonth();
        // 日柱
        const day = eightChar.getDay();
        // 时柱
        const hour = eightChar.getHour();

        // 日元(日主、日干)
        const me = day.getHeavenStem();

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
        const eightChar = new EightChar(
            SixtyCycle.fromName('癸卯'),
            SixtyCycle.fromName('辛酉'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('癸酉')
        );

        // 胎元
        const taiYuan = eightChar.getFetalOrigin();
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
        const eightChar = new EightChar(
            SixtyCycle.fromName('癸卯'),
            SixtyCycle.fromName('辛酉'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('癸酉')
        );

        // 胎息
        const taiXi = eightChar.getFetalBreath();
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
        const eightChar = new EightChar(
            SixtyCycle.fromName('癸卯'),
            SixtyCycle.fromName('辛酉'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('癸酉')
        );

        // 命宫
        const mingGong = eightChar.getOwnSign();
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
        const eightChar = new EightChar(
            SixtyCycle.fromName('癸卯'),
            SixtyCycle.fromName('辛酉'),
            SixtyCycle.fromName('己亥'),
            SixtyCycle.fromName('癸酉')
        );

        // 身宫
        const shenGong = eightChar.getBodySign();
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
        const eightChar = new EightChar(
            SixtyCycle.fromName('乙酉'),
            SixtyCycle.fromName('戊子'),
            SixtyCycle.fromName('辛巳'),
            SixtyCycle.fromName('壬辰')
        );

        // 日干
        const me = eightChar.getDay().getHeavenStem();
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
        const eightChar = SolarTime.fromYmdHms(2005, 12, 23, 8, 37, 0).getLunarHour().getEightChar();
        equal(eightChar.getYear().getName(), '乙酉');
        equal(eightChar.getMonth().getName(), '戊子');
        equal(eightChar.getDay().getName(), '辛巳');
        equal(eightChar.getHour().getName(), '壬辰');
    }

    @test
    test9() {
        const eightChar = SolarTime.fromYmdHms(1988, 2, 15, 23, 30, 0).getLunarHour().getEightChar();
        equal(eightChar.getYear().getName(), '戊辰');
        equal(eightChar.getMonth().getName(), '甲寅');
        equal(eightChar.getDay().getName(), '辛丑');
        equal(eightChar.getHour().getName(), '戊子');
    }

    @test
    test10() {
        const eightChar = SolarTime.fromYmdHms(1988, 2, 15, 23, 30, 0).getLunarHour().getEightChar();
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
        const childLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(2022, 3, 9, 20, 51, 0), Gender.MAN);
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
        const childLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(2018, 6, 11, 9, 30, 0), Gender.WOMAN);
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
        const childLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(1983, 2, 15, 20, 0, 0), Gender.WOMAN);
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
        equal(childLimit.getStartTime().getLunarHour().getDay().getMonth().getYear().getSixtyCycle().getName(), '癸亥');
        // 童限结束(即开始起运)的农历年干支
        equal(childLimit.getEndTime().getLunarHour().getDay().getMonth().getYear().getSixtyCycle().getName(), '己巳');

        // 第1轮大运
        const decadeFortune = childLimit.getStartDecadeFortune();
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
        const fortune = childLimit.getStartFortune();
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
        const childLimit = ChildLimit.fromSolarTime(SolarTime.fromYmdHms(1992, 2, 2, 12, 0, 0), Gender.MAN);
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
        equal(childLimit.getStartTime().getLunarHour().getDay().getMonth().getYear().getSixtyCycle().getName(), '辛未');
        // 童限结束(即开始起运)的农历年干支
        equal(childLimit.getEndTime().getLunarHour().getDay().getMonth().getYear().getSixtyCycle().getName(), '辛巳');

        // 第1轮大运
        const decadeFortune = childLimit.getStartDecadeFortune();
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
        const fortune = childLimit.getStartFortune();
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
}
