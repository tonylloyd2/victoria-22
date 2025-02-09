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
        'factory_id',
        'daily_wage',
        'is_active',
    ];

    public function factory()
    {
        return $this->belongsTo(Factory::class);
    }
}
