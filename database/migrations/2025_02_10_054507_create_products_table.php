<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductionsTable extends Migration
{
    public function up()
    {
        Schema::create('productions', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->integer('product_id')->unique();
            $table->date('production_date');
            $table->string('factory');
            $table->decimal('material_total_cost', 10, 2);
            $table->decimal('labor_cost', 10, 2);
            $table->decimal('overhead_cost', 10, 2);
            $table->integer('items_produced_perday');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('productions');
    }
}
