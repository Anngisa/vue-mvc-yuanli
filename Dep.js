//发布订阅模块
class Dep{
	constructor(){
		this.list=[]
	}
	listen(subs){
		this.list.push(subs)
	}
	notify(){
		for(var i=0;i<this.list.length;i++){
			this.list[i].update()
		}
	}
}
export default Dep