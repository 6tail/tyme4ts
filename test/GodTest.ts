import {suite, test} from '@testdeck/mocha';
import {God, LunarDay, SolarDay} from '../lib';
import {deepEqual} from 'assert';

@suite
class GodTest {
    @test
    test0() {
        const lunar: LunarDay = SolarDay.fromYmd(2004, 2, 16).getLunarDay();
        const gods: God[] = lunar.getGods();
        const ji: string[] = [];
        gods.forEach(god => {
            if ('吉' == god.getLuck().getName()) {
                ji.push(god.getName());
            }
        });

        const xiong: string[] = [];
        gods.forEach(god => {
            if ('凶' == god.getLuck().getName()) {
                xiong.push(god.getName());
            }
        });

        deepEqual(ji, ['天恩', '续世', '明堂']);
        deepEqual(xiong, ['月煞', '月虚', '血支', '天贼', '五虚', '土符', '归忌', '血忌']);
    }

    @test
    test1() {
        const lunar: LunarDay = SolarDay.fromYmd(2029, 11, 16).getLunarDay();
        const gods: God[] = lunar.getGods();
        const ji: string[] = [];
        gods.forEach(god => {
            if ('吉' == god.getLuck().getName()) {
                ji.push(god.getName());
            }
        });

        const xiong: string[] = [];
        gods.forEach(god => {
            if ('凶' == god.getLuck().getName()) {
                xiong.push(god.getName());
            }
        });

        deepEqual(ji, ['天德合', '月空', '天恩', '益后', '金匮']);
        deepEqual(xiong, ['月煞', '月虚', '血支', '五虚']);
    }

    @test
    test2() {
        const lunar: LunarDay = SolarDay.fromYmd(1954, 7, 16).getLunarDay();
        const gods: God[] = lunar.getGods();
        const ji: string[] = [];
        gods.forEach(god => {
            if ('吉' == god.getLuck().getName()) {
                ji.push(god.getName());
            }
        });

        const xiong: string[] = [];
        gods.forEach(god => {
            if ('凶' == god.getLuck().getName()) {
                xiong.push(god.getName());
            }
        });

        deepEqual(ji, ['民日', '天巫', '福德', '天仓', '不将', '续世', '除神', '鸣吠']);
        deepEqual(xiong, ['劫煞', '天贼', '五虚', '五离']);
    }

    @test
    test3() {
        const lunar: LunarDay = SolarDay.fromYmd(2024, 12, 27).getLunarDay();
        const gods: God[] = lunar.getGods();
        const ji: string[] = [];
        gods.forEach(god => {
            if ('吉' == god.getLuck().getName()) {
                ji.push(god.getName());
            }
        });

        const xiong: string[] = [];
        gods.forEach(god => {
            if ('凶' == god.getLuck().getName()) {
                xiong.push(god.getName());
            }
        });

        deepEqual(ji, ['天恩', '四相', '阴德', '守日', '吉期', '六合', '普护', '宝光']);
        deepEqual(xiong, ['三丧', '鬼哭']);
    }

    @test
    test4() {
        const lunar: LunarDay = SolarDay.fromYmd(2025, 12, 15).getLunarDay();
        const gods: God[] = lunar.getGods();
        const ji: string[] = [];
        gods.forEach(god => {
            if ('吉' == god.getLuck().getName()) {
                ji.push(god.getName());
            }
        });

        const xiong: string[] = [];
        gods.forEach(god => {
            if ('凶' == god.getLuck().getName()) {
                xiong.push(god.getName());
            }
        });

        deepEqual(ji, ['阳德', '六仪', '续世', '解神', '司命']);
        deepEqual(xiong, ['月破', '大耗', '灾煞', '天火', '厌对', '招摇', '五虚', '血忌']);
    }
}
