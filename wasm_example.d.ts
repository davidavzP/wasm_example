/* tslint:disable */
/**
* @param {string} item 
*/
export function run_alert(item: string): void;
/**
* @param {string} graph 
*/
export function load_graph(graph: string): void;
/**
*/
export class Foo {
  free(): void;
/**
* @param {number} val 
* @returns {Foo} 
*/
  constructor(val: number);
/**
* @returns {number} 
*/
  get(): number;
/**
* @param {number} val 
*/
  set(val: number): void;
/**
*/
  display(): void;
}

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        