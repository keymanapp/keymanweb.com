<?php /*
  Name:             Index.php
  Copyright:        Copyright (C) 2013 Tavultesoft Pty Ltd.
  Documentation:
  Description:      Wrapper for KeymanWeb LIVE demo page
  Create Date:      11 Apr 2013

  Modified Date:
  Authors:          jmdurdin,jkirkham
  Related Files:
  Dependencies:

  Bugs:
  Todo:
  Notes:
  History:          11 Apr 2013 - jmd - Create
*/

use Keyman\Site\Common\ImageRandomizer;

require_once('inc/head.php');

?>
<body>

<header>
  <div id='headerBackground'>
    <div id='headerLeft'>
      <img src="<?php echo cdn("img/keymanweb-mini-logo-88.png"); ?>" alt='KeymanWeb.com' title="KeymanWeb version <?= $VersionWithTag ?>"/>
      <!-- Menu -->
      <div class="icons">
        <svg id="menu" width="40" height="40" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg" onclick="showMenuList(this)" >
          <g transform="matrix(1,0,0,1,-389.5,-264.004)">
            <g id="arrow_left2">
              <g transform="matrix(1,0,0,1,0,5)"><path id="top" d="M390,270L420,270L420,270C420,270 420.195,250.19 405,265C389.805,279.81 390,279.967 390,279.967"/></g>
              <g transform="matrix(1,1.22465e-16,1.22465e-16,-1,0.00024296,564.935)"><path id="bottom" d="M390,270L420,270L420,270C420,270 420.195,250.19 405,265C389.805,279.81 390,279.967 390,279.967"/></g>
              <path id="middle" d="M390,284.967L420,284.967" />
            </g>
          </g>
        </svg>
      </div>
      <div id="menu-list">
        <h2><a href="">sndfksf</a></h2>
        <h2><a href="">lskndfjsd</a></h2>
      </div>
    </div>
    <div id="headerMiddle">
      <!-- Search -->
      <div class="form">
        <input type="text" class="form-control form-input" placeholder="Search language, keyboard...">
        <span class="left-pan"><i class="fa fa-search"></i></span>
      </div>
      <!-- Keyboard selection -->
      <div class="dropdown">
        <button class="btn dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
          Current keyboard selection  
        </button>
      </div>
    </div>
    <div id='headerRight'>
      <div class="tools">
        <svg xmlns="http://www.w3.org/2000/svg" widht="40" height="40" viewBox="0 0 448 512" fill="#69B7D2"><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/></svg>
        <input type="range" min="12" max="132" value="0" step="2" />
        <svg xmlns="http://www.w3.org/2000/svg" widht="40" height="40" viewBox="0 0 448 512"><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z"/></svg>
      </div>
      <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_72)"> <rect width="24" height="24" fill="white"></rect> <circle cx="7" cy="12" r="2" stroke="#69B7D2" stroke-linejoin="round"></circle> <circle cx="17" cy="6" r="2" stroke="#69B7D2" stroke-linejoin="round"></circle> <path d="M15 7L8.5 11" stroke="#69B7D2"></path> <circle cx="17" cy="18" r="2" stroke="#69B7D2" stroke-linejoin="round"></circle> <path d="M8.5 13.5L15 17" stroke="#69B7D2"></path> </g> <defs> <clipPath id="clip0_15_72"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
      <div class="help">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="bi bi-question-circle-fill" fill="#FC7200" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
      </svg>
      </div>
    </div>
  </div>
  <div id="headerBar">
      <img src="<?php echo cdn("img/headerbar.png"); ?>" alt="" />
    </div>
</header>

