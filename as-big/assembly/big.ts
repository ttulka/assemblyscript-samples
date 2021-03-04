export declare function logme(expected: i32, actual: i32): void

/**
 * Immutable representation of big decimals.
 * 
 * TODO
 */
export default class Big {

    /**
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
     */
    @lazy
    static PE: i32 = 21;        // 0 to 1000000

    /**
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * -1000000 is the minimum recommended exponent value of a Big.
     */
    @lazy
    static NE: i32 = -7;        // 0 to -1000000

    s: i8;          // sign
    e: i32;         // decimal point
    c: Array<u8>;   // array of digits

    /**
     * Default contructor. 
     * See {of} for other options.
     */
    constructor(s: i8, e: i32, c: Array<u8>) {
        this.s = s;
        this.e = e;
        this.c = c;
    }

    /**
     * Creates a new {Big} instance from generic type T
     * @param  n the number as {Big}, {string}, or {number}
     * @return the new {Big} instance
     */
    static of<T>(n: T): Big {
        if (n instanceof Big) return new Big(n.s, n.e, n.c.slice())
        if (n instanceof string) return new BigOfString(<string>n);
        if (n instanceof number) {
            if (!Number.isFinite(n)) {
                throw new TypeError('Invalid value ' + n.toString());
            }
            return Big.of(n.toString());
        }
        throw new TypeError('Unsupported generic type ' + nameof<T>(n));
    }

    /**
     * Returns zero {Big}.
     */
    static zero(): Big {
        const arr = new Array<u8>(1);
        arr[0] = 0;
        return new Big(1, 0, arr);
    }

    /**
     * Returns a new {Big} whose value is the absolute value of this {Big}.
     */
    abs(): Big {
        return new Big(1, this.e, this.c);
    }

    /**
     * Return a new Big whose value is the value of this Big plus the value of Big y.
     */
    @operator('+')
    plus(y: Big): Big {
        //let y = n instanceof Big ? n : Big.of(n.toString());
        let e: i32, k: i32, t: Array<u8>,
            x = this;

        // signs differ?
        if (x.s != y.s) {
            y.s = -y.s;
            return x.minus(y);
        }

        let xe = x.e,
            xc = x.c,
            ye = y.e,
            yc = y.c;

        // either zero?
        if (!xc[0] || !yc[0]) {
            if (!yc[0]) {
                if (xc[0]) {
                    y = Big.of(x);
                } else {
                    y.s = x.s;
                }
            }
            return y;
        }

        xc = xc.slice();

        // prepend zeros to equalise exponents
        // note: reverse faster than unshifts
        if (e = xe - ye) {
            if (e > 0) {
                ye = xe;
                t = yc;
            } else {
                e = -e;
                t = xc;
            }

            t.reverse();
            for (; e--;) t.push(0);
            t.reverse();
        }

        // point xc to the longer array
        if (xc.length - yc.length < 0) {
            t = yc;
            yc = xc;
            xc = t;
        }

        e = yc.length;

        let m: u8;
        // only start adding at yc.length - 1 as the further digits of xc can be left as they are
        for (m = 0; e; xc[e] %= 10) m = (xc[--e] = <u8>(xc[e] + yc[e] + m)) / 10 | 0;

        // no need to check for zero, as +x + +y != 0 && -x + -y != 0

        if (m) {
            xc.unshift(m);
            ++ye;
        }

        // remove trailing zeros
        for (e = xc.length; xc[--e] === 0;) xc.pop();

        y.c = xc;
        y.e = ye;

        return y;
    }

