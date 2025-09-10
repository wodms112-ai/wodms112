$(document).ready(function(){
        const visual_swiper = Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  
            delay: 2000,
            disableOnInteraction: true,
        },

        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .ctrl_btn .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction-> paging이 숫자로 표시됨 */
            //renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
            //    return '<span class="' + className + '">' + (index + 1) + "</span>";
            //},
        },
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .ctrl_btn .btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .ctrl_btn .btn_play',  
        },
    });
	 /*
     정지버턴을 누르면 
      1.팝업이 정지
      2.정비버튼은 사라짐
      3.일시 플레이버튼이 나타남
     플레이버튼을 누르면
      1.팝업은 다시재생
      2.플래이버튼은 사라짐
      3.정지버튼은 나타남
    */ 
   $('.visual .ctrl_btn .btn_stop').on('click', function (){
    $(this).hide()
    $('.visual .ctrl_btn .btn_play').show()
    visual_swiper.autoplay.stop();  /* 일시정지 기능 */
   })
   $('.visual .ctrl_btn .btn_plat').on('click', function (){
    $(this).hide()
    $('.visual .ctrl_btn .btn_stop').show()
    visual_swiper.autoplay.start();  /* 재생 기능 */
   })

   /*news의 swiper*/
   
    const swiper = news Swiper('.news swiper', { /* 팝업을 감싼는 요소의 class명 */
    slidesPerView: 3, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
    spaceBetween: 24, /* 팝업과 팝업 사이 여백 */
   
    //loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    //autoplay: {  /* 팝업 자동 실행 */
    //    delay: 2500,
    //   disableOnInteraction: true,
    //},
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
   
    });
    swiper.autoplay.stop();  /* 일시정지 기능 */
    swiper.autoplay.start();  /* 재생 기능 */

}) //$(document).ready 맨끝...