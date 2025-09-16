$(document).ready(function(){

    console.log('111111')
    $('.box').on('mouseenter',function(){
        console.log('오버했다!')
        $('.box').addClass('on')
    })//종료태그:
    $('.box').on('mouseleave', function(){
        console.log('내려갔다!')
        $('.box').remove.Class('on')
    })
})//$(document).ready

console.log('2연결되었습니다')