var isPrime = (n) => {
    if (isNaN(n)) {
        throw "input is not a number";
    } else if (!Number.isInteger(n)) {
        throw "input is not an integer";
    } else if (n < 2) {
        return false;
    } else {
        for (var i = 2; i * i <= n; i++) {
            if (!(n % i)) {
                return false;
            }
        }
        return true;
    }
}



function isPrime_test() {
    try {
        isPrime(NaN);
        throw 'isNaN';
    } catch (error) {
        if (error === 'isNaN') throw 'fukncja powinna zgłosić wyjątek, jeśli argumentem jest NaN';
        else if (error !== 'input is not a number') throw 'funkcja powinna zgłosić wyjątek o treści "input is not a number"';
    }
    [2, 3, 5, 7, 11, 37, 53, 71, 97, 227].forEach((n) => {
        if (!isPrime(n)) throw `kod został źle napisany, liczba ${n} jest liczbą pierwszą`;
    });
    [-4, 0, 1, 4, 9, 25, 60, 99, 134, 224].forEach((n) => {
        if (isPrime(n)) throw `kod został źle napisany, liczba ${n} nie jest liczbą pierwszą`;
    });
    console.log('kod został prawdiłowo napisany');
};