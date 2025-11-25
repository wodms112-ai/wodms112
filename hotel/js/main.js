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

//************************************ room : 시작 *************************************** */

// ======= 1. 공용 변수 =======
let _syncTimer = null;
let _resizeTimer = null;

// ======= 2. 해상도별 슬라이드 너비 설정 =======
function getWidthSettings() {
    const vw = window.innerWidth;

    if (vw >= 981) {               // PC
        return { NORMAL_W: 528, ACTIVE_W: 832, DURATION: 360 };
    } else if (vw >= 768) {         // 태블릿
        return { NORMAL_W: 380, ACTIVE_W: 380, DURATION: 360 };
    } else {                        // 모바일
        return { NORMAL_W: 260, ACTIVE_W: 260, DURATION: 300 };
    }
}

// ======= 3. active 슬라이드를 가운데로 보내기 위한 translate 계산 =======
function calcTranslateForIndex(swiper, activeIndex, normalW, activeW) {
    const space = swiper.params.spaceBetween || 0;

    // active 앞에 있는 슬라이드들의 총 너비 (전부 NORMAL_W 기준)
    const beforeWidth = activeIndex * (normalW + space);

    // 가운데 정렬을 위한 여유 값
    const centeredOffset = (swiper.width - activeW) / 2;

    // Swiper는 왼쪽(-) 방향으로 이동하니 마이너스 부호
    const targetTranslate = -beforeWidth + centeredOffset;

    return targetTranslate;
}

// ======= 4. 초기 적용 : 깜빡임 없이 width 세팅 =======
function applyWidthsInstant(swiper, normalW, activeW, durationMs) {
    const slides = swiper.slides;
    const aIdx = swiper.activeIndex;

    // transition 잠시 제거
    slides.forEach(slide => { slide.style.transition = 'none'; });

    // active만 큰 폭, 나머지는 작은 폭
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.width = (i === aIdx) ? activeW + 'px' : normalW + 'px';
    }

    // 강제 리플로우
    void swiper.wrapperEl.offsetWidth;

    // width에만 transition 다시 걸기
    slides.forEach(slide => {
        slide.style.transition = `width ${durationMs}ms cubic-bezier(.22,.9,.3,1)`;
    });
}

// ======= 5. 슬라이드 전환 시 width + translate 동기화 =======
function syncWidthAndTranslate(swiper, activeIndex, normalW, activeW, durationMs) {
    // 이전 타이머 정리
    if (_syncTimer) {
        clearTimeout(_syncTimer);
        _syncTimer = null;
    }

    const slides = swiper.slides;

    // 1) width 목표값 설정
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.width = (i === activeIndex) ? activeW + 'px' : normalW + 'px';
    }

    // 2) 새 translate 계산
    const targetTranslate = calcTranslateForIndex(swiper, activeIndex, normalW, activeW);

    // 3) 일정 시간 동안 애니메이션
    swiper.setTransition(durationMs);
    swiper.setTranslate(targetTranslate);

    // 4) 끝나고 transition 제거 + update
    _syncTimer = setTimeout(() => {
        swiper.setTransition(0);
        swiper.update();
        _syncTimer = null;
    }, durationMs + 10);
}

// ======= 6. 리사이즈 대응 =======
function onWindowResize(swiper) {
    if (_resizeTimer) clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
        const { NORMAL_W, ACTIVE_W, DURATION } = getWidthSettings();

        applyWidthsInstant(swiper, NORMAL_W, ACTIVE_W, DURATION);

        const translate = calcTranslateForIndex(swiper, swiper.activeIndex, NORMAL_W, ACTIVE_W);
        swiper.setTransition(0);
        swiper.setTranslate(translate);
        swiper.update();

        _resizeTimer = null;
    }, 120);
}

