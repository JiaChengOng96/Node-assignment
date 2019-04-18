const Queue = require('../queue');


describe("test the length method", () => {

    const q = new Queue();

    test("list initially empty", () => {
        expect(q.length()).toBe(0);
    });

    test("add increases length", () => {
        q.add('test');
        expect(q.length()).toBe(1);
        q.add('test');
        expect(q.length()).toBe(2);
        q.add('test');
        expect(q.length()).toBe(3);
        q.add('test');
        expect(q.length()).toBe(4);
    });

    test("remove decreases length", () => {
        q.remove();
        expect(q.length()).toBe(3);
        q.remove();
        expect(q.length()).toBe(2);
        q.remove();
        expect(q.length()).toBe(1);
        q.remove();
        expect(q.length()).toBe(0);
        q.remove();
        expect(q.length()).toBe(0);
    });

    test("add increases length", () => {
        q.add('test');
        expect(q.length()).toBe(1);
        q.add('test');
        expect(q.length()).toBe(2);
        q.add('test');
        expect(q.length()).toBe(3);
        q.add('test');
        expect(q.length()).toBe(4);
    });

    test("remove decreases length", () => {
        q.remove();
        expect(q.length()).toBe(3);
        q.remove();
        expect(q.length()).toBe(2);
        q.remove();
        expect(q.length()).toBe(1);
        q.remove();
        expect(q.length()).toBe(0);
        q.remove();
        expect(q.length()).toBe(0);
    });

});


describe("queue max length of 1 item", () => {

    const q = new Queue();

    test("sequence", () => {
        expect(q.remove()).toBe(undefined);
        q.add('test');
        expect(q.remove()).toBe('test');
        q.add('test');
        expect(q.remove()).toBe('test');
        q.add('xyz');
        expect(q.remove()).toBe('xyz');
        q.add('');
        expect(q.remove()).toBe('');
        q.add(null);
        expect(q.remove()).toBe(null);
    });
});

describe("toArray()", () => {

    test("list initially empty", () => {
        const q = new Queue();
        expect(q.toArray()).toEqual([]);

        q.add('abc');
        q.remove();

        expect(q.toArray()).toEqual([]);
    });

    test("one item", () => {
        const q = new Queue();
        q.add('abc');

        expect(q.toArray()).toEqual(['abc']);
        q.add('xyz');
        q.remove();

        expect(q.toArray()).toEqual(['xyz']);
    });

    test("two item", () => {
        const q = new Queue();
        q.add('abc');
        q.add('def');

        expect(q.toArray()).toEqual(['abc','def']);
        q.remove();
        q.add('xyz');

        expect(q.toArray()).toEqual(['def','xyz']);
    });

    test("many item", () => {
        const q = new Queue();
        q.add('a');
        q.add('a');
        q.add('a');
        q.add('a');
        q.add('a');
        q.add('a');

        expect(q.toArray()).toEqual(['a','a','a','a','a','a']);
        q.remove();
        q.add('b');

        expect(q.toArray()).toEqual(['a','a','a','a','a','b']);
    });


});

describe("remove items in FIFO order", () => {
    const q = new Queue();

    test("queue has up to 2 items", () => {
        expect(q.remove()).toBe(undefined);
        q.add('test1');
        q.add('test2');
        expect(q.remove()).toBe('test1');
        expect(q.remove()).toBe('test2');

        expect(q.remove()).toBe(undefined);

        q.add('test1');
        q.add('test2');
        expect(q.remove()).toBe('test1');
        q.add('test3');
        expect(q.remove()).toBe('test2');
        expect(q.remove()).toBe('test3');
        expect(q.remove()).toBe(undefined);

    });

    test("queue has many items", () => {
        expect(q.remove()).toBe(undefined);
        q.add('test1');
        q.add('test2');
        q.add('test3');
        q.add('test4');

        expect(q.remove()).toBe('test1');
        expect(q.remove()).toBe('test2');
        expect(q.remove()).toBe('test3');
        q.add('test5');
        expect(q.remove()).toBe('test4');
        expect(q.remove()).toBe('test5');
        expect(q.remove()).toBe(undefined);

    });

    test("stress test", () => {
        for (let i = 0; i < 1000; i++) {
            q.add('test' + i);
        }
        for (let i = 0; i < 1000; i++) {
            expect(q.remove()).toBe('test' + i);
        }
        expect(q.remove()).toBe(undefined);

    });

});
