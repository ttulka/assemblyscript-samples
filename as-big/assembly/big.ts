export declare function logme(expected: i32, actual: i32): void

export default class Big {

    /*
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
     */
    static PE: i32 = 21;        // 0 to 1000000

    /*
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * -1000000 is the minimum recommended exponent value of a Big.
     */
    static NE: i32 = -7;        // 0 to -1000000


    s: i8;          // sign
    e: i32;         // decimal point
    c: Array<u8>;   // array of digits

    constructor(s: i8, e: i32, c: Array<u8>) {
        this.s = s;
        this.e = e;
        this.c = c;
    }

    static ofString(n: string): Big {
        return new OfString(n);
    }

    static ofBig(n: Big): Big {
        return new Big(n.s, n.e, n.c.slice());
    }

    static ofNumber(n: number): Big {
        if (!Number.isFinite(n)) {
            throw new TypeError('Invalid value ' + n.toString());
        }
        return new OfString(n.toString());
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

    /**
     * Converts this {Big} instance to {f64}.
     */
    toF64(): f64 {
        return F64.parseFloat(this.toString());
    }

    /**
     * See {this.toF64}.
     */
    toNumber(): f64 {
        return this.toF64();
    }

    /**
     * Converts this {Big} instance to {string}.
     */
    toString(): string {
        return this.__stringify(this.e <= Big.NE || this.e >= Big.PE, !!this.c[0]);
    }
}

class OfString extends Big {

    constructor(n: string) {
        let xs: i8;
        let xe: i32;
        let xc: Array<u8>;

        let i: i32 = 0, e: i32 = 0;

        n = n.toLowerCase();

        // TODO valid number?

        // determine sign
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
}