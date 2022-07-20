<?php
//Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";

$c = true;
//Формирование самого письма
$title = "Заголовок письма";
foreach ( $_POST as $key => $value) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: # e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: # e9e9e9 1px solid;'>$value</td>  
    </tr>
    ";
  }  
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UFT-8";
  $mail->SMTPAuth = true;

  $mail->Host       = 'smtp.rambler.ru'; // SMTP сервера почты
  $mail->Username   = 'nadezhdamamina@rambler.ru'
  $mail->Password   = ''; // заполнить
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('', 'Заявка с вашего сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('nadezhdamamina@rambler.ru');

  //Отправка сообщений
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();


} catch (Exception $e) {
  $status = "Сообщение не отправлено. Ошибка: {$mail->ErrorInfo}";  
}
