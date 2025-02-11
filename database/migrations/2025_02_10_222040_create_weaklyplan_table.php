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
        Schema::create('weekly_plans', function (Blueprint $table) {
            $table->id();
            $table->string('factory');
            $table->date('week_start_date');
            $table->date('week_end_date');
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected'])->default('draft');
            $table->timestamps();
            $table->text('notes')->nullable();
            $table->json('materials_needed')->nullable(); // JSON column for materials needed
            $table->decimal('total_cost', 10, 2)->nullable(); // New column for total cost
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('weekly_plans');
        Schema::enableForeignKeyConstraints();
    }
};
