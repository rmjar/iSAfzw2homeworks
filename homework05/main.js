function add(a, b) {
    return a + b;
}
// tutaj zaimplementuj wszystkie funkcje
function evenOrOdd(input) {
    return input % 2 ? "odd" : "even";
}

function previousAndNext(input) {
    return {
        previous: input - 1,
        next: input + 1
    }
}

function secondsToHHMMSS(inputSec) {
    var hours = Math.floor(inputSec / (60 * 60));
    var minutes = Math.floor(inputSec / 60) % 60;
    var seconds = inputSec % 60;

    hours = ("0" + hours).substr(("0" + hours).length - 2);
    minutes = ("0" + minutes).substr(("0" + minutes).length - 2);
    seconds = ("0" + seconds).substr(("0" + seconds).length - 2);

    return hours + ":" + minutes + ":" + seconds;
}

/* na pewno o to chodzi?, bo to jest elementarne, a może raczej o swap(a), gdzie a jest tabelą dwuelementową, albo obiektem?*/
function swapVariables(a, b) {
    return {
        first: b,
        second: a
    }
}

function minOfThreeNumbers(a, b, c) {
    function minTwo(a, b) {
        return a < b ? a : b;
    }
    return minTwo(a, minTwo(b, c));
}

function areNumbersDescending(a, b, c, d, e) {
    return (a >= b) && (b >= c) && (c >= d) && (d >= e);
}

function hasOneByOneDigit(a) {
    var units = a % 10;
    var tens = Math.floor(a / 10) % 10;
    var hundreds = Math.floor(a / 100);
    return (units - tens === 1) && (tens - hundreds === 1) ||
        (units - tens === -1) && (tens - hundreds === -1);
}

function daysInMonth(month, year) {
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
    } else if (month !== 2) {
        return 31
    }
    if (year >= 1582 && year <= 9999 && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)) {
        return 29
    }
    return 28
}

// TESTY
function tests(a) {
    let b = 0;
    for (let c in a) {
        let d = a[c];
        try {
            d(), console.log('Test:', c, 'OK')
        } catch (f) {
            b++, console.error('Test:', c, 'FAILED', f), console.error(f.stack)
        }
    }
}

function fail(a) {
    throw new Error('fail(): ' + a)
}

function assert(a, b) {
    if (!a) throw new Error('assert(): ' + b)
}

function assertEquals(a, b) {
    if (a != b) throw new Error('assertEquals() "' + a + '" != "' + b + '"')
}

function assertStrictEquals(a, b) {
    if (a !== b) throw new Error('assertStrictEquals() "' + a + '" !== "' + b + '"')
}

function range(a, b) {
    return Math.round(Math.random() * (a - b) + b);
}

function shuffle(arr) {
    return arr.sort(() => 1 - range(0, 2));
}
tests({
    'add(1, 2) returns 3': () => {
        assertEquals(add(1, 2), 3);
    },
    'evenOrOdd(n * 2 - 1) returns "odd"': () => {
        assertEquals(evenOrOdd(range(-999, 999) * 2 - 1), 'odd');
    },
    'evenOrOdd(n * 2) returns "even"': () => {
        assertEquals(evenOrOdd(range(-999, 999) * 2), 'even');
    },
    'previous of n is n-1': () => {
        const number = Math.floor(Math.random() * (-9999 - 9999 + 1)) + 9999;
        const result = previousAndNext(number);
        assertEquals(result.previous, number - 1);
    },
    'next of n is n+1': () => {
        const number = Math.floor(Math.random() * (-9999 - 9999 + 1)) + 9999;
        const result = previousAndNext(number);
        assertEquals(result.next, number + 1);
    },
    'secondsToHHMMSS(3661) returns "01:01:01"': () => {
        assertEquals(secondsToHHMMSS(3661), '01:01:01');
    },
    'secondsToHHMMSS(9876) returns "02:44:36"': () => {
        assertEquals(secondsToHHMMSS(9876), '02:44:36');
    },
    'swapVariables(x, y) returns { first: y, second: x }': () => {
        const x = range(1, 9);
        const y = x * range(1, 9);
        assertEquals(JSON.stringify(swapVariables(x, y)), JSON.stringify({
            first: y,
            second: x
        }));
    },
    'minOfThreeNumbers(a, b, c) returns a if a < b < c': () => {
        const a = range(1, 10);
        const b = range(11, 100);
        const c = range(101, 999);
        assertEquals(minOfThreeNumbers(...shuffle([a, b, c])), a);
    },
    'areNumbersDescending(a, b, c, d, e) returns true if a <= b <= c <= d <= e': () => {
        const arr = new Array(5).fill().map(x => range(-999, 999)).sort((a, b) => b - a);
        assertEquals(areNumbersDescending(...arr), true);
    },
    'areNumbersDescending(a, b, c, d, e) returns false if !(a <= b <= c <= d <= e)': () => {
        const arr = new Array(5).fill().map(x => range(-999, 999)).sort((a, b) => a - b);
        assertEquals(areNumbersDescending(...arr), false);
    },
    'hasOneByOneDigit one of 123,234,345,456,567,678,789,987,876,765,654,543,432,321,210 returns true': () => {
        const input = shuffle([123, 234, 345, 456, 567, 678, 789, 987, 876, 765, 654, 543, 432, 321, 210])[0];
        assertEquals(hasOneByOneDigit(input), true);
    },
    'hasOneByOneDigit not one of 123,234,345,456,567,678,789,987,876,765,654,543,432,321,210 returns false': () => {
        const n = [123, 234, 345, 456, 567, 678, 789, 987, 876, 765, 654, 543, 432, 321, 210];
        let input;
        do {
            input = range(100, 999);
        } while (n.indexOf(input) > -1);
        assertEquals(hasOneByOneDigit(input), false);
    },
    'daysInMonth one of (2,1884), (2,2004), (2,1660), (2,2568) returns 29': () => {
        const input = shuffle([
            [2, 1884],
            [2, 2004],
            [2, 1660],
            [2, 2568]
        ])[0];
        assertEquals(daysInMonth(...input), 29);
    },
    'daysInMonth one of (2,1882), (2,2006), (2,1666), (2,2570) returns 28': () => {
        const input = shuffle([
            [2, 2006],
            [2, 1666],
            [2, 2570],
            [2, 1882]
        ])[0];
        assertEquals(daysInMonth(...input), 28);
    },
    'daysInMonth one of (1,1775), (7,2012), (8,1999), (12,2345) returns 31': () => {
        const input = shuffle([
            [1, 1775],
            [7, 2012],
            [8, 1999],
            [12, 2345]
        ])[0];
        assertEquals(daysInMonth(...input), 31);
    },
    'daysInMonth one of (4,1775), (6,2012), (9,1999), (11,2345) returns 30': () => {
        const input = shuffle([
            [4, 1775],
            [6, 2012],
            [9, 1999],
            [11, 2345]
        ])[0];
        assertEquals(daysInMonth(...input), 30);
    }
});