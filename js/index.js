var num=0;
var percent=0;
var imgsArr=document.getElementsByTagName("img");
for (var i = 0; i <imgsArr.length; i++) {
	var imgI=new Image();
	imgI.src=imgsArr[i].src;

	imgI.onload=function  () {
		num++;
		percent=parseInt((num/imgsArr.length)*100);
		$(".mask p").text(percent+"%")

		if (num==imgsArr.length) {
			$(".mask").css("display","none");
			// imgLoadFn();
		}
	}
};



// function imgLoadFn() {
// 	// body...


// 点击叉叉消失
$("#wrap>.gameRule>img:last-child").on("touchstart",function(){
	console.log(2)
	$("#wrap>.gameRule").css("display","none");
	$('.index2').css('display',"block");
})

// 点击活动规则
$("#wrap>.index2>span").on("click",function(){
	$("#wrap>.gameRule").css("display","block").siblings().css('display',"none");
	$(".firstIndex").css("display","block");
})
// 点击翻大牌
$(".index2>div:nth-child(2)>img").on("touchstart",function  () {
	$(".firstIndex").animate({
		"height":"100%"
	},1000,"easeOutBounce");

	
})

// 点击第一关
var timeTimer=null; 
var alltimeTimer=null;
var spanPercent=100;
var secondTime=40;
var b=0;
var c=0;
var alltime=0;
$(".firstIndex").on("touchstart",function(){
	$(".firstIndex").animate({
		"height":"0"
	},1000,"easeOutBounce");

	$(".first").css("display","block");

	// 进度条
	var step=0;
	timeTimer=setInterval(function  () {
		if (step<=-100) {
			$(".loseFirst").css("display","block");
			$(".loseFirst img").attr("src","images/lose.png");
			clearInterval(timeTimer);			
		};
		step=step-0.5;
		spanPercent-=0.5;
		b +=0.5;
		c ++;
		if (c==5) {
			secondTime--;
			$(".first>.time>p:last-of-type").text(secondTime);
			c=0;
		};
		if (b==1) {
			$(".first>.time>span").text(spanPercent+"%");
			b=0;
		}

		$(".first>.time div img").css("left",step+"%");
	},200);
	// 计算总时间
	alltimeTimer=setInterval(function() {
		alltime++;
	},1000)

})

// 第一关
// 图片地址
var imgArr=["goretex1.png","goretex2.png","goretex3.png","goretex1.png","goretex2.png","goretex3.png"];
// 记录有几张牌被翻，判断第三张时其他恢复原状
var a=0;
// 记录上一次翻牌的地址，用来判断图片是否一样
var src="";
// 记录上一次第几张牌被翻，用来判断一样时使其父级隐藏
var index=0;
// 记录上一次的li，用来判断不能重复点击
var liIndex=1000;
var checkNum=0;
var grade="one";
var $imgs=$(".paipai>li>img");
// 判断是否最后一关
var bolLast=false;
// 随机牌牌
randomFn(6);


// 点击牌牌
$(".paipai>li").on("touchstart",function(){

	var thisIndex=$(this).index();

	// 判断牌牌是否全部消失
	checkFn(thisIndex);
})

// 通关或失败
$(".loseFirst >img").on("touchstart",loseClickFn);

