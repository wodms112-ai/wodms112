
$(document).ready(function(){

//**************************** 시작 : 현재 (pc)인지 ,(모바일)인지 체크 => 메뉴상태보고************************
    
    let mobile_size = 1024 //브라우저 너비가 1024px 이하이면 모바일
    let window_w // 브라우저 넓이가 --이면 윈도우
    let device_status //위 규칙을 담는 변수바구니

    function device_chk(){  // 함수를 선언 한다 (pc인지 mobile인지 구분해주는 검사기)
        window_w = $(window).width() // window_w 는 = 윈도우의 넓이다
        if(window_w > mobile_size){ // 윈도우넓이 > 모바일넓이 이면
            device_status = 'pc'    //변수바구니 => pc넣어
        }else{                      //아니면
            device_status = 'mobile'//=모바일 버전넣어
        }
        console.log(device_status)  //
    }

    device_chk() //페이지가 처음 열릴 때 한 번 사이즈 체크해서
    $(window).resize(function(){ // 윈도우가 리사이즈 될때마다 실행해 
        device_chk() //사이즈변수바구니에
    })


//*****************************끝 : 현재 (pc)인지 ,(모바일)인지 체크 => 메뉴상태보고**********************




//**************************** visual swiper 시작 ****************************
    let visual_time = 5000 
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 4000,
            disableOnInteraction: true,
        },

        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
       
    });


        //클릭하는지 감시-> 실행(숨기기기능)시키기 ?
        $('.visual .ctrl_btn .stop').on('click' , function(){
            visual_swiper.autoplay.stop(); /* 일시정지 기능 */
            $(this).hide()
            $('.visual .ctrl_btn .play').css('display' , 'flex')
            $('.visual .ctrl_btn .bar span').stop() //에니메이션종료
        })
        $('.visual .ctrl_btn .play').on('click' , function(){
            visual_swiper.autoplay.start(); /* 일시정지 기능 */
            $(this).hide()
            $('.visual .ctrl_btn .stop').css('display' , 'flex')
            updateCurrent()
        })


  // 전체 슬라이드 개수 (loop 상태에서도 실제 슬라이드 개수만) /*? */
    const totalSlides = $('.visual .swiper .swiper-slide').not('.swiper-slide-duplicate').length;
                             // 이 슬라이드 하나하나를 찾아라!/“복사본은 빼고 진짜 슬라이드만 세라!
        $('.visual .paging .total').text(totalSlides); 
                           // 이 요소(예: “/5” )에 슬라이드수를 글자로 표시해줘!

 // 현재 슬라이드 번호 표시 함수
    function updateCurrent() { //처음 로드시 실행해
        let realIndex = visual_swiper.realIndex + 1; // realIndex는 =실제 인덱스visual_swiper.realIndex +1이야 (0부터 시작하므로 +1)
        $('.visual .paging .current').text(realIndex);//realIndex의 숫자를 글짜로 써줘
        //슬라이드가 교체되면 제일 먼저 넓이를0으로 초기화
        $('.visual .ctrl_btn .bar span').stop() //에니메이션종료
        $('.visual .ctrl_btn .bar span').width(0)

        $('.visual .ctrl_btn .bar span').animate({ //사용자 정의 에니메이션 =animate
            width : '100%'
        }, visual_time)
    }

    // 처음 로드 시 한번 실행
    updateCurrent();

    // 슬라이드 변경될 때마다 실행
    visual_swiper.on('slideChange', function (){
        updateCurrent();
    });
    // visual_swiper.autoplay.stop();  /* 일시정지 기능 */
    // visual_swiper.autoplay.start();  /* 재생 기능 */

//---------------------------------- visual swiper 끝 ----------------------------------


/*****************************시작 : pc버전 메뉴오버************************************ 
 * 메뉴에 마우스를 오버햇을때 (header .gnb)  : pc버전에서만(let으로 조건붙이기)
  1) header에 menu_pc 클래스 추가
  2)마우스를 오버한 메뉴의 1차메뉴 li에 ->over클래스 추가( header .gnb .gnb_wrap ul.depth1 > li )
                                                    ->over한 li에만 over클래스를 줌
                                                    ->모든 li에서 over를 빼고 오버한 li에만 over클래스를 줌
   -> 메뉴를 오버해서 바뀐 색상 색상의 영역 내부에서는 오버가 : 유지되고
   -> 그 밖에 나갈때는 : 아웃
 */ 


$('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin' , function(){ 
    //? 마우스로 메뉴 위에 올렸을 때 작동시켜
                                                      //focusin =키보드접근성
    if( device_status == 'pc'){  //pc일때만 이걸 동작해
        $('header').addClass('menu_pc') //헤더에 '메뉴 열림' 상태 표시
        $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over') // 기존에준 over없애기
        $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').hide()// 기존 2차메뉴 숨기기
        $(this).addClass('over')// 내가 올린 메뉴에 over클래스 추가
        $(this).find('.depth2').slideDown()// 그 메뉴의 2차메뉴를 슬라이드로 열기
    }
       
})
$('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave' , function(){
    $(this).removeClass('over')
    $(this).find('.depth2').hide()
})
$('header').on('mouseleave' , function(){
    $(this).removeClass('menu_pc')  //
                                   //왜this 를 넣어야 먹히지header는 안되나
})

$('header .util .search .sch_open ').on('focusin' , function(){
    $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
})


//------------------------------끝  : pc버전 메뉴오버 ------------------------------------


