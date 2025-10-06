$(document).ready(function(){
    /**************************************************************************************************** 
   * 기준 1024 이하이면 모바일 / 1025 이상이면 PC
   * 브라우저 넓이에 따라 지금 PC인지 모바일인지 구분해야함 => 다르게 작동해야하니까
   * *************************************************************************************************** */
    
    let mobile_size = 1024 //  (변수이름= mobile_size) 만들고 값 1200을 담음
    let device_status // (변수이름= device_status) 만들고 pc mobile구분 
    let win_w // (변수이름= win_w) 만들고브라우저 넓이

    function size_chck() { //함수정의
        win_w = $(window).width()
        if(win_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }
    size_chck() //함수호출( 문서가 로딩된 후 1번 실행
    $(window).resize(function(){ // 브라우저가 리사이즈 될때마다 1번실행
        size_chck()
    })

    /**********************************************************************************
    누구한테 : header .gnb .gnb_wrap ul.depth1 > li 
    뭐했을때 : 오버했을때

    결론
    header .gnb .gnb_wrap ul.depth1 > li 에 오버클래스 추가

    제한조건

    li중에서 오버한 한개만  over클래스 들어감
    메뉴에서 벗어나면 어떤것도 over안들어감
    **********************************************************************************/ 
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter focusin' , function(){
        if(device_status == 'pc'){ // 이게 pc면
            $(this).addClass('over') //over클래스를 주도록해
            // console.log('오버함')
        }
       
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave focusout' , function(){
        $(this).removeClass('over')
        // console.log('아웃함')
    })

    /**********************************************************************************
        누구한테 : header .gnb
        뭐했을때 : 오버했을때

        결론
        header에 menu_over

        제한조건
        over해서 생성된 흼색 배경안에는 아웃 안됨
    **********************************************************************************/

    $('header .gnb').on('mouseenter focusin' , function(){ //focusin을 붙여서 tab키로 이동가능하게 만들기
        if(device_status == 'pc'){ //pc이면
           $('header').addClass('menu_over') //menu_over클래스를 줌
        }
        
    })
    $('header').on('mouseleave' , function(){
        $('header').removeClass('menu_over')
    })

    $('header .util .lang .lang_open').on('focusin' , function(){
        $('header').removeClass('menu_over')
        /* 키보드 tab키로 이동할때 header에 focusout으로 주면 메뉴 이동 할때마다 아웃
        메뉴다음에 나오는 버튼이나 마지막 버튼 a한테 포커스가 가면 메뉴를 닫는것으로함 : removeClass 
        = 키보드 접근성 */

    })

/**************************************************************************************************** 
   * 모바일에서 1차메뉴클릭-> 2차메뉴열기 
   * -> 메뉴가 열려있으면 나 자신을 닫고
   * -> 메뉴가 닫혀있으면 열려있는 다른 메뉴는 닫고 나는 열기
   * ->클릭했을때 메뉴가 열렸는지 닫혔는지 판단 1차메뉴 li에 open이 있는지 없는지 보기
   * *************************************************************************************************** */
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){ 
        //선택자를-> 메뉴 클릭을 감시하고 처리해라
		if(device_status == 'mobile'){ 
        //모바일이면 기본 동작(링크 이동)을 막고 대신 메뉴 열기 동작 하겠다”
            e.preventDefault();		
            if($(this).parent().hasClass('open') == true){
                //메뉴가 열려있는 상태 : 나자신을 닫고 끝냄
                $(this).parent().removeClass('open')
                $(this).next().slideUp()
            }
            else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
                //메뉴가 닫혀있는 상태- 다른메뉴를 다 닫고 나만 열음
                $(this).parent().addClass('open')
                $(this).next().slideDown()
                /*display:none;인 요소를 찾아서 -> display:block;으로 바꾸면서
                    높이를 0 → 실제 높이로 부드럽게 늘려주는 효과*/
            }
        }
        
	});
    
    /* a 태그의 href를 작동 시키지 않음 */
            /*감시는 무조건 붙여둔다 → "메뉴 클릭했는지 안 했는지 항상 지켜보는 경비 아저씨 있음"
            if로 상황을 나눈다 → "모바일 손님 오면 막고 안내, PC 손님 오면 그냥 통과*/
    

/**************************************************************************************************** 
   * header .gnb .gnb_open 클릭하면 -> header에 menu_open 추가
   * header .gnb .gnb_close 클릭하면 -> header에 menu_open 삭제
   * *************************************************************************************************** */
    $('header .gnb .gnb_open').on('click' , function(){
        $('header').addClass('menu_open')
    })
    $('header .gnb .gnb_close').on('click' , function(){
        $('header').removeClass('menu_open')
    })
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