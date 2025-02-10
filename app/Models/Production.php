<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Production extends Model
{
    use HasFactory;

    // Define the table name if it's different from the default "productions"
    protected $table = 'productions';

    // Define the fillable attributes that can be mass-assigned
    protected $fillable = [
        'product_name',
        'product_id',
        'production_date',
        'factory',
        'quantity',
        'items_produced',  // This could be the number of items produced in a batch
        'material_total_cost',
        'labor_cost',
        'overhead_cost',
        'items_produced_perday',
    ];

    // Define the relationship with ProductionCost model (if applicable)
    public function productionCosts()
    {
        return $this->hasMany(ProductionCost::class);
    }
}
