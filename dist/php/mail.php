<?php
$recepient = "katyalex103@gmail.com";
$siteName = "Tinyone";

$email = trim($_POST["email"]);

$pagetitle = "Заявка с сайта \"$siteName\"";
mail($recepient, $pagetitle, $email, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>