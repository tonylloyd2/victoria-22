<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materials extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'material__stock';

    // Define the fillable properties to protect mass-assignment vulnerabilities
    protected $fillable = [
        'material_name', 
        'material_quantity', 
        'supplier_name',  // This should relate to the supplier name (we'll create a relationship)
        'material_price_perUnit', 
        'stock_value', 
        'measurement_unit'
    ];

    // Define a relationship where each material belongs to a supplier
    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_name', 'name');  // Assuming supplier_name is related to Supplier's name
    }
}
