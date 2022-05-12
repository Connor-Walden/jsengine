const keys=[],mouse={pressed:!1,x:0,y:0},listeners={keydown:[],keyup:[],mousedown:[],mouseup:[],mousemove:[]};class Input{static isKeyDown(t){return keys.includes(t)}static isMouseDown(){return mouse.pressed}static getMousePosition(){return{x:mouse.x,y:mouse.y}}static listen(t,s){listeners[t].push(s)}}document.onkeydown=t=>{listeners.keydown.forEach((s=>s(t.key)));const s=t.key;keys.includes(s)||keys.push(s)},document.onkeyup=t=>{listeners.keyup.forEach((s=>s(t.key)));var s=keys.indexOf(t.key);-1!==s&&keys.splice(s,1)},document.onmousedown=t=>{listeners.mousedown.forEach((s=>s(t.button))),mouse.pressed=!0},document.onmouseup=t=>{listeners.mouseup.forEach((s=>s(t.button))),mouse.pressed=!1},document.onmousemove=t=>{listeners.mousemove.forEach((s=>s(t.button))),mouse.x=t.offsetX,mouse.y=t.offsetY};class Renderer{constructor(t,s){this.canvas=document.querySelector("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=t,this.canvas.height=s,this.current_color="black",this.CLEAR_COLOR_BLACK="black",this.CLEAR_COLOR_WHITE="white",this.CLEAR_COLOR_RED="red",this.CLEAR_COLOR_BLUE="blue",this.CLEAR_COLOR_GREEN="green",this.CLEAR_COLOR_YELLOW="yellow"}clear(t){this.context.fillStyle=t,this.context.fillRect(0,0,this.canvas.width,this.canvas.height)}color(t,s,e){this.current_color="rgb("+t+", "+s+", "+e+")"}rect(t,s,e,i,r){r?(this.context.fillStyle=this.current_color,this.context.fillRect(t,s,e,i)):(this.context.strokeStyle=this.current_color,this.context.strokeRect(t,s,e,i))}arc(t,s,e,i,r,h){this.context.fillStyle=this.current_color,this.context.beginPath(),this.context.arc(t,s,e,i,r),h?this.context.fill():this.context.stroke()}text(t,s,e,i){this.context.fillStyle=this.current_color,this.context.font=s+"px Sans Serif",this.context.fillText(t,e,i)}image(t,s,e){this.context.drawImage(t,e.x,e.y,e.w,e.h,s.x,s.y,s.w,s.h)}image(t,s){this.context.drawImage(t,s.x,s.y,s.w,s.h)}}class Sprite{constructor(t,s,e,i,r,h,c=null,a=null,o=null,l=null){this.renderer=t,this.src=s,this.uv={x:c,y:a,w:o,h:l},this.pos={x:e,y:i,w:r,h:h},this.img=new Image(this.pos.w,this.pos.h),this.img.src=this.src,this.loaded=!1,this.onload=()=>{this.loaded=!0}}draw(){this.uv.x?this.renderer.image(this.img,this.pos,this.uv):this.renderer.image(this.img,this.pos)}}class Text{constructor(t,s,e,i,r,h,c,a,o){switch(this.renderer=t,this.msg=s,this.size=e,this.x=i,this.y=r,this.color={r:c,g:a,b:o},this.width=this.renderer.context.measureText(this.msg).width,h){case"CENTER":this.x=this.x-this.width/2;break;case"NORMAL":this.x=this.x;break}}draw(){this.renderer.color(this.color.r,this.color.g,this.color.b),this.renderer.text(this.msg,this.size,this.x,this.y)}}class Button{constructor(t,s,e,i,r,h,c,a,o,l){this.renderer=t,this.rect={x:s,y:e,width:i,height:r},this.color={r:h,g:c,b:a},this.text=o,this.callback=l,this.rect.width=this.renderer.context.measureText(this.text).width,this.rect.x=this.rect.x-this.rect.width/2,Input.listen("mousedown",(t=>{this.click(t)}))}draw(){this.renderer.color(this.color.r,this.color.g,this.color.b),this.renderer.rect(this.rect.x,this.rect.y,2*this.rect.width,this.rect.height,!0),this.renderer.color(255-this.color.r,255-this.color.g,255-this.color.b),this.renderer.text(this.text,12,this.rect.x+this.rect.width/2,this.rect.y+this.rect.height/2)}click(t){let s={x:this.rect.x,y:this.rect.y,w:2*this.rect.width,h:this.rect.height};this.isInside(Input.getMousePosition(),s)&&this.callback()}isInside(t,s){return t.x>s.x&&t.x<s.x+s.w&&t.y<s.y+s.h&&t.y>s.y}}class Rectangle{constructor(t,s,e,i,r,h,c,a,o){this.renderer=t,this.rect={x:s,y:e,w:i,h:r},this.color={r:h,g:c,b:a},this.fill=o}draw(){this.renderer.color(this.color.r,this.color.g,this.color.b),this.renderer.rect(this.rect.x,this.rect.y,this.rect.w,this.rect.h,this.fill)}}class Arc{constructor(t,s,e,i,r,h,c,a,o,l){this.renderer=t,this.arc={x:s,y:e,rad:i,start:r,end:h},this.color={r:c,g:a,b:o},this.fill=l}draw(){this.renderer.color(this.color.r,this.color.g,this.color.b),this.renderer.arc(this.arc.x,this.arc.y,this.arc.rad,this.arc.start,this.arc.end,this.fill)}}class Layer{constructor(t){this.name=t,this.enabled=!1}OnUpdate(){}OnAttach(){}Enable(){this.enabled=!0}Disable(){this.enabled=!1}}class Game{constructor(t,s,e){this.title=t,document.title=t,this.layerstack=[],this.width=s,this.height=e,this.renderer=new Renderer(s,e)}init(){for(let t=0;t<this.layerstack.length;t++)this.layerstack[t]instanceof Layer&&this.layerstack[t].OnAttach()}tick(){this.renderer.clear(this.renderer.CLEAR_COLOR_BLACK),this.layerstack[0]&&(Input.isKeyDown("1")?this.layerstack[0].Disable():this.layerstack[0].Enable()),this.layerstack[1]&&(Input.isKeyDown("2")?this.layerstack[1].Disable():this.layerstack[1].Enable()),this.layerstack[2]&&(Input.isKeyDown("3")?this.layerstack[2].Disable():this.layerstack[2].Enable()),this.layerstack[3]&&(Input.isKeyDown("4")?this.layerstack[3].Disable():this.layerstack[3].Enable()),this.layerstack[4]&&(Input.isKeyDown("5")?this.layerstack[4].Disable():this.layerstack[4].Enable()),this.layerstack[5]&&(Input.isKeyDown("6")?this.layerstack[5].Disable():this.layerstack[5].Enable()),this.layerstack[6]&&(Input.isKeyDown("7")?this.layerstack[6].Disable():this.layerstack[6].Enable()),this.layerstack[7]&&(Input.isKeyDown("8")?this.layerstack[7].Disable():this.layerstack[7].Enable()),this.layerstack[8]&&(Input.isKeyDown("9")?this.layerstack[8].Disable():this.layerstack[8].Enable()),this.layerstack[9]&&(Input.isKeyDown("0")?this.layerstack[9].Disable():this.layerstack[9].Enable());for(let t=0;t<this.layerstack.length;t++)this.layerstack[t]instanceof Layer&&this.layerstack[t].enabled&&this.layerstack[t].OnUpdate()}push_layer(t){this.layerstack.includes(t)||this.layerstack.push(t)}get_layer(t){return this.layerstack[t]}pop_layer(t){let s=this.layerstack.indexOf(t);-1!==s&&this.layerstack.splice(s,1)}}