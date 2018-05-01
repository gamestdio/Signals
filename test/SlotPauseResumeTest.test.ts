import { Signal } from "../src/Signal";
import { Slot } from "../src/Slot";
import { Event } from "./support/Event";
import { AsyncUtil } from "./util/AsyncUtil";
import { checkGenericEvent } from "./util/TestBase";

describe("SlotPauseResumeTest", () => {
    let signal: Signal;
    let async: AsyncUtil = new AsyncUtil();

    beforeEach(() => {
        signal = new Signal();
    });

    it("add_listener_pause_then_resume_on_slot_should_dispatch", done => {
        let slot: Slot = signal.add(async.add(checkGenericEvent, 10, done));
        slot.enabled = false;
        slot.enabled = true;

        signal.dispatch(new Event());
    });

    it("addOnce_listener_pause_then_resume_on_slot_should_dispatch", done => {
        let slot: Slot = signal.addOnce(async.add(checkGenericEvent, 10, done));
        slot.enabled = false;
        slot.enabled = true;

        signal.dispatch(new Event());
    });
});
