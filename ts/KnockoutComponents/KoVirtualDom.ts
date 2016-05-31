import * as ko from "knockout";
import h = require('virtual-dom/h');
import diff = require("virtual-dom/diff");
import patch = require("virtual-dom/patch");
import createElement = require("virtual-dom/create-element");


// const patch = snabbdom.init([
//     sClass,
//     sProps,
//     sStyle,
//     sEventListeners,
//     sAttributes
// ]);

export class KoVirtualDom {
    params: any;
    constructor(params){
        this.params = params;
    }
    
    public static template = "<div data-bind='virtualDom: {}, props: params'></div>";
}

(ko as any).bindingHandlers.virtualDom = {
    init: function (el: Element, valueAccessor, allBindings, vm, bindingContext: KnockoutBindingContext) {
        var Component = ko.unwrap(valueAccessor());
        var props = ko.toJS(allBindings.get('props'));

        var nodes = bindingContext.$componentTemplateNodes;
        nodes.forEach(n => el.appendChild(n));
        
        var vNode = h("div",[]);
        //patch(vNode, el);
        (vNode as any).nodeType = 1;
        ko.applyBindings(vm, vNode);
        
        setTimeout(() =>{
            //patch(el, vNode);
        }, 1000);

        return { controlsDescendantBindings: true }; // important
    },

    update: function (el, valueAccessor, allBindings) {
        // var Component = ko.unwrap(valueAccessor());
        // var props = ko.toJS(allBindings.get('props'));
    }
};