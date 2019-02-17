<?php
  require_once('../inc/twitter/tmhOAuth.php');
  require_once('../inc/servervars.php');

  session_start();
    
  if(!isset($_REQUEST['message']))
    {
      $response = array('result' => 'error', 'error' => 'Invalid Parameters');
      echo json_encode($response);
      exit;
    }

  $_SESSION['twitterMessage'] = $_REQUEST['message'];

  $tmhOAuth = new tmhOAuth(array(
    'consumer_key'    => $_SERVER['twitter_consumer_key'],
    'consumer_secret' => $_SERVER['twitter_consumer_secret'],
    'use_ssl'         => 1
  ));

  $redirect_uri = 'http://'.$site_keymanwebdemo.'/lib/twitter-post.php';

  if(isset($_SESSION['twitter_access_token'])) {
    $tmhOAuth->config['user_token']  = $_SESSION['twitter_access_token']['oauth_token'];
    $tmhOAuth->config['user_secret'] = $_SESSION['twitter_access_token']['oauth_token_secret'];
    
    $code = $tmhOAuth->request('POST', $tmhOAuth->url('1.1/statuses/update'), array(
      'status' => $_SESSION['twitterMessage']
    ));
    
    $rdata = json_decode($tmhOAuth->response['response'], true);
    if ($code == 200)
      $response = array(
        'result' => 'success',
        'data' => $rdata['user']['screen_name'] . '/status/' . $rdata['id_str']
      );
    else{
      $response = array(
        'result' => 'error',
        'error' => $rdata['errors'][0]['message']
      );
      // This is code for if the user has revoked app access but still has an active KMW session
      if($rdata['errors'][0]['code'] == 89){
        unset($response);
        unset($_SESSION['twitter_access_token']);
        if(!isset($_REQUEST['message'])){
          $response = array('result' => 'error', 'error' => 'Invalid Parameters');
          echo json_encode($response);
          exit;
        }
        $_SESSION['twitterMessage'] = $_REQUEST['message'];
        
        $tmhOAuth = new tmhOAuth(array(
          'consumer_key'    => $_SERVER['twitter_consumer_key'],
          'consumer_secret' => $_SERVER['twitter_consumer_secret'],
          'use_ssl'         => 1
        ));
        
        $redirect_uri = 'http://'.$site_keymanwebdemo.'/lib/twitter-post.php';
      }
    }
  }

  if(!isset($response))
  {
    $params = array(
      'oauth_callback'     => $redirect_uri,
    );
    
    $code = $tmhOAuth->request('POST', $tmhOAuth->url('oauth/request_token', ''), $params);
    
    if ($code == 200) {
      $_SESSION['oauth'] = $tmhOAuth->extract_params($tmhOAuth->response['response']);
      $authurl = $tmhOAuth->url("oauth/authorize", '') .  "?oauth_token={$_SESSION['oauth']['oauth_token']}";
      
      $response = array(
        'result' => 'login',
        'login' => $authurl
      );
    } 
    else 
    {
      $response = array(
        'result' => 'error',
        'error' => $tmhOAuth->response['response']
      );
    }
  }

  echo json_encode($response);

?>
