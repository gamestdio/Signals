export class BubbleHater {
    public onEventBubbled(event: Event): boolean {
        throw new Error("I SAID NO BUBBLES!!!");
    }
}
