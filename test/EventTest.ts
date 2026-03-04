import {suite, test} from '@testdeck/mocha';
import {EventManager, Event, SolarDay} from '../lib';
import {equal, ifError, ok} from 'assert';

@suite
class EventTest {

    init(): void {
        // 公历现代节日
        // EventManager.DATA = '@0VV__0Ux公历现代节日:元旦@0Xc__0Ux公历现代节日:三八妇女节@0Xg__0_Q公历现代节日:植树节@0ZV__0Ux公历现代节日:五一劳动节@0ZY__0Ux公历现代节日:五四青年节@0aV__0Ux公历现代节日:六一儿童节@0bV__0Uo公历现代节日:建党节@0cV__0Ug公历现代节日:八一建军节@0de__0_V公历现代节日:教师节@0eV__0Ux公历现代节日:国庆节';
        EventManager.update('公历现代节日:元旦', Event.builder().solarDay(1, 1, 0).startYear(1950).build());
        EventManager.update('公历现代节日:三八妇女节', Event.builder().solarDay(3, 8, 0).startYear(1950).build());
        EventManager.update('公历现代节日:植树节', Event.builder().solarDay(3, 12, 0).startYear(1979).build());
        EventManager.update('公历现代节日:五一劳动节', Event.builder().solarDay(5, 1, 0).startYear(1950).build());
        EventManager.update('公历现代节日:五四青年节', Event.builder().solarDay(5, 4, 0).startYear(1950).build());
        EventManager.update('公历现代节日:六一儿童节', Event.builder().solarDay(6, 1, 0).startYear(1950).build());
        EventManager.update('公历现代节日:建党节', Event.builder().solarDay(7, 1, 0).startYear(1941).build());
        EventManager.update('公历现代节日:八一建军节', Event.builder().solarDay(8, 1, 0).startYear(1933).build());
        EventManager.update('公历现代节日:教师节', Event.builder().solarDay(9, 10, 0).startYear(1985).build());
        EventManager.update('公历现代节日:国庆节', Event.builder().solarDay(10, 1, 0).startYear(1950).build());

        // 农历传统节日
        // EventManager.DATA = '@2VV__000农历传统节日:春节@2Vj__000农历传统节日:元宵节@2WW__000农历传统节日:龙头节@2XX__000农历传统节日:上巳节@3b___000农历传统节日:清明节@2ZZ__000农历传统节日:端午节@2bb__000农历传统节日:七夕节@2bj__000农历传统节日:中元节@2cj__000农历传统节日:中秋节@2dd__000农历传统节日:重阳节@3s___000农历传统节日:冬至节@2gc__000农历传统节日:腊八节@2hV_U000农历传统节日:除夕';
        EventManager.update('农历传统节日:春节', Event.builder().lunarDay(1, 1, 0).build());
        EventManager.update('农历传统节日:元宵节', Event.builder().lunarDay(1, 15, 0).build());
        EventManager.update('农历传统节日:龙头节', Event.builder().lunarDay(2, 2, 0).build());
        EventManager.update('农历传统节日:上巳节', Event.builder().lunarDay(3, 3, 0).build());
        EventManager.update('农历传统节日:清明节', Event.builder().termDay(7, 0).build());
        EventManager.update('农历传统节日:端午节', Event.builder().lunarDay(5, 5, 0).build());
        EventManager.update('农历传统节日:七夕节', Event.builder().lunarDay(7, 7, 0).build());
        EventManager.update('农历传统节日:中元节', Event.builder().lunarDay(7, 15, 0).build());
        EventManager.update('农历传统节日:中秋节', Event.builder().lunarDay(8, 15, 0).build());
        EventManager.update('农历传统节日:重阳节', Event.builder().lunarDay(9, 9, 0).build());
        EventManager.update('农历传统节日:冬至节', Event.builder().termDay(24, 0).build());
        EventManager.update('农历传统节日:腊八节', Event.builder().lunarDay(12, 8, 0).build());
        EventManager.update('农历传统节日:除夕', Event.builder().lunarDay(13, 1, 0).offset(-1).build());

        EventManager.update('情人节', Event.builder().solarDay(2, 14, 0).startYear(270).build());
        EventManager.update('国际消费者权益日', Event.builder().solarDay(3, 15, 0).startYear(1983).build());
        EventManager.update('愚人节', Event.builder().solarDay(4, 1, 0).startYear(1564).build());
        EventManager.update('万圣夜', Event.builder().solarDay(10, 31, 0).startYear(600).build());
        EventManager.update('万圣节', Event.builder().solarDay(11, 1, 0).startYear(600).build());
        EventManager.update('平安夜', Event.builder().solarDay(12, 24, 0).startYear(336).build());
        EventManager.update('圣诞节', Event.builder().solarDay(12, 25, 0).startYear(336).build());

        EventManager.update('全国中小学生安全教育日', Event.builder().solarWeek(3, -1, 1).startYear(1996).build());
        EventManager.update('母亲节', Event.builder().solarWeek(5, 2, 0).startYear(1914).build());
        EventManager.update('父亲节', Event.builder().solarWeek(6, 3, 0).startYear(1972).build());
        EventManager.update('感恩节', Event.builder().solarWeek(11, 4, 4).startYear(1941).build());

        // 清明前1天
        EventManager.update('寒食节', Event.builder().termDay(7, -1).build());
        // 立春后第5个戊日
        EventManager.update('春社', Event.builder().termHeavenStem(3, 4, 30).offset(10).build());
        // 立秋后第5个戊日
        EventManager.update('秋社', Event.builder().termHeavenStem(15, 4, 30).offset(10).build());

        // 夏至后第3个庚日
        EventManager.update('入伏', Event.builder().termHeavenStem(12, 6, 20).build());
        // 夏至后第4个庚日
        EventManager.update('中伏', Event.builder().termHeavenStem(12, 6, 30).build());
        // 立秋后第1个庚日
        EventManager.update('末伏', Event.builder().termHeavenStem(15, 6, 0).build());

        // 芒种后第1个丙日
        EventManager.update('入梅', Event.builder().termHeavenStem(11, 2, 0).build());
        // 小暑后第1个未日
        EventManager.update('出梅', Event.builder().termEarthBranch(13, 7, 0).build());

        // 如果没有2月29，则倒推1天
        EventManager.update('公历生日', Event.builder().solarDay(2, 29, -1).startYear(2004).build());

        EventManager.update('农历生日', Event.builder().lunarDay(4, 21, 0).startYear(1986).build());
    }

