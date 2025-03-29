/**
 * Created by Administrator on 2016/3/16 0016.
 */
(function($){
    var Index=function(){
        var _this=this;
        _this.init();
    };
    $.extend(Index.prototype,{
      init:function(){
          var _this=this;
          _this.imgBind()
      },
      imgEvent:function(icon,img,imgm,iconcss){
          var i=1;
          var len=icon.length;
          var wit=parseInt(img.css('width'));
          imgm.css('width',len*wit);
          function setTime(){
              if(i<len){
                 imgm.animate({'left':"-"+i*wit});
                  iconcss.removeClass('click');
                  iconcss.eq(i).addClass('click');
                  i++;
              }else{
                  imgm.animate({'left':0});
                  iconcss.removeClass('click');
                  iconcss.eq(0).addClass('click');
                  i=1;
              }
          }
          var stp= setInterval(setTime,3000);
          icon.hover(function(){
                clearInterval(stp);
                iconcss.removeClass('click');
                $(this).addClass('click');

                imgm.stop().animate({'left':"-"+parseInt($(this).attr('data-eq'))*wit});
                i=$(this).attr('data-eq');
            },function(){
                stp= setInterval(setTime,3000);
            });
          imgm.hover(function(){
              clearInterval(stp);
          },function(){
              stp= setInterval(setTime,3000);
          });
      },

      imgBind:function(){
          var _this=this;
          _this.imgEvent($('.first-trunmenu li'),$('.first-imgmenu li'),$('.first-imgmenu'),$('.first-trunmenu li'));
          _this.imgEvent($('.second-turnmenu li'),$('.second-imgmenu ul'),$('.second-imgmenu'),$('.second-turnmenu li'));
          _this.imgEvent($('.third-turnmenu li'),$('.third-turnmain ul'),$('.third-turnmain'),$('.third-turnmenu li'));
      }
    });
    new Index()
})(jQuery);