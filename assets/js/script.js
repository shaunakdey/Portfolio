$(document).ready(function(){
    var $header_top = $('.header-top');
    var $nav = $('nav');
    var origAspectRatio = Math.floor(window.innerWidth / window.innerHeight);

    //Listeners
    $('#heading').find('a').on('click', function() {
        $(this).parent().toggleClass('open-menu');
    });

    $('#menu li a').on('click', function(){
        $('#heading').toggleClass('open-menu');
    });

    $('#shadow-fiend').on('click', function(){
        new Howl({src: ['assets/sounds/collection.mp3']}).play();
        $('.speech').css('opacity', '1');
        setTimeout(() => {
            $('.speech').css('opacity', '0');
        }, 6000);
    });
    
    //Change flex-direction based on aspect-ratio
    var processLayout = function(aspectRatio) {
        if(aspectRatio == 0) {
            //Projects
            $('#projects').addClass('flex-column');

            //Contact
            $('#contact').removeClass('flex-row-reverse');
            $('#contact').addClass('flex-column');
        }
        else {
            //projects
            $('#projects').removeClass('flex-column');

            //Contact
            $('#contact').removeClass('flex-column');
            $('#contact').addClass('flex-row-reverse');
        }
    };
    processLayout(origAspectRatio);
    $(window).on('resize', function(){
        if(origAspectRatio != Math.floor(window.innerWidth / window.innerHeight)) {
            origAspectRatio = Math.floor(window.innerWidth / window.innerHeight);
            processLayout(origAspectRatio);
        }
    });

    //Load Particles
    particlesJS.load('particles-js', 'assets/js/particle-system.json', function() {
        console.log('callback - particles.js config loaded');
    });

    // FullPage Code
    $('#fullpage').fullpage({
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        sectionsColor: ['white', '#17202a', '#aeb6bf', 'white'],
        navigation: true,
        anchors: ['home', 'about', 'projects', 'contact'],
        menu: '#menu',
        scrollOverflow: true,
        touchSensitivity: 10,
        paddingTop: '5%',
        paddingBottom: '5%',

        afterLoad: function(anchorLink, index) {
            if(index.index == 0) {
                $('#home-hi').addClass('animated zoomIn').css('animation-delay', '0.5s');
                $('.card').addClass('animated fadeInLeft');
                var cards = $('.card');
                for(var i = 0; i < cards.length; i++){
                    cards[i].style.animationDelay = 0.8 + 0.2 * i + 's';
                }
                $('#home-title').addClass('animated zoomIn').css('animation-delay', '2.6s');
                $('#mask').addClass('animated bounceInDown').css('animation-delay', '3s');
                $('#rolling-text').addClass('animated zoomIn').css('animation-delay', '3.2s');
                setTimeout(() => {
                    $('.element').removeClass('animated');
                }, 3000);
            }
        },
        
        onLeave: function(index, nextIndex, direction) {
            if(nextIndex.index == 1){
                //Change navigation color
                $('#heading h1 a').toggleClass('change-color-white');
                $('#heading a i').css('background-color', 'white');
                $('#fp-nav ul li a span').css('background-color', 'white');

                //Animate About Me Section
                var animations = ['fadeInLeft', 'fadeInUp', 'fadeInDown', 'fadeInRight'];
                var order = [3, 1, 2, 5, 4];
                $('.panel').addClass('animated');
                var panels = $('.panel');
                for(var i = 0; i < panels.length; i++) {
                    panels[i].classList.add(animations[Math.floor(Math.random() * 4)]);
                    panels[i].style.animationDelay = 0.2 * order[i] + 's';
                }
            }

            else if(nextIndex.index == 2) {
                $('#projects-whoops').addClass('animated fadeInDown').css('animation-delay', '0.2s');
                $('#projects-text').addClass('animated fadeInDown').css('animation-delay', '1s');
                $('.link-github').addClass('animated lightSpeedIn').css('animation-delay', '2s');
            }

            else if(nextIndex.index == 3) {
                $('#contact-text').addClass('animated fadeInDown').css('animation-delay', '0.4s');
                $('.social-icons').addClass('animated fadeInLeft');
                var socicons = $('.social-icons');
                for(var i = 0; i < socicons.length; i++) {
                    socicons[i].style.animationDelay = 0.8 + 0.3 * i + 's';
                }
            }

            if(index.index == 1){
                $('#heading h1 a').toggleClass('change-color-white');
                $('#heading a i').css('background-color', '#17202a');
                $('#fp-nav ul li a span').css('background-color', '#17202a');
            }
        }
    });
});