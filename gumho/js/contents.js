/****************

파일명 : contents.js
작성자 : 이재은
작성일 : 25-10-23
설 명  : 각각페이지에만

****************/
/*
    인터렉티브(에니메이션)의 시작은 : 영역이 브라우저 상단에 닿았을때
    영역의 상단값 < 스크롤된 값 => 에니메이션 시작
    ceo_area_start < ceo_scroll
    종료는 : 영역하단에 브라우저 하단 위로 올라올때
    let ceo_area_end - ceo_win_h < ceo_scroll

    *영역안에 들어가기전(시작전)
    *영역에 들어갔을때(진행중)
    *영역에서 벗어났을때(종료)
*/
$(document).ready(function(){
    let ceo_length = $('.ctn_ceo').length
    function ceo_ani(){
        let ceo_win_h = $(window).height()//브라우저의 높이
        let ceo_scroll = $(window).scrollTop() //현재스크롤 된값
        let ceo_area_name = $('.ctn_ceo .ceo_head')//선택자
        let ceo_obj_wrap = $('.ctn_ceo .ceo_head .ceo_photo')//애니메이션
        let ceo_obj = $('.ctn_ceo .ceo_head .ceo_photo .ceo_img')//넓이가 조정되는 요소
        let ceo_obj_bg = $('.ctn_ceo .ceo_head .ceo_photo .ceo_img .bg') // 투명도 줄 애

        
        let ceo_obj_start = 50
        let ceo_obj_end = 100
        let ceo_obj_count //현재 계산한 넓이값

        let ceo_obj_bg_start = 0
        let ceo_obj_bg_end = 0.6
        let ceo_obj_bg_count //현재 opacity값

        let ceo_area_start = ceo_area_name.offset().top //시작위치(맨위에서 부터 계산한 시작위치)
        let ceo_area_end = ceo_area_start + ceo_area_name.height() - ceo_win_h//끝위치
        let ceo_total = ceo_area_end - ceo_area_start //전체스크롤값
        let ceo_diff //진행중이후에 스크롤된값
        let ceo_per //스크롤 된 값이 몇%인지

        //console.log(ceo_total)

        /*
            진행중일때 몇%스크롤 했는지 계산해야함
            (1000px동안 인터렉티브를 할건데 100px 스크롤함 10%)
            현재스크롤된 값(ceo_diff) x 100 / 전체값(ceo_total) = 

            처음의 넓이값50 - 종료 넓이값100 
            진행율 50%  ---75
            (종료값 - 처음값) *진행율/100 + 처음값
            (100- 50) * 50/100 +50 =75
            
        */

        //console.log('시작',ceo_area_start, '종료',ceo_area_end - ceo_win_h, '스크롤',ceo_scroll)
        if(ceo_scroll > ceo_area_end){
            //console.log('종료')
            ceo_obj_wrap.attr('data-status' , 'end')
            ceo_obj.width(ceo_obj_end + '%')
            ceo_obj.height(ceo_obj_end + '%')
            ceo_obj_bg.css('opacity' , ceo_obj_bg_end)

            let ceo_obj_bg_count = ceo_obj_start +(ceo_obj_bg_end - ceo_obj_bg_start) * (ceo_per / 100)
        }
        else if(ceo_scroll < ceo_area_start){
            //console.log('시작전')
            ceo_obj_wrap.attr('data-status' , 'start')
            ceo_obj.width(ceo_obj_start + '%')
            ceo_obj.height(ceo_obj_start + '%')
            ceo_obj_bg.css('opacity', ceo_obj_bg_start) 
        }
        else{
            //console.log('진행중')
            ceo_obj_wrap.attr('data-status' , 'ing')

            // 지금 구간에서 얼마나 내려왔는지
            ceo_diff = ceo_scroll - ceo_area_start
            ceo_per = ceo_diff * 100 / ceo_total
            //console.log(ceo_diff, ceo_total, ceo_per)
            ceo_obj_count = ceo_obj_start + (ceo_obj_end - ceo_obj_start) * (ceo_per / 100)
            ceo_obj_count = ceo_obj_count * 1.2
            if(ceo_obj_count > ceo_obj_bg_end){ //100보다 크면 다시 100으로 만듬
                ceo_obj_count = ceo_obj_bg_end
            }
            //console.log(ceo_obj_count)
            ceo_obj.width(ceo_obj_count + '%')
            ceo_obj.height(ceo_obj_count + '%')
            ceo_obj_bg_count = ceo_obj_start +(ceo_obj_bg_end - ceo_obj_bg_start) * (ceo_per / 100)
            ceo_obj_bg_count = ceo_obj_start * 1.2
           if(ceo_obj_count > ceo_obj_bg_end){ //100보다 크면 다시 100으로 만듬
                ceo_obj_count = ceo_obj_bg_end
            }


            ceo_obj_bg.css('opacity' , ceo_obj_count) 
        }
    }
    // console.log($('.ctn_ceo').length)
    if(ceo_length > 0){
        ceo_ani() //브라우저가 로딩되었을때 단한번
    }
    $(window).scroll(function(){
        if(ceo_length > 0){
            ceo_ani() //브라우저가 스크롤 될때마다 한번씩
        }
    })


















})//맨끝