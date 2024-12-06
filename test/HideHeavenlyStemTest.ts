import {suite, test} from '@testdeck/mocha';
import {HideHeavenStemDay, HideHeavenStemType, SolarDay} from '../lib';
import {equal} from 'assert';

@suite
class HideHeavenlyStemTest {
    @test
    test0() {
        const d: HideHeavenStemDay = SolarDay.fromYmd(2024, 12, 4).getHideHeavenStemDay();
        equal(d.getHideHeavenStem().getType(), HideHeavenStemType.MAIN);
        equal(d.getHideHeavenStem().getName(), '壬');
        equal(d.getHideHeavenStem().toString(), '壬');
        equal(d.getHideHeavenStem().getHeavenStem().getElement().getName(), '水');

        equal(d.getName(), '壬水');
        equal(d.getDayIndex(), 15);
        equal(d.toString(), '壬水第16天');
    }

    @test
    test1() {
        const d: HideHeavenStemDay = SolarDay.fromYmd(2024, 11, 7).getHideHeavenStemDay();
        equal(d.getHideHeavenStem().getType(), HideHeavenStemType.RESIDUAL);
        equal(d.getHideHeavenStem().getName(), '戊');
        equal(d.getHideHeavenStem().toString(), '戊');
        equal(d.getHideHeavenStem().getHeavenStem().getElement().getName(), '土');

        equal(d.getName(), '戊土');
        equal(d.getDayIndex(), 0);
        equal(d.toString(), '戊土第1天');
    }
}
