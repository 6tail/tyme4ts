import {suite, test} from '@testdeck/mocha';
import {SolarDay, SolarTime} from '../lib';
import {deepEqual} from 'assert';

@suite
class TabooTest {
    @test
    test0() {
        const taboos: string[] = [];
        SolarDay.fromYmd(2024, 6, 26).getLunarDay().getRecommends().forEach(t => {
            taboos.push(t.getName());
        });

        deepEqual(taboos, ['嫁娶', '祭祀', '理发', '作灶', '修饰垣墙', '平治道涂', '整手足甲', '沐浴', '冠笄']);
    }

    @test
    test1() {
        const taboos: string[] = [];
        SolarDay.fromYmd(2024, 6, 26).getLunarDay().getAvoids().forEach(t => {
            taboos.push(t.getName());
        });

        deepEqual(taboos, ['破土', '出行', '栽种']);
    }

    @test
    test2() {
        const taboos: string[] = [];
        SolarTime.fromYmdHms(2024, 6, 25, 4, 0, 0).getLunarHour().getRecommends().forEach(t => {
            taboos.push(t.getName());
        });

        deepEqual(taboos, []);
    }

    @test
    test3() {
        const taboos: string[] = [];
        SolarTime.fromYmdHms(2024, 6, 25, 4, 0, 0).getLunarHour().getAvoids().forEach(t => {
            taboos.push(t.getName());
        });

        deepEqual(taboos, ['诸事不宜']);
    }

    @test
    test4() {
        const taboos: string[] = [];
        SolarTime.fromYmdHms(2024, 4, 22, 0, 0, 0).getLunarHour().getRecommends().forEach(t => {
            taboos.push(t.getName());
        });

        deepEqual(taboos, ['嫁娶', '交易', '开市', '安床', '祭祀', '求财']);
    }

    @test
    test5() {
        const taboos: string[] = [];
        SolarTime.fromYmdHms(2024, 4, 22, 0, 0, 0).getLunarHour().getAvoids().forEach(t => {
            taboos.push(t.getName());
        });

        deepEqual(taboos, ['出行', '移徙', '赴任', '词讼', '祈福', '修造', '求嗣']);
    }

    @test
    test6() {
        const taboos: string[] = [];
        SolarDay.fromYmd(2021, 3, 7).getLunarDay().getRecommends().forEach(t => {
            taboos.push(t.getName());
        });

        deepEqual(taboos, ['裁衣', '经络', '伐木', '开柱眼', '拆卸', '修造', '动土', '上梁', '合脊', '合寿木', '入殓', '除服', '成服', '移柩', '破土', '安葬', '启钻', '修坟', '立碑']);
    }

}