// ======= 7. room 섹션 Swiper 초기화 =======
const room_swiper = new Swiper('.room .swiper', {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 16,
    loop: true,
    breakpoints: {
        // 980px 이상 : PC/태블릿, loop 켜기
        979: {
            loop: true,
            centeredSlides: true,
        },
    },
    navigation: {
        nextEl: '.room .btn_next',
        prevEl: '.room .btn_prev',
    },
    pagination: {
        el: '.room .swiper-pagination',
        clickable: true,
        type: 'fraction',
    },
    autoplay: false,   // 자동 넘김 없음!

    on: {
        init: function () {
            const { NORMAL_W, ACTIVE_W, DURATION } = getWidthSettings();

            // 1) 첫 active 기준으로 width 세팅
            applyWidthsInstant(this, NORMAL_W, ACTIVE_W, DURATION);

            // 2) 첫 위치를 가운데로 맞춰주기
            const initialTranslate =
                calcTranslateForIndex(this, this.activeIndex, NORMAL_W, ACTIVE_W);
            this.setTransition(0);
            this.setTranslate(initialTranslate);

            // 3) 리사이즈 대응
            window.addEventListener('resize', () => onWindowResize(this));
        },

        slideChangeTransitionStart: function () {
            const { NORMAL_W, ACTIVE_W, DURATION } = getWidthSettings();
            syncWidthAndTranslate(this, this.activeIndex, NORMAL_W, ACTIVE_W, DURATION);
        },

        slideChangeTransitionEnd: function () {
            if (_syncTimer) { clearTimeout(_syncTimer); _syncTimer = null; }
            this.setTransition(0);
            this.update();
        }
    },

    observer: true,
    observeParents: true,

    scrollbar: {
        el: ".room .scrollbar",
        hide: false,
        draggable : true,//스크롤바 드레그해서이동
        dragSize : 300, //스크롤바사이즈
    },
});

//************************************ romm : 끝 *************************************** */




//************************************ dining : 시작 *************************************** */
$('.dining .list ul li').on('mouseenter', function(){
        //li이에 오버했을때의 명령이다~
        $('.dining .list ul li').removeClass('on')
        //li에 오버했을때 일단 on들어간거 다뺴
        $(this).addClass('on')
        //오버한 나한테만 적용해줘
    })
//************************************ dining : 끝 *************************************** */

//************************************ event : 시작 *************************************** */
const event_swiper = new Swiper('.event .swiper', { /* 팝업을 감싼는 요소의 class명 */
    slidesPerView: 1,     // 기본(최소 사이즈): 1개
    spaceBetween: 16,

    breakpoints: {
        768: {            // 768px 이상 → 2개
            slidesPerView: 2,
            spaceBetween: 24,
        },
        981: {            // 981px 이상 → auto
            slidesPerView: "auto",
            spaceBetween: 24,
        }
    },
	//centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
	loop: false,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
	// autoplay: {  /* 팝업 자동 실행 */
	// 	delay: 2500,
	// 	disableOnInteraction: true,
	// },
	navigation: {
		nextEl: '.event .swiper-button-next',
		prevEl: '.event .swiper-button-prev',
	},
	pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
		el: '.swiper-pagination', /* 해당 요소의 class명 */
		clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
		type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
	},
});


//************************************ event : 끝 *************************************** */

//******************************** around .list_mo : 시작  ******************************** */
const around_swiper = new Swiper('.around .swiper', { /* 팝업을 감싼는 요소의 class명 */
    slidesPerView: 1,     // 기본(최소 사이즈): 1개
    spaceBetween: 16,

    breakpoints: {
        768: {            // 768px 이상 → 2개
            slidesPerView: 2,
            spaceBetween: 24,
        },
        981: {            // 981px 이상 → auto
            slidesPerView: "auto",
            spaceBetween: 24,
        }
    },
	//centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
	loop: false,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
	// autoplay: {  /* 팝업 자동 실행 */
	// 	delay: 2500,
	// 	disableOnInteraction: true,
	// },
	navigation: {
		nextEl: '.around .list_mo .swiper-button-next',
		prevEl: '.around .list_mo .swiper-button-prev',
	},
	pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
		el: '.swiper-pagination', /* 해당 요소의 class명 */
		clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
		type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
	},
});

//******************************** around .list_mo : 끝  ******************************** */


}) // 맨끝(header)

