import {suite, test} from '@testdeck/mocha';
import {EarthBranch} from '../lib';
import {equal, ifError} from 'assert';

@suite
class EarthlyBranchTest {
    @test
    test() {
        equal(EarthBranch.fromIndex(0).getName(), '子');
    }

    @test
    test1() {
        equal(EarthBranch.fromIndex(0).getIndex(), 0);
    }

    @test
    test2() {
        equal(EarthBranch.fromName('子').getOpposite().getName(), '午');
        equal(EarthBranch.fromName('戌').getOpposite().getName(), '辰');
    }

    @test
    test3() {
        equal(EarthBranch.fromName('子').getCombine().getName(), '丑');
        equal(EarthBranch.fromName('申').getCombine().getName(), '巳');
    }

    @test
    test4() {
        equal(EarthBranch.fromName('巳').getHarm().getName(), '寅');
        equal(EarthBranch.fromName('申').getHarm().getName(), '亥');
    }

    @test
    test5() {
        // 合化
        equal(EarthBranch.fromName('卯').combine(EarthBranch.fromName('戌'))!.getName(), '火');
        equal(EarthBranch.fromName('戌').combine(EarthBranch.fromName('卯'))!.getName(), '火');
        // 卯子无法合化
        ifError(EarthBranch.fromName('卯').combine(EarthBranch.fromName('子')));
    }

}
