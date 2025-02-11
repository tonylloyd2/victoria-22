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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Assuming each order is linked to a user
            $table->date('order_date')->default(DB::raw('CURRENT_DATE'))->change();
            $table->date('expected_delivery');
            $table->string('payment_status');
            $table->json('products_ordered'); // Store products as a JSON array with product_id, quantity
            $table->decimal('total_cost', 10, 2); // Store the total cost
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
