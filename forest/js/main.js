$(document).ready(function(){
    const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */

    navigation: true, /* 오른쪽에 각 페이지의 paging */
    navigationPosition: 'left', /* 위치 */
    navigationTooltips: ['main', '나무심기', '숲활동', '활동이야기', 'footer'], /* 툴팁 */
    showActiveTooltip: true, /* 현재 활성화된 페이지의 툴팁에 특정 클래스 주기 */
    
    lockAnchors: false,
    anchors: ['Main', 'Tree', 'Work', 'News', 'Footer'], 
    /* href="#link1" 이렇게 코딩하면 해당 링크명으로 이동 */

    autoScrolling:true, /* 한페이지씩 스크롤 */
    scrollHorizontally: false,

    verticalCentered: true, /* 컨텐츠 요소 위아래 가운데 */
    
    scrollOverflow: false, /* 컨텐츠가 넘쳐도 스크롤 금지 */

    afterLoad: function(origin, destination, direction, trigger){
            console.log('난오심?', origin.anchor)
            if((destination.index == 1)){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
            $('header').addClass('dark')
            $('#fp-nav').addClass('dark')
            $('#fp-nav').show()
            $('.tree .tit h2 strong ').counterUp();

            }else if(destination.index == 3){
                $('header').addClass('dark')
                $('#fp-nav').addClass('dark')
                $('#fp-nav').show()
            }else if(destination.index == 4){
                $('header').addClass('dark')
                $('#fp-nav').addClass('dark')
                $('#fp-nav').hide()
            }else{
                $('header').removeClass('dark')
                $('#fp-nav').removeClass('dark')
                $('#fp-nav').show() 
            }
        },

        responsiveWidth: 769, /* fullpage를 적용시키지 않을 모바일 사이즈 */
        responsiveHeight: 500
    });

    let visual_name = ['2025 생명의 숲 후원의 달', '2022 울진산불이후', '도시 속 나무심기', '고목나무 이야기']
    console.log(visual_name[1])
    const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        // autoplay: {  /* 팝업 자동 실행 */
        //     delay: 2500,
        //     disableOnInteraction: true,
        // },
        
        //effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */

        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.visual .paging', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            // type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 이름 넣기 */
                return '<span class="' + className + '">' + visual_name[index] + "팝업</span>";
            },
        },
        
        
    });
    
    /**********quick 메뉴 열고 닫기************ 
        *퀵메뉴 열고 닫기
        *aside.quick .quick_open을 클릭한 aside.quick open

    */

    $('aside.quick .quick_open').on('click', function(){
        $('aside.quick').addClass('open')
        $('aside.quick .quick_wrap').slideDowm()
    })
    $('aside.quick .quick_close').on('click', function(){
        $('aside.quick').addClass('open')
        $('aside.quick .quick_wrap').slideup()
    })




})//맨끝