var bodyWidth = $("body").css("width");
$("div.items").css("width",(bodyWidth.substring(0,bodyWidth.length-2)-500)+"px");

//����齱������ʼֵ
//var itemCount= 120;
//�����ѭ��
var tx;
var runtx;
//�Ƿ��������������
var isRun=true;
//�Ƿ��������ͣ״̬
var pause =false;
//����������ʾ�㷨�Ѿ�ȡ��
//var ts=20
//Ĭ�������Ƶ��
var pl=50;
//�����Ƿ�ʼ���������жϳ����Ƿ�ʼ����
var isStart=false;
	
var zzs = "#98ff98";
//�������Ч
var runingmic=document.getElementById("runingmic");
runingmic.volume=0.5;
//�н���Ч
var pausemic=document.getElementById("pausemic");
pausemic.volume=1.0;

var keyStatus=false;

$("document").ready(function(){    
    //��ʼ��Ƥ��
    if(localStorage.getItem("pf")){
		var	pf = localStorage.getItem("pf");
		dynamicLoading.css("./css/style"+pf+".css");
		$("#bodybg img").attr("src","./images/bodybg"+pf+".jpg");
		$("input[name=pf][value="+pf+"]").attr("checked",true);
		if(pf!=1){
		    zzs="#ba3030";
		}
	}
    //��ʼ������
    if(localStorage.getItem("title")){
		$("#title").val(localStorage.getItem("title"));
	}
    $(".top").text($("#title").val());
    
    //Ƶ��ģʽ���ش洢  	 
	if(localStorage.getItem("ms")){
		pl = localStorage.getItem("ms");
		$("input[name=ms][value="+pl+"]").attr("checked",true);
	}
	//������Ϣ���ش洢
	if(localStorage.getItem("sequence")){
		var ssHtml = localStorage.getItem("sequence");
		$(".ss").html(ssHtml);
	}
	//������Ϣ����
	if(localStorage.getItem("pchm")){
		var pchm = localStorage.getItem("pchm");
		$("#pchm").val(pchm);
	}
	//���Ź�����������
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
	
	//��ʼ���û���Ϣ
	for(var i=1;i<=users.length;i++){
		$("div.items").append("<div class='item' id='"+users[i-1].code+"'>"+users[i-1].name+"</div>");
    }
	//���ش洢item�����Ϣ
	if(localStorage.getItem("itemk")){
		$("div.item").css("width",localStorage.getItem("itemk"));
	}
    //���ش洢item�߶���Ϣ
	if(localStorage.getItem("itemg")){
		$("div.item").css("height",localStorage.getItem("itemg"));
		$("div.item").css("line-height",localStorage.getItem("itemg"));
	}
    //�����趨item���
	$("#itemk").attr("placeholder",$(".item").eq(0).css("width"));
	$("#itemg").attr("placeholder",$(".item").eq(0).css("height"));
	
	//��ʼ��������Ϣ
	$(".sequence li").each(function(idx,item){
		$("#"+$(item).attr("data-number")).addClass("ignore");
	});

    //��ʼ�������ų���Ϣ
    if(localStorage.getItem("pchm")){
   		$(localStorage.getItem("pchm").split(" ")).each(function(inx,item){
			$("#"+item).addClass("brz");
		});
	}	
	//$("div.menu").css("height",$("div.items").css("height"));
    $("body").keyup(function(e){
    	keyStatus=false;
	});
	//ȫ�ּ����¼�����
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
		//��F1������������
		if(e.keyCode==112){
			e.preventDefault();
			showReadme();
			return false;
		}
		//ESC�����������ز˵�
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
		//����������ͣ״̬
		if(pause){
			//���°�����Ч ���ּ� 0-9 �� С���� 0-9
			return true;
		}
		//����δ�н��û��г�����δ��ʼ����״ִ̬�п�ʼ����
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
			
			//�����г齱��ȫ����ȡ����������������Чѭ��
			if($("div.item:not(.ignore)").size()==0){
				clearInterval(tx);
				clearInterval(runtx);
				runingmic.puase();
				
				alert("�齱�Ѿ�ȫ��������");
				return false;
			}
			//��������״̬
			isRun=!isRun;
			//�����Ŀ��������״̬
			if(!isRun){
				//ȡ�õ�ǰѡ�к���
				var it = $(".item.active");
				if(it==null || it.length == 0){
					console.log("ѡȡ������ûѡ��Ԫ��");
					return false;
				}
				//ֹͣ�����
				runingmic.pause();
				//Math.floor($(".sequence li").size()/ts)
				
				//�����н���Ч
				pausemic.currentTime = 0;
				pausemic.play();

				//�н��Ŵ���
				$(".sequence:visible").eq(0).append("<li data-number="+it.attr("id")+">"+it.attr("id")+" "+it.text()+"</li>");
				$(".item.active").addClass("ignore");
				$(".item.active").pulsate({
					color: zzs,        //#98ff98
					repeat: 5
				});
	            //���±����н����ݼ�¼
				localStorage.setItem("sequence",$(".ss").html()); 
			}else{
				$(".active").removeClass("active");
				runingmic.play();
			}
		}
		e.preventDefault();
	});
	
	//�򿪸߼����ô���	 
	$("a.config").click(function(){
		pause=true;
		runingmic.pause();
		var d = dialog({
			title: '�齱�����趨',
		    content: $(".model"),
		    okValue: 'ȷ��',
		    ok: function () {
		    	if($("#reset:checked").val()&&confirm("���ȷ������ճ齱�����")){
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
	//��һ�ֲ���
	$(".next").click(function(){
		if(($(".ss ol:visible li").size()>0||$(".ss ol:visible").hasClass("ojj"))&&$(".ss ol:visible").next("ol").size()>0)
		$(".ss ol:visible").eq(0).hide().next().show();
	});
	//��һ�ֲ���
	$(".prev").click(function(){
		if($(".ss ol:visible").prev().size()>0)
		$(".ss ol:visible").eq(0).hide().prev().show();
	});
	//�齱����鿴
	$(".showjg").click(function(){
		pause=true;
		$("#ss").remove();
		var $jg = $(".ss").clone().attr("id","ss").css("width","150px").css("float","left").find("ol").css("float","left");
		$jg.find("ol").show();

		var d = dialog({
		    title: '�齱����鿴',
		    content: $jg ,
		    okValue: '�ر�',
		    ok:function(){
		    },
		    onclose: function () {
		        pause=false;
		    }
		}).show();
	});
	//��������н���
	$("body").on("click",".item.ignore",function(){
		var inputItemCount = prompt("���������ĺ���������ɾ���н����루���硰12������");
		if(inputItemCount == $(this).text()){
			$("li[data-number="+$(this).attr("id")+"]").remove();
			$(this).removeClass("ignore");
			localStorage.setItem("sequence",$(".ss").html());		
		}else{
		}
	});
	
	//����ģʽ����
	$(".cjms").click(function(){
		var d = dialog({
		    title: '����ģʽ',
		    content: $(".hm") ,
		    okValue: 'ȷ��',
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
	
	//�ӽ�����
	$(".jj").click(function(){
		if($(".ss ol:visible").hasClass("ojj")){
			alert("��ǰ�ӽ������ţ����������~��");
			return;
		}
		var $jj = $(".ss ol:last").clone(true).addClass("ojj");
		$jj.find(".olTitle").text("�ر�").html();
		$(".ss ol:visible").after($jj.show()).hide();
	});
});
//����ʼ���
function startApp(){
	//��ʼ�����������Ч
	runingmic.play();
 	//�����������ʱ����
	var rand =0
	//�洢��һ�����������ʱ����
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
		    title: '������Ϣ',
		    content: $(".readme") ,
		    width:'400px',
		    okValue: '�ر�',
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
			console.log("����");
			return false;
		}
        if(!isStart){
        	return false;
        }
        
		//�����г齱��ȫ����ȡ����������������Чѭ��
		if($("div.item:not(.ignore)").size()==0){
			clearInterval(tx);
			clearInterval(runtx);
			runingmic.puase();
			
			alert("�齱�Ѿ�ȫ��������");
			return false;
		}
		if(it.hasClass("ignore")){
        	return false;
        }
		//��������״̬
		isRun=!isRun;
		//�����Ŀ��������״̬
		if(!isRun){
			//ȡ�õ�ǰѡ�к���
			$(".item.active").removeClass("active");
			it.addClass("active");
			//ֹͣ�����
			runingmic.pause();
			//Math.floor($(".sequence li").size()/ts)
			
			//�����н���Ч
			pausemic.currentTime = 0;
			pausemic.play();

			//�н��Ŵ���
			$(".sequence:visible").eq(0).append("<li data-number="+number+">"+it.attr("id")+" "+it.text()+"</li>");
			$(".item.active").addClass("ignore");
			$(".item.active").pulsate({
				color: zzs,        //#98ff98
				repeat: 5
			});
            //���±����н����ݼ�¼
			localStorage.setItem("sequence",$(".ss").html()); 
		}else{
			$(".active").removeClass("active");
			runingmic.play();
		}
}