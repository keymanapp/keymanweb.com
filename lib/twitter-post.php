<?php
  require_once('../inc/twitter/tmhOAuth.php');
  require_once('../inc/util.php');
  
  session_start();

  if(!isset($_SESSION['twitterMessage'])) 
    redirect_home('twitter', 'error', 'Your Twitter status message was lost');
  if(!isset($_SESSION['oauth'])) 
    redirect_home('twitter', 'error', 'Your Twitter login was broken.  Please try again');
  
  $tmhOAuth = new tmhOAuth(array(
    'consumer_key'    => $_SERVER['twitter_consumer_key'],
    'consumer_secret' => $_SERVER['twitter_consumer_secret'],
    'use_ssl'         => 1
  ));

  if(!isset($_REQUEST['oauth_verifier']))
    redirect_home('twitter', 'error', 'You are not logged in to Twitter');

  $tmhOAuth->config['user_token']  = $_SESSION['oauth']['oauth_token'];
  $tmhOAuth->config['user_secret'] = $_SESSION['oauth']['oauth_token_secret'];

  $code = $tmhOAuth->request('POST', $tmhOAuth->url('oauth/access_token', ''), array(
    'oauth_verifier' => $_REQUEST['oauth_verifier']
  ));

  $response = $tmhOAuth->response['response'];
  
  if ($code != 200) 
    redirect_home('twitter', 'error', $response);
    
  $_SESSION['twitter_access_token'] = $tmhOAuth->extract_params($tmhOAuth->response['response']);
  unset($_SESSION['oauth']);
  
  $tmhOAuth->config['user_token']  = $_SESSION['twitter_access_token']['oauth_token'];
  $tmhOAuth->config['user_secret'] = $_SESSION['twitter_access_token']['oauth_token_secret'];
  
  $code = $tmhOAuth->request('POST', $tmhOAuth->url('1.1/statuses/update'), array(
    'status' => $_SESSION['twitterMessage']
  ));
  
  $response = json_decode($tmhOAuth->response['response'], true);
  
  if ($code != 200)
    redirect_home('twitter', 'error', $response['error']);
    
  $rdata = json_decode($tmhOAuth->response['response'], true);
    
  redirect_home('twitter', 'success', '',$rdata['user']['screen_name'] . '/status/' . $response['id_str']);
?>
