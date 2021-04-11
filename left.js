class Left {
    constructor() {
        this.iconUrlJosn = []
        this.iconDivList = [];
        this.leftRBodyList = [];
        this.leftDomList = [];
        this.leftDomIndex = -1;
        this.flag = 0;//0 加 1 减
        this.leftDiv = document.querySelectorAll(".picImg");
        this.firstLeftIconIndex = 0;
        this.secondLeftIconIndex = 0;
        this.backImgList = [];
        this.plusPar={
            isLock:false,
            anValue:0,
            start:0,
            begin:1,
            end:75,
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
        this.initObj();
        this.initLeftEvent();
        this.initDom();

    }
    initDom=()=>{
        let div1 = document.querySelector(".picBg");
        let div2 = document.querySelector(".picText");
        let div3 = document.querySelector(".pic_clour");
        let div4 = document.querySelector(".reactList");

        this.leftDomList.push(div1);
        this.leftDomList.push(div2);
        this.leftDomList.push(div3);
        this.leftDomList.push(div4);

    }

    initLeftEvent = ()=>{
        for (let i = 0; i < this.leftDiv.length; ++i) {
            this.iconDivList.push(this.leftDiv[i]);
            this.leftDiv[i].addEventListener('click', ()=> {
                this.switchIcon(this.leftDiv[i])
            });
        }
        let leftSel_title2 = document.querySelector(".leftSel_title2");
        let leftSel_title1 = document.querySelector(".leftSel_title1");


        leftSel_title2.addEventListener("click",()=>{
            this.leftTwoTitleClick(leftSel_title1,leftSel_title2,0);
        })
        leftSel_title1.addEventListener("click",()=>{
            this.leftTwoTitleClick(leftSel_title2,leftSel_title1,1);
        })

    }

    leftTwoTitleClick=(firstDom,dom,index)=>{
        firstDom.style.fontSize = "20px"
        dom.style.fontSize = "25px";
        dom.style.color ="rgba(33, 122, 208, 0.75)"
        firstDom.style.color = "rgba(36, 34, 34, 0.47)"
        let domPic1 = document.querySelector(".onePic1");
        let domPic2 = document.querySelector(".onePic2");
        let domPic3 = document.querySelector(".onePic3");
        if(index == 0){
            domPic1.style.backgroundImage = this.backImgList[3];
            domPic2.style.backgroundImage = this.backImgList[4];
            domPic3.style.backgroundImage = this.backImgList[5];
            domPic1.setAttribute("index",3);
            domPic2.setAttribute("index",4);
            domPic3.setAttribute("index",5);
        }
        if(index == 1){
            domPic1.style.backgroundImage = this.backImgList[0];
            domPic2.style.backgroundImage = this.backImgList[1];
            domPic3.style.backgroundImage = this.backImgList[2];
            domPic1.setAttribute("index",0);
            domPic2.setAttribute("index",1);
            domPic3.setAttribute("index",2);
        }

    }
    switchIcon = (dom)=>{

        let index = dom.getAttribute("index");
        if(index == this.firstLeftIconIndex){
            return;
        }
        let beforeUrl = "url("+this.iconUrlJosn[this.firstLeftIconIndex].unclikc+")"
        let url = "url("+this.iconUrlJosn[index].clicked+")"
        this.iconDivList[this.firstLeftIconIndex].style.backgroundImage = beforeUrl;
        this.leftRBodyList[this.firstLeftIconIndex].style.display = "none"


        dom.style.backgroundImage = url;
        this.leftRBodyList[index].style.display = "block"
        this.firstLeftIconIndex = index;
        this.leftDomIndex = index;
        this.flag = 1;
        this.leftAnimain();

    }
    initObj=()=>{
        let obj1 = {"clicked":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/8c6bd8f216175a894a9fa8ba4a99b0c8","unclikc":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/5cffe96c1bb9df8430d6665c368693f4"}
        let obj2 = {"clicked":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/d6686548fb8ebecec680ed6b49e056a9","unclikc":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/9c8b5387e9e9c56df3708e90b7e3d1be"}
        let obj3 = {"clicked":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/aa4ff325eee02456c5430739c43cd902","unclikc":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/fde59b669db6bb58d3fbff5773b02288"}
        let obj4 = {"clicked":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/53d9f5a3c8d807296b2da0748b3c3624","unclikc":"https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/0d8b39e1ac4459fe7121f4e92b924cd8"}
        this.iconUrlJosn.push(obj1);
        this.iconUrlJosn.push(obj2);
        this.iconUrlJosn.push(obj3);
        this.iconUrlJosn.push(obj4);
        let ls = document.querySelectorAll(".l");
        for (let i = 0; i < ls.length; ++i) {
            this.leftRBodyList.push(ls[i])
        }
        this.backImgList=[
            "url(https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/922ce605c4ebf55c36bba7dafa2a77e1)",
            "url(https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/4b97ab3246c32dc63daa7d06b6a97ab5)",
            "url(https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/ed85e4e6690563a90ad4616d7ef3d801)",
            "url(https://forum.cocos.org/uploads/default/original/3X/7/c/7c7b1d7d72801138e3ae64714a1fbae1b3b74e83.png)",
            "url(https://forum.cocos.org/uploads/default/original/3X/1/3/1312bbeb2c0867ae20c8b0b7c5ce88b778cedfcb.png)",
            "url(https://forum.cocos.org/uploads/default/original/3X/4/b/4bc31fe46efdcd3f06e76357ac8f9f8baa6765d0.png)"
        ]

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

    leftAnimain =()=>{
        let dom = this.leftDomList[this.leftDomIndex];
        if(this.flag == 0){
            if(this.plusAnimain(this.plusPar)){
                return;
            }else {
                window.requestAnimationFrame(this.leftAnimain)
            }
        }if(this.flag == 1){
            if(this.reduceAnimain(this.reducePar)){
                this.resetReducePar();
                return;
            }else {
                dom.style.marginLeft = -(this.reducePar.anValue)+"px";
                window.requestAnimationFrame(this.leftAnimain)
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
            param.anValue  = this.cubeEaseInOut(
                param.start,
                param.begin,
                param.end,
                param.during);
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



}
