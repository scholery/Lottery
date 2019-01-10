var bodyWidth = $("body").css("width");
$("div.items").css("width",(bodyWidth.substring(0,bodyWidth.length-2)-500)+"px");

//参与抽奖人数初始值
//var itemCount= 120;
//跑马灯循环
var tx;
var runtx;
//是否正在运行跑马灯
var isRun=true;
//是否跑马灯暂停状态
var pause =false;
//排名分组显示算法已经取消
//var ts=20
//默认跑马灯频率
var pl=50;
//程序是否开始运行用于判断程序是否开始运行
var isStart=false;
	
var zzs = "#98ff98";
//跑马灯音效
var runingmic=document.getElementById("runingmic");
runingmic.volume=0.5;
//中奖音效
var pausemic=document.getElementById("pausemic");
pausemic.volume=1.0;

var keyStatus=false;

$("document").ready(function(){    
    //初始化皮肤
    if(localStorage.getItem("pf")){
		var	pf = localStorage.getItem("pf");
		dynamicLoading.css("./css/style"+pf+".css");
		$("#bodybg img").attr("src","./images/bodybg"+pf+".jpg");
		$("input[name=pf][value="+pf+"]").attr("checked",true);
		if(pf!=1){
		    zzs="#ba3030";
		}
	}
    //初始化标题
    if(localStorage.getItem("title")){
		$("#title").val(localStorage.getItem("title"));
	}
    $(".top").text($("#title").val());
    
    //频率模式本地存储  	 
	if(localStorage.getItem("ms")){
		pl = localStorage.getItem("ms");
		$("input[name=ms][value="+pl+"]").attr("checked",true);
	}
	//排名信息本地存储
	if(localStorage.getItem("sequence")){
		var ssHtml = localStorage.getItem("sequence");
		$(".ss").html(ssHtml);
	}
	//后门信息回显
	if(localStorage.getItem("pchm")){
		var pchm = localStorage.getItem("pchm");
		$("#pchm").val(pchm);
	}
	//后门关联按键回显
	$("#q").val(localStorage.getItem("touchq")==undefined?0:localStorage.getItem("touchq"))
	$("#w").val(localStorage.getItem("touchw")==undefined?0:localStorage.getItem("touchw"));
	$("#e").val(localStorage.getItem("touche")==undefined?0:localStorage.getItem("touche"));
	$("#r").val(localStorage.getItem("touchr")==undefined?0:localStorage.getItem("touchr"));
	$("#t").val(localStorage.getItem("toucht")==undefined?0:localStorage.getItem("toucht"));
	$("#y").val(localStorage.getItem("touchy")==undefined?0:localStorage.getItem("touchy"));
	$("#u").val(localStorage.getItem("touchu")==undefined?0:localStorage.getItem("touchu"));
	$("#i").val(localStorage.getItem("touchi")==undefined?0:localStorage.getItem("touchi"));
	$("#o").val(localStorage.getItem("toucho")==undefined?0:localStorage.getItem("toucho"));
	$("#p").val(localStorage.getItem("touchp")==undefined?0:localStorage.getItem("touchp"));
	if(localStorage.getItem("touch")){
		$("#pchm").val(localStorage.getItem("pchm"))
	}
	
	//初始化用户信息
	for(var i=1;i<=users.length;i++){
		$("div.items").append("<div class='item' id='"+users[i-1].code+"'>"+users[i-1].name+"</div>");
    }
	//本地存储item宽度信息
	if(localStorage.getItem("itemk")){
		$("div.item").css("width",localStorage.getItem("itemk"));
	}
    //本地存储item高度信息
	if(localStorage.getItem("itemg")){
		$("div.item").css("height",localStorage.getItem("itemg"));
		$("div.item").css("line-height",localStorage.getItem("itemg"));
	}
    //回显设定item宽高
	$("#itemk").attr("placeholder",$(".item").eq(0).css("width"));
	$("#itemg").attr("placeholder",$(".item").eq(0).css("height"));
	
	//初始化排序信息
	$(".sequence li").each(function(idx,item){
		$("#"+$(item).attr("data-number")).addClass("ignore");
	});

    //初始化后门排除信息
    if(localStorage.getItem("pchm")){
   		$(localStorage.getItem("pchm").split(" ")).each(function(inx,item){
			$("#"+item).addClass("brz");
		});
	}	
	//$("div.menu").css("height",$("div.items").css("height"));
    $("body").keyup(function(e){
    	keyStatus=false;
	});
	//全局键盘事件监听
	$("body").keydown(function(e){
		if(e.keyCode==88){
			$(".cjms").toggle();
		}
		if(isStart){
			if(!keyStatus){
				keyStatus=true;
			}else{
				return false;
			}
		}
		if(e.keyCode==116||e.keyCode==8||e.keyCode==122){
			return true;
		}
		//按F1弹出帮助窗口
		if(e.keyCode==112){
			e.preventDefault();
			showReadme();
			return false;
		}
		//ESC案件呼出隐藏菜单
		if(e.keyCode==27){
			if($(".help:hidden").size()>0)
				$(".help").show();
			else
				$(".help").hide();
			
			return false;
		}
        
		if(e.keyCode==37){
			$(".prev").click();
			return false;
		}
		if(e.keyCode==39){
			$(".next").click();
			return false;
		}
		//当程序处于暂停状态
		if(pause){
			//以下按键有效 数字键 0-9 和 小键盘 0-9
			return true;
		}
		//存在未中奖用户切程序处于未开始运行状态执行开始方法
		if((e.keyCode==32||e.keyCode==65)&&$("div.item:not(.ignore)").size()!=0&&!isStart){
			isStart=!isStart;
			startApp();
			return false;
		}

		switch(e.keyCode){
			case 81:hmxh(localStorage.getItem("touchq"));return;break;
			case 87:hmxh(localStorage.getItem("touchw"));return;break;
			case 69:hmxh(localStorage.getItem("touche"));return;break;
			case 82:hmxh(localStorage.getItem("touchr"));return;break;
			case 84:hmxh(localStorage.getItem("toucht"));return;break;
			case 89:hmxh(localStorage.getItem("touchy"));return;break;
			case 85:hmxh(localStorage.getItem("touchu"));return;break;
			case 73:hmxh(localStorage.getItem("touchi"));return;break;
			case 79:hmxh(localStorage.getItem("toucho"));return;break;
			case 80:hmxh(localStorage.getItem("touchp"));return;break;												
		}
		if(e.keyCode==32||e.keyCode==65){
			
			//当所有抽奖号全部抽取完毕则销毁跑马和音效循环
			if($("div.item:not(.ignore)").size()==0){
				clearInterval(tx);
				clearInterval(runtx);
				runingmic.puase();
				
				alert("抽奖已经全部结束。");
				return false;
			}
			//更新运行状态
			isRun=!isRun;
			//如果项目处于运行状态
			if(!isRun){
				//取得当前选中号码
				var it = $(".item.active");
				if(it==null || it.length == 0){
					console.log("选取结束，没选到元素");
					return false;
				}
				//停止跑马灯
				runingmic.pause();
				//Math.floor($(".sequence li").size()/ts)
				
				//播放中奖音效
				pausemic.currentTime = 0;
				pausemic.play();

				//中奖号处理
				$(".sequence:visible").eq(0).append("<li data-number="+it.attr("id")+">"+it.attr("id")+" "+it.text()+"</li>");
				$(".item.active").addClass("ignore");
				$(".item.active").pulsate({
					color: zzs,        //#98ff98
					repeat: 5
				});
	            //更新本地中将数据记录
				localStorage.setItem("sequence",$(".ss").html()); 
			}else{
				$(".active").removeClass("active");
				runingmic.play();
			}
		}
		e.preventDefault();
	});
	
	//打开高级设置窗口	 
	$("a.config").click(function(){
		pause=true;
		runingmic.pause();
		var d = dialog({
			title: '抽奖参数设定',
		    content: $(".model"),
		    okValue: '确定',
		    ok: function () {
		    	if($("#reset:checked").val()&&confirm("点击确定将清空抽奖结果。")){
		    		localStorage.removeItem("sequence");
		    	}
		   		if($("#itemk").val()){
		   			localStorage.setItem("itemk",$("#itemk").val());
		    	}
		   		if($("#itemg").val()){
		    		localStorage.setItem("itemg",$("#itemg").val());
		    	}
		    	localStorage.setItem("title",$("#title").val());
		    	localStorage.setItem("ms",$("input[name=ms]:checked").val());
		    	localStorage.setItem("pf",$("input[name=pf]:checked").val());
		    	
		    	window.location.reload();
		    },onclose: function () {
		        pause=false;
		    }
		});
			d.show();
	});
	//下一轮操作
	$(".next").click(function(){
		if(($(".ss ol:visible li").size()>0||$(".ss ol:visible").hasClass("ojj"))&&$(".ss ol:visible").next("ol").size()>0)
		$(".ss ol:visible").eq(0).hide().next().show();
	});
	//上一轮操作
	$(".prev").click(function(){
		if($(".ss ol:visible").prev().size()>0)
		$(".ss ol:visible").eq(0).hide().prev().show();
	});
	//抽奖结果查看
	$(".showjg").click(function(){
		pause=true;
		$("#ss").remove();
		var $jg = $(".ss").clone().attr("id","ss").css("width","150px").css("float","left").find("ol").css("float","left");
		$jg.find("ol").show();

		var d = dialog({
		    title: '抽奖结果查看',
		    content: $jg ,
		    okValue: '关闭',
		    ok:function(){
		    },
		    onclose: function () {
		        pause=false;
		    }
		}).show();
	});
	//清除错误中奖号
	$("body").on("click",".item.ignore",function(){
		var inputItemCount = prompt("请输入点击的号码来进行删除中奖号码（例如“12”）。");
		if(inputItemCount == $(this).text()){
			$("li[data-number="+$(this).attr("id")+"]").remove();
			$(this).removeClass("ignore");
			localStorage.setItem("sequence",$(".ss").html());		
		}else{
		}
	});
	
	//超级模式窗口
	$(".cjms").click(function(){
		var d = dialog({
		    title: '超级模式',
		    content: $(".hm") ,
		    okValue: '确定',
		    ok:function(){
		    	localStorage.setItem("touchq",	$("#q").val());
		    	localStorage.setItem("touchw",	$("#w").val());
		    	localStorage.setItem("touche",	$("#e").val());
		    	localStorage.setItem("touchr",	$("#r").val());
		    	localStorage.setItem("toucht",	$("#t").val());
		    	localStorage.setItem("touchy",	$("#y").val());
		    	localStorage.setItem("touchu",	$("#u").val());
		    	localStorage.setItem("touchi",	$("#i").val());
		    	localStorage.setItem("toucho",	$("#o").val());
		    	localStorage.setItem("touchp",	$("#p").val());
		    	localStorage.setItem("pchm", $("#pchm").val());
		    },
		    onclose: function () {
		        pause=false;
		    }
		}).show();
	});
	
	//加奖功能
	$(".jj").click(function(){
		if($(".ss ol:visible").hasClass("ojj")){
			alert("当前加奖还空着，别再添加了~！");
			return;
		}
		var $jj = $(".ss ol:last").clone(true).addClass("ojj");
		$jj.find(".olTitle").text("特别奖").html();
		$(".ss ol:visible").after($jj.show()).hide();
	});
});
//程序开始入口
function startApp(){
	//开始播放跑马灯音效
	runingmic.play();
 	//产生随机数临时变量
	var rand =0
	//存储上一次随机数的临时变量
	var prenum;
	tx=setInterval(function(){
	    if(isRun){
	    	while(true){
				rand=Math.floor(Math.random() * ( $("div.item:not(.ignore):not(.brz)").size()));
			 	if(rand ==0 || rand!=prenum){break;}
			}
			prenum=rand;
			$(".item.active").removeClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand).addClass("active");
		}
	},pl);
	runtx = setInterval(function(){runingmic.currentTime = 0;},7000);
}
function showReadme(){
	var d = dialog({
		    title: '帮助信息',
		    content: $(".readme") ,
		    width:'400px',
		    okValue: '关闭',
			ok:function(){
		    },
		    onclose: function () {
		        pause=false;
		    }
	}).show();
}

