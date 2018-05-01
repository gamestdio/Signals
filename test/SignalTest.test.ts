import { assert } from "chai";

import { Sprite } from "./mock/Sprite";
import { Signal } from "../src/Signal";
import { AsyncUtil } from "./util/AsyncUtil";
import { checkGenericEvent, checkSprite } from "./util/TestBase";
import { Event } from "./support/Event";

describe("SignalTest", () => {
    let signal: Signal;
    let async: AsyncUtil = new AsyncUtil();

    beforeEach(() => {
        signal = new Signal();
    });

    it("dispatch_should_pass_event_to_listener_but_not_set_signal_or_target_properties", done => {
        signal.add(async.add(checkGenericEvent, 10, done));
        signal.dispatch(new Event());
    });

    it("dispatch_non_IEvent_without_error", () => {
        signal.addOnce(checkSprite);
        // Sprite doesn't have a target property,
        // so if the signal tried to set .target,
        // an error would be thrown and this test would fail.
        signal.dispatch(new Sprite());
    });

    it("adding_dispatch_method_as_listener_does_not_throw_error", () => {
        let redispatchSignal: Signal = new Signal(Event);
        signal = new Signal(Event);
        signal.add(redispatchSignal.dispatch);
    });

    it("slot_params_should_be_sent_through_to_listener", done => {
        let slot: Slot;

        function assertResults(num: number, str: string, sprite: Sprite): void {
            assert.equal(num, 12345);
            assert.equal(str, "text");
            assert.equal(sprite, slot.params[2]);
        }

        slot = signal.add(async.add(assertResults, 10, done));
        slot.params = [12345, "text", new Sprite()];

        signal.dispatch();
    });

    it("slot_params_with_with_10_params_should_be_sent_through_to_listener", done => {
        // Test the function.apply - maying sure we get everything we ask for.
        let slot: Slot;

        function listener(
            num: number,
            str: string,
            sprite: Sprite,
            alpha0: string,
            alpha1: string,
            alpha2: string,
            alpha3: string,
            alpha4: string,
            alpha5: string,
            alpha6: string
        ): void {
            assert.equal(num, 12345);
            assert.equal(str, "text");
            assert.equal(sprite, slot.params[2]);
            assert.equal(alpha0, "a");
            assert.equal(alpha1, "b");
            assert.equal(alpha2, "c");
            assert.equal(alpha3, "d");
            assert.equal(alpha4, "e");
            assert.equal(alpha5, "f");
            assert.equal(alpha6, "g");
        }

        slot = signal.add(async.add(listener, 10, done));
        slot.params = [12345, "text", new Sprite(), "a", "b", "c", "d", "e", "f", "g"];

        signal.dispatch();
    });
});
