
extern crate wasm_bindgen;

use std::rc::Rc;
use wasm_bindgen::prelude::*;
use sophia::dataset::Dataset;
use sophia::dataset::inmem::FastDataset;
use sophia::graph::inmem::FastGraph;
use sophia::parser::{nt, nq};
use sophia::triple::stream::*;
use sophia::term::*;
use sophia::quad::{*, stream::*};

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
      // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_i32(a: i32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[wasm_bindgen]
pub struct Foo {
    internal: i32,
}

#[wasm_bindgen]
impl Foo {
    #[wasm_bindgen(constructor)]
    pub fn new(val: i32) -> Foo {
        Foo { internal: val}
    }

    pub fn get(&self) -> i32 {
        self.internal
    }

    pub fn set(&mut self, val: i32){
        self.internal = val;
    }
    
    pub fn display(&mut self){
        log("Foo interal ->");
        log_i32(self.internal);
    }

}

#[wasm_bindgen]
pub fn run_alert(item: &str){
    alert(&format!("This is WASM and {}", item));
}

#[wasm_bindgen]
pub fn load_graph(graph: &str){
    let NT_DOC: &str = graph;

    let mut g = FastGraph::new();
    //expose FastGraph, Term, Quads
    let inserted = nt::parse_str(NT_DOC).in_graph(&mut g);
    let num_inserted: u32 = inserted.unwrap() as u32;
    log("N-Triples Inserted ->");
    log_u32(num_inserted);
}



//Term String
#[wasm_bindgen]
pub struct JSTerm {
    t: Term<Rc<str>>,
}


#[wasm_bindgen]
impl JSTerm{
    #[wasm_bindgen(constructor)]
    pub fn new(term: String) -> JSTerm {
        let term: &str = term.as_str();
        let term = Rc::from(term);
        let term = Term::new_iri(term).unwrap();
        return JSTerm { t: term}
        
    }

    pub fn n3(&self) -> String {
        self.t.n3()
    }
}

#[wasm_bindgen]
pub struct JSDataset (FastDataset);

#[wasm_bindgen]
impl JSDataset{
    #[wasm_bindgen(constructor)]
    pub fn new() -> JSDataset {
        JSDataset(FastDataset::new())
    }

    pub fn load(&mut self, nquads: &str) -> usize {
        nq::parse_str(nquads).in_dataset(&mut self.0).unwrap()
    }

    pub fn first_subject(& self) -> JSTerm {
        self.0
            .subjects()
            .unwrap()
            .into_iter()
            .map(|term| JSTerm{ t: term.clone() })
            .next()
            .unwrap()
    }
}

