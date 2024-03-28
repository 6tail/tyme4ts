import {suite, test} from '@testdeck/mocha';
import {SolarSeason} from '../lib';
import {equal} from 'assert';

@suite
class SolarSeasonTest {
    @test
    test0() {
        const season: SolarSeason = SolarSeason.fromIndex(2023, 0);
        equal(season.toString(), '2023年一季度');
        equal(season.next(-5).toString(), '2021年四季度');
    }
}
