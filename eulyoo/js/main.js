$(document).ready(function(){
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
        	delay: 5000,
        	disableOnInteraction: true,
        },

        effect: "fade", /* fade 효과 */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
        },
        

        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual .ctrl_btn .btn_next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual .ctrl_btn .btn_prev',  
        },

    });//swiper종료
     
    

    $('.visual .ctrl_btn .btn_stop').on('click' , function(){
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide() //hide=숨기기기능 , this=나 숨길께
        $('.visual .ctrl_btn .btn_play').show() 
        //정지버튼
    })//종료

    $('.visual .ctrl_btn .btn_play').on('click' , function(){
        visual_swiper.autoplay.start();    /* 재생 기능 */
        $(this).hide() //hide=숨기기기능 , this=나 숨길께
        $('.visual .ctrl_btn .btn_stop').show()

    })// 종료



    /*
    브라우저가 스크롤되면 header에  fixed클래스 추가
    1.조금이라도 스크롤되면 header에  fixed클래스 추가
    2.다시 맨위로 올라가면 header에  fixed클래스 삭제
    3.중간에 새로고침했을때 header에  fixed클래스 추가

    -> 브라우저를 스크롤 할때도 체크
    -> 처음 로딩 했을때도 체크
                  => 동일한 체크를 두번 실행하는건 => "함수"로 처리
    */
    let scrolling //변수바구니
    function scroll_chk(){  //함수를 정의한다
        scrolling = $(window).scrollTop()
        console.log(scrolling)
        if(scrolling > 0){ 
            $('header').addClass('fixed')
        }else{
            $('header').removeClass('fixed')
        }
    }    

    //문서가 로딩됬을때 단1번
    scroll_chk()

    //브라우저가 스크롤 될 때 마다 1번씩 실행
    $(window).scroll(function(){
        scroll_chk()
    }) //플레이버튼 종료


    //book swiper
    const book_swiper = new Swiper('.book .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
           
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 1,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        navigation: {  /* 이전, 다음 버튼 */
        nextEl: '.book .ctrl_btn .btn_next',  /* 다음 버튼의 클래스명 */
        prevEl: '.book .ctrl_btn .btn_prev',  
    },
    });//swiper 종료

}) //맨끝
