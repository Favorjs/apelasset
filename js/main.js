/* -------------------------------------------

Name:       Apel
Version:    1.1
Author:	    bslthemes
Website:    https://bslthemes.com/
Developer:	millerDigitalDesign (https://themeforest.net/user/millerdigitaldesign/)

------------------------------------------- */

$(function () {

    "use strict";
    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
    /***************************

    smooth scroll

    **************************
    ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
    });*/
    //ScrollTrigger.normalizeScroll(true);
    /***************************

    preloader

    ***************************/

    const preloaderTimeline = gsap.timeline();

    preloaderTimeline
        .to(".mil-preloader", {
            height: 0,
            ease: "sine",
            duration: .4,
            delay: '2.3',
        })
        .to(".mil-preloader .mil-load", {
            width: 'calc(100% - 30px)',
            ease: "linear",
            duration: '1.3',
            delay: '-2.3',
        })
        .to(".mil-preloader .mil-load", {
            opacity: 0,
            ease: "sine",
            duration: '0.4',
            delay: '-0.6',
        })
        .to(".mil-preloader p", {
            scale: .5,
            opacity: 0,
            ease: "sine",
            duration: .4,
            delay: '-0.7',
            onComplete: function () {
                ScrollTrigger.refresh();
            },
        })

    /***************************

    progressbar

    ***************************/
    gsap.to('.mil-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });

    /***************************

    back to top

    ***************************/

    gsap.fromTo(".progress-wrap", {
        yPercent: 100,
        autoAlpha: 0
    }, {
        yPercent: 0,
        autoAlpha: 1,
        scrollTrigger: {
            start: 500,
            toggleActions: "play none none reverse"
        }
    })

    document.querySelector('.progress-wrap').addEventListener("click", (e) => {
        gsap.to(window, {
            scrollTo: 0,
            duration: 0.55
        })
    });
    /***************************

    back to top

    ***************************/
    $(".mil-back-to-top").on("click", function () {
        gsap.to(window, {
            scrollTo: '0',
            duration: 1,
            ease: 'sine',
        });
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".mil-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50,
            scale: .98,
            ease: 'sine',
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".mil-scale-img");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    /***************************

    price

    ***************************/

    //   Change the active class on the switcher
    var price = $('.mil-pricing-table-price');
    var year = $("#year");
    var month = $("#month");


    year.on('click', function () {
        $(this).addClass('mil-active');
        month.removeClass('mil-active');
        price.each(function () {
            $(this).text($(this).data('year-price'));
        });
    });

    month.on('click', function () {
        $(this).addClass('mil-active');
        year.removeClass('mil-active');
        price.each(function () {
            $(this).text($(this).data('month-price'));
        });
    });
    /***************************

    counters

    ***************************/
    const number = $(".mil-counter");
    number.each(function (index, element) {
        var count = $(this),
            zero = {
                val: 0
            },
            num = count.data("number"),
            split = (num + "").split("."), // to cover for instances of decimals
            decimals = split.length > 1 ? split[1].length : 0;

        gsap.to(zero, {
            val: num,
            duration: 1.8,
            scrollTrigger: {
                trigger: element,
                toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
                count.text(zero.val.toFixed(decimals));
            }
        });
    });
    /***************************

    menu

    ***************************/
    ScrollTrigger.create({
        start: 'top -70',
        end: 99999,
        toggleClass: {
            className: 'mil-active',
            targets: '.mil-top-panel'
        }
    });

    $('.mil-menu-btn').on('click', function () {
        $('.mil-menu-btn , .mil-top-menu').toggleClass('mil-active');
    });
    /***************************

    top panel scroll animation

    ***************************/
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();

        var isDesktop = $(window).width() > 768;

        if ((isDesktop && scroll >= 60) || (!isDesktop)) {
            $(".mil-top-panel").addClass("mil-active");
        } else {
            $(".mil-top-panel").removeClass("mil-active");
        }
    });
    /***************************

    sliders

    ***************************/
    var swiper = new Swiper('.mil-testimonials-1', {
        slidesPerView: 1,
        spaceBetween: 0,
        parallax: true,
        effect: 'fade',
        speed: 600,
        pagination: {
            el: '.mil-testi-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: '.mil-testi-prev',
            nextEl: '.mil-testi-next',
        },
    });
    var swiper = new Swiper('.mil-testimonials-2', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 600,
        pagination: {
            el: '.mil-testi-pagination',
            clickable: true,
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".mil-accordion-group");
    let menus = gsap.utils.toArray(".mil-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".mil-accordion-menu");
        let box = element.querySelector(".mil-accordion-content");
        let boxText = element.querySelector(".mil-accordion-content p");
        let bg = element.querySelector(".mil-accordion-icon");
        let icon = element.querySelector(".mil-accordion-icon i");

        gsap.set(box, {
            height: "auto",
            ease: "sine"
        });

        gsap.set(boxText, {
            opacity: 1,
            ease: "sine"
        });

        gsap.set(icon, {
            rotate: 180,
        });


        let animation = gsap
            .timeline()
            .from(box, {
                onStart: function () {
                    $(bg).addClass("mil-active");
                },
                onComplete: function () {
                    ScrollTrigger.refresh();
                },
                height: 0,
            })

            .from(boxText, {
                opacity: 0,
            }, '-=.2')

            .from(icon, {
                rotate: 90,
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
                $(bg).removeClass("mil-active");

            } else {
                animation.reverse();
                $(bg).removeClass("mil-active");
            }
        };
    }

    /**
        Image Popup
    **/
    $('.mfp-image').magnificPopup();

    /*
        Video popup
    */
    $('.has-popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        iframe: {
            patterns: {
                youtube_short: {
                index: 'youtu.be/',
                id: 'youtu.be/',
                src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        },
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        mainClass: 'mfp-fade',
        callbacks: {
            markupParse: function(template, values, item) {
                template.find('iframe').attr('allow', 'autoplay');
            }
        }
    });

});
