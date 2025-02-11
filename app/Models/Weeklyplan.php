<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weeklyplan extends Model
{
    use HasFactory;

    // Specify the table name (optional if the table name follows Laravel's naming convention)
    protected $table = 'weekly_plans';

    // Define the fillable attributes to protect against mass assignment vulnerabilities
    protected $fillable = [
        'factory',
        'week_start_date',
        'week_end_date',
        'status',
        'notes',
        'materials_needed',
        'total_cost',
    ];

    // Cast attributes to appropriate data types
    protected $casts = [
        'materials_needed' => 'array',  // Automatically cast to array
        'total_cost' => 'decimal:2',    // Cast to decimal with 2 decimal places
        'week_start_date' => 'date',    // Cast to date
        'week_end_date' => 'date',      // Cast to date
    ];

    // Optionally, you can define relationships, accessors, or mutators here as well
}
