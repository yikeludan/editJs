class EditMain {
    constructor() {
        this.xRule = document.querySelector(".ruleX");
        this.yRule = document.querySelector(".ruleY");
        this.YLine = document.querySelector(".YLine");
        this.XLine = document.querySelector(".XLine");
        this.lineBox = document.querySelector(".lineBox");
        this.initRule();
        this.initEvent();
    }
    initEvent = ()=>{
        this.xRule.onmousemove=(e)=>{
            this.lineBox.style.display = "block";
            this.lineBox.style.left = e.clientX-55+"px";
            this.lineBox.style.top = 7+"%";

            this.lineBox.innerHTML = e.clientX-30;
            this.YLine.style.display = "block"
            this.YLine.style.left = e.clientX+"px";
            //console.log(e.clientX,e.clientY)
        }
        this.xRule.onmouseleave=(e)=>{
            this.lineBox.style.display = "none";
            this.lineBox.style.top = 0+"px";
            this.YLine.style.display = "none"
            this.YLine.style.left = 0+"px";
        }

        this.yRule.onmousemove=(e)=>{
            this.lineBox.style.display = "block";
            this.lineBox.style.top = e.clientY-30+"px";
            this.lineBox.style.left = 23+"%";

            this.lineBox.innerHTML = e.clientY-30;
            this.XLine.style.display = "block";
            this.XLine.style.top = e.clientY+"px";
            //console.log(e.clientX,e.clientY)
        }
        this.yRule.onmouseleave=(e)=>{
            this.lineBox.style.display = "none";
            this.lineBox.style.top = 0+"px";

            this.XLine.style.display = "none"
            this.XLine.style.top = 0+"px";
        }
    }
    initRule = ()=>{
        let indexX = 0;
        let flagX = 0;
        let yi = 0;
        for(let i =0;i<49;i++){
            indexX+=2;
            let divX = document.createElement("div");
            let divY = document.createElement("div");

            divX.className = "smallLine";
            divY.className = "smallLineY";
            if(flagX >= 5){
                divX.style.height=70+"%";
                divX.style.marginTop = 6+"px";
                divY.style.width=70+"%";
                divY.style.left = 6+"px";
                flagX = 0;
            }else {
                divX.style.height=50+"%";
                divX.style.marginTop = 10+"px";

                divY.style.width=50+"%";
                divY.style.left = 10+"px";
                flagX+=1;
            }
            divX.style.left =indexX+"%";
            divY.style.top =yi+"%";
            yi+=2;
            this.xRule.appendChild(divX);
            if(i!=0){
                this.yRule.appendChild(divY);
            }
        }
    }
}
