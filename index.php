<?php 
  require_once('D:\inetpub\webs\copoteu/matei/assets/chunks/start.php');
?>
Platformer
<?php 
  require_once('D:\inetpub\webs\copoteu/matei/assets/chunks/head.php');
?>
<link rel='stylesheet' type='text/css' href='platformer-stylesheet.css'>
<?php 
  require_once('D:\inetpub\webs\copoteu/matei/assets/chunks/header.php');
?>
<div id='game'>
		<div>
			<canvas id='canvy' width='256' height='512'>:P</canvas>
		</div>
		<div>
			<p><input type='button' id='start' value='start'>
			<p><span id='message'></span>
		</div>
	</div>
	<script src='scripts/canvasDrawer.js'></script>
	<script src='scripts/objects.js'></script>
	<script src='scripts/physics.js'     ></script>
	<script src='scripts/gameManager.js'></script>
	<script src='scripts/main.js'       ></script>
<?php 
  require_once('D:\inetpub\webs\copoteu/matei/assets/chunks/footer.php');
?>