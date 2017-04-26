$(function(){
    initpage();
    $(window).resize(function()
    {
      initpage();
    }) 

    function initpage()
    {
      var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
      var _html = document.getElementsByTagName('html')[0];
      //计算方法:一般屏幕最宽是640,当大于640时,按照640的规格,pxfont-size大小为40px;
      //当不够的时候,满足此等式:640/40=view_width/x,所以x=view_width/16
      view_width>640?_html.style.fontSize=640/16 +'px':_html.style.fontSize =view_width/16+'px';
      console.log('_html.style.fontSize='+_html.style.fontSize);
    }
    //tip:ionic自带的样式都是设的固定px,也没必要引入ionic-rem.css,因为可以用自己的样式覆盖
});
