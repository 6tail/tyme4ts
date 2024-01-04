import { suite, test } from '@testdeck/mocha';
import {equal} from 'assert';
import {EarthBranch, Element, HeavenStem} from '../lib';

@suite
class ElementTest {
    @test
    test() {
        equal(Element.fromName('金').getRestrain().getName(), Element.fromName('木').getName());
    }

    @test
    test1() {
        equal(Element.fromName('火').getReinforce().getName(), Element.fromName('土').getName());
    }

    @test
    test2() {
        equal(HeavenStem.fromName('丙').getElement().getName(), '火');
    }

    @test
    test3() {
        equal(EarthBranch.fromName('寅').getElement().getName(), '木');
        equal(EarthBranch.fromName('寅').getElement().getReinforce().getName(), Element.fromName('火').getName());
    }
}
