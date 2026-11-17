<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'company_name' => 'required|string|max:255',
            'contact_name' => 'required|string|max:255',
            'email'        => 'required|email|max:255',
            'phone'        => ['required', 'string', 'max:30', 'regex:/^[0-9+\s()-]{7,30}$/'],
            'amount'       => 'required|numeric|min:0.01|max:999999999999',
            'description'  => 'nullable|string|max:5000',
        ]);

        $offer = Offer::create($data);

        return response()->json(['id' => $offer->id], 201);
    }

    public function index()
    {
        return Offer::select('id', 'company_name', 'amount', 'created_at')
            ->latest()
            ->get();
    }

    public function show(Offer $offer)
    {
        return $offer;
    }
}