function loseClickFn(){
	$(".first>.time>p:last-of-type").text(10);
	$(".first>.time>span").text("100%");
	checkNum=0;
	a=0;
	src="";
	index=0;
	liIndex=1000;

	spanPercent=100;
	secondTime=10;
	b=0;
	c=0;
	$(".paipai>li>img:nth-child(odd)").css("transform","rotateY(0deg)");
	$(".paipai>li>img:nth-child(even)").css("transform","rotateY(180deg)");
	// 失败
		$(".paipai .oneone").css({'display':"inline-block",'visibility':"visible"})
	$(".first").css("display","none");
	$(".loseFirst").css("display","none");

	// 过关
	if ($(this).attr("src")=="images/next.png"&&grade=="two") {
		// 第二关界面
		$(".firstIndex img").attr("src","images/second.png");
	}else if($(this).attr("src")=="images/next.png"&&grade=="three"){
		// 第三关界面
		$(".firstIndex img").attr("src","images/third.png");
	}


	$(".firstIndex").animate({
		"height":"100%"
	},1000,"easeOutBounce");

	
	if (grade=="two") {
		console.log("还在第二关")
		// 第二关 内容
		// 改变过关数目
		if (imgArr.length<12) {
			for(var i=4;i<=6;i++){
			imgArr.push("goretex"+i+".png");
			imgArr.push("goretex"+i+".png");
		}
		
		};
		console.log(imgArr);
		randomFn(12);
		$(".paipai .oneone").css('visibility',"visible");
		$(".paipai #two").css({'display':"inline-block",'visibility':"visible"});
		$(".first>.paipai").css("width","85%");
		$(".paipai li").css({"width":"31%","height":"26%"});
		
	}else if(grade=="three"){

		// 第三关 内容
		if (imgArr.length<19) {
			for(var i=7;i<=10;i++){
			imgArr.push("goretex"+i+".png");
			imgArr.push("goretex"+i+".png");
			}
		}
		
		console.log(imgArr);
		randomFn(20);
		// $(".paipai #three").siblings().css('visibility',"visible");
		$(".paipai li").css({'display':"inline-block",'visibility':"visible"});
		$(".first>.paipai").css({"width":"90%","top":"-5%"});
		$(".paipai li").css({"width":"22%","height":"20%"});
	}
	

}

function checkFn(thisIndex){
	if (liIndex==thisIndex) {
		console.log("不能点击同一张");
		return;
	}else{
		++a;
		if(a>=3) {
			// 全部
			$(".paipai>li>img:nth-child(odd)").css("transform","rotateY(0deg)");
			$(".paipai>li>img:nth-child(even)").css("transform","rotateY(180deg)");
			a=1;
		}
			// 当前
			$imgs.eq(thisIndex*2).css("transform","rotateY(180deg)");
			$imgs.eq(thisIndex*2+1).css("transform","rotateY(0deg)");
			// 判断牌牌是否一样	
			if (a==2) {
				if (src==$imgs.eq(thisIndex*2+1).attr("src")) {
					console.log("图片一样");
					$imgs.eq(thisIndex*2+1).parent().css("visibility","hidden");
					$imgs.eq(index).parent().css("visibility","hidden");
					src="";
					index=0;
					// 判断图片是否全部消失
					checkNum++;
					console.log(checkNum,imgArr.length/2)
					if (checkNum>=imgArr.length/2) {
						console.log("恭喜过关");
						setTimeout(function(){
							if (bolLast) {
								clearInterval(alltimeTimer);
								$(".pass span").text(alltime);
								$(".pass").css("display","block");
								return;
							};
							$(".loseFirst img").attr("src","images/next.png");
							$(".loseFirst").css("display","block");
							// 到下一关,参数重置
							if (grade=="one") {
								grade="two";
							}else if(grade=="two"){
								grade="three";
								bolLast=true;
							}
							console.log(grade);
							checkNum=0;
							a=0;
							src="";
							index=0;
							liIndex=1000;
							clearInterval(timeTimer);
							},1000)
							
					}else{
						console.log("继续努力");
					}
					
				}else{
					console.log("图片不一样");
				}
			}else{
				src=$imgs.eq(thisIndex*2+1).attr("src");
				index=thisIndex*2+1;
			}
			liIndex=thisIndex;
	}
}

// 点击最后的再玩一次
// $(".pass div").on("touchstart",function(){
// 	$(this).parent().css("display","none");
// 	grade="one";
// 	loseClickFn();
// })
// 随机牌牌
function randomFn(max){
	var random=[];
	randomNum=parseInt(Math.random()*max);
	for(var i=0;i<max;i++){
		for(var j=0;j<random.length;j++){
			while (random.indexOf(randomNum)>-1) {
				randomNum=parseInt(Math.random()*max);
			}
		}
		random.push(randomNum);
		$(".paipai>li>img:nth-child(2)").eq(i).attr("src","images/"+imgArr[randomNum]);
	}
	console.log(random);
}

// 分享功能
var $passP=$(".pass>p");

$passP.on("click",function(){
	window.location.href="share.html";
});
$(document).on("click",function(){

})






	


