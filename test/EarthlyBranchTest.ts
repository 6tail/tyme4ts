import {suite, test} from '@testdeck/mocha';
import {EarthBranch} from '../lib';
import {equal} from 'assert';

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

}
