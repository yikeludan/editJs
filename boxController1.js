class BoxController{
    constructor() {
        this.parentDiv = document.querySelector("body");
        this.input = document.querySelector(".boxInput");
        this.editMainDiv = document.querySelector(".editMain");
        this.imgCellParentDiv = document.querySelector(".rightValContent");
        this.tuceng = document.querySelector(".tuceng");
        this.boxTemp = document.querySelector(".boxTemp");
        this.index = 0;
        this.angle = 0;
        this.clickLock = false;
        this.x = 0;
        this.y = 0;
        this.selectIndx = 0;
        this.boxList = [];
        this.boxByToolList=[];
        this.dx = 0;
        this.dy = 0;
        this.divMouseDown = true;
        this.isDivDown = false;
        this.roationDiv = null;
        this.selectTool = null;
        this.selectFlag = 0;//0 box 1 tool
        this.leftDiv = null;
        this.centenX = 0;
        this.centenY = 0;
        this.isCreateDiv = false;
        this.createDivDom = null
        this.showDiv = null;
        this.showToolsDiv = null;
        this.divX = 0;
        this.divY = 0;
        this.lineLeft = 0;
        this.lineTop=0;
        this.rectDivMask = null;
        this.isCreateLine = false;
        this.lineDiv = null;
        this.lineX = 0;
        this.lineY = 0;
        this.backImgList = [];
        this.initObj();
        this.initEvent();

    }
    initObj =()=>{
        this.backImgList=[
            "url(https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/922ce605c4ebf55c36bba7dafa2a77e1)",
            "url(https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/4b97ab3246c32dc63daa7d06b6a97ab5)",
            "url(https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/ed85e4e6690563a90ad4616d7ef3d801)",
            "url(https://forum.cocos.org/uploads/default/original/3X/7/c/7c7b1d7d72801138e3ae64714a1fbae1b3b74e83.png)",
            "url(https://forum.cocos.org/uploads/default/original/3X/1/3/1312bbeb2c0867ae20c8b0b7c5ce88b778cedfcb.png)",
            "url(https://forum.cocos.org/uploads/default/original/3X/4/b/4bc31fe46efdcd3f06e76357ac8f9f8baa6765d0.png)"
        ]
    }
    initEvent=()=>{
        window.addEventListener("mousedown",(e)=>{
             // e.preventDefault();
              if(this.isCreateLine){
                  this.createLine(e);
              }
              if(this.isCreateDiv){
                  this.createDivByMouse(e);
              }
        })



        window.addEventListener("mousemove",(e)=>{
           // console.log("this.clickLock = "+this.clickLock);
            e.preventDefault();
            if(this.isCreateLine&&this.lineDiv){
                this.moveLine(e);
                return;
            }
            if(this.isCreateDiv&&this.createDivDom){
                this.moveCreateDiv(e);
                return;
            }
            if(!this.clickLock){
                return;
            }
            this.dx = e.clientX -this.x;
            this.dy = e.clientY - this.y;
            this.x = e.clientX;
            this.y = e.clientY;

            this.changeBox(this.dx,this.dy,e);
        })

        window.addEventListener("mouseup",(e)=>{
            //console.log("鼠标抬起"+this.divMouseDown)
           /* if(!this.divMouseDown){
                return;
            }*/
            if(this.isCreateDiv&&this.createDivDom){
                this.moveCreateDivEnd(e);
                //return;
            }
            this.clickLock = false;
            this.divMouseDown = true;
            this.selectFlag = 0;
            this.isCreateDiv = false;

        })
    }
    moveCreateDivEnd=()=>{
        let width = this.createDivDom.clientWidth;
        let height = this.createDivDom.clientHeight;
        let left = this.createDivDom.offsetLeft;
        let top = this.createDivDom.offsetTop;
        let div = this.createDiv(0,width,height,left,top,1,this.createDivDom,50,null,null,null);
        this.rectDivMask.style.display ="none";
        div.style.zIndex = 30;
        this.createDivDom = null;
    }
    moveCreateDiv=(e)=>{
        let width = e.clientX -this.divX;
        let height = e.clientY -this.divY;
        this.createDivDom.style.width = width+"px";
        this.createDivDom.style.height = height+"px";
        let left = this.createDivDom.offsetLeft;
        let top = this.createDivDom.offsetTop;
        //this.createDiv(width,height,left,top,1,this.createDivDom,40);

    }
    createLine=(e)=>{
        debugger;
        this.lineLeft = e.clientX;
        this.lineTop = e.clientY;
        let line = document.createElement("div");
        line.className="line";
        line.style.left = this.lineLeft+"px";
        line.style.top = this.lineTop+"px";
        this.lineX = e.clientX;
        this.lineY = e.clientY;

        this.parentDiv.appendChild(line);
        this.lineDiv = line;
    }

    moveLine=(e)=>{
        let dx = e.clientX-this.lineLeft;
        this.lineLeft = e.clientX;
        this.lineTop = e.clientY;
        let px = e.clientX-this.lineX;
        let py = e.clientY-this.lineY;
        let angle = Math.atan2(py, px)
        let deg = angle * (180/Math.PI);//弧度转角度
        let width = this.lineDiv.clientWidth;
        width+=dx ;
        this.lineDiv.style.width = width+"px";
        this.lineDiv.style.transform = "rotate("+deg+"deg)";

    }
    createDivByMouse=(e)=>{
        let div = document.createElement("div");
        div.className = "tempBox";
        div.style.left = e.clientX+"px";
        div.style.top = e.clientY+"px";
        div.style.zIndex = 50;
        this.divX = e.clientX;
        this.divY = e.clientY;
        div.style.display = "block";
        div.ondblclick=(e)=>{
            this.reactDoubleClick(div,e);
        }
        this.parentDiv.appendChild(div);
        this.createDivDom = div;
    }
    reactDoubleClick=(div,e)=>{
        this.input.style.display = "block"
        this.input.style.zIndex = 200
    }

    createDiv=(index,width,height,left,top,isText,dom,zIndex,size,blod,italic)=>{
        let div = dom!=null?dom:document.createElement("div");
        div.className = "oneBox"
        this.createDivInitCss(index,width,height,div,left,top,isText,zIndex,size,blod,italic);
        this.createDivEvent(div);
        let divW = div.clientWidth;//300
        let divH = div.clientHeight;//200
        let topDiv = this.createLittleTool(index,div,left+divW/2,top-20,0,"top","yellow");
        let downDiv = this.createLittleTool(index,div,left+divW/2,top+divH+10,1,"down","black");
        let leftDiv = this.createLittleTool(index,div,left-20,top+divH/2,2,"left","green");
        let rightDiv = this.createLittleTool(index,div,left+divW+10,top+divH/2,3,"right","grey");
        let rotDiv = this.createtRotLittleTool(div,left+divW/2,top-50,4,"rot","red");
        let restDiv = this.createtResetLittleTool(div,left+divW/2,top+divH+30,5,"rest","red");

        this.hideTool();

        this.boxList.push(div);
        let par = {"index":this.index,"box":div,"topDiv":topDiv,
            "downDiv":downDiv,"leftDiv":leftDiv,"rightDiv":rightDiv,"rotDiv":rotDiv,"restDiv":restDiv}


        this.boxByToolList.push(par);
        this.showDiv = div;
        this.showToolsDiv = par;
        this.index+=1;
        this.cloneCellImage(div);
        return div;
    }
    followToolVec=(dx,dy)=>{
         let tools = this.boxByToolList[this.selectIndx];
         let topDivLeft = tools.topDiv.offsetLeft;
         let topDivTop = tools.topDiv.offsetTop;
         topDivLeft +=dx;
         topDivTop+=dy;
         tools.topDiv.style.top  = topDivTop+"px";
         tools.topDiv.style.left  = topDivLeft+"px";

         let downDivLeft = tools.downDiv.offsetLeft;
         let downDivTop = tools.downDiv.offsetTop;
         downDivLeft +=dx;
         downDivTop+=dy;
         tools.downDiv.style.top  = downDivTop+"px";
         tools.downDiv.style.left  = downDivLeft+"px";


         let leftDivLeft = tools.leftDiv.offsetLeft;
         let leftDivTop =  tools.leftDiv.offsetTop;
         leftDivLeft +=dx;
         leftDivTop+=dy;
         tools.leftDiv.style.top  = leftDivTop+"px";
         tools.leftDiv.style.left  = leftDivLeft+"px";


         let rightDivLeft = tools.rightDiv.offsetLeft;
         let rightDivTop = tools.rightDiv.offsetTop;
         rightDivLeft +=dx;
         rightDivTop+=dy;
         tools.rightDiv.style.top  = rightDivTop+"px";
         tools.rightDiv.style.left  = rightDivLeft+"px";


        let rotDivLeft = tools.rotDiv.offsetLeft;
        let rotDivTop = tools.rotDiv.offsetTop;
        rotDivLeft +=dx;
        rotDivTop+=dy;
        tools.rotDiv.style.top  = rotDivTop+"px";
        tools.rotDiv.style.left  = rotDivLeft+"px";


        let restDivLeft = tools.restDiv.offsetLeft;
        let restDivTop = tools.restDiv.offsetTop;
        restDivLeft +=dx;
        restDivTop+=dy;
        tools.restDiv.style.top  = restDivTop+"px";
        tools.restDiv.style.left  = restDivLeft+"px";

    }
    dragDiv=(dx,dy)=>{
        let left = this.boxList[this.selectIndx].offsetLeft;
        let top = this.boxList[this.selectIndx].offsetTop;
        left +=dx;
        top+=dy;
        this.boxList[this.selectIndx].style.top  = top+"px";
        this.boxList[this.selectIndx].style.left  = left+"px";
        this.followToolVec(dx,dy);
    }
    dragTool=(dx,dy)=>{
        let boxWidth = this.boxList[this.selectIndx].clientWidth;
        let boxHeight = this.boxList[this.selectIndx].clientHeight;
        let isText = this.boxList[this.selectIndx].getAttribute("isText");
        let boxLeft = this.boxList[this.selectIndx].offsetLeft;
        let boxTop = this.boxList[this.selectIndx].offsetTop;
        let toolLeft = this.selectTool.offsetLeft;
        let toolTop = this.selectTool.offsetTop;
        let adress = this.selectTool.getAttribute("adress");
        if(adress == "right"){
            let otherLeft = boxWidth/2+boxLeft;
            boxWidth+=dx;
            toolLeft+=dx;
            this.selectTool.style.left = toolLeft+"px";
            this.boxByToolList[this.selectIndx].downDiv.style.left = otherLeft+"px";
            this.boxByToolList[this.selectIndx].topDiv.style.left = otherLeft+"px";
            this.boxByToolList[this.selectIndx].rotDiv.style.left = otherLeft+"px";
            this.boxByToolList[this.selectIndx].restDiv.style.left = otherLeft+"px";
            this.boxList[this.selectIndx].style.width = boxWidth+"px";

        }
        if(adress == "left"){
            let otherLeft = boxWidth/2+boxLeft;
            boxWidth-=dx;
            boxLeft+=dx;
            toolLeft+=dx;
            this.boxByToolList[this.selectIndx].downDiv.style.left = otherLeft+"px";
            this.boxByToolList[this.selectIndx].topDiv.style.left = otherLeft+"px";
            this.boxByToolList[this.selectIndx].rotDiv.style.left = otherLeft+"px";
            this.boxByToolList[this.selectIndx].restDiv.style.left = otherLeft+"px";

            this.selectTool.style.left = toolLeft+"px";
            this.boxList[this.selectIndx].style.left = boxLeft+"px";
            this.boxList[this.selectIndx].style.width = boxWidth+"px";
        }

        if(adress == "top"){
            let rotTop = this.boxByToolList[this.selectIndx].rotDiv.offsetTop;
            let otherTop = boxHeight/2+boxTop;
            boxHeight-=dy;
            boxTop+=dy;
            toolTop+=dy;
            rotTop+=dy;
            this.selectTool.style.top = toolTop+"px";
            this.boxByToolList[this.selectIndx].leftDiv.style.top = otherTop+"px";
            this.boxByToolList[this.selectIndx].rightDiv.style.top = otherTop+"px";
            this.boxList[this.selectIndx].style.height = boxHeight+"px";
            this.boxList[this.selectIndx].style.top = boxTop+"px";
            this.boxByToolList[this.selectIndx].rotDiv.style.top = rotTop+"px";
            if(isText == 1){
                let fontSize = this.boxList[this.selectIndx].style.fontSize;
                let index = fontSize.indexOf("px");
                fontSize = fontSize.substring(0,index);
                fontSize = parseInt(fontSize);
                fontSize+=-dy;
                console.log("fontSize = "+fontSize)
                this.boxList[this.selectIndx].style.fontSize = fontSize+"px";

            }
        }

        if(adress == "down"){
            let otherTop = boxHeight/2+boxTop;
            toolTop+=dy;
            boxHeight+=dy;
            this.boxByToolList[this.selectIndx].leftDiv.style.top = otherTop+"px";
            this.boxByToolList[this.selectIndx].rightDiv.style.top = otherTop+"px";
            this.boxByToolList[this.selectIndx].restDiv.style.top = toolTop+20+"px";

            this.selectTool.style.top = toolTop+"px";
            this.boxList[this.selectIndx].style.height = boxHeight+"px";
            /*if(isText == 1){
                let fontSize = this.boxList[this.selectIndx].style.fontSize;
                let index = fontSize.indexOf("px");
                fontSize = fontSize.substring(0,index);
                fontSize = parseInt(fontSize);
                fontSize+=dy;

                this.boxList[this.selectIndx].style.fontSize = fontSize+"px";

            }*/
        }
    }
    changeBox = (dx,dy,e)=>{
        if(!this.clickLock){
            return;
        }
       // console.log(this.selectFlag);
        if(this.selectFlag == 0){
           this.dragDiv(dx,dy);
        }
        if(this.selectFlag == 1){
            this.dragTool(dx,dy);
        }
        if(this.selectFlag == 2){
            this.roationDeg(dx,dy,e);
        }
    }
    roationDeg=(dx,dy,e)=>{
        let boxWidth = this.boxList[this.selectIndx].clientWidth;
        let boxHeight = this.boxList[this.selectIndx].clientHeight;
        let boxLeft = this.boxList[this.selectIndx].offsetLeft;
        let boxTop = this.boxList[this.selectIndx].offsetTop;

        let rotDiv = this.boxByToolList[this.selectIndx].rotDiv;
        let leftDiv = this.boxByToolList[this.selectIndx].leftDiv;
        let rightDiv = this.boxByToolList[this.selectIndx].rightDiv;
        let downDiv = this.boxByToolList[this.selectIndx].downDiv;
        let topDiv = this.boxByToolList[this.selectIndx].topDiv;
        let restDiv = this.boxByToolList[this.selectIndx].restDiv;

        let pointCenterLeft =  boxLeft+boxWidth/2;
        let pointCenterTop =  boxTop+boxHeight/2;
        let dx2 = e.clientX - pointCenterLeft
        let dy2 = e.clientY - pointCenterTop
        let angle = Math.atan2(dy2, dx2)
        let deg1 = angle * (180/Math.PI);//弧度转角度
        let degBox = deg1+90
        let rotAngel =  degBox * Math.PI / 180;
        let leftDeg = -90-degBox;
        let rightDeg = 90-degBox;
        let downDeg = -degBox;
        let restDeg = -degBox;

        let topDeg = 180-degBox;

        let leftAngle = leftDeg * Math.PI / 180
        let rightAngle = rightDeg * Math.PI / 180
        let downAngle = downDeg * Math.PI / 180
        let restAngle = restDeg * Math.PI / 180

        let topAngle = topDeg * Math.PI / 180

        let r = boxHeight/2+50;
        let leftR = boxWidth/2+20;
        let rightR = boxWidth/2+10;
        let downR = boxHeight/2+10;
        let restR = boxHeight/2+30;

        let topR = boxHeight/2+20;

        let x  = pointCenterLeft + Math.sin(rotAngel) * r;
        let y = pointCenterTop - Math.cos(rotAngel) * r;
        this.boxList[this.selectIndx].style.transform = "rotate("+degBox+"deg)";
        let leftX  = pointCenterLeft + Math.sin(leftAngle) * leftR;
        let leftY = pointCenterTop + Math.cos(leftAngle) * leftR;

        let rightX  = pointCenterLeft + Math.sin(rightAngle) * rightR;
        let rightY = pointCenterTop + Math.cos(rightAngle) * rightR;


        let downX  = pointCenterLeft + Math.sin(downAngle) * downR;
        let downY = pointCenterTop + Math.cos(downAngle) * downR;

        let restX  = pointCenterLeft + Math.sin(restAngle) * restR;
        let restY = pointCenterTop + Math.cos(restAngle) * restR;

        let topX  = pointCenterLeft + Math.sin(topAngle) * topR;
        let topY = pointCenterTop + Math.cos(topAngle) * topR;
        rotDiv.style.left = x+"px";
        rotDiv.style.top = y+"px";
        rotDiv.style.transform = "rotate("+degBox+"deg)";

/*
        let leftDeg = -90-degBox;
        let rightDeg = 90-degBox;
        let downDeg = -degBox;
        let topDeg = 180-degBox;*/
       /* leftDiv.style.left = leftX+"px";
        leftDiv.style.top = leftY+"px";
        leftDiv.style.transform = "rotate("+(-leftDeg-90)+"deg)";

        rightDiv.style.left = rightX+"px";
        rightDiv.style.top = rightY+"px";
        rightDiv.style.transform = "rotate("+(-rightDeg+90)+"deg)";

        downDiv.style.left = downX+"px";
        downDiv.style.top = downY+"px";

        topDiv.style.left = topX+"px";
        topDiv.style.top = topY+"px";*/
        leftDiv.style.display = "none"
        downDiv.style.display = "none"
        topDiv.style.display = "none"
        rightDiv.style.display = "none"
        restDiv.style.display = "block"

        restDiv.style.left = restX+"px";
        restDiv.style.top = restY+"px";
        restDiv.style.transform = "rotate("+(-restDeg)+"deg)";


    }
    createtResetLittleTool = (parentDiv,left,top,i,adress,colour)=>{
        let div = document.createElement("div");
        let parentIndex = parentDiv.getAttribute("index");
        div.className = "oneTool";
        this.createToolInitCss(div,left,top,i,parentIndex,adress,colour);
        this.createRestToolEvent(div);
        this.parentDiv.appendChild(div);

        return div;

    }

    createRestToolEvent =(div)=>{
        div.onmousedown = (e)=>{
           /* this.x =   e.clientX
            this.y  = e.clientY
            this.clickLock = true;
            this.selectFlag = 2;
            this.selectTool = div;
            this.selectIndx = div.getAttribute("parentindex");
            this.divMouseDown = false;*/
            div.style.display = "none";
            let showDivLeft = this.showDiv.offsetLeft;
            let showDivTop = this.showDiv.offsetTop;
            let showDivHeight = this.showDiv.clientHeight;
            let showDivWidth = this.showDiv.clientWidth;
            let degBox = 0;
            //this.showDiv.style.transform = "rotate("+degBox+"deg)";
            this.showDiv.style.transform = ""
            this.showToolsDiv.rotDiv.style.left = showDivLeft+showDivWidth/2+"px";
            this.showToolsDiv.rotDiv.style.top = showDivTop-50+"px";

            this.showToolsDiv.topDiv.style.left = showDivLeft+showDivWidth/2+"px";
            this.showToolsDiv.topDiv.style.top = showDivTop-20+"px";
            this.showToolsDiv.topDiv.style.display = "block"

            this.showToolsDiv.downDiv.style.left = showDivLeft+showDivWidth/2+"px";
            this.showToolsDiv.downDiv.style.top = showDivTop+showDivHeight+10+"px";
            this.showToolsDiv.downDiv.style.display = "block"


            this.showToolsDiv.leftDiv.style.left = showDivLeft-20+"px";
            this.showToolsDiv.leftDiv.style.top = showDivTop+showDivHeight/2+"px";
            this.showToolsDiv.leftDiv.style.display = "block"


            this.showToolsDiv.rightDiv.style.left = showDivLeft+showDivWidth+10+"px";
            this.showToolsDiv.rightDiv.style.top = showDivTop+showDivHeight/2+"px";
            this.showToolsDiv.rightDiv.style.display = "block"

            /*let topDiv = this.createLittleTool(div,showDivLeft+showDivWidth/2,top-20,0,"top","yellow");
            let downDiv = this.createLittleTool(div,left+divW/2,top+divH+10,1,"down","black");
            let leftDiv = this.createLittleTool(div,left-20,top+divH/2,2,"left","green");
            let rightDiv = this.createLittleTool(div,left+divW+10,top+divH/2,3,"right","grey");
            let rotDiv = this.createtRotLittleTool(div,left+divW/2,top-50,4,"rot","red");
            let restDiv = this.createtResetLittleTool(div,left+divW/2,top+divH+30,5,"rest","red");*/

        }
       /* div.onmouseup = (e)=>{
            console.log("圆点抬起")
            this.clickLock = false;
            this.divMouseDown = true;
            this.selectFlag = 0;


        }*/
    }

    createtRotLittleTool = (parentDiv,left,top,i,adress,colour)=>{
        let div = document.createElement("div");
        let parentIndex = parentDiv.getAttribute("index");
        div.className = "oneTool";
        this.createToolInitCss(div,left,top,i,parentIndex,adress,colour);
        this.createRotToolEvent(div);
        this.parentDiv.appendChild(div);
        return div;

    }
    createLittleTool = (index,parentDiv,left,top,i,adress,colour)=>{
            let div = document.createElement("div");
            let parentIndex = parentDiv.getAttribute("index");
            div.className = "oneTool";
            this.createToolInitCss(div,left,top,i,parentIndex,adress,colour);
            this.createToolEvent(div);
            this.parentDiv.appendChild(div);
            if(adress =="left"){
                this.leftDiv = div;

            }
            //console.log(this.leftDiv);
            return div;

    }



    createToolInitCss = (div,left,top,i,parentIndex,adress,colour)=>{
        if(adress == "rot"){
            div.style.width = 20+"px";
            div.style.height = 20+"px";
            let iconUrl = "url(https://forum.cocos.org/uploads/default/original/3X/6/8/68f925d09bfaa9358db3f593b621c57ac2946c02.png)"
            div.style.backgroundImage = iconUrl;
        }else if(adress == "rest"){
            div.style.width = 20+"px";
            div.style.height = 20+"px";
            div.style.display = "none";
            let iconUrl = "url(https://forum.cocos.org/uploads/default/original/3X/f/2/f2a49ea9d4c8cc305ea8b1b079c7abf78a795d22.png)"
            div.style.backgroundImage = iconUrl;
        }

        else {
            div.style.width = 20+"px";
            div.style.height = 20+"px";
           // div.style.backgroundColor =colour;
        }
        div.style.position ="absolute";
        div.style.left =left+"px";
        div.style.borderRadius = "50px";
        div.style.top =top+"px";
        div.style.zIndex = this.index;
        div.style.backgroundSize ="100% 100%";
        if(adress == "left"){
            let iconUrl = "url(https://forum.cocos.org/uploads/default/original/3X/0/3/03d5eb019b9589fc25b92c478768ac3c012bef0c.png)"
            div.style.backgroundImage = iconUrl;
        }
        if(adress == "top"){
            let iconUrl = "url(https://forum.cocos.org/uploads/default/original/3X/0/0/002119e470518ea25af26e24479c0f6dd1a01a7e.png)"
            div.style.backgroundImage = iconUrl;
        }
        if(adress == "right"){
            let iconUrl = "url(https://forum.cocos.org/uploads/default/original/3X/9/0/906cff0505ef27b19c83a0e933b32beeda7e9b04.png)"
            div.style.backgroundImage = iconUrl;
        }
        if(adress == "down"){
            let iconUrl = "url(https://forum.cocos.org/uploads/default/original/3X/2/8/2881c112a2fa554e60f3cf2c033ef05d48273eda.png)"
            div.style.backgroundImage = iconUrl;
        }
        div.setAttribute("parentIndex",parentIndex);
        div.setAttribute("adress",adress);
        div.setAttribute("index",this.index+"-"+i);
    }
    createDivInitCss = (index,width,height,div,left,top,isText,zIndex,size,blod,italic)=>{

        div.style.width = width+"px";
        div.style.height = height+"px";
        div.style.position ="absolute";
        div.style.left =left+"px";
        div.style.top =top+"px";
        div.style.border="3px dashed #000";
        if(isText == 0){
            div.style.zIndex = this.index;
            if(index!=null){
                if(index>=3){
                    div.style.width ="100px";
                    div.style.height ="100px";
                    div.style.zIndex = 20;

                }

                div.style.backgroundImage =this.backImgList[index];
            }

           // div.style.backgroundImage ="url(https://forum.cocos.org/uploads/default/original/3X/c/5/c5f94d705f58c67f3c1cef993421db65924dad07.png)"
            div.style.backgroundSize = "100% 100%";
            div.setAttribute("isText",isText);

        }
        if(isText == 1){
            if(zIndex !=null){
                div.style.zIndex = zIndex;
                div.style.backgroundColor="red";
                div.style.borderRadius = "5px";
                div.style.textAlign="center"
                div.style.fontSize ="40px"
            }else {
                div.style.zIndex = 30;
                div.innerHTML ="标题";
                div.style.textAlign="center"
                if(size == null){
                    div.style.fontSize ="40px"
                }else {
                    div.style.fontSize =size;
                }
                if(blod !=null){
                    div.style.fontWeight = "bold";
                }
                if(italic !=null){
                    div.style.fontStyle = "italic";
                }
            }

            div.setAttribute("isText",isText);
        }
       // div.innerHTML ="444444";
        div.setAttribute("index",this.index);
        this.parentDiv.appendChild(div);


    }
    createRotToolEvent =(div)=>{
        div.onmousedown = (e)=>{
            this.x =   e.clientX
            this.y  = e.clientY
            this.clickLock = true;
            this.selectFlag = 2;
            this.selectTool = div;
            this.selectIndx = div.getAttribute("parentindex");
            this.divMouseDown = false;
        }
        div.onmouseup = (e)=>{
            console.log("圆点抬起")
            this.clickLock = false;
            this.divMouseDown = true;
            this.selectFlag = 0;


        }
    }

    hideTool=()=>{
        if(this.boxList.length == 0){
            return;
        }
        let div = this.boxList[this.selectIndx];
        let tools = this.boxByToolList[this.selectIndx];
        tools.topDiv.style.display = "none";
        tools.downDiv.style.display = "none";
        tools.leftDiv.style.display = "none";
        tools.rightDiv.style.display = "none";
        tools.rotDiv.style.display = "none";
        tools.restDiv.style.display = "none";

        div.style.border="0px dashed #000";
    }
    showTool=(div)=>{
        if(this.boxList.length == 0){
            return;
        }
        if(this.boxList.length == 1){
            return;
        }
        let index = div.getAttribute("index");
        index = parseInt(index);

        if(this.showDiv!=null){
            let showIndex = this.showDiv.getAttribute("index");
            console.log("showIndex = "+showIndex);
            console.log("index = "+index);

            showIndex = parseInt(showIndex);
            if(index == showIndex){
                return;
            }
        }
        let tools = this.boxByToolList[index];
        let deg = div.style.transform;
        if(deg ==""){
            tools.topDiv.style.display = "block";
            tools.downDiv.style.display = "block";
            tools.leftDiv.style.display = "block";
            tools.rightDiv.style.display = "block";
            tools.rotDiv.style.display = "block";
        }else {
            tools.rotDiv.style.display = "block";
            tools.restDiv.style.display = "block";
        }

        div.style.border="3px dashed #000";

        let div1 = this.showDiv;
        let tools1 = this.showToolsDiv;
        tools1.topDiv.style.display = "none";
        tools1.downDiv.style.display = "none";
        tools1.leftDiv.style.display = "none";
        tools1.rightDiv.style.display = "none";
        tools1.rotDiv.style.display = "none";
        tools1.restDiv.style.display ="none";
        div1.style.border="0px dashed #000";
        this.showDiv = div;
        this.showToolsDiv = tools;
    }
    createToolEvent =(div)=>{
        div.onmousedown = (e)=>{
           this.x =   e.clientX
            this.y  = e.clientY
            this.clickLock = true;
            this.selectFlag = 1;
            this.selectTool = div;
            this.selectIndx = div.getAttribute("parentindex");
            this.divMouseDown = false;
        }
        div.onmouseup = (e)=>{
            this.clickLock = false;
            this.divMouseDown = true;
            this.selectFlag = 0;
        }
    }
    createDivEvent =(div)=>{
        div.onmousedown = (e)=>{
            if(!this.divMouseDown){
                return;
            }


            this.selectFlag = 0;
            this.x = e.clientX
            this.y  =  e.clientY
            this.selectIndx = div.getAttribute("index");
            this.showTool(div);

            this.clickLock = true;
        }
        div.ondblclick=(e)=>{
            let isText = div.getAttribute("isText");
            if(isText!=1){
                return;
            }
            let input = this.createInput(div);
            this.createEditMask(div,input,35);
            console.log("db")
        }
        div.onmouseup = (e)=>{
            this.clickLock = false;
            this.divMouseDown = true;
            this.selectFlag = 0;
        }
    }

    createInput =(div)=>{

        let deg = div.style.transform;

        let divLeft = div.offsetLeft;
        let divTop = div.offsetTop;
        let divW = div.clientWidth;
        let divH = div.clientHeight;
        let divFontSize = div.style.fontSize;
        let index = divFontSize.indexOf("px");
        divFontSize = divFontSize.substring(0,index);
        divFontSize = parseInt(divFontSize);
        let input = document.createElement("input");
        input.type="text";
        input.style.position ="absolute";
        input.setAttribute("maxlength",5)
        input.style.zIndex = 40;
        input.style.outline = "none";
        input.style.width = divW+"px";
        input.style.height = divH+"px";
        input.style.fontSize = divFontSize+"px";
        input.style.left =divLeft+"px";
        input.style.top =divTop+"px";
        input.value = div.innerHTML;
        input.style.transform = deg;
        this.parentDiv.appendChild(input);
        return input;
    }
    createRectditMask =()=>{
        let opDivW = this.editMainDiv.clientWidth;
        let opDivH = this.editMainDiv.clientHeight;
        let opDivLeft  = this.editMainDiv.offsetLeft;
        let opDivTop  = this.editMainDiv.offsetTop;
        let opDiv = document.createElement("div");
        opDiv.style.width = opDivW+"px";
        opDiv.style.height = opDivH+"px";
        opDiv.style.left = opDivLeft+"px";
        opDiv.style.top = opDivTop+"px";
        opDiv.style.zIndex = 45;
        opDiv.style.opacity = 0.5
        opDiv.style.position= "absolute"
        opDiv.style.display = "block";
        opDiv.style.backgroundColor="black";
        this.parentDiv.appendChild(opDiv);
        this.rectDivMask = opDiv;
    }
    changeTextColor=(dom,color)=>{
        if(dom !=null){
            dom.style.color = color;
        }
    }
    createEditMask=(div,input,zIndex)=>{
        let opDivW = this.editMainDiv.clientWidth;
        let opDivH = this.editMainDiv.clientHeight;
        let opDivLeft  = this.editMainDiv.offsetLeft;
        let opDivTop  = this.editMainDiv.offsetTop;
        let opDiv = document.createElement("div");
        opDiv.style.width = opDivW+"px";
        opDiv.style.height = opDivH+"px";
        opDiv.style.left = opDivLeft+"px";
        opDiv.style.top = opDivTop+"px";
        opDiv.style.zIndex = zIndex;
        opDiv.style.opacity = 0.5
        opDiv.style.position= "absolute"
        opDiv.className = "ggg";
        opDiv.style.backgroundColor="black";
        opDiv.style.display = "block";
        this.parentDiv.appendChild(opDiv);
        opDiv.onclick = (e)=>{
            if(input.value!=""&&input.value!=null){
               div.innerHTML = input.value;
            }
            opDiv.style.display = "none";
            input.style.display = "none";
        }
    }
    cloneCellImage=(dom)=>{
       // this.boxTemp.style.display = "block"
           /* <div class="box">
            <div class="box1"></div>
            <div class="box1_1" >图片1</div>
            <div class="del"></div>
            </div>*/

        let box = document.createElement("div");
        box.className ="box";

        let div1 = document.createElement("div");
        div1.className = "box1";
        let isText = dom.getAttribute("isText");
        isText = parseInt(isText);
        if(isText == 1){
            let iconUrl = "url(https://forum.cocos.org/uploads/default/original/3X/d/d/dd18a732fc05b267c63f35950e56d821de12c637.png)"
            div1.style.backgroundImage = iconUrl;
        }else {
            div1.style.backgroundImage = dom.style.backgroundImage;
        }
        box.appendChild(div1);
        let div2 = document.createElement("div");
        div2.className = "box1_1";
        if(isText == 1){
            div2.innerHTML="文字";
        }else {
            div2.innerHTML="图片";
        }
        box.appendChild(div2);

        let div3 = document.createElement("div");
        div3.className = "del";
        box.appendChild(div3);
        let num = this.tuceng.getAttribute("numIndex");
        num = parseInt(num);
        num+=1;
        this.tuceng.setAttribute("numIndex",num);
        this.imgCellParentDiv.appendChild(box);
    }
}




