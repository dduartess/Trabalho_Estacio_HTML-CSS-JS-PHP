<?php

require_once __DIR__ . '/auth.php';

encerrarLogin();

header('Location: login.php');
exit;
