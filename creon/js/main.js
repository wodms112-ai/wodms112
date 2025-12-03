//******************************heder(common.css ):시작******************************* */
$(document).ready(function(){
    let mobile_size = 1270 //모바일 시작사이즈
    let window_w //브라우저 넓이
    let device_status // pc인가 mobile인가 테스트

    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }

   

    /*******************************************************
    누구한테 : header .gnb에
    뭐했을때 : 오버했을때

    결론 :  header에 -> menu_pc 클래스 추가
    제한조건
        over해서 생성된 흰색 배경안에는 아웃 안됨
    ************************************************************/
       /*menu_pc 클래스 추가 */
       device_chk()//문서가 로딩되었을때 1번실행
       $(window).resize(function(){
           device_chk()//브라우저가 리사이즈 할때마다 1번씩 실행
       })
       
   
       $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin' , function(){
           if(device_status == 'pc'){
               $('header').addClass('menu_pc')
           }
   
       })
       $('header .gnb .gnb_bg').on('mouseenter' , function(){
           $('header').removeClass('menu_pc')
       })
       $('header .util .lang').on('focusin', function(){ //lang에 오버되면 menu_pc클래스 삭제
           $('header').removeClass('menu_pc')
       })
   

    /*************************************************************
    누구한테 : header .gnb .gnb_wrap ul.depth1 > li 
    뭐했을때 : li 오버했을때

    결론
    header .gnb .gnb_wrap ul.depth1 > li 에 over 클래스 추가

    제한조건

    li중에서 오버한 한개만  over클래스 들어감
    메뉴에서 벗어나면 어떤것도 over안들어감
    ***************************************************************/
       /*over 클래스 추가 */
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin' , function(){
        if(device_status == 'pc'){ // 이게 pc면
             $(this).addClass('over') //over클래스를 주도록해
             // console.log('오버함')
         }
         $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave' , function(){
            $(this).removeClass('over')
             // console.log('아웃함')
         })
       
     })


//****************************** main_pop:시작******************************* */

/*popup */
const popup_swiper = new Swiper('.main_pop .popup .swiper', { /* 팝업을 감싼는 요소의 class명 */

	// autoplay: {  /* 팝업 자동 실행 */
	// 	delay: 2000,
	// 	disableOnInteraction: true,
	// },

	// effect: "fade", /* fade 효과 */

	//loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

	pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
		el: '.swiper-pagination', /* 해당 요소의 class명 */
		clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
		type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
		renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
		    return '<span class="' + className + '">' + (index + 1) + "</span>";
		},
	},
	

	// navigation: {  /* 이전, 다음 버튼 */
	// 	nextEl: '.swiper-button-next',  /* 다음 버튼의 클래스명 */
	// 	prevEl: '.swiper-button-prev',  
	// },
    scrollbar: {
        el: ".main_pop .popup .scrollbar",
        hide: false,
        draggable : true,//스크롤바 드레그해서이동
        //dragSize : 120, //스크롤바사이즈
    },
    breakpoints: {
        768: {  // 768px 이하 적용
            scrollbar: {
                dragSize: 390,// 모바일
            }
        }
    }
});
	
$('.main_pop .popup .btn_wrap .btn_stop').on('click' , function(){
    popup_swiper.autoplay.stop();  /* 일시정지 기능 */
    $('.main_pop .popup .btn_wrap .btn_play').show()
    $(this).hide()
})
$('.main_pop .popup .btn_wrap .btn_play').on('click' , function(){
    popup_swiper.autoplay.start();  /* 재생 기능 */
    $('.main_pop .popup .btn_wrap .btn_stop').show()
    $(this).hide()
})
const event_swiper = new Swiper('.main_pop .inner .event .swiper', { /* 팝업을 감싼는 요소의 class명 */

	// autoplay: {  /* 팝업 자동 실행 */
	// 	delay: 2500,
	// 	disableOnInteraction: true,
	// },

	//effect: "fade", /* fade 효과 */

	loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

	pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
		el: '.swiper-pagination', /* 해당 요소의 class명 */
		clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
		type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
		renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
		    return '<span class="' + className + '">' + (index + 1) + "</span>";
		},
	},
	

	navigation: {  /* 이전, 다음 버튼 */
		prevEl: '.main_pop .inner .event .btn_wrap .btn_prev',  
		nextEl: '.main_pop .inner .event .btn_wrap .btn_next',  /* 다음 버튼의 클래스명 */
	},

});

	
//******************************benefit (swiper):시작******************************* */
const benefit_swiper = new Swiper('.benefit .list .swiper', { /* 팝업을 감싼는 요소의 class명 */
    slidesPerView: 1,  // 기본 = 980 이하 모바일
    spaceBetween: 16,

    breakpoints: {
        768: {  // 981px 이상 ~ 1024 이하
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1160: { // 1025px 이상 (데스크탑)
            slidesPerView: 3,
            spaceBetween: 20,
        }
    },
	//centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
	// loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
	// autoplay: {  /* 팝업 자동 실행 */
	// 	delay: 2500,
	// 	disableOnInteraction: true,
	// },
	navigation: {
		prevEl: '.benefit  .ctrl_btn .btn_prev',
		nextEl: '.benefit  .ctrl_btn .btn_next',
	},
	
});
















}) // 맨끝(header)