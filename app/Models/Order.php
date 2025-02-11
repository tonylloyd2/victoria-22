<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'user_id',
        'order_date',
        'expected_delivery',
        'payment_status',
        'products_ordered',
        'total_cost',
    ];

    protected $casts = [
        'products_ordered' => 'array',
    ];

    /**
     * Store the order without calculating the total cost.
     */
    public static function createOrder($data)
    {
        // Directly store the order with the provided total_cost
        $order = self::create([
            'user_id' => $data['user_id'],
            'order_date' => now(), // Use current date and time
            'expected_delivery' => $data['expected_delivery'],
            'payment_status' => $data['payment_status'],
            'products_ordered' => json_encode($data['products_ordered']), // Convert the array to JSON
            'total_cost' => $data['total_cost'], // Store the provided total_cost
        ]);

        return $order;
    }
}
