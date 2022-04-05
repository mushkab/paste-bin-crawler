import moment from 'moment';
import 'moment-timezone';
import { AuthorType, PasteBin } from "../../src/PasteBinStorage";

const publicPastesPage = (pastes : PasteBin[]) : string =>
    `<!DOCTYPE html>
<html lang="en">
<head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-58643-34"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', "UA-58643-34");
    </script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Pastes Archive - Pastebin.com</title>
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta name="description" content="Pastebin.com is the number one paste tool since 2002. Pastebin is a website where you can store text online for a set period of time." />
    <meta property="og:description" content="Pastebin.com is the number one paste tool since 2002. Pastebin is a website where you can store text online for a set period of time." />
            <meta property="fb:app_id" content="231493360234820" />
    <meta property="og:title" content="Pastes Archive - Pastebin.com" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://pastebin.com/archive" />
    <meta property="og:image" content="https://pastebin.com/i/facebook.png" />
    <meta property="og:site_name" content="Pastebin" />
    <meta name="google-site-verification" content="jkUAIOE8owUXu8UXIhRLB9oHJsWBfOgJbZzncqHoF4A" />
    <link rel="canonical" href="https://pastebin.com/archive" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
        <meta name="csrf-param" content="_csrf-frontend">
<meta name="csrf-token" content="blMQwY8esCCZUfgejT1GBZvK97ecLMjH43ouSIhEg0s5a3L1207zDdAnyXvDWxJHxLO55OtzuJilAlk-vCfmAg==">

<link href="/assets/c80611c4/css/bootstrap.min.css" rel="stylesheet">        
<link href="/themes/pastebin/css/vendors.bundle.css?f4f0913bb2945020c9b1" rel="stylesheet">
<link href="/themes/pastebin/css/app.bundle.css?f4f0913bb2945020c9b1" rel="stylesheet">
    </head>
<body class="night-auto " data-pr="x2xy94pJ" data-pa="" data-sar="1" data-abd="1">


<div class="wrap">

        
        
<div class="header">
    <div class="container">
        <div class="header__container">

                        <div class="header__left">
                <a class="header__logo" href="/">
                    Pastebin                </a>

                <div class="header__links h_1024">
                    
                    <a href="/doc_api">API</a>
                    <a href="/tools">tools</a>
                    <a href="/faq">faq</a>
                                    </div>

                
                <a class="header__btn" href="/">
                    paste                </a>
            </div>

                        <div class="header__right">

                
                    <div class="header__user-frame h_640">
                        <div class="header__user-name">testmus</div>
                        <div class="header__user-status">
                                                            FREE                                                    </div>
                    </div>

                    <div class="header__user-icon">
                        <a href="/u/testmus" title="My Pastebin">
                            <img src="/themes/pastebin/img/guest.png" alt="testmus">                        </a>
                    </div>

                    <div class="dropdown js-header-dropdown">
                        <div class="header__dropdown-icon">&nbsp;</div>
                        <div class="dropdown-menu -header">
                            <a href="/u/testmus" class="pastebin">My Pastebin</a>
                            <a href="/messages" class="messages">My Messages [1]</a>
                            <a href="/alert/index" class="alerts">My Alerts</a>
                            <a href="/user/profile" class="profile">Edit Profile</a>
                            <a href="/user/settings" class="settings">Edit Settings</a>
                            <a href="/user/password" class="password">Change Password</a>

                            
                            <a href="/site/logout" class="logout">Log Out</a>

                            <div class="divider"></div>
                            <a href="/doc_api" class="mobile-menu">API</a>
                            <a href="/faq" class="mobile-menu">faq</a>
                            <a href="/tools" class="mobile-menu">tools</a>
                            <a href="/archive" class="mobile-menu">archive</a>
                        </div>
                    </div>

                
            </div>

        </div>
    </div>

</div>
            

    <div class="container">
        <div class="content">

                        
                        
                                    
            
            

    <div class="page page-archive -top">

        <div class="content__title">Pastes Archive</div>

        <div class="content__text">
            <div class="notice -no-margin">
                                    This page contains the most recently created 'public' pastes.                            </div>
        </div>

        <div class="archive-table">
            <table class="maintable">
                <tbody>
                    <tr>
                        <th scope="col">Name / Title</th>
                        <th scope="col" class="h_800 td_right">Posted</th>
                        <th scope="col" class="h_800 td_right">Syntax</th>
                    </tr>

${pastes.map(p => `<div data-key="154438945">
<tr>
    <td><span class="status -public"></span><a href="/${p.pasteBinKey}">${p.title || 'Untitled'}</a></td>
    <td class="td_smaller h_800 td_right">4 hours ago</td>
    <td class="td_smaller h_800 td_right"><a href="/archive/php">PHP</a></tr></div>`).join('')}
            </tbody>
            </table>
        </div>
    </div>

                <div style="clear: both;"></div>

                                </div>

        <div class="sidebar h_1024">
            
    
<div class="sidebar__title">
    <a href="/u/testmus">My Pastes</a>
</div>
<ul class="sidebar__menu">

            
            <li class="">
                <a href="/e0rT1ya7">hellopastebin</a>
                <div class="details">
                                            JavaScript |
                    
                    4 min ago
                    | 0.04 KB                </div>
            </li>

            </ul>
    <div class="sidebar__sticky js-sidebar-sticky">
                    </div>


                
    <div class="sidebar__title">
        <a href="/archive">Public Pastes</a>
    </div>
    <ul class="sidebar__menu">

                    <li>
                <a href="/0xcjGHGT">Untitled</a>
                <div class="details">
                                            Python |
                    
                    6 sec ago
                    | 0.47 KB                </div>
            </li>
                    <li>
                <a href="/p6zjFrn5">Untitled</a>
                <div class="details">
                                            Python |
                    
                    37 sec ago
                    | 0.36 KB                </div>
            </li>
                    <li>
                <a href="/du4gyqcH">Games</a>
                <div class="details">
                                            C# |
                    
                    2 min ago
                    | 4.44 KB                </div>
            </li>
                    <li>
                <a href="/AthbuZGR">DOshit</a>
                <div class="details">
                                            C++ |
                    
                    27 min ago
                    | 2.43 KB                </div>
            </li>
                    <li>
                <a href="/mvTr3mpw">Paste Ping</a>
                <div class="details">
                                            C |
                    
                    30 min ago
                    | 0.02 KB                </div>
            </li>
                    <li>
                <a href="/B32aUV2v">Untitled</a>
                <div class="details">
                                            Python |
                    
                    35 min ago
                    | 2.61 KB                </div>
            </li>
                    <li>
                <a href="/evFD1vSP">Untitled</a>
                <div class="details">
                                            Python |
                    
                    37 min ago
                    | 0.10 KB                </div>
            </li>
                    <li>
                <a href="/3feZARVe">Javascript Lezione 32</a>
                <div class="details">
                                            JavaScript |
                    
                    1 hour ago
                    | 1.52 KB                </div>
            </li>
        
    </ul>
            

        </div>
    </div>
</div>


    
<div class="top-footer">
    <a class="icon-link -size-24-24 -chrome" href="/tools#chrome" title="Google Chrome Extension"></a>
    <a class="icon-link -size-24-24 -firefox" href="/tools#firefox" title="Firefox Extension"></a>
    <a class="icon-link -size-24-24 -iphone" href="/tools#iphone" title="iPhone/iPad Application"></a>
    <a class="icon-link -size-24-24 -windows" href="/tools#windows" title="Windows Desktop Application"></a>
    <a class="icon-link -size-24-24 -android" href="/tools#android" title="Android Application"></a>
    <a class="icon-link -size-24-24 -macos" href="/tools#macos" title="MacOS X Widget"></a>
    <a class="icon-link -size-24-24 -opera" href="/tools#opera" title="Opera Extension"></a>
    <a class="icon-link -size-24-24 -unix" href="/tools#pastebincl" title="Linux Application"></a>
</div>

<footer class="footer">
    <div class="container">
        <div class="footer__container">

            <div class="footer__left">
                <a href="/">create new paste</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                                <a href="/languages">syntax languages</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/archive">archive</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/faq">faq</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/tools">tools</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/night_mode">night mode</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_api">api</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_scraping_api">scraping api</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/news">news</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/pro" class="pro">pro</a>

                <br>
                <a href="/doc_privacy_statement">privacy statement</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_cookies_policy">cookies policy</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_terms_of_service">terms of service</a><sup style="color:#999">updated</sup> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_security_disclosure">security disclosure</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/dmca">dmca</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/report-abuse">report abuse</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/contact">contact</a>

                <br>

                                
                <br>

                
<span class="footer__bottom h_800">
    By using Pastebin.com you agree to our <a href="/doc_cookies_policy">cookies policy</a> to enhance your experience.
    <br>
    Site design &amp; logo &copy; 2022 Pastebin</span>
            </div>

            <div class="footer__right h_1024">
                                    <a class="icon-link -size-40-40 -facebook-circle" href="https://facebook.com/pastebin" rel="nofollow" title="Like us on Facebook" target="_blank"></a>
                    <a class="icon-link -size-40-40 -twitter-circle" href="https://twitter.com/pastebin" rel="nofollow" title="Follow us on Twitter" target="_blank"></a>
                            </div>

        </div>
    </div>
</footer>
    


    
<div class="popup-container">

                <div class="popup-box -cookies" data-name="l2c_1">
            We use cookies for various purposes including analytics. By continuing to use Pastebin, you agree to our use of cookies as described in the <a href="/doc_cookies_policy">Cookies Policy</a>.            &nbsp;<span class="cookie-button js-close-cookies">OK, I Understand</span>
        </div>
    
        
    
    
</div>
    

<span class="cd-top"></span>

<script src="/assets/9ce1885/jquery.min.js"></script>
<script src="/assets/f04f76b8/yii.js"></script>
<script>
    const POST_EXPIRATION_NEVER = 'N';
    const POST_EXPIRATION_BURN = 'B';
    const POST_STATUS_PUBLIC = '0';
    const POST_STATUS_UNLISTED = '1';
</script>
<script src="/themes/pastebin/js/vendors.bundle.js?f4f0913bb2945020c9b1"></script>
<script src="/themes/pastebin/js/app.bundle.js?f4f0913bb2945020c9b1"></script>

</body>
</html>

`;


