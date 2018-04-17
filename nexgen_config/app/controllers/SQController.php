<?php
class SQController extends \BaseController
{
    public function getServiceQualification()
    {
       $wsdl = getcwd() . "/FrontierLink-Certification_wsdl/wsdl/FrontierLink.wsdl";
       echo $wsdl;
    }
}
