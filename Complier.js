import Watcher from './Watcher'
const Reg=/\{\{(.*)\}\}/
class Complier{
	constructor(el,vm){
		this.el=document.querySelector(el)
		this.vm=vm
		this.flag=this._createFragment()
		this.el.appendChild(this.flag)
	}
	_createFragment(){
		var flag=document.createDocumentFragment()
		var child
		while(child=this.el.firstChild){
			this._complie(child)
			flag.appendChild(child)
		}
		return flag
	}
	_complie(node){
		if(node.nodeType===1){
			var attr=node.attributes
			var self=this
			if(attr.hasOwnProperty('v-model')){
				var name=attr['v-model'].nodeValue
				node.addEventListener('input',function(e){
					self.vm[name]=e.target.value
				})
				node.value=this.vm[name]
			}	 
		}
		if(node.nodeType===3){
			if(Reg.test(node.nodeValue)){
				var name=RegExp.$1
				name=name.trim()
				new Watcher(node,name,this.vm)
			}
		}
	}
}
export default Complier