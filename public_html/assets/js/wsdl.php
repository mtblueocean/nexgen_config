<?php
 
//error_reporting(0);
 
$cwd = getcwd();
//echo "API path - $cwd<br />";
$wsdl = "$cwd/FrontierLink-Certification_wsdl/wsdl/FrontierLink.wsdl";
 
$soapArr = array(
"soap_version" => SOAP_1_1,
"trace" => true,
"exceptions" => false,
"local_cert" => "./frontiercert.pem",
"passphrase" => "your password here",
"location" => "https://frontierlink-cert.aapt.com.au:8482/FrontierLink/services/ServiceQualification",
"style" => SOAP_DOCUMENT,
"use" => SOAP_LITERAL,
"cache_wsdl" => "WSDL_CACHE_NONE"
);
 
try {
$client = new SoapClient($wsdl, $soapArr);
//echo '<br />Client setup<br /><pre>';
$_xmlns = 'http://www.aapt.com.au/FrontierLink/xsd';
$request = "<QualifyProductRequest xmlns='$_xmlns'><qualifyNationalWholesaleBroadbandProductRequest><nbnLocationID>LOC000010294379</xsd:nbnLocationID><returnExtendedNbnSqData>true<returnExtendedNbnSqData><qualifyNationalWholesaleBroadbandProductRequest></QualifyProductRequest>";
 
$response = $client->qualifyProduct(new SoapVar($request, XSD_ANYXML));
//echo '<br />Request initiated';
//var_dump($response);
echo '<pre>';
print_r($response);
 
echo "success<br />";
echo '<br /></pre>';
} catch (Exception $e) {
echo "<br />Catch!<br />";
//var_dump($e);
echo '<pre>';
print_r($e);
echo '</pre>';
}
