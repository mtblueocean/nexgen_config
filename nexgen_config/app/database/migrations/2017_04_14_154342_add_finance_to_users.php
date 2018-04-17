<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFinanceToUsers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('financeonly')->after('email')->default(0);
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('financeonly');
        });
	}

}
