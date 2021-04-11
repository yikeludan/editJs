class Right {
    constructor() {
        this.rightDiv = document.querySelectorAll(".rIconImg");
        this.mask = document.querySelector(".mask");
        this.maskExit = document.querySelector(".mask_t4");
        this.maskBlack = document.querySelector(".maskBlack");
        this.rightValTitles = document.querySelectorAll(".rightValTitle");
        this.rightValContents = document.querySelectorAll(".rightValContent");
        this.tuceng = document.querySelector(".tuceng");
        this.flag = 0;//0 加 1 减
        this.rightValTitlesList = [];
        this.rightIconDivList = [];
        this.iconUrlJosn = [];
        this.rightBodyList=[];
        this.firstLeftIconIndex = 0;
        this.plusPar={
            isLock:false,
            anValue:0,
            start:0,
            begin:1,
            end:150,
            during:20,
        }

        this.reducePar ={
            isLock:false,
            anValue:2,
            start:0,
            begin:0,
            end:500,
            during:30,
        }
        this.initEvent();
        this.initObj();
    }
    initEvent=()=>{

        for (let i = 0; i < this.rightDiv.length; ++i) {
            this.rightIconDivList.push(this.rightDiv[i]);
            this.rightDiv[i].addEventListener('click', ()=> {
                this.switchIcon(this.rightDiv[i])
            });
        }

        for (let i = 0; i < this.rightValTitles.length; ++i) {
            this.rightValTitlesList.push(this.rightValTitles[i]);
            this.rightValTitles[i].addEventListener('click', ()=> {
                this.showOrHide(this.rightDiv[i]);
            });
        }
        this.maskExit.addEventListener('click', ()=> {
            this.exitMask();
        });
    }
    showOrHide = (dom)=>{
        let index = dom.getAttribute("index");


        let height = null;
        if(index == 0){
            let hnum = 0;
            let num = this.tuceng.getAttribute("numIndex");
            num = parseInt(num);
            if(num == 0){
                return;
            }
            for(let i =0;i<num;i++){
                hnum+=15;
            }
            height = hnum+"vh";
        }
        if(index == 1){
             height = 40+"vh";
        }
        if(index == 2){
             height = 40+"vh";
        }
        if(this.rightValContents[index].clientHeight>10){
            height = 1+"vh";
        }
        this.rightValContents[index].style.height=height;

    }

    initObj=()=>{
        let obj1 = {"clicked":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/9b789d5a61e6a812f0b27e49b3319acc","unclikc":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/76d9d207da2d5fb83d3750835869a9d6"}
        let obj2 = {"clicked":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/2a3ec7c542f4b7790008edd69c55d3b0","unclikc":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/aad94b5df4c66aba3dd4f2d6788b4652"}
        let obj3 = {"clicked":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/65f2bd4d7621b79dc192b05b851127b4","unclikc":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/acec0ac7ead36ae16243e38ebd6081e6"}
        let obj4 = {"clicked":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/81494a2a6e79ea4303fbc423a95ec22b","unclikc":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/d180abfb1e957b8eec2cd45ddd0da168"}
        this.iconUrlJosn.push(obj1);
        this.iconUrlJosn.push(obj3);
        this.iconUrlJosn.push(obj4);
        this.iconUrlJosn.push(obj2);
    }

    switchIcon = (dom)=>{
        let index = dom.getAttribute("index");
        if(index == this.firstLeftIconIndex){
            return;
        }

        let beforeUrl = "url("+this.iconUrlJosn[this.firstLeftIconIndex].unclikc+")";
        let url = "url("+this.iconUrlJosn[index].clicked+")";

        this.rightIconDivList[this.firstLeftIconIndex].style.backgroundImage = beforeUrl;
        dom.style.backgroundImage = url;
            this.mask.style.display = "block"
            this.maskBlack.style.display = "block"
        this.firstLeftIconIndex = index;
            this.flag = 0;
            this.maskAni();

    }
    exitMask=()=>{
        this.mask.style.display = "none"
        this.maskBlack.style.display = "none"
    }

    cubeEaseIn=(t, b, c, d)=>{
        return c * (t /= d) * t * t + b;
    }
    cubeEaseOut=(t, b, c, d)=>{
        return c * ((t = t/d - 1) * t * t + 1) + b;
    }
    cubeEaseInOut=(t, b, c, d)=>{
        if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
        return c / 2*((t -= 2) * t * t + 2) + b;
    }

    maskAni=()=>{
        if(this.flag == 0){
            if(this.plusAnimain(this.plusPar)){
                this.resetPlusPar();
                return;
            }else {
                this.mask.style.top =this.plusPar.anValue+"px";
                window.requestAnimationFrame(this.maskAni)
            }
        }if(this.flag == 1){
            if(this.reduceAnimain(this.reducePar)){
                this.resetReducePar();
                return;
            }else {
                //dom.style.marginLeft = -(this.reducePar.anValue)+"px";
                window.requestAnimationFrame(this.maskAni)
            }
        }
    }
    plusAnimain =(param)=>{
        if(param.isLock){
            return true;
        }
        if(param.anValue>=param.end){
            param.start = 0;
            param.isLock = true;
        }else {
            param.anValue  = this.cubeEaseOut(
                param.start,
                param.begin,
                param.end,
                param.during);
            param.anValue = parseInt(param.anValue);
            console.log("param.anValue = "+param.anValue)

            param.start++;
        }
    }

    reduceAnimain=(param)=>{
        if(param.isLock){
            return true;
        }
        if(param.anValue<=param.begin){
            param.start = 0;
            param.isLock = true;
        }else {
            param.anValue  = this.cubeEaseOut(
                param.start,
                param.begin,
                param.end,
                param.during);
            param.anValue =  param.end -param.anValue;
            param.anValue = parseInt(param.anValue);
            param.start++;
        }
    }


    resetReducePar =()=>{
        this.reducePar ={
            isLock:false,
            anValue:2,
            start:0,
            begin:0,
            end:500,
            during:30,
        }
    }

    resetPlusPar =()=>{
        this.plusPar ={
            isLock:false,
            anValue:0,
            start:0,
            begin:1,
            end:150,
            during:20,
        }
    }

}
