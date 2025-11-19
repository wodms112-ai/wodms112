//******************************heder(common.css ):시작******************************* */
$(document).ready(function(){
    let mobile_size = 1024 //모바일 시작사이즈
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
    device_chk() //문서가 로딩될때 1번실행
    $(window).resize(function(){
        device_chk()//브라우저가 리사이즈 할때마다 1번씩 실행
    })

    $('header .gnb').on('mouseenter focusin' , function(){
        if(device_status == 'pc'){ //pc면
            $('header').addClass('menu_pc')
            //  console.log('오버함')
        }
    })
    $('header').on('mouseleave' , function(){
        $('header').removeClass('menu_pc')
        // console.log('아웃함')
    })
    $('header .util a').on('focusin' , function(){
        $('header').removeClass('menu_pc')
        /* 키보드 tab키로 이동할때 header에 focusout으로 주면 메뉴 이동 할때마다 아웃
        메뉴다음에 나오는 버튼이나 마지막 버튼 a한테 포커스가 가면 메뉴를 닫는것으로함 : removeClass 
        = 키보드 접근성 */

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

     // fixed클래스추가(스크롤내리면)
        let scrolling = $(window).scrollTop() // 스크롤된 값
        let prev_scroll // 이전에 스크롤된 값
        let diff_scroll // 차이값
        function scroll_chk(){
            prev_scroll = scrolling
            scrolling = $(window).scrollTop()
            diff_scroll = prev_scroll - scrolling
            if(diff_scroll < 0 ){
                $('header').addClass('up')
            }else{
                $('header').removeClass('up')
            }
            if(scrolling > 0){
                $('header').addClass('fixed')
            }else{
                $('header').removeClass('fixed')
            }
        }
        scroll_chk() // 스크롤 체크해서
        $(window).scroll(function(){
            scroll_chk() //스크롤할때마다 실행
        })



//******************************* moblie : 시작******************************** */
    //menu_mo 클래스 추가 
    $('header .gnb .gnb_open').on('click' , function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close, header .gnb .gnb_bg').on('click' , function(){
        $('header').removeClass('menu_mo')
    })


  // open 클래스 추가 ( 1차메뉴 클릭-> 2차메뉴 열리기 )
    let gnb_open
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click' , function(e){
        if(device_status == 'mobile'){
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음(2차메뉴 열려야하니까) */
            gnb_open = $(this).parent().hasClass('open')
            /*this(내가 클릭한 애)의 부모 요소(li)가 over라는 클래스를 가지고 있는지 확인해서*/
            
            if(gnb_open == true){
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
            }else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')   
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
                $(this).parent().addClass('open')
                $(this).next().slideDown()
            }
        }
    })




//************************************heder(common.css) :끝*************************************** */


//************************************ visual :시작 *************************************** */
    
const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

    autoplay: {  /* 팝업 자동 실행 */
        delay: 4000,
        disableOnInteraction: true,
    },

    effect: "fade", /* fade 효과 */
    loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
        el: '.visual .paging', /* 해당 요소의 class명 */
        clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
    },


    navigation: {  /* 이전, 다음 버튼 */
        prevEl: '.visual .swiper-button-prev',  
        nextEl: '.visual .swiper-button-next',  /* 다음 버튼의 클래스명 */

    },

});
//************************************ visual : 끝*************************************** */

//************************************ romm : 시작 *************************************** */
const room_swiper = new Swiper('.room .swiper', { /* 팝업을 감싼는 요소의 class명 */
	slidesPerView: 'auto', /* css에서 slide의 넓이ㅓ 지정 */
	spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
	breakpoints: {
		768: {    /* 768px 이상일때 적용 */
			spaceBetween: 24,
		},
	},
    loop: true, 
	navigation: {
        prevEl: '.room .swiper-button-prev',
		nextEl: '.room .swiper-button-next',
	},
	on: {
		slideChange: function() {
              // 1) (active된) 슬라이드를 가져오기
			const activeSlide = this.slides[this.activeIndex]
             //    (active된) 슬라이드 넓이
			const activeSlideWidth = activeSlide.offsetWidth

            //2) 바로 이전에 active되어 있던 슬라이드를 가져오기
			const otherSlides = this.slides[this.previousIndex]
            //    이전 슬라이드 넓이

            // 3) 두 슬라이드의 넓이 차이 구하기
			const otherSlideWidth = otherSlides.offsetWidth	
            // 예: 이전 300px → 현재 350px = +50px 차이		
			const slideWidthDifference = activeSlideWidth - otherSlideWidth;

             // 4) Swiper가 기본으로 이동한 값에서
            //  "슬라이드 너비 차이만큼" 위치를 다시 조정하기( 넓이가 다른 슬라이드를 넘길 때 튀지 않게 해주는 보정)
			this.setTranslate(this.translate - slideWidthDifference);
		},
		slideChangeTransitionEnd: function() {
			// 전환이 끝나면 Swiper를 다시 업데이트
			setTimeout(() => {
				this.update();// 스와이퍼 재계산!
			}, 100);  //  0.1초 뒤에 실행 (조금 기다렸다가 실행)
		}
	},
    
});


	















//************************************ romm : 끝 *************************************** */

}) // 맨끝(header)

