import {suite, test} from '@testdeck/mocha';
import {EarthBranch, HeavenStem, SixtyCycle} from '../lib';
import {deepEqual, equal} from 'assert';

@suite
class SixtyCycleTest {
    @test
    test0() {
        equal(SixtyCycle.fromIndex(13).getName(), '丁丑');
    }

    @test
    test1() {
        equal(SixtyCycle.fromName('丁丑').getIndex(), 13);
    }

    /**
     * 五行
     */
    @test
    test2() {
        equal(SixtyCycle.fromName('辛酉').getSound().getName(), '石榴木');
        equal(SixtyCycle.fromName('癸酉').getSound().getName(), '剑锋金');
        equal(SixtyCycle.fromName('己亥').getSound().getName(), '平地木');
    }

    /**
     * 旬
     */
    @test
    test3() {
        equal(SixtyCycle.fromName('甲子').getTen().getName(), '甲子');
        equal(SixtyCycle.fromName('乙卯').getTen().getName(), '甲寅');
        equal(SixtyCycle.fromName('癸巳').getTen().getName(), '甲申');
    }

    /**
     * 旬空
     */
    @test
    test4() {
        deepEqual(SixtyCycle.fromName('甲子').getExtraEarthBranches(), [EarthBranch.fromName('戌'), EarthBranch.fromName('亥')]);
        deepEqual(SixtyCycle.fromName('乙卯').getExtraEarthBranches(), [EarthBranch.fromName('子'), EarthBranch.fromName('丑')]);
        deepEqual(SixtyCycle.fromName('癸巳').getExtraEarthBranches(), [EarthBranch.fromName('午'), EarthBranch.fromName('未')]);
    }

    /**
     * 地势(长生十二神)
     */
    @test
    test5() {
        equal(HeavenStem.fromName('丙').getTerrain(EarthBranch.fromName('寅')).getName(), '长生');
        equal(HeavenStem.fromName('辛').getTerrain(EarthBranch.fromName('亥')).getName(), '沐浴');
    }
}