<!-- Footer copied from keyman.com -->
<section>
  <div class="text-area-container">
    <div class="type-your-keyboard d-flex align-items-center justify-content-center">
      <textarea class="form-control form-control-sm mb-3" rows="3" placeholder="Small textarea"></textarea>
    </div>
    <div class="cubes">
      <div class="cube cube-1"></div>
    </div>
  </div>
  <div class="keyboard-container">
    <div>
      <ul class="keys">
        <li id="grey"><img src="<?php echo cdn("img/keymanweb-mini-logo-88.png"); ?>" width="20px"></li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>7</li>
        <li>8</li>
        <li>0</li>
        <li>_</li>
        <li> =</li>
        <li id="yellow">🎨</li>
      </ul>
      <ul class="keys">
        <li id="red">🌵</li>
        <li id="Q">Q</li>
        <li id="W">W</li>
        <li id="E">E</li>
        <li id="R">R</li>
        <li id="T">T</li>
        <li id="Y">Y</li>
        <li id="U">U</li>
        <li id="I">I</li>
        <li id="O">O</li>
        <li id="P">P</li>
        <li>[</li>
        <li>]</li>
        <li>\</li>
      </ul>
      <ul class="keys">
        <li id="blue">🧢</li>
        <li>A</li>
        <li>S</li>
        <li>D</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>J</li>
        <li>K</li>
        <li>L</li>
        <li>;</li>
        <li>""</li>
        <li id="green">🔫</li>
      </ul>
      <ul class="keys">
        <li id="rebeca">🔥</li>
        <li>Z</li>
        <li>X</li>
        <li>C</li>
        <li>V</li>
        <li>B</li>
        <li>N</li>
        <li>M</li>
        <li>,</li>
        <li>.</li>
        <li>?</li>
        <li id="up">🧬</li>
      </ul>
      <ul class="keys">
        <li id="one">ctrl</li>
        <li id="one">alt</li>
        <li id="one">cmd</li>
        <li id="two"></li>
        <li id="one">cmd</li>
        <li id="one">alt</li>
      </ul>
    </div>
  </div>
</section>

<div id="mobile-footer">
  <div id="mobile-version">KeymanWeb version <?= $VersionWithTag ?></div>
</div>

<div class="footer">
    <div class="wrapper">
        <input id='KeymanWebControl' style='z-index: 10000' type="hidden">
        <div class="footer-third" id="footer-mailchimp">
            <h2 class="footer-third-title">Keep me updated</h2>
            <!-- Begin MailChimp Signup Form -->
            <div id="mc_embed_signup">
            <form action="//keyman.us1.list-manage.com/subscribe/post?u=99fcab2b035a8a51cd2158ca9&amp;id=7ccdac1e32" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div class="mc-field-group">
                    <input type="email" value="" name="EMAIL" class="required email kmw-disabled" id="mce-EMAIL" placeholder="email" />
                </div>
                <div id="mce-responses" class="clear">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                </div>
                <div class="button subscribe">
                    <h2>Subscribe</h2>
                </div>
            </form>
            </div>
            <!--End mc_embed_signup-->
            <br>
            <div id="privacy-policy"><a href="https://software.sil.org/language-software-privacy-policy/">Privacy policy</a></div>

            <div id="version">KeymanWeb version <?= $VersionWithTag ?></div>
        </div>
        <div class="footer-third" id="footer-social">
            <h2 class="footer-third-title">Keep in touch</h2>
            <div>
              <a href="https://facebook.com/KeymanApp" target="_blank" data-icon='&#xf203;'>Facebook</a>
              <a href="https://twitter.com/keyman" target="_blank" data-icon='&#xf202;'>Twitter</a>
              <a href="https://blog.keyman.com/" target="_blank" data-icon='&#xf413;'>Keyman blog</a>
              <a href="https://github.com/keymanapp" target="_blank" data-icon='&#xf200;'>GitHub</a>
              <a href="https://community.software.sil.org/c/keyman" target="_blank" id='footer-community'>Keyman Community</a>
            </div>
        </div>
        <div class="footer-third sil-logo">
            <br>
            <a href="https://www.sil.org/about/"><img id="sil-logo" src="<?php echo ImageRandomizer::randomizer(); ?>" width="50%" alt='SIL' /></a>
            <p>Created by <a href="https://www.sil.org/about/">SIL Global</a></p>
        </div>
    </div>
</div>

</body>
</html>
