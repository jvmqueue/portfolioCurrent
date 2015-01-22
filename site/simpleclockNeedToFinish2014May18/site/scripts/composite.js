var _jvm = _jvm || {};

_jvm['composite'] = (function($, window, d, undefined){

	var _Container = new _jvm.util.Interface('Container', ['add', 'remove', 'getChild']); // every composite will get child, a requirement for composites to hand down actions to leaves
	var _ChildElement = new _jvm.util.Interface('ChildElement', ['getData']);
	
	var _TopContainer = function(id, type){ // implements Container, ChildElement
		this.childElements = []; // every composite has a container to register its children
		this.element = d.createElement('div'); // top container node created for each instanceo
		this.element.setAttribute('id', id);		
		this.element.setAttribute('type', type);
	}; // End TopContainer
	
	// ensure composite satisfies interfaces
	_TopContainer.prototype.add = function(child){
		_jvm.util.Interface.ensureImplements(child, _Container, _ChildElement);
		this.element.appendChild(child.getElement());
	};
	_TopContainer.prototype.remove = function(){};
	_TopContainer.prototype.getChild = function(index){
		return this.childElements[index];
	};
	_TopContainer.prototype.getData = function(){
		// TODO: pass down to each child
		// leaves get data, not composites
	};
	_TopContainer.prototype.getElement = function(){
		return this.element;
	};
	
	
	var _ChildNode = function(id, options){ // implements Container, ChildElement, superClass
		// subclasses inherit from ChildNode, allowing us to satisfy interfaces in a single location
		this.id = id;
		this.element; // subclass defines element instance
		this.objJson = options;
	}; // End ChildNode
	
	// ensure ChildNode superClass implements Interfaces
	_ChildNode.prototype.add = function(){
		// superClass does the work for subclass
		for(var i = 0, len = this.objJson.length; i < len; i++){
			_jvm.util.console({header:'_CHILD NODE ADD', label:'hash val', message:this.objJson[i].val});
		}
		
	};
	_ChildNode.prototype.remove = function(){};
	_ChildNode.prototype.getChild = function(){
		throw new Error('Exception: ChildNode is abstract getChild must be implemented by subclass');
	};
	_ChildNode.prototype.getData = function(){};
	_ChildNode.prototype.getElement = function(){
		return this.element; // subclass defines element instance
	};
	
	var _ChildUl = function(id){ // implements _Container _ChildElement via superclass
		// call superclass, placing it in the subclass context
		_ChildNode.call(this, id);
		this.element = d.createElement('ul');
		
	}; // End _ChildUl
	// extend superClass onto subclass
	_jvm.util.extend(_ChildUl, _ChildNode);
	
	var _ChildList = function(id, options){
		// call superClass in the context of subclass
		_ChildNode.call(this, id, options);
	};
	// extend subClass onto superClass, inheritance
	_jvm.util.extend(_ChildList, _ChildNode);

	
	
	
	return{ // public API
		TopContainer:_TopContainer,
		ChildUl:_ChildUl,
		ChildList:_ChildList
	}

})(jQuery, window, document);

