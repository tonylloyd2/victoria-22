<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    // Define the table name if it's different from the default "suppliers"
    protected $table = 'suppliers';

    // Define the fillable attributes that can be mass-assigned
    protected $fillable = [
        'name', 
        'email', 
        'mobile_number', 
        'materials_supplied'
    ];

    // The materials_supplied column is a JSON type column, so we'll cast it to an array
    protected $casts = [
        'materials_supplied' => 'array',  // This will automatically decode the JSON data to an array
    ];
}
