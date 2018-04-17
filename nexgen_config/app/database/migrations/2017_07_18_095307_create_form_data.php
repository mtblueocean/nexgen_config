<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormData extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('form_data', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id');
			$table->text('form_data');
			$table->string('status',10);
			$table->string('files',30);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('form_data');
	}

}