var dynamicLoading = {
    css: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}

function hmxh(number){
		var it = $("#"+number);
		if(it==null || it.length == 0){
			console.log("结束");
			return false;
		}
        if(!isStart){
        	return false;
        }
        
		//当所有抽奖号全部抽取完毕则销毁跑马和音效循环
		if($("div.item:not(.ignore)").size()==0){
			clearInterval(tx);
			clearInterval(runtx);
			runingmic.puase();
			
			alert("抽奖已经全部结束。");
			return false;
		}
		if(it.hasClass("ignore")){
        	return false;
        }
		//更新运行状态
		isRun=!isRun;
		//如果项目处于运行状态
		if(!isRun){
			//取得当前选中号码
			$(".item.active").removeClass("active");
			it.addClass("active");
			//停止跑马灯
			runingmic.pause();
			//Math.floor($(".sequence li").size()/ts)
			
			//播放中奖音效
			pausemic.currentTime = 0;
			pausemic.play();

			//中奖号处理
			$(".sequence:visible").eq(0).append("<li data-number="+number+">"+it.attr("id")+" "+it.text()+"</li>");
			$(".item.active").addClass("ignore");
			$(".item.active").pulsate({
				color: zzs,        //#98ff98
				repeat: 5
			});
            //更新本地中将数据记录
			localStorage.setItem("sequence",$(".ss").html()); 
		}else{
			$(".active").removeClass("active");
			runingmic.play();
		}
}