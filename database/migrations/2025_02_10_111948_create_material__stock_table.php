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
        Schema::create('material__stock', function (Blueprint $table) {
            $table->id();
            $table->string('material_name');
            $table->Interger('material_quantity');
            $table->string('supplier_name');
            $price->string('material_price_perUnit');
            $table->integer('stock_value');
            $table->string('measurement_unit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material__stock');
    }
};
