class Queue {

    items: any[] = [];

    enqueue(element: any): void {
        this.items.push(element);
    }

    dequeue(): any {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift();
    }

    front(): any {
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

export default Queue;