    /**
     * Return a new Big whose value is the value of this Big minus the value of Big y.
     */
    @operator('-')
    minus(y: Big): Big {
        if (this.eq(y)) return Big.zero();

        let i: i32, j: i32, t: Array<u8>, xlty: i32,
            x = this,
            xs = x.s,
            ys = y.s;

        // signs differ?
        if (xs != ys) {
            y.s = -ys;
            return x.plus(y);
        }

        let xc = x.c.slice(),
            xe = x.e,
            yc = y.c,
            ye = y.e;

        // either zero?
        if (!xc[0] || !yc[0]) {
            if (yc[0]) {
                y.s = -ys;
            } else if (xc[0]) {
                y = Big.of(x);
            } else {
                y.s = 1;
            }
            return y;
        }

        let a: i32, b: i32;

        // determine which is the bigger number - prepend zeros to equalise exponents
        if (a = xe - ye) {
            if (xlty = a < 0) {
                a = -a;
                t = xc;
            } else {
                ye = xe;
                t = yc;
            }

            t.reverse();
            for (b = a; b--;) t.push(0);
            t.reverse();

        } else {
            // exponents equal - check digit by digit
            j = ((xlty = xc.length < yc.length) ? xc : yc).length;

            for (a = b = 0; b < j; b++) {
                if (xc[b] != yc[b]) {
                    xlty = xc[b] < yc[b];
                    break;
                }
            }
        }

        // x < y? point xc to the array of the bigger number
        if (xlty) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
        }

        // append zeros to xc if shorter - no need to add zeros to yc if shorter as subtraction only needs to start at yc.length
        if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;

        // subtract yc from xc
        for (b = i; j > a;) {
            if (xc[--j] < yc[j]) {
                for (i = j; i && !xc[--i];) xc[i] = 9;
                --xc[i];
                xc[j] += 10;
            }

            xc[j] -= yc[j];
        }

        // remove trailing zeros
        for (; xc[--b] === 0;) xc.pop();

        // remove leading zeros and adjust exponent accordingly
        for (; xc[0] === 0;) {
            xc.shift();
            --ye;
        }

        if (!xc[0]) {
            // n - n = +0
            y.s = 1;

            // result must be zero
            xc = new Array<u8>(1);
            xc[0] = 0;
            ye = 0;
        }

        y.c = xc;
        y.e = ye;

        return y;
    }

    /**
     * Return a new instance of {Big} with the negative value of this Big.
     */
    @operator.prefix('-')
    neg(): Big {
        return new Big(-this.s, this.e, this.c.slice());
    }

    /**
     * Return a new instance of {Big} with the value of this Big.
     */
    @operator.prefix('+')
    pos(): Big {
        return new Big(this.s, this.e, this.c.slice());
    }

    /**
     * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
     */
    @operator('==')
    eq(y: Big): boolean {
        return this.cmp(y) == 0;
    }

    /**
     * Return true if the value of this Big is not equal to the value of Big y, otherwise return false.
     */
    @operator('!=')
    neq(y: Big): boolean {
        return this.cmp(y) != 0;
    }

    /**
     * Returns true if the value of this Big is greater than the value of Big y, otherwise false.
     */
    @operator('>')
    gt(y: Big): boolean {
        return this.cmp(y) > 0;
    }

    /**
     * Returns true if the value of this Big is greater than or equal to the value of Big y, otherwise false.
     */
    @operator('>=')
    gte(y: Big): boolean {
        return this.cmp(y) > -1;
    }

    /**
     * Returns true if the value of this Big is less than the value of Big y, otherwise false.
     */
    @operator('<')
    lt(y: Big): boolean {
        return this.cmp(y) < 0;
    }

    /**
     * Returns true if the value of this Big is less than or equal to the value of Big y, otherwise false.
     */
    @operator('<=')
    lte(y: Big): boolean {
        return this.cmp(y) < 1;
    }

    /**
     * Return 1 if the value of this Big is greater than the value of Big y,
     *       -1 if the value of this Big is less than the value of Big y, or
     *        0 if they have the same value.
     */
    cmp(y: Big): i32 {
        let xc = this.c,
            yc = y.c,
            xs = this.s,
            ys = y.s,
            xe = this.e,
            ye = y.e;

        // either zero?
        if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -ys : xs;

        // signs differ?
        if (xs != ys) return xs;

        const isneg = xs < 0;

        // compare exponents
        if (xe != ye) return xe > ye ^ isneg ? 1 : -1;

        const e = (xe = xc.length) < (ye = yc.length) ? xe : ye;

        // compare digit by digit
        for (let i = -1; ++i < e;) {
            if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
        }

        // compare lengths
        return xe == ye ? 0 : xe > ye ^ isneg ? 1 : -1;
    };

    /**
     * Converts this {Big} instance to {f64}.
     */
    toF64(): f64 {
        // check if conversion is possible
        const s = this.toString();
        const n = F64.parseFloat(s);

        if (!this.eq(Big.of(n))) {
            throw new RangeError('Out of float64 range: ' + s);
        }

        return n;
    }

    /**
     * See {this.toF64}.
     */
    toNumber(): f64 {
        return this.toF64();
    }

    /**
     * Converts this {Big} instance to {string}.
     * @param radix currently ignored here
     */
    toString(radix: number = 10): string {
        if (radix && radix != 10) {
            throw new Error('Currently only radix 10 is supported: ' + radix.toString());
        }
        return this.__stringify(this.e <= Big.NE || this.e >= Big.PE, !!this.c[0]);
    }

    __stringify(doExponential: boolean, isNonzero: boolean): string {
        let e = this.e;
        let str = this.c.join(''),
            len = str.length;

        if (doExponential) {
            str = str.charAt(0) + (len > 1 ? '.' + str.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e.toString();

        } else if (e < 0) {
            for (; ++e;) str = '0' + str;
            str = '0.' + str;

        } else if (e > 0) {
            if (++e > len) {
                for (e -= len; e--;) str += '0';
            } else if (e < len) {
                str = str.slice(0, e) + '.' + str.slice(e);
            }
        } else if (len > 1) {
            str = str.charAt(0) + '.' + str.slice(1);
        }

        return this.s < 0 && isNonzero ? '-' + str : str;
    }
}

