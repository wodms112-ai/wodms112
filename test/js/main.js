$(document).ready(function(){
    //
    /*.tour .list ul li
    마우스를 마우스를 올린li에만 on클래스를 추가해야함
    --> 마우스를 오버하면 모든 li에 있는 on클래스를 지움
    (없는 애는 가만히 있고 있는애만 지움
    누가on클래스를 가지고 있는지 모르니까*/
    $('.tour .list ul li').on('mouseenter', function(){
        //li이에 오버했을때의 명령이다~
        $('.tour .list ul li').removeClass('on')
        //li에 오버했을때 일단 on들어간거 다뺴
        $(this).addClass('on')
        //오버한 나한테만 적용해줘
    })
    $('footer .right_area .family_site button.family_open').on('click', function(){
        console.log('클릭함')
        $('footer .right_area .family_site').addClass('open')
    })
})