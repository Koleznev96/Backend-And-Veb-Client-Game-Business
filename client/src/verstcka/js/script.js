$(function () {
    $('.main .tab').on('click', function (event) {
        var id = $(this).attr('data-id');
        $('.main').find('.main__content').removeClass('active-tab').hide();
        $('.main .main__menu-tabs').find('.tab').removeClass('active');
        $(this).addClass('active');
        $('#' + id).addClass('active-tab').fadeIn();
        return false;
    });
});

$('.mobile__menu-btn').on('click', function () {
    $('.main__menu').toggleClass("active-menu");
});

$('.main__content-task-info-title-img').on('click', function () {
    $('.main__content-task-info-title-img-red').toggleClass("active");
    $('.main__content-task-info-title-img').toggleClass("active");
});
$('.main__content-task-info-title-img-red').on('click', function () {
    $('.main__content-task-info-title-img').toggleClass("active");
    $('.main__content-task-info-title-img-red').toggleClass("active");
});