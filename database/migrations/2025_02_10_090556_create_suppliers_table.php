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
        // Create the suppliers table
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Supplier's name
            $table->string('email')->unique();  // Supplier's email (unique)
            $table->string('mobile_number');  // Supplier's mobile number
            $table->json('materials_supplied');  // JSON column to store materials supplied
            $table->timestamps();  // Timestamps for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the suppliers table
        Schema::dropIfExists('suppliers');
    }
};
