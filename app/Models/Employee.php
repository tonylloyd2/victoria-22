<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
     protected  $table = 'employees';
    protected $fillable = [
        'name',
        'email',
        'daily_wage',
        'is_active',
        'factory',
    ];

    public function factory()
    {
        return $this->belongsTo(Factory::class);
    }
}
