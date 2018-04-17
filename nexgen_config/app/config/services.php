<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| Third Party Services
	|--------------------------------------------------------------------------
	|
	| This file is for storing the credentials for third party services such
	| as Stripe, Mailgun, Mandrill, and others. This file provides a sane
	| default location for this type of information, allowing packages
	| to have a conventional place to find your various credentials.
	|
	*/

	'mailgun' => array(
		'domain' => 'sandbox4db65c60491c41ecaf0537a7b4a4e9a7.mailgun.org',
		'secret' => 'key-d5f2e6d740faa060af6b65cf68141692',
	),

    'sendgrid' => array(
        'api_key' => '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',
        'version' => 'v3',
    ),

	'mandrill' => array(
		'secret' => '',
	),

	'stripe' => array(
		'model'  => 'User',
		'secret' => '',
	),

);