const pastePage =  (paste: PasteBin) => `<!DOCTYPE html>
<html lang="en">
<head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-58643-34"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', "UA-58643-34");
    </script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>${paste.title || 'Untitled'} - Pastebin.com</title>
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta name="description" content="Pastebin.com is the number one paste tool since 2002. Pastebin is a website where you can store text online for a set period of time." />
    <meta property="og:description" content="Pastebin.com is the number one paste tool since 2002. Pastebin is a website where you can store text online for a set period of time." />
            <meta property="fb:app_id" content="231493360234820" />
    <meta property="og:title" content="${paste.title || 'Untitled'} - Pastebin.com" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://pastebin.com/iCCwqtmx" />
    <meta property="og:image" content="https://pastebin.com/i/facebook.png" />
    <meta property="og:site_name" content="Pastebin" />
    <meta name="google-site-verification" content="jkUAIOE8owUXu8UXIhRLB9oHJsWBfOgJbZzncqHoF4A" />
    <link rel="canonical" href="https://pastebin.com/iCCwqtmx" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
        <meta name="csrf-param" content="_csrf-frontend">
<meta name="csrf-token" content="gwsUJb_TQHzvNV0J8EeGBS7UgzyXTo8cn-4Z2sKzM0_UM3YR64MDUaZDbGy-IdJHca3Nb-AR_0PZlm6s9tBWBg==">

<link href="/assets/c80611c4/css/bootstrap.min.css" rel="stylesheet">        
<link href="/themes/pastebin/css/vendors.bundle.css?f4f0913bb2945020c9b1" rel="stylesheet">
<link href="/themes/pastebin/css/app.bundle.css?f4f0913bb2945020c9b1" rel="stylesheet">
    
<!-- 0-x2xy94pJ -->
<script type="text/javascript" src="//services.vlitag.com/adv1/?q=adf050ece17b957604b4bbfc1829059f" defer="" async=""></script><script> var vitag = vitag || {};</script>
<!-- End Valueimpression Head Script -->
<script>
     vitag.smartBannerConfig= {
          disablePosition:  "top right left",
     }
</script>
<script type="text/javascript">
        if (window.location.pathname === "/") {
            vitag = vitag || {};
            vitag.outStreamConfig = vitag.outStreamConfig || {};
            vitag.outStreamConfig.enablePC = false;
        }
    </script>
</head>
<body class="night-auto " data-pr="x2xy94pJ" data-pa="" data-sar="1" data-abd="1">


<div class="wrap">

        
        
<div class="header">
    <div class="container">
        <div class="header__container">

                        <div class="header__left">
                <a class="header__logo" href="/">
                    Pastebin                </a>

                <div class="header__links h_1024">
                    
                    <a href="/doc_api">API</a>
                    <a href="/tools">tools</a>
                    <a href="/faq">faq</a>
                                    </div>

                
                <a class="header__btn" href="/">
                    paste                </a>
            </div>

                        <div class="header__right">

                
                    <div class="header__user-frame h_640">
                        <div class="header__user-name">testmus</div>
                        <div class="header__user-status">
                                                            FREE                                                    </div>
                    </div>

                    <div class="header__user-icon">
                        <a href="/u/testmus" title="My Pastebin">
                            <img src="/themes/pastebin/img/guest.png" alt="testmus">                        </a>
                    </div>

                    <div class="dropdown js-header-dropdown">
                        <div class="header__dropdown-icon">&nbsp;</div>
                        <div class="dropdown-menu -header">
                            <a href="/u/testmus" class="pastebin">My Pastebin</a>
                            <a href="/messages" class="messages">My Messages [1]</a>
                            <a href="/alert/index" class="alerts">My Alerts</a>
                            <a href="/user/profile" class="profile">Edit Profile</a>
                            <a href="/user/settings" class="settings">Edit Settings</a>
                            <a href="/user/password" class="password">Change Password</a>

                            
                            <a href="/site/logout" class="logout">Log Out</a>

                            <div class="divider"></div>
                            <a href="/doc_api" class="mobile-menu">API</a>
                            <a href="/faq" class="mobile-menu">faq</a>
                            <a href="/tools" class="mobile-menu">tools</a>
                            <a href="/archive" class="mobile-menu">archive</a>
                        </div>
                    </div>

                
            </div>

        </div>
    </div>

</div>
            

    <div class="container">
        <div class="content">

                        
                        
<!-- 0-x2xy94pJ -->
<div style="padding-bottom:20px; padding-top:20px;">
<div class="adsbyvli" data-ad-slot="vi_1282550010"></div><script>(vitag.Init = window.vitag.Init || []).push(function(){viAPItag.display("vi_1282550010")})</script>
</div>

                                    
            
            
<link href="/themes/pastebin/css/geshi/light/php.css?694707f98000ed24d865" rel="stylesheet">

<div class="post-view">

    
    <div class="details">
                    <div class="share h_800">
                <div data-url="https://pastebin.com/iCCwqtmx" class="share-btn facebook js-facebook-share" title="Share on Facebook!"><span>SHARE</span></div>
                <div data-url="https://pastebin.com/iCCwqtmx" class="share-btn twitter js-twitter-share" title="Share on Twitter!"><span>TWEET</span></div>
            </div>
                <div class="user-icon">
                            <img src="/themes/pastebin/img/guest.png" alt="aliakbarbeda2">                    </div>
        <div class="info-bar">
            <div class="info-top">

                
                
                <h1>${paste.title || 'Untitled'}</h1>
            </div>
            <div class="info-bottom">

                                    <div class="username">${paste.authorType === AuthorType.USER ? `<a href="/u/${paste.author}">${paste.author}</a>` : 'a guest'}</div>

                    
                                             <a href="/message/compose?to=aliakbarbeda2" class="message" title="Send a private message to: aliakbarbeda2"></a>
                                    
                <div class="date">
                    <span title="${moment(paste.datePosted).tz('America/Chicago').format('dddd Do of MMMM YYYY hh:mm:ss A z')}">${moment(paste.datePosted).tz('America/Chicago').format('MMM Do, YYYY')}</span>

                                    </div>

                <div class="visits" title="Unique visits to this paste">
                    538                </div>

                <div class="expire" title="When this paste gets automatically deleted">
                    Never                </div>
            </div>
        </div>
    </div>

    
    <div class="highlighted-code">
        <div class="top-buttons">
            <div class="left">
                <a href="/archive/php" class="btn -small h_800">PHP</a> 0.90 KB            </div>

            <div class="right">
                                    <a href="/raw/iCCwqtmx" class="btn -small">raw</a>
                    <a href="/dl/iCCwqtmx" class="btn -small">download</a>
                    <a href="/clone/iCCwqtmx" class="btn -small h_800">clone</a>
                    <a href="/embed/iCCwqtmx" class="btn -small h_800">embed</a>
                    <a href="/print/iCCwqtmx" class="btn -small h_800">print</a>
                
                                    <a href="/report/iCCwqtmx" class="btn -small">report</a>
                
                
                            </div>
        </div>
        <div class="source" style=" ">
            <ol class="php"><li class="li1"><div class="de1"><span class="kw2">&lt;?php</span></div></li>
<li class="li1"><div class="de1"><span class="re0">$ch</span> <span class="sy0">=</span> <span class="kw3">curl_init</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="kw3">curl_setopt</span><span class="br0">&#40;</span><span class="re0">$ch</span><span class="sy0">,</span> CURLOPT_URL<span class="sy0">,</span> <span class="st_h">'https://api.telegram.org/bot'</span><span class="sy0">.</span><span class="re0">$_GET</span><span class="br0">&#91;</span><span class="st_h">'token'</span><span class="br0">&#93;</span><span class="sy0">.</span><span class="st_h">'/sendAudio'</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="kw3">curl_setopt</span><span class="br0">&#40;</span><span class="re0">$ch</span><span class="sy0">,</span> CURLOPT_RETURNTRANSFER<span class="sy0">,</span> <span class="nu0">1</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="kw3">curl_setopt</span><span class="br0">&#40;</span><span class="re0">$ch</span><span class="sy0">,</span> CURLOPT_POST<span class="sy0">,</span> <span class="kw4">true</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="re0">$id</span><span class="sy0">=</span><span class="re0">$_GET</span><span class="br0">&#91;</span><span class="st_h">'id'</span><span class="br0">&#93;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="re0">$data</span> <span class="sy0">=</span> <span class="kw3">array</span><span class="br0">&#40;</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; <span class="st_h">'chat_id'</span> <span class="sy0">=&gt;</span> <span class="st_h">''</span><span class="sy0">.</span><span class="re0">$id</span><span class="sy0">.</span><span class="st_h">''</span><span class="sy0">,</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; <span class="st_h">'audio'</span> <span class="sy0">=&gt;</span> <span class="st_h">'https://translate.google.com/translate_tts?ie=UTF-8&amp;tl='</span><span class="sy0">.</span><span class="re0">$_GET</span><span class="br0">&#91;</span><span class="st_h">'lang'</span><span class="br0">&#93;</span><span class="sy0">.</span><span class="st_h">'&amp;client=tw-ob&amp;q='</span><span class="sy0">.</span><span class="re0">$_GET</span><span class="br0">&#91;</span><span class="st_h">'q'</span><span class="br0">&#93;</span><span class="sy0">.</span><span class="st_h">''</span><span class="sy0">,</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; <span class="st_h">'caption'</span> <span class="sy0">=&gt;</span> <span class="st_h">'🗣️ '</span><span class="sy0">.</span><span class="re0">$_GET</span><span class="br0">&#91;</span><span class="st_h">'caption'</span><span class="br0">&#93;</span><span class="sy0">.</span><span class="st_h">''</span><span class="sy0">,</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; <span class="st_h">'title'</span> <span class="sy0">=&gt;</span> <span class="st_h">''</span><span class="sy0">.</span><span class="re0">$_GET</span><span class="br0">&#91;</span><span class="st_h">'q'</span><span class="br0">&#93;</span><span class="sy0">.</span><span class="st_h">''</span><span class="sy0">,</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; <span class="co1">//'protect_content' =&gt; 'true',</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; <span class="st_h">'thumb'</span> <span class="sy0">=&gt;</span> <span class="st_h">'https://cdn.jpegmini.com/user/images/pufffin_blurred.jpg'</span><span class="sy0">,</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; <span class="st_h">'performer'</span> <span class="sy0">=&gt;</span> <span class="st_h">'@basaacehorg'</span><span class="sy0">,</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; <span class="st_h">'file_name'</span> <span class="sy0">=&gt;</span> <span class="st_h">'@basaacehorgX'</span></div></li>
<li class="li1"><div class="de1">&nbsp; &nbsp; </div></li>
<li class="li1"><div class="de1"><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1">&nbsp;</div></li>
<li class="li1"><div class="de1"><span class="kw3">curl_setopt</span><span class="br0">&#40;</span><span class="re0">$ch</span><span class="sy0">,</span> CURLOPT_POSTFIELDS<span class="sy0">,</span> <span class="re0">$data</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="re0">$output</span> <span class="sy0">=</span> <span class="kw3">curl_exec</span><span class="br0">&#40;</span><span class="re0">$ch</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="re0">$info</span> <span class="sy0">=</span> <span class="kw3">curl_getinfo</span><span class="br0">&#40;</span><span class="re0">$ch</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="kw3">curl_close</span><span class="br0">&#40;</span><span class="re0">$ch</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li>
<li class="li1"><div class="de1"><span class="kw1">ECHO</span> <span class="st_h">'BISA id ='</span><span class="sy0">.</span><span class="re0">$id</span><span class="sy0">.</span><span class="st_h">' &nbsp; https://translate.google.com/translate_tts?ie=UTF-8&amp;tl='</span><span class="sy0">.</span><span class="re0">$_GET</span><span class="br0">&#91;</span><span class="st_h">'lang'</span><span class="br0">&#93;</span><span class="sy0">.</span><span class="st_h">'&amp;client=tw-ob&amp;q='</span><span class="sy0">.</span><span class="re0">$_GET</span><span class="br0">&#91;</span><span class="st_h">'q'</span><span class="br0">&#93;</span><span class="sy0">.</span><span class="st_h">''</span><span class="sy0">;</span></div></li>
</ol>        </div>
    </div>

    
                
<!-- 0-x2xy94pJ -->
<div style="padding-bottom:10px; padding-top:10px;">
<div class="adsbyvli" style="width:970px; height:250px" data-ad-slot="vi_1282567605"></div> <script>(vitag.Init = window.vitag.Init || []).push(function () { viAPItag.display("vi_1282567605") })</script>
</div>

        <div class="content__title -no-border">
            RAW Paste Data        </div>

        <textarea class="textarea">${paste.content}</textarea>
    
        
</div>            <div style="clear: both;"></div>

                        
<!-- 0-x2xy94pJ -->
<div style="padding-bottom:20px; padding-top:20px;">
<div class="adsbyvli" data-ad-slot="vi_1282577474" style="width: 970px; height: 90px"></div><script>(vitag.Init = window.vitag.Init || []).push(function(){viAPItag.display("vi_1282577474")})</script>
</div>
        </div>

        <div class="sidebar h_1024">
            
    
<div class="sidebar__title">
    <a href="/u/testmus">My Pastes</a>
</div>
<ul class="sidebar__menu">

            
            <li class="">
                <a href="/e0rT1ya7">hellopastebin</a>
                <div class="details">
                                            JavaScript |
                    
                    3 hours ago
                    | 0.04 KB                </div>
            </li>

            </ul>
    <div class="sidebar__sticky js-sidebar-sticky">
                
<!-- 0-x2xy94pJ -->
<div style="padding-bottom:10px; padding-top:20px;">
<div class="adsbyvli" data-ad-slot="vi_1282578983" style="width: 300px; height: 600px"></div><script>(vitag.Init = window.vitag.Init || []).push(function(){viAPItag.display("vi_1282578983")})</script>
</div>
    </div>


                
    <div class="sidebar__title">
        <a href="/archive">Public Pastes</a>
    </div>
    <ul class="sidebar__menu">
    

                    <li>
                <a href="/MCp4tYAM">Browse OSM Tags in CityGen3D Database files</a>
                <div class="details">
                                            C# |
                    
                    8 min ago
                    | 15.54 KB                </div>
            </li>
                    <li>
                <a href="/wBYvYFFv">ComputerCraft + Create Minecraft Remote Contr...</a>
                <div class="details">
                                            Lua |
                    
                    42 min ago
                    | 0.62 KB                </div>
            </li>
                    <li>
                <a href="/nrjAcyux">WindowsVersion</a>
                <div class="details">
                                            Batch |
                    
                    46 min ago
                    | 0.11 KB                </div>
            </li>
                    <li>
                <a href="/e6Uw0A5C">ComputerCraft + Create Minecraft Elevator Scr...</a>
                <div class="details">
                                            Lua |
                    
                    50 min ago
                    | 2.45 KB                </div>
            </li>
                    <li>
                <a href="/3464ysY7">Paste Ping</a>
                <div class="details">
                                            C |
                    
                    1 hour ago
                    | 0.02 KB                </div>
            </li>
                    <li>
                <a href="/K3PEUnaw">Untitled</a>
                <div class="details">
                                            Python |
                    
                    1 hour ago
                    | 0.73 KB                </div>
            </li>
                    <li>
                <a href="/CNJpBetd">Thymeleaf tags for Spring Security</a>
                <div class="details">
                                            HTML |
                    
                    1 hour ago
                    | 0.83 KB                </div>
            </li>
                    <li>
                <a href="/TteNTAKK">BinaryTree</a>
                <div class="details">
                                            C# |
                    
                    1 hour ago
                    | 1.86 KB                </div>
            </li>
        
    </ul>
            

        </div>
    </div>
</div>


    
<div class="top-footer">
    <a class="icon-link -size-24-24 -chrome" href="/tools#chrome" title="Google Chrome Extension"></a>
    <a class="icon-link -size-24-24 -firefox" href="/tools#firefox" title="Firefox Extension"></a>
    <a class="icon-link -size-24-24 -iphone" href="/tools#iphone" title="iPhone/iPad Application"></a>
    <a class="icon-link -size-24-24 -windows" href="/tools#windows" title="Windows Desktop Application"></a>
    <a class="icon-link -size-24-24 -android" href="/tools#android" title="Android Application"></a>
    <a class="icon-link -size-24-24 -macos" href="/tools#macos" title="MacOS X Widget"></a>
    <a class="icon-link -size-24-24 -opera" href="/tools#opera" title="Opera Extension"></a>
    <a class="icon-link -size-24-24 -unix" href="/tools#pastebincl" title="Linux Application"></a>
</div>

<footer class="footer">
    <div class="container">
        <div class="footer__container">

            <div class="footer__left">
                <a href="/">create new paste</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                                <a href="/languages">syntax languages</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/archive">archive</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/faq">faq</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/tools">tools</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/night_mode">night mode</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_api">api</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_scraping_api">scraping api</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/news">news</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/pro" class="pro">pro</a>

                <br>
                <a href="/doc_privacy_statement">privacy statement</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_cookies_policy">cookies policy</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_terms_of_service">terms of service</a><sup style="color:#999">updated</sup> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/doc_security_disclosure">security disclosure</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/dmca">dmca</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/report-abuse">report abuse</a> <span class="footer__devider">&nbsp;/&nbsp;</span>
                <a href="/contact">contact</a>

                <br>

                                
                <br>

                
<span class="footer__bottom h_800">
    By using Pastebin.com you agree to our <a href="/doc_cookies_policy">cookies policy</a> to enhance your experience.
    <br>
    Site design &amp; logo &copy; 2022 Pastebin</span>
            </div>

            <div class="footer__right h_1024">
                                    <a class="icon-link -size-40-40 -facebook-circle" href="https://facebook.com/pastebin" rel="nofollow" title="Like us on Facebook" target="_blank"></a>
                    <a class="icon-link -size-40-40 -twitter-circle" href="https://twitter.com/pastebin" rel="nofollow" title="Follow us on Twitter" target="_blank"></a>
                            </div>

        </div>
    </div>
</footer>
    


    
<div class="popup-container">

                <div class="popup-box -cookies" data-name="l2c_1">
            We use cookies for various purposes including analytics. By continuing to use Pastebin, you agree to our use of cookies as described in the <a href="/doc_cookies_policy">Cookies Policy</a>.            &nbsp;<span class="cookie-button js-close-cookies">OK, I Understand</span>
        </div>
    
        
    
    
</div>
    

<span class="cd-top"></span>

<script src="/assets/9ce1885/jquery.min.js"></script>
<script src="/assets/f04f76b8/yii.js"></script>
<script>
    const POST_EXPIRATION_NEVER = 'N';
    const POST_EXPIRATION_BURN = 'B';
    const POST_STATUS_PUBLIC = '0';
    const POST_STATUS_UNLISTED = '1';
</script>
<script src="/themes/pastebin/js/vendors.bundle.js?f4f0913bb2945020c9b1"></script>
<script src="/themes/pastebin/js/app.bundle.js?f4f0913bb2945020c9b1"></script>

</body>
</html>

`;


export function generatePasteBinHtml(pasteBin: PasteBin[]) : {publicPastesPage: string, pastePage: [string,string][]} {

    return { publicPastesPage:publicPastesPage(pasteBin),pastePage: pasteBin.map(p => ([p.pasteBinKey,pastePage(p) ])) };

}


