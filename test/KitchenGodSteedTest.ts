import {suite, test} from '@testdeck/mocha';
import {KitchenGodSteed} from '../lib';
import {equal} from 'assert';

@suite
class KitchenGodSteedTest {
    @test
    test0(): void {
        equal(KitchenGodSteed.fromLunarYear(2017).getDragon(), '二龙治水');
        equal(KitchenGodSteed.fromLunarYear(2018).getDragon(), '二龙治水');
        equal(KitchenGodSteed.fromLunarYear(2019).getDragon(), '八龙治水');
        equal(KitchenGodSteed.fromLunarYear(5).getDragon(), '三龙治水');
    }

    @test
    test1(): void {
        equal(KitchenGodSteed.fromLunarYear(2017).getCake(), '二人分饼');
        equal(KitchenGodSteed.fromLunarYear(2018).getCake(), '八人分饼');
        equal(KitchenGodSteed.fromLunarYear(5).getCake(), '一人分饼');
    }

    @test
    test2(): void {
        equal(KitchenGodSteed.fromLunarYear(2021).getCattle(), '十一牛耕田');
    }

    @test
    test3(): void {
        equal(KitchenGodSteed.fromLunarYear(2018).getGold(), '三日得金');
    }
}
