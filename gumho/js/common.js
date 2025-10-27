//common.css =>헤더 푸터에 들어가는걸 정의하는 역할함
$(document).ready(function(){

    let mobile_size = 1024 // 모바일 메뉴 시작 사이즈
    let window_w //브라우저넓이
    let device_status//현재 pc인지moblie인지 구분하는 값

    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'moblie'
        }
        console.log(device_status)
    }

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

    let gnb_open 

    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'moblie'){
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
            gnb_open = $(this).parent().hasClass('open')
            // console.log(gnb_open)
            if(gnb_open == true){ //열려있다면
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
            }else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideup
                $(this).parent().addClass('open')
                $(tnis).next().slideDown()
            }
        }
	});

//    header .gnb .gnb_wrap .gnb_close
//    header .gnb .gnb_open

    $('header .gnb .gnb_open').on('click' , function(){
        $('header').addClass('menu_mo')
    })
    $('header .gnb .gnb_wrap .gnb_close, header .gnb .gnb_bg').on('click' , function(){
        $('header').removeClass('menu_mo')
    })


// 스크롤을 내리면 header fixed
    let scrolling = $(window).scrollTop() //현재 스크롤된 값
    let prev_scroll//이전에 스크롤된 값
    let diff_scroll //차이값
    function scroll_chk(){
        prev_scroll = scrolling
        scrolling = $(window).scrollTop()
        diff_scroll = prev_scroll - scrolling
        // console.log(diff_scroll)
        if(diff_scroll < 0){ //위로스크롤
            $('header').addClass('up')
        }else{//아래로스크롤
            $('header').removeClass('up')
        }

        if(scrolling > 0){ //스크롤내림
            $('header').addClass('fixed')
        }else{ //0이거나 0보다 작은경우(fixed제거)
            $('header').removeClass('fixed')
        }

    }
    scroll_chk() // 문서가 로됭되고 단1번 실행
    $(window).scroll(function(){
        scroll_chk() //스크롤할때마다 실행
    })
})//맨끝