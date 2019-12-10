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
*/
export class JSDataset {
  free(): void;
/**
* @returns {JSDataset} 
*/
  constructor();
/**
* @param {string} nquads 
* @returns {number} 
*/
  load(nquads: string): number;
/**
* @returns {JSTerm} 
*/
  first_subject(): JSTerm;
/**
* @returns {any} 
*/
  quads(): any;
}
/**
*/
export class JSQuad {
  free(): void;
  readonly s: JSTerm;
}
/**
*/
export class JSTerm {
  free(): void;
/**
* @param {string} term 
* @returns {JSTerm} 
*/
  constructor(term: string);
/**
* @returns {string} 
*/
  n3(): string;
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
        