/**************************** 시작 : mobile 버전1차메뉴 클릭**********************
 * 1차메뉴a에 링크기는 없애기(depth2 열려야하니까)
 * 
 * 닫혀있는 메뉴를 클릭하면-> 기존에 열려있던 다른 메뉴를 다고 나만열기 (li open)클래스 추가
 * 열려있는 메뉴를 클릭하면-> 나 자신을 닫고 끝남
    (열린 메뉴, 닫힌메뉴 구분하는 방법 => open있으면 열린메뉴/ 없으면 닫힌메뉴)
 */
 


// * 1차메뉴a에 링크기는 없애기(depth2 열려야하니까) ? 1017
$('header .gnb .gnb_wrap ul.depth1 > li > a').on('click' , function(e){
    if( device_status == 'mobile'){
        e.preventDefault();
        if($(this).parent().hasClass('open') == true){ //열려있는 메뉴를 다시클릭햇을때
            // console.log('열림')
            $(this).parent().removeClass('open') //li에오픈클래스추가
            $(this).next().slideUp()//2차 메뉴를 슬라이드로 ekerl
        }else{ //열려있지 않은 다른 메뉴를 여는거
             // console.log('닫힘')
            $('header .gnb .gnb_wrap ul.depth1 > li > a').removeClass('open')
            $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp() //
            $(this).parent().addClass('open')
            $(this).next().slideDown() //2차 메뉴를 슬라이드로 열기
        }
    }
})
/**************************** 끝 : mobile 버전1차메뉴 클릭************************/



/**************************** 시작 : mobile 버전 menu-mo  (메뉴열기)***********************
 * 열기를 클릭하면 헤더에  -> menu_mo  추가 (header .gnb .gnb_open )
 * 닫기를 클릭하면  헤더에  -> menu_mo  삭제( header .gnb .gnb_wrap .gnb_close)
*/  


    $('header .gnb .gnb_open').on('click' , function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close').on('click' , function(){
        $('header').removeClass('menu_mo')
    })


/**************************** 끝 : mobile 버전 menu-mo  (메뉴열기)************************/


/**************************** 시작 : 스크롤시 header에 fixed클래스주기***********************
 * pc 모바일 둘다
 * 스크롤이 조금만 되도 header에 fixed클래스 줌
 * 다시 맨 꼭대기로 올라가면 fixed클래스 해지
*/

    let scrolling //스크롤된 값
    function scroll_chk(){
        scrolling = $(window).scrollTop() //현재스크롤값 넣어주기
        if(scrolling > 0){
            $('header').addClass('fixed')
        }else{
            $('header').removeClass('fixed')
        }
    }


    scroll_chk() //문서가 로딩되고 단1번 실행
    $(window).scroll(function(){
        scroll_chk() //스크롤 될때마다 1번실행
    })

/**************************** 끝 : 스크롤시 header에 fixed클래스주기************************/


/**************************** 시작 : '찾습니다' swiper ************************/
    const find01_swiper = new Swiper('.find .item1 .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
            1024: {    /* 640px 이상일때 적용 */
                slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {
            nextEl: '.find .item1 .next',
            prevEl: '.find .item1 .prev',
        },
        
    });
    const find02_swiper = new Swiper('.find .item2 .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
            1024: {    /* 640px 이상일때 적용 */
                slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {
            nextEl: '.find .item2 .next',
            prevEl: '.find .item2 .prev',
        },
        
    });





/**************************** 끝 : '찾습니다' swiper ************************/



/**************************** 시작 : 찾습니다 tab기능 ***********************
 * .find .tab_list ul li 를 클릭했을때 1번째를 클릭하면->자기자신에게active클래스를 주고
                                                 ->.find .tab_list ul li .tab_item 에->active클래스
                                                 ( li에서 어떤 tab_item에 보이게 해야하는지 단서를 줘야함 )
 * 
*/
    let tab_name //? 설명 꼭다시보기1020 (1교시)
    $('.find .tab_list ul li').on('click' , function(){
        //클릭한 li에만 엑티브 클래스 추가
        $('.find .tab_list ul li').removeClass('active')
        $(this).addClass('active')
        //클릭한li의 버튼에 선택됨이라 글자쓰기
        $('.find .tab_list ul li button span').text('')
        $(this).find('button span').text('선택됨')

        //클릭한li와 관련된.tab_content .tab_item 에 엑티브클래스 추가
        tab_name = $(this).attr('data-tab')
        $('.find .tab_content .tab_item').removeClass('active')
        //find로 찾을땐: 클래스명이면 .이 추가되야함 , 내가 가져온 이름에 . 이 없으면(tab_name)? => .추가해야함('.'+ tab_name)
            $('.find .tab_content').find('.'+ tab_name).addClass('active')
        //선택된 tab_item의 tutle에만 '선택됨'이라 써주기
        $('.find .tab_content .tab_item').attr('title', '')
        $('.find .tab_content').find('.'+ tab_name).attr('title', '선택됨' )
    })



/**************************** 끝 : 찾습니다 tab기능 ************************/

/*************************시작 :입양 swiper***************************************/
const adopt_swiper = new Swiper('.adopt .swiper', { /* 팝업을 감싼는 요소의 class명 */
	slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
	spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
	centeredSlides: false, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
	breakpoints: {
		769: {    /* 640px 이상일때 적용 */
			slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
			spaceBetween: 24
		},
	},
	loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
	// autoplay: {  /* 팝업 자동 실행 */
	// 	delay: 2500,
	// 	disableOnInteraction: true,
	// },
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	
});



/*************************끝 :입양 swiper***************************************/









/*     1020

*/





















})//맨끝


/* <다시볼거>
  1. 현재 (pc)인지 ,(모바일)인지 (v)()
  2.클릭하는지 감시 ()
*/