(function() {
    const __exports = {};
    let wasm;

    let WASM_VECTOR_LEN = 0;

    let cachedTextEncoder = new TextEncoder('utf-8');

    const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
        ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
        : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });

    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }

    function passStringToWasm(arg) {

        let len = arg.length;
        let ptr = wasm.__wbindgen_malloc(len);

        const mem = getUint8Memory();

        let offset = 0;

        for (; offset < len; offset++) {
            const code = arg.charCodeAt(offset);
            if (code > 0x7F) break;
            mem[ptr + offset] = code;
        }

        if (offset !== len) {
            if (offset !== 0) {
                arg = arg.slice(offset);
            }
            ptr = wasm.__wbindgen_realloc(ptr, len, len = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + len);
            const ret = encodeString(arg, view);

            offset += ret.written;
        }

        WASM_VECTOR_LEN = offset;
        return ptr;
    }
    /**
    * @param {string} item
    */
    __exports.run_alert = function(item) {
        wasm.run_alert(passStringToWasm(item), WASM_VECTOR_LEN);
    };

    /**
    * @param {string} graph
    */
    __exports.load_graph = function(graph) {
        wasm.load_graph(passStringToWasm(graph), WASM_VECTOR_LEN);
    };

    let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

    function getStringFromWasm(ptr, len) {
        return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
    }

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
/**
*/
class Foo {

    static __wrap(ptr) {
        const obj = Object.create(Foo.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_foo_free(ptr);
    }
    /**
    * @param {number} val
    * @returns {Foo}
    */
    constructor(val) {
        const ret = wasm.foo_new(val);
        return Foo.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    get() {
        const ret = wasm.foo_get(this.ptr);
        return ret;
    }
    /**
    * @param {number} val
    */
    set(val) {
        wasm.foo_set(this.ptr, val);
    }
    /**
    */
    display() {
        wasm.foo_display(this.ptr);
    }
}
__exports.Foo = Foo;

function init(module) {

    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_alert_803605125705802b = function(arg0, arg1) {
        alert(getStringFromWasm(arg0, arg1));
    };
    imports.wbg.__wbg_log_c2cfdc4ec52b14ce = function(arg0, arg1) {
        console.log(getStringFromWasm(arg0, arg1));
    };
    imports.wbg.__wbg_log_7283b6206a5dda25 = function(arg0) {
        console.log(arg0 >>> 0);
    };
    imports.wbg.__wbg_log_77d1d0d5e7ef55d3 = typeof console.log == 'function' ? console.log : notDefined('console.log');
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm(arg0, arg1));
    };

    if ((typeof URL === 'function' && module instanceof URL) || typeof module === 'string' || (typeof Request === 'function' && module instanceof Request)) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                return response
                .then(r => {
                    if (r.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                        return r.arrayBuffer();
                    } else {
                        throw e;
                    }
                })
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

self.wasm_bindgen = Object.assign(init, __exports);

})();