/**
 * String decorator for creating a new {Big} from a {string}.
 */
class BigOfString extends Big {

    constructor(n: string) {
        let xs: i8;
        let xe: i32;
        let xc: Array<u8>;

        let i: i32 = 0, e: i32 = 0;

        n = n.toLowerCase();

        // valid number?
        BigOfString.validate(n);

        // determine sign
        if (n.charAt(0) == '+') n = n.slice(1);
        xs = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

        // decimal point?
        if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');

        // exponential form?
        if ((i = n.indexOf('e')) > 0) {
            if (e < 0) e = i;
            e += I32.parseInt(n.slice(i + 1));
            n = n.substring(0, i);

        } else if (e < 0) {
            e = n.length;
        }

        let len = n.length;

        // determine leading zeros
        for (i = 0; i < len && n.charAt(i) == '0';) ++i;

        // zero
        if (i === len) {
            xc = new Array<u8>(1);
            xc[0] = 0;
            xe = 0;
            xs = 1;

        } else {
            // determine trailing zeros.
            for (; len > 0 && n.charAt(--len) == '0';);
            xe = e - i - 1;

            xc = new Array<u8>(len - i + 1);

            // convert string to array of digits without leading/trailing zeros.
            for (e = 0; i <= len;) xc[e++] = U8.parseInt(n.charAt(i++));
        }

        super(xs, xe, xc);
    }

    static validate(n: string): void {
        let sign = false, e = false, enow = false, nums = false, point = false;
        for (let i = 0; i < n.length; i++) {
            const c = n.charAt(i);

            if ((c == '-' || c == '+') && (i == 0 || enow)) {
                sign = true;
                continue;
            }
            if (c == '.' && !point && !e) {
                point = true;
                continue;
            }
            if (c == 'e' && nums && !e) {
                e = true;
                enow = true;
                continue;
            }

            const x = U8.parseInt(c);
            if (x == 0 && c != '0' || !Number.isFinite(x)) {
                throw new TypeError('Invalid value `' + c + '` in ' + n);
            }

            enow = false;
            nums = true;
            sign = false;
        }
    }
}