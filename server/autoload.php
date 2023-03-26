<?php

//autoloader

spl_autoload_register('autoLoader');

function autoLoader($className)
{
    $path = "Classes/";
    $extension = ".php";
    $fullPath = $path . $className . $extension;
    if (file_exists($fullPath)){
        include_once($fullPath);
    } else {
        $fullPath = "Interfaces/" . $className . $extension;
        include_once $fullPath;
    }

}