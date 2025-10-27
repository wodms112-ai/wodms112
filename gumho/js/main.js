/****************

파일명 : main.js
작성자 : 이재은
작성일 : 25-10-23
설 명  : 메인페이지에서만 적용되는 js를 저장(header footer 제외)

****************/
$(document).ready(function(){ //한개보이는 슬릭 
    $('.visual .popup').slick({
        autoplay: true, //팝업 자동 실행
        autoplaySpeed: 5000, //팝업이 머무는 시간
        speed: 500, //팝업 전환 속도
        //fade: true,  //페이드 효과 적용
        dots: false, //하단 페이지 버튼 (true, false)
        arrows: false,  //다음, 이전팝업 (true, false)
        //pauseOnHover: true, //마우스호버시 일시정지
        infinite: true, //무한반복(loop)
    });

/* ******** 
* .biz .list ul li에 마우스를 오버하면-> li에 ative클래스추가
* .biz .list에는-> over클래스 추가

=> 그럼언제 out? : 
******** */

    $('.biz .list ul li').on('mouseenter' , function(){
        $(this).addClass('active')
        $('.biz .list').addClass('over')
    })
    $('.biz .list ul li').on('mouseleave' , function(){
        $(this).removeClass('active')
        $('.biz .list').removeClass('over')
    })
/*over클래스 끝 */



const news_swiper = new Swiper('.news .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 24, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 1025px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
            1025: {    /* 1025px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 40,
            },
        },
        scrollbar: {
            el: ".news .ctrl_wrap .scrollbar",
            hide: false,
            draggable : true,//스크롤바 드레그해서이동
            dragSize : 300, //스크롤바사이즈
        },
        navigation: {
            nextEl: '.news .ctrl_wrap .btn_prev',
            prevEl: '.news .ctrl_wrap .btn_next',
        },
    });

/***********.service .list ul li에 마우스 오버시 -> 오버한li있는 data-bg의 값을
 *                            -> list의 클래스 면으로 줌 *********** */

let service_name
$('.service .list ul li').on('mouseenter' , function(){
    service_name = $(this).attr('data-bg') //지금 마우스를 올린 그 li의 data-bg 속성 값을 가져와서 service_name 변수에 저장해.
    // console.log(service_name)
    $('.service .list').attr('data-bg' , service_name)
    /*attr = 기존에 있는 값은 지우고 내가 준 값으로 새로 채우는 것
      add =  추가하는것 */
})
$('.service .list').on('mouseleave' , function(){
    $('.service .list').attr('data-bg' ,' ')
    
})






}) // 맨끝