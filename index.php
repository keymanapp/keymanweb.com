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
    <div id='headerRight'>
      <?php if($tier != 'stable') { ?>
      <span id='headerRight-beta'>Pre-release version</span> <a id='headerRight-link' href='?tier=stable'>Return to version <?= $kmw_builds['stable'] ?></a>
      <?php } else if($hasBeta) { ?>
        <span id='headerRight-beta'>New release!</span> <a id='headerRight-link' href='?tier=beta'>Try beta version <?= $kmw_builds['beta'] ?></a>
      <?php } ?>
    <!--<a href='https://keyman.com/keymanweb/' target='blank'><img src="<?php echo cdn("img/info.png"); ?>" /></a>-->
    </div>
    <div id='headerLeft'><img src="<?php echo cdn("img/keymanweb-logo-88.png"); ?>" alt='KeymanWeb.com' title="KeymanWeb version <?= $VersionWithTag ?>" /></div>
    <img src="<?php echo cdn("img/headerbar.png"); ?>" alt="" />
  </div>
</header>

<section id='content'>
  <section id='app' class='box'>
    <div id='KeymanWebControl' style='z-index: 10000'></div>
    <div id='exampleBox'>
      <p id='example'>Example: No examples available for this keyboard.</p>
    </div>
    <div id='messageContainer'>
      <textarea id='message' form='actions' placeholder='Select a keyboard and start typing.'></textarea>
    </div>
    <div id='buttons'>
      <div id='search' class='linksOff'><p>Search</p></div>
      <div id="font"><span id="mobile-font-size" style="font-size:12pt">A</span><span style="font-size:20pt">A</span><p>Font Size</p></div>
      <hr/>
      <div id='copy' class='linksOff' data-clipboard-target="#message"><p>Copy</p></div>
    </div>
    <div id="font-size">
      <span class="font-letter" id="font-small">A</span><div id="slider"></div><span class="font-letter" id="font-large">A</span>
    </div>
    <div id="mobile-font">
      <div id="mobile-increase">+</div>
      <div id="mobile-decrease">-</div>
      <input type="hidden" id="mobile-font-size1" value="16">
    </div>
  </section>

	<aside id='offer'>
	  <div class='box' id='keymandesktop'>
		  <!--<h3>Windows Version</h3>-->
		  <p><span id='desktop-title'>Use this keyboard in any Windows app!</span>
              <a id='keyman-desktop-download'>
              <img src="<?php echo cdn("img/small_download.png"); ?>" alt='Download'
              title='Download free and open source Keyman Desktop with this keyboard bundled' /></a>
              <span id='free-open-source'>Free and open source!</span></p>
	  </div>
	  <div class='box' id='bookmarklet'>
	    <h3>Browser Add-in</h3>
	    <div class='keyman-bookmarklet'><a href='#'></a></div>
	    <p>Drag this button to your Bookmarks toolbar to install this keyboard to your web browser! <a href='https://keyman.com/bookmarklet' target='_blank'>Learn more</a></p>
	  </div>
	  <div class='box' id='learn'>
      <h3>Website Plugin</h3>
      <p>Install the Keyman Engine for Web into your blog, CMS or website</p>
			<div><a href='https://keyman.com/developer/keymanweb/'>Learn more</a> | <a href='https://keyman.com/developer/keymanweb'>Get the source</a></div>
		</div>
	</aside>

</section>

<!-- Footer copied from keyman.com -->

<div id="mobile-footer">
  <div id="mobile-version">KeymanWeb version <?= $VersionWithTag ?></div>
</div>

<div class="footer">
    <div class="wrapper">
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
