<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = ['company_name', 'contact_name', 'email', 'phone', 'amount', 'description'];
}