    @test
    test0(): void {
        this.init();

        let e: Event | null = Event.fromName('公历生日');
        ok(e);

        let d: SolarDay | null = e.getSolarDay(2008);
        ok(d);
        equal(d.toString(), '2008年2月29日');

        // 2005年没有2月29，按最初设置的，没有就倒推1天
        d = e.getSolarDay(2005);
        ok(d);
        equal(d.toString(), '2005年2月28日');

        e = Event.fromName('农历生日');
        ok(e);

        d = e.getSolarDay(2026);
        ok(d);
        equal(d.toString(), '2026年6月6日');
    }

    @test
    test1(): void {
        this.init();

        const e: Event | null = Event.fromName('公历生日');
        ok(e);

        const d: SolarDay | null = e.getSolarDay(1985);
        ifError(d);
    }

    @test
    test2(): void {
        this.init();

        const e: Event | null = Event.fromName('国际消费者权益日');
        ok(e);

        const d: SolarDay | null = e.getSolarDay(2026);
        ok(d);
        equal(d.toString(), '2026年3月15日');

        const events: Event[] = Event.fromSolarDay(d);
        equal(events.toString(), '国际消费者权益日');
    }

    @test
    test3(): void {
        this.init();

        const e: Event | null = Event.fromName('全国中小学生安全教育日');
        ok(e);

        const d: SolarDay | null = e.getSolarDay(2018);
        ok(d);
        equal(d.toString(), '2018年3月26日');
    }

}
