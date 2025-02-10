<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('employees');

        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->decimal('daily_wage', 10, 2);
            $table->boolean('is_active')->default(true);
            $table->string('factory')->unique();
            $table->timestamps();

            $table->foreign('factory_id')->references('id')->on('factory')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropForeign(['factory_id']);
        });

        Schema::dropIfExists('employees');
    }
};
