$(document).ready(function(){
    /*
    누구한테 : header .gnb .gnb_wrap ul.depth1 > li 
    뭐했을때 : 오버했을때

    결론
    header .gnb .gnb_wrap ul.depth1 > li 에 오버클래스 추가

    제한조건
    li중에서 오버한 한개만  over클래스 들어감
    메뉴에서 벗어나면 어떤것도 over안들어감
    */ 
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin' , function(){
        $(this).addClass('over')
        // console.log('오버함')
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave focusout' , function(){
        $(this).removeClass('over')
        // console.log('아웃함')
    })

    /*
        누구한테 : header .gnb
        뭐했을때 : 오버했을때

        결론
        header에 menu_over

        제한조건
        over해서 생성된 흼색 배경안에는 아웃 안됨
    */

    $('header .gnb').on('mouseenter focusin' , function(){ //focusin을 붙여서 tab키로 이동가능하게 만들기
        $('header').addClass('menu_over')
    })
    $('header').on('mouseleave' , function(){
        $('header').removeClass('menu_over')
    })
    $('header .util .search .search_open').on('focusin' , function(){
        /* 키보드 tab키로 이동할때 header에 focusout으로 주면 메뉴 이동 할때마다 아웃
        메뉴다음에 나오는 버튼이나 마지막 버튼 a한테 포커스가 가면 메뉴를 닫는것으로함*/

        $('header').removeClass('menu_over')
    })
/**************************************************************************************************** 
   * 기준 1024 이하이면 모바일 / 1025 이상이면 PC
   * 브라우저 넓이에 따라 지금 PC인지 모바일인지 구분해야함 => 다르게 작동해야하니까
   * *************************************************************************************************** */
    let mobile_size = 1024
    let device_status // pc 모바일 구분
    let win_w // 브라우저넓이

    function size_chck(){ //함수 정의 
        win_w = $(window).width()
        if(win_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }

    size_chck() //함수호출 (문서가 로딩된 후 1번실행)
    $(window).resize(function(){//브라우저가 리사이즈 될대 마다 1번실행
        size_chck() //함수호출
    })

/**************************************************************************************************** 
   * 모바일에서 1차메뉴클릭-> 2차메뉴열기 
   * -> 메뉴가 열려있으면 나 자신을 닫고
   * -> 메뉴가 닫혀있으면 열려있는 다른 메뉴는 닫고 나는 열기
   * ->클릭했을때 메뉴가 열렸는지 닫혔는지 판단 1차메뉴 li에 open
   * *************************************************************************************************** */
    
  
    
    

/**************************************************************************************************** 
   * heder. gnb .gnb_open 클릭 header에 menu_open 추가
   * heder. gnb .gnb_open 클릭 header에 menu_open 삭제
   * *************************************************************************************************** */
    
}) //맨끝

/* 놓친수업
1차메뉴 li에 =>over가 들어갔을때
--
header .gnb .gnb_wrap ul.depth1 > li {
        position: relative; /*ul.depth2 정렬의 기준
        z-index: 10;
    }

-> 10주니까 오버 안되는 이유
--
 header .util .search .search_open {
        width: 33px;
        height: var(--header-h);
        background-size: 20px; /* 아이콘 가로넓이 , 높이는 알아서 들어감 
        background-position: center top 45%;
    } */