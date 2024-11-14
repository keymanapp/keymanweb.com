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
    </div>
    <div id="headerMiddle">
      <!-- Search -->
      <div class="form">
        <input type="text" class="form-control form-input dropdown-toggle" id="keyboardSearch" data-bs-toggle="dropdown" placeholder="Search language, keyboard..." onclick="function1()">
        <span class="left-pan"><i class="fa fa-search"></i></span>
        <ul class="dropdown-menu" id="dropdown-menu">
          <!-- kmwHeader.js -->    
        </ul>
      </div>
      <!-- Keyboard selection -->
      <div class="dropdown">
        <button class="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Current keyboard selection
        </button>
        <ul class="dropdown-menu" id="selectedKeyboard">
          <!-- kmwHeader.js -->
        </ul>
      </div>
    </div>
    <div id='headerRight'>
      <!-- Tools -->
      <div class="tools">
        <i class="fa-regular fa-copy fa-xl" style="color: #69B7D2;"></i>
        <input type="range" min="12" max="132" value="0" step="2" />
        <i class="fa-regular fa-keyboard fa-xl" style="color: #69B7D2;"></i>
      </div>
      <div class="share">
        <i class="fa-solid fa-share fa-xl" style="color: #69B7D2;"></i>
      </div>
      <!-- Help -->
      <div class="dropdown help">
        <span data-bs-toggle="dropdown">
          <i class="fa-solid fa-circle-question fa-xl" style="color: #FC7200;"></i>
        </span>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#"><i class="fa-solid fa-book"></i> Quick Guide to KMW</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="https://keyman.com/developer/keymanweb/" target="_blank"><i class="fa-solid fa-code"></i> For Developer</a></li>
        </ul>
      </div>
      <!-- Menu -->
      <div class="dropdown menu">
        <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-bars fa-xl"style="color: #FC7200;"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="https://keyman.com/" target="_blank">Keyman.com</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="https://keyman.com/bookmarklet/" target="_blank">Bookmarklet</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div id="headerBar">
    <img src="<?php echo cdn("img/headerbar.png"); ?>" alt="" />
  </div>
</header>

<section>
  <div class="text-area-container">
    <div class="type-your-keyboard d-flex align-items-center justify-content-center">
      <textarea class="form-control form-control-sm" rows="3" placeholder="Small textarea"></textarea>
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

<script src="<?php echo cdn('src/bootstrap.bundle.min.js') ?>" crossorigin="anonymous"></script>
<script src="<?php echo cdn('js/kmwHeader.js') ?>"></script>
</body>
</html>
