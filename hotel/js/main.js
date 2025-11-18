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

    device_chk() //문서가 로딩될때 1번실행
    $(window).resize(function(){
        device_chk()//브라우저가 리사이즈 할때마다 1번씩 실행
    })

    /*******************************************************
    누구한테 : header .gnb에
    뭐했을때 : 오버했을때

    결론 :  header에 -> menu_pc 클래스 추가
    제한조건
        over해서 생성된 흰색 배경안에는 아웃 안됨
    ************************************************************/
       /*menu_pc 클래스 추가 */
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
       
    })
    $('header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave' , function(){
        $(this).removeClass('over')
        // console.log('아웃함')
    })





//******************************* moblie : 시작******************************** */
    let gnb_open
    $('header .gnb .gnb_wrap ul.depth1 > li > a').on('click' , function(e){
        if(device_status == 'moblie'){
            e.preventDefault();		/* a 태그의 href를 작동 시키지 않음(2차메뉴 열려야하니까) */
            gnb_open = $(this).parent().hasClass('over')
            if(gnb_open == true){
                $(this).parent().removeClass('over')
                $(this).next().slideUp()
            }else{
                $('header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')   
                $('header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp()
                $(this).parent().addClass('over')
                $(this).next().slideDown()
            }
        }
    })




//*******************************heder(common.css) :끝******************************** */








}) // 맨끝(header)