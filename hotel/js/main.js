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
    let _syncTimer = null;
    let _resizeTimer = null;

    // 뷰포트에 따른 너비 설정을 반환하는 함수 (원하는 값으로 수정 가능)
    function getWidthSettings() {
        const vw = window.innerWidth;

        // 예시: 데스크탑 / 태블릿 / 모바일 분기
        if (vw >= 1200) {
            return { NORMAL_W: 300, ACTIVE_W: 500, DURATION: 360 }; // 대형 화면
        } else if (vw >= 768) {
            return { NORMAL_W: 250, ACTIVE_W: 400, DURATION: 360 }; // 태블릿 ~ 데스크탑
        } else {
            return { NORMAL_W: 200, ACTIVE_W: 300, DURATION: 300 }; // 모바일
        }
    }

    // translate 계산 함수 (고정 너비값 기준)
    function calcTranslateForIndex(swiper, activeIndex, normalW, activeW) {
        const space = swiper.params.spaceBetween || 0;
        let totalOffset = 0;

        // activeIndex 앞까지 너비 합
        for (let i = 0; i < activeIndex; i++) {
            // 각 인덱스가 active인지 비교해서 width 할당 (active 앞이므로 i===activeIndex는 false)
            const w = (i === activeIndex) ? activeW : normalW;
            totalOffset += w + space;
        }

        const centeredOffset = (swiper.width - activeW) / 2;
        const targetTranslate = -totalOffset + centeredOffset;
        return targetTranslate;
    }

    // 초기 로딩 시 transition 없이 너비 적용 (깜박임 방지)
    function applyWidthsInstant(swiper, normalW, activeW, durationMs, easing) {
        const slides = swiper.slides;
        const aIdx = swiper.activeIndex;

        // transition 임시 제거
        slides.forEach(slide => { slide.style.transition = 'none'; });

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.width = (i === aIdx) ? activeW + 'px' : normalW + 'px';
        }

        // 강제 리플로우
        void swiper.wrapperEl.offsetWidth;

        // transition 복구 (width 애니메이션)
        slides.forEach(slide => {
            slide.style.transition = `width ${durationMs}ms cubic-bezier(.22,.9,.3,1)`;
        });
    }

    // widths를 적용하고 translate를 동기화 애니메이션으로 이동시키는 핵심 함수
    function syncWidthAndTranslate(swiper, activeIndex, normalW, activeW, durationMs) {
        // 이전 타이머 정리
        if (_syncTimer) {
            clearTimeout(_syncTimer);
            _syncTimer = null;
        }

        const slides = swiper.slides;

        // 1) 슬라이드 너비를 목표값(고정값)으로 설정 -> CSS width transition에 의해 부드럽게 변함
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.width = (i === activeIndex) ? activeW + 'px' : normalW + 'px';
        }

        // 2) 예측된 타겟 translate 계산 (DOM 읽지 않고 고정 너비 사용)
        const targetTranslate = calcTranslateForIndex(swiper, activeIndex, normalW, activeW);

        // 3) 현재 translate가 아니라 swiper의 wrapper를 직접 애니메이션
        //    swiper.setTransition(duration) + swiper.setTranslate(target)로 동기화
        swiper.setTransition(durationMs);
        swiper.setTranslate(targetTranslate);

        // 4) duration 뒤 정리: transition 제거 및 update
        _syncTimer = setTimeout(() => {
            swiper.setTransition(0);
            swiper.update(); // 내부 재계산
            _syncTimer = null;
        }, durationMs + 10);
    }

    // 리사이즈 핸들러: 디바운스 후 너비 재계산 및 위치 보정
    function onWindowResize(swiper) {
        if (_resizeTimer) clearTimeout(_resizeTimer);
        _resizeTimer = setTimeout(() => {
            const { NORMAL_W, ACTIVE_W, DURATION } = getWidthSettings();

            // 리사이즈 시에는 깜박임을 최소화하기 위해 transition 0으로 일단 적용
            applyWidthsInstant(swiper, NORMAL_W, ACTIVE_W, DURATION);

            // 계산된 translate를 바로 적용 (애니메이션 없이)하여 위치 정렬
            const translate = calcTranslateForIndex(swiper, swiper.activeIndex, NORMAL_W, ACTIVE_W);
            swiper.setTransition(0);
            swiper.setTranslate(translate);
            swiper.update();

            _resizeTimer = null;
        }, 120); // 120ms 디바운스 (필요시 조정)
    }


    /* ---------- Swiper 초기화 ---------- */
    const room_swiper = new Swiper('.room .swiper', {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 16,
        // loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'fraction',
        },
        // autoplay: { 
        //     delay: 5000,
        //     disableOnInteraction: true,
        // },
        on: {
            init: function() {
                // 초기 너비값 가져와서 즉시 적용 및 초깃값 translate 세팅
                const { NORMAL_W, ACTIVE_W, DURATION } = getWidthSettings();

                // 초기에는 instant로 너비 적용 -> translate 계산 -> 위치 적용 (애니메이션 없이)
                applyWidthsInstant(this, NORMAL_W, ACTIVE_W, DURATION);
                const initialTranslate = calcTranslateForIndex(this, this.activeIndex, NORMAL_W, ACTIVE_W);
                this.setTransition(0);
                this.setTranslate(initialTranslate);

                // window resize 리스너 등록
                window.addEventListener('resize', () => onWindowResize(this));
            },

            slideChangeTransitionStart: function() {
                const { NORMAL_W, ACTIVE_W, DURATION } = getWidthSettings();
                // 슬라이드 전환 시작 시 width/translate 동기화 애니메이션 실행
                syncWidthAndTranslate(this, this.activeIndex, NORMAL_W, ACTIVE_W, DURATION);
            },

            slideChangeTransitionEnd: function() {
                // 안전을 위해 update
                if (_syncTimer) { clearTimeout(_syncTimer); _syncTimer = null; }
                this.setTransition(0);
                this.update();
            }
        },

        observer: true,
        observeParents: true,
    });














//************************************ romm : 끝 *************************************** */

}) // 맨끝(header)

