$(document).ready(Core);

function Core()
{
    InitOwlCarousel();

    SetTabSwitcher();
    SetModal();
    SetMobileMenu();
    SetSpeakers();
    SetDropdown();
}

function SetTabSwitcher()
{
    $('.btn-tab-switch').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn-tab-switch').closest('.btn-switch-wrapper').find('.btn-tab-switch').removeClass('active');
        $(this).addClass('active');

        let targetTab = $(this).attr('target');

        SwitchTab(targetTab)
    })
}

function SwitchTab(target)
{
    let tabViewer = $(`[tab-name="${target}"]`).closest('.tab-viewer');
    $(tabViewer).find('.tab.active').stop().animate({
        opacity: 0
    }, 'slow', 'linear', function() {
        $(tabViewer).find('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');
        
        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab-viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).stop().animate({
            opacity: 1
        }, 'slow', 'linear')
    })
}

function SetModal()
{
    $('[modal]').on('click', function()
    {
        let modalId = $(this).attr('modal');
        ShowModal(`#${modalId}`);
    });

    $('.modal__dialog').on('click', function(e) {
        e.stopPropagation();
    });

    $('.modal').on('click', function() {
        HideModal(`#${$(this).attr('id')}`);
    });

    $('.btn__modal__close').on('click', function ()
    {
        let modalId = $(this).closest('.modal').attr('id');
        HideModal(`#${modalId}`);
    });
}

function ShowModal(modalId)
{
    $(modalId + ' .modal__dialog').off('animationend');
    $(modalId).addClass('active');
    $('body').addClass('lock');
    $(modalId + ' .modal__dialog').addClass('fadeInDownBig')
    
    $('body').append('<div class="modal__backdrop"></div>');
    setTimeout(function() {
        $('.modal__backdrop').addClass('active');
    }, 50)
}

function HideModal(modalId)
{
    $(modalId + ' .modal__dialog').removeClass('fadeInDownBig');
    $(modalId + ' .modal__dialog').addClass('fadeOutDownBig');
    $('.modal__backdrop').removeClass('active');
    $('body').removeClass('lock');
    $(modalId + ' .modal__dialog').on('animationend', function() {
        if (!$(modalId).hasClass('active'))
        {
            return;
        }
        $(modalId).removeClass('active');
        $(modalId + ' .modal__dialog').removeClass('fadeOutDownBig');
        $('.modal__backdrop').remove();
    });
}

function InitOwlCarousel()
{
    document.fonts.ready.then(function () {
        let popular = $('section.popular .btn-switch-wrapper .owl-carousel').owlCarousel({
            items: 6,
            autoWidth: true,
            slideBy: 1,
            loop:false,
            dots: false,
        })

        $('section.popular .btn-switch-wrapper .next').on('click', function () {
            popular.trigger('next.owl.carousel');
        })
    })

    $('section.reviews .owl-carousel').owlCarousel({
        items: 4,
        slideBy: 4,
        nav: true,
        navContainer: $('section.reviews .owl-navs .nav'),
        dots: true,
        dotsContainer: $('section.reviews .owl-navs .dots'),
        responsive: {
            1200: {
                items: 4,
                slideBy: 4,
            },
            992: {
                items: 3,
                slideBy: 3,
            },
            768: {
                items: 2,
                slideBy: 2,
            },
            0: {
                items: 1,
                slideBy: 1
            }
        }
    })    
}

function SetMobileMenu()
{
    $('.btn__menu').on('click', function () {
        if ($(this).hasClass('active'))
        {
            $(this).removeClass('active');
            $('header .menu-mobile').removeClass('active');
            $('body').removeClass('lock')
        }
        else 
        {
            $(this).addClass('active');
            $('header .menu-mobile').addClass('active');
            $('body').addClass('lock')
        }
    })
}

function SetSpeakers()
{
    $('section.speakers .photo-wrapper .item').on('click', function () {

        if ($(this).hasClass('active'))
        {
            $(this).removeClass('active');
            $(this).closest('.row').find('.quote-wrapper').css('height', `20px`);
            
            return;
        }
        else 
        {
            $('section.speakers .photo-wrapper .item').removeClass('active');
            $(this).addClass('active');
            $('section.speakers .quote-wrapper').css('height', `20px`);
        }

        
        let height = $(this).find('.quote').innerHeight();
        $(this).closest('.row').find('.quote-wrapper').css('height', `${height + 50}px`)
    })
}

function SetDropdown()
{
    $('.dropdown button').on('click', function () {
        if ($(this).hasClass('active'))
        {
            $(this).removeClass('active');
            $(this).closest('.dropdown').find('.outer-wrapper').css('height', `0px`);
            return;
        }

        $(this).addClass('active');
        let height = $(this).closest('.dropdown').find('.inner-wrapper').outerHeight();
        $(this).closest('.dropdown').find('.outer-wrapper').css('height', `${height}px`);

    